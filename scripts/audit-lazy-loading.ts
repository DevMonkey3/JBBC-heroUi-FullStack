/**
 * Lazy Loading Audit Script
 * Finds all Image components and checks for lazy loading implementation
 *
 * Usage:
 *   npx ts-node scripts/audit-lazy-loading.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = process.cwd();
const SEARCH_DIRS = ['app', 'components'];

interface ImageUsage {
  file: string;
  line: number;
  code: string;
  hasLazyLoading: boolean;
  hasPriority: boolean;
  imageType: 'next/image' | '@heroui/image' | 'img';
}

const imageUsages: ImageUsage[] = [];

/**
 * Get all files recursively
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    if (file === 'node_modules' || file === '.next' || file === '.git') {
      return;
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Analyze file for image usage
 */
function analyzeFile(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let importType: 'next/image' | '@heroui/image' | 'both' | null = null;

  // Detect import type
  if (content.includes("from 'next/image'") || content.includes('from "next/image"')) {
    importType = 'next/image';
  }
  if (content.includes("from '@heroui/image'") || content.includes('from "@heroui/image"')) {
    importType = importType === 'next/image' ? 'both' : '@heroui/image';
  }

  // Find Image component usage
  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for <Image or <img tags
    if (trimmed.includes('<Image') || trimmed.includes('<img')) {
      let fullCode = trimmed;
      let currentIndex = index;

      // If multi-line component, collect full code
      if (!trimmed.includes('/>') && !trimmed.includes('</Image>')) {
        while (currentIndex < lines.length - 1 && !fullCode.includes('/>') && !fullCode.includes('</Image>')) {
          currentIndex++;
          fullCode += ' ' + lines[currentIndex].trim();
        }
      }

      const hasLazyLoading =
        fullCode.includes('loading="lazy"') ||
        fullCode.includes("loading='lazy'") ||
        fullCode.includes('loading={') ||
        (!fullCode.includes('priority') && importType === 'next/image'); // Next.js default is lazy

      const hasPriority =
        fullCode.includes('priority') ||
        fullCode.includes('priority={true}');

      let imageType: 'next/image' | '@heroui/image' | 'img';
      if (trimmed.includes('<img')) {
        imageType = 'img';
      } else if (importType === '@heroui/image') {
        imageType = '@heroui/image';
      } else {
        imageType = 'next/image';
      }

      imageUsages.push({
        file: path.relative(ROOT_DIR, filePath),
        line: index + 1,
        code: fullCode.substring(0, 150) + (fullCode.length > 150 ? '...' : ''),
        hasLazyLoading,
        hasPriority,
        imageType,
      });
    }
  });
}

/**
 * Print report
 */
function printReport(): void {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 LAZY LOADING AUDIT REPORT');
  console.log('='.repeat(80));

  // Group by status
  const needsLazyLoading = imageUsages.filter(
    (img) => !img.hasLazyLoading && !img.hasPriority && img.imageType !== 'next/image'
  );
  const hasLazyLoading = imageUsages.filter((img) => img.hasLazyLoading);
  const hasPriority = imageUsages.filter((img) => img.hasPriority);
  const usingNextImage = imageUsages.filter((img) => img.imageType === 'next/image');
  const usingHeroUI = imageUsages.filter((img) => img.imageType === '@heroui/image');
  const usingNativeImg = imageUsages.filter((img) => img.imageType === 'img');

  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total images found:           ${imageUsages.length}`);
  console.log(`   ✅ Next.js Image (lazy by default): ${usingNextImage.length}`);
  console.log(`   ⚡ Priority loading (hero images):   ${hasPriority.length}`);
  console.log(`   🎨 HeroUI Image:                  ${usingHeroUI.length}`);
  console.log(`   🖼️  Native <img> tags:             ${usingNativeImg.length}`);
  console.log(`   ❌ Needs lazy loading:            ${needsLazyLoading.length}`);

  // Show images that need optimization
  if (needsLazyLoading.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('❌ IMAGES NEEDING LAZY LOADING:');
    console.log('─'.repeat(80));

    needsLazyLoading.forEach((img, i) => {
      console.log(`\n${i + 1}. ${img.file}:${img.line}`);
      console.log(`   Type: ${img.imageType}`);
      console.log(`   Code: ${img.code}`);
      console.log(`   📝 Fix: Add loading="lazy" attribute`);
    });
  }

  // Show priority images (for reference)
  if (hasPriority.length > 0) {
    console.log('\n' + '─'.repeat(80));
    console.log('⚡ PRIORITY IMAGES (Above the fold - Good!):');
    console.log('─'.repeat(80));

    hasPriority.forEach((img, i) => {
      console.log(`\n${i + 1}. ${img.file}:${img.line}`);
      console.log(`   ${img.code}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('💡 RECOMMENDATIONS:');
  console.log('='.repeat(80));
  console.log(`
1. ✅ Next.js Image components have lazy loading by default
   → No action needed for ${usingNextImage.length} images using next/image

2. 📝 Add loading="lazy" to ${needsLazyLoading.length} HeroUI Image components:
   <Image src="..." loading="lazy" />

3. ⚡ Use priority for above-the-fold images only (hero, banner):
   <Image src="..." priority />

4. 🖼️  Replace ${usingNativeImg.length} native <img> tags with Next.js Image:
   import Image from 'next/image'
   <Image src="..." alt="..." width={} height={} />
`);

  console.log('='.repeat(80) + '\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting Lazy Loading Audit...\n');

  // Get all files
  let allFiles: string[] = [];
  SEARCH_DIRS.forEach((dir) => {
    const dirPath = path.join(ROOT_DIR, dir);
    allFiles = [...allFiles, ...getAllFiles(dirPath)];
  });

  console.log(`Scanning ${allFiles.length} files...\n`);

  // Analyze files
  allFiles.forEach(analyzeFile);

  // Print report
  printReport();
}

// Run the script
main();
