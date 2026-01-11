/**
 * Add Lazy Loading Script
 * Automatically adds loading="lazy" to @heroui/image components
 *
 * Usage:
 *   npx ts-node scripts/add-lazy-loading.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = process.cwd();
const SEARCH_DIRS = ['app', 'components'];

interface UpdateStats {
  filesProcessed: number;
  filesUpdated: number;
  imagesUpdated: number;
}

const stats: UpdateStats = {
  filesProcessed: 0,
  filesUpdated: 0,
  imagesUpdated: 0,
};

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
 * Add lazy loading to HeroUI Image components
 */
function addLazyLoading(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = false;

  // Check if file uses @heroui/image
  if (!content.includes('@heroui/image')) {
    stats.filesProcessed++;
    return;
  }

  // Pattern to find Image components without loading prop
  // Matches: <Image ... /> (without loading="lazy" or priority)
  const imagePattern = /<Image\s+([^>]*?)(?<!loading=["'][^"']*["'])(?<!priority)\/>/g;

  let match;
  const matches = [];
  while ((match = imagePattern.exec(content)) !== null) {
    matches.push(match);
  }

  // Process matches in reverse to maintain correct positions
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const fullMatch = match[0];
    const attributes = match[1];

    // Skip if already has loading prop or priority
    if (attributes.includes('loading=') || attributes.includes('priority')) {
      continue;
    }

    // Add loading="lazy" before the closing />
    const updatedMatch = `<Image ${attributes.trim()} loading="lazy" />`;
    content = content.substring(0, match.index) + updatedMatch + content.substring(match.index + fullMatch.length);

    updated = true;
    stats.imagesUpdated++;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated: ${path.relative(ROOT_DIR, filePath)} (${matches.length} images)`);
    stats.filesUpdated++;
  }

  stats.filesProcessed++;
}

/**
 * Print statistics
 */
function printStats(): void {
  console.log('\n' + '='.repeat(80));
  console.log('📊 LAZY LOADING UPDATE STATISTICS');
  console.log('='.repeat(80));
  console.log(`Files processed:       ${stats.filesProcessed}`);
  console.log(`Files updated:         ${stats.filesUpdated}`);
  console.log(`Images updated:        ${stats.imagesUpdated}`);
  console.log('='.repeat(80));

  if (stats.filesUpdated > 0) {
    console.log('\n✨ Next steps:');
    console.log('1. Review changes: git diff');
    console.log('2. Test your website: npm run dev');
    console.log('3. Run build: npm run build');
    console.log('4. Commit if everything works');
  } else {
    console.log('\n✅ All HeroUI Image components already have lazy loading!');
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Adding Lazy Loading to HeroUI Image Components...\n');

  // Get all files
  let allFiles: string[] = [];
  SEARCH_DIRS.forEach((dir) => {
    const dirPath = path.join(ROOT_DIR, dir);
    allFiles = [...allFiles, ...getAllFiles(dirPath)];
  });

  console.log(`Scanning ${allFiles.length} files...\n`);

  // Update files
  allFiles.forEach(addLazyLoading);

  // Print statistics
  printStats();
}

// Run the script
main();
