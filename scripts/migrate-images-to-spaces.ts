#!/usr/bin/env tsx

/**
 * Migration Script: Move images from MongoDB base64 to Digital Ocean Spaces
 *
 * This script:
 * 1. Finds all images with base64 data but no URL
 * 2. Uploads each image to Digital Ocean Spaces
 * 3. Updates the database with the CDN URL
 * 4. Removes the base64 data to free up MongoDB RAM
 *
 * Usage:
 *   NODE_ENV=development npx tsx scripts/migrate-images-to-spaces.ts
 *   OR
 *   Set DATABASE_URL manually:
 *   DATABASE_URL="your_mongodb_url" npx tsx scripts/migrate-images-to-spaces.ts
 */

// CRITICAL: Load environment variables FIRST before any other imports
import * as dotenv from 'dotenv';
import { resolve, join } from 'path';

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local');
console.log(`Loading environment from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn('⚠️  Warning: Could not load .env.local file');
  console.warn('   Make sure DATABASE_URL and SPACES_* variables are set');
}

// Verify critical environment variables
const requiredVars = ['DATABASE_URL', 'SPACES_ACCESS_KEY_ID', 'SPACES_SECRET_KEY', 'SPACES_BUCKET'];
const missing = requiredVars.filter(v => !process.env[v]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:', missing.join(', '));
  console.error('\nPlease ensure .env.local contains:');
  console.error('  - DATABASE_URL');
  console.error('  - SPACES_ACCESS_KEY_ID');
  console.error('  - SPACES_SECRET_KEY');
  console.error('  - SPACES_BUCKET');
  process.exit(1);
}

// NOW import Prisma and other dependencies
import { PrismaClient } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize Prisma client
const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

// Initialize Spaces client
const spacesClient = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT || 'https://sgp1.digitaloceanspaces.com',
  region: process.env.SPACES_REGION || 'sgp1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SPACES_SECRET_KEY || '',
  },
  forcePathStyle: false,
});

async function uploadToSpaces(file: Buffer, filename: string, mimeType: string): Promise<string> {
  const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const key = `uploads/${uniqueFilename}`;

  await spacesClient.send(
    new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET || 'bbc-images',
      Key: key,
      Body: file,
      ACL: 'public-read',
      ContentType: mimeType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  const cdnEndpoint = process.env.SPACES_CDN_ENDPOINT || 'https://bbc-images.sgp1.cdn.digitaloceanspaces.com';
  return `${cdnEndpoint}/${key}`;
}

async function migrateImages() {
  console.log('🚀 Starting image migration to Digital Ocean Spaces...\n');

  try {
    // Test database connection first
    console.log('📡 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Connected to MongoDB\n');

    // Find all images that need migration (have data but no url)
    console.log('🔍 Searching for images to migrate...');
    const images = await prisma.uploadedImage.findMany({
      where: {
        data: { not: null },
        url: null,
      },
      select: {
        id: true,
        filename: true,
        mimeType: true,
        data: true,
        size: true,
      },
    });

    if (images.length === 0) {
      console.log('✅ No images to migrate. All images are already in Spaces!\n');
      return;
    }

    console.log(`📦 Found ${images.length} image(s) to migrate\n`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const progress = `[${i + 1}/${images.length}]`;

      try {
        if (!image.data) {
          console.log(`${progress} ⚠️  Skipped ${image.filename} - no data found`);
          continue;
        }

        console.log(`${progress} 📤 Uploading ${image.filename}...`);

        // Convert base64 to buffer
        const buffer = Buffer.from(image.data, 'base64');

        // Upload to Spaces
        const url = await uploadToSpaces(buffer, image.filename, image.mimeType);

        // Update database: add URL and remove base64 data
        await prisma.uploadedImage.update({
          where: { id: image.id },
          data: {
            url,
            data: null, // Remove base64 data to save RAM
          },
        });

        const sizeMB = (image.size / (1024 * 1024)).toFixed(2);
        console.log(`${progress} ✅ Migrated ${image.filename} (${sizeMB}MB)`);
        console.log(`${progress} 🔗 URL: ${url}\n`);

        successCount++;
      } catch (error: any) {
        console.error(`${progress} ❌ Failed to migrate ${image.filename}:`, error.message);
        failCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed:  ${failCount}`);
    console.log(`   📦 Total:   ${images.length}`);
    console.log('='.repeat(60) + '\n');

    if (successCount > 0) {
      console.log('🎉 Migration completed! Your images are now served from Digital Ocean Spaces CDN.');
      console.log('💾 RAM savings: ~' + ((successCount * 2)).toFixed(0) + 'MB (estimated)\n');
    }

    if (failCount > 0) {
      console.log('⚠️  Some images failed to migrate. Please check the errors above and retry.\n');
    }

  } catch (error: any) {
    console.error('💥 Migration failed:', error.message);
    throw error;
  }
}

// Run migration
migrateImages()
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Database connection closed.\n');
  });
