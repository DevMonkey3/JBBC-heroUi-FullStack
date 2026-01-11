/**
 * Test Digital Ocean Spaces Connection
 * Usage: npx tsx scripts/test-spaces-connection.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local file
config({ path: resolve(__dirname, '../.env.local') });

import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const spacesClient = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT || 'https://sgp1.digitaloceanspaces.com',
  region: process.env.SPACES_REGION || 'sgp1',
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.SPACES_SECRET_KEY || '',
  },
  forcePathStyle: false,
});

async function testConnection() {
  console.log('🧪 Testing Digital Ocean Spaces connection...\n');

  console.log('Configuration:');
  console.log(`  Endpoint: ${process.env.SPACES_ENDPOINT}`);
  console.log(`  Region: ${process.env.SPACES_REGION}`);
  console.log(`  Bucket: ${process.env.SPACES_BUCKET}`);
  console.log(`  Access Key ID: ${process.env.SPACES_ACCESS_KEY_ID?.substring(0, 10)}...`);
  console.log(`  Secret Key: ${process.env.SPACES_SECRET_KEY ? '****** (set)' : '(not set)'}\n`);

  // Test 1: List buckets (basic auth test)
  try {
    console.log('Test 1: Listing buckets...');
    const listCommand = new ListBucketsCommand({});
    const response = await spacesClient.send(listCommand);
    console.log(`✅ Success! Found ${response.Buckets?.length || 0} bucket(s)`);
    response.Buckets?.forEach(bucket => {
      console.log(`   - ${bucket.Name}`);
    });
    console.log();
  } catch (error: any) {
    console.error('❌ Failed to list buckets:', error.message);
    console.log('\n⚠️  Check your access key credentials!\n');
    return;
  }

  // Test 2: Upload a test file
  try {
    console.log('Test 2: Uploading test file...');
    const testContent = Buffer.from('Hello from JBBC! This is a test file.');
    const testKey = `test/connection-test-${Date.now()}.txt`;

    await spacesClient.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET || 'bbc-images',
        Key: testKey,
        Body: testContent,
        ContentType: 'text/plain',
      })
    );

    const testUrl = `${process.env.SPACES_CDN_ENDPOINT}/${testKey}`;
    console.log(`✅ Success! Test file uploaded`);
    console.log(`   URL: ${testUrl}`);
    console.log(`\n🎉 All tests passed! Your Spaces configuration is working.\n`);
  } catch (error: any) {
    console.error('❌ Failed to upload test file:', error.message);
    console.log('\nPossible issues:');
    console.log('  1. Bucket permissions not set correctly');
    console.log('  2. Access key doesn\'t have write permissions');
    console.log('  3. Bucket name is incorrect\n');

    if (error.Code === 'AccessDenied') {
      console.log('💡 Solution: In Digital Ocean Dashboard:');
      console.log('   1. Go to your Space → Settings');
      console.log('   2. Make sure File Listing is NOT "Private"');
      console.log('   3. Check your access key has write permissions\n');
    }
  }
}

testConnection()
  .catch(console.error)
  .finally(() => {
    console.log('Test complete.\n');
    process.exit(0);
  });
