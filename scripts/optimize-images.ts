/**
 * Image Optimization Script
 * Converts JPG, JPEG, PNG images to AVIF format for better performance
 *
 * Usage:
 *   npm install sharp --save-dev
 *   npx ts-node scripts/optimize-images.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BACKUP_DIR = path.join(process.cwd(), 'public-backup');

// Configuration
const CONFIG = {
  // Quality settings (0-100, higher = better quality but larger file)
  avifQuality: 80, // Good balance between quality and size

  // Only convert images larger than this size (in bytes)
  minFileSize: 50 * 1024, // 50KB

  // Create backup of original images
  createBackup: true,

  // Allowed extensions to convert
  allowedExtensions: ['.jpg', '.jpeg', '.png'],

  // Directories to skip
  skipDirs: ['node_modules', '.next', '.git'],
};

interface ConversionStats {
  totalFiles: number;
  converted: number;
  skipped: number;
  errors: number;
  originalSize: number;
  newSize: number;
}

const stats: ConversionStats = {
  totalFiles: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  newSize: 0,
};

/**
 * Get all image files recursively from directory
 */
function getAllImageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!CONFIG.skipDirs.includes(file)) {
        getAllImageFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.allowedExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Convert image to AVIF format
 */
async function convertToAvif(inputPath: string): Promise<void> {
  const ext = path.extname(inputPath);
  const outputPath = inputPath.replace(ext, '.avif');

  // Skip if AVIF already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipped (AVIF exists): ${path.relative(PUBLIC_DIR, inputPath)}`);
    stats.skipped++;
    return;
  }

  try {
    // Get original file size
    const originalSize = fs.statSync(inputPath).size;

    // Skip small files
    if (originalSize < CONFIG.minFileSize) {
      console.log(`⏭️  Skipped (too small): ${path.relative(PUBLIC_DIR, inputPath)}`);
      stats.skipped++;
      return;
    }

    stats.originalSize += originalSize;

    // Convert to AVIF
    await sharp(inputPath)
      .avif({
        quality: CONFIG.avifQuality,
        effort: 4, // 0-9, higher = smaller file but slower
      })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    stats.newSize += newSize;

    const savedBytes = originalSize - newSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    console.log(
      `✅ Converted: ${path.relative(PUBLIC_DIR, inputPath)}\n` +
      `   Original: ${formatBytes(originalSize)} → AVIF: ${formatBytes(newSize)}\n` +
      `   Saved: ${formatBytes(savedBytes)} (${savedPercent}%)`
    );

    stats.converted++;

    // Delete original file after successful conversion
    // fs.unlinkSync(inputPath);
    // console.log(`🗑️  Deleted original: ${path.relative(PUBLIC_DIR, inputPath)}`);

  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error);
    stats.errors++;
  }
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Create backup of public directory
 */
function createBackup(): void {
  if (!CONFIG.createBackup) return;

  console.log('\n📦 Creating backup...');

  if (fs.existsSync(BACKUP_DIR)) {
    console.log('⚠️  Backup already exists, skipping...');
    return;
  }

  fs.cpSync(PUBLIC_DIR, BACKUP_DIR, { recursive: true });
  console.log(`✅ Backup created at: ${BACKUP_DIR}\n`);
}

/**
 * Print final statistics
 */
function printStats(): void {
  const totalSaved = stats.originalSize - stats.newSize;
  const savedPercent = stats.originalSize > 0
    ? ((totalSaved / stats.originalSize) * 100).toFixed(1)
    : '0';

  console.log('\n' + '='.repeat(60));
  console.log('📊 CONVERSION STATISTICS');
  console.log('='.repeat(60));
  console.log(`Total images found:    ${stats.totalFiles}`);
  console.log(`✅ Converted:          ${stats.converted}`);
  console.log(`⏭️  Skipped:            ${stats.skipped}`);
  console.log(`❌ Errors:             ${stats.errors}`);
  console.log('─'.repeat(60));
  console.log(`Original total size:   ${formatBytes(stats.originalSize)}`);
  console.log(`New total size:        ${formatBytes(stats.newSize)}`);
  console.log(`Total saved:           ${formatBytes(totalSaved)} (${savedPercent}%)`);
  console.log('='.repeat(60));

  if (stats.converted > 0) {
    console.log('\n✨ Next steps:');
    console.log('1. Run: npx ts-node scripts/update-image-references.ts');
    console.log('2. Update components to use lazy loading');
    console.log('3. Test the website thoroughly');
    console.log('4. If everything works, you can delete original images');
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting Image Optimization...\n');

  // Create backup
  createBackup();

  // Get all images
  console.log('📁 Scanning for images...');
  const imageFiles = getAllImageFiles(PUBLIC_DIR);
  stats.totalFiles = imageFiles.length;

  console.log(`Found ${stats.totalFiles} images to process\n`);

  if (stats.totalFiles === 0) {
    console.log('No images found to convert.');
    return;
  }

  // Convert images
  console.log('🔄 Converting images...\n');
  for (const imagePath of imageFiles) {
    await convertToAvif(imagePath);
  }

  // Print statistics
  printStats();

  console.log('\n✅ Image optimization complete!\n');
}

// Run the script
main().catch(console.error);
