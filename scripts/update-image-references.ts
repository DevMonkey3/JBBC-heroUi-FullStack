/**
 * Update Image References Script
 * Updates all .jpg, .jpeg, .png references to .avif in the codebase
 *
 * Usage:
 *   npx ts-node scripts/update-image-references.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = process.cwd();

// Directories to search for files
const SEARCH_DIRS = ['app', 'components', 'lib', 'styles'];

// File extensions to process
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css'];

// Image extensions to replace
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

interface UpdateStats {
  filesProcessed: number;
  filesUpdated: number;
  totalReplacements: number;
}

const stats: UpdateStats = {
  filesProcessed: 0,
  filesUpdated: 0,
  totalReplacements: 0,
};

/**
 * Get all files recursively from directory
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);

    // Skip node_modules, .next, .git
    if (file === 'node_modules' || file === '.next' || file === '.git') {
      return;
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      const ext = path.extname(file);
      if (FILE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Update image references in a file
 */
function updateFileReferences(filePath: string): void {
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = false;
  let replacements = 0;

  // Create regex patterns for each image extension
  IMAGE_EXTENSIONS.forEach((ext) => {
    // Match patterns like: "/path/to/image.jpg", './image.png', etc.
    const patterns = [
      // Quoted strings: "image.jpg", 'image.png'
      new RegExp(`(["'\`])([^"'\`]*?)\\${ext}\\1`, 'g'),
      // URLs without quotes in src attributes: src={/path/image.jpg}
      new RegExp(`(src=\\{)([^}]*?)\\${ext}(\\})`, 'g'),
    ];

    patterns.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, (match, p1, p2, p3) => {
          replacements++;
          updated = true;

          // For quoted strings
          if (p1 === '"' || p1 === "'" || p1 === '`') {
            return `${p1}${p2}.avif${p1}`;
          }
          // For src={...}
          else {
            return `${p1}${p2}.avif${p3}`;
          }
        });
      }
    });
  });

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated: ${path.relative(ROOT_DIR, filePath)} (${replacements} replacements)`);
    stats.filesUpdated++;
    stats.totalReplacements += replacements;
  }

  stats.filesProcessed++;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting Image Reference Update...\n');

  // Get all files
  let allFiles: string[] = [];
  SEARCH_DIRS.forEach((dir) => {
    const dirPath = path.join(ROOT_DIR, dir);
    allFiles = [...allFiles, ...getAllFiles(dirPath)];
  });

  console.log(`Found ${allFiles.length} files to process\n`);

  // Update files
  console.log('🔄 Updating image references...\n');
  allFiles.forEach(updateFileReferences);

  // Print statistics
  console.log('\n' + '='.repeat(60));
  console.log('📊 UPDATE STATISTICS');
  console.log('='.repeat(60));
  console.log(`Files processed:       ${stats.filesProcessed}`);
  console.log(`Files updated:         ${stats.filesUpdated}`);
  console.log(`Total replacements:    ${stats.totalReplacements}`);
  console.log('='.repeat(60));

  if (stats.filesUpdated > 0) {
    console.log('\n✨ Next steps:');
    console.log('1. Review the changes: git diff');
    console.log('2. Test your website thoroughly');
    console.log('3. Commit the changes if everything works');
    console.log('4. Optionally delete original .jpg/.png files from public/');
  }

  console.log('\n✅ Image reference update complete!\n');
}

// Run the script
main();
