/**
 * Master Optimization Script
 * Runs all image optimization steps in sequence
 *
 * Usage:
 *   npx ts-node scripts/optimize-all.ts
 */

import { execSync } from 'child_process';

console.log('🚀 Starting Full Image Optimization...\n');
console.log('This will:');
console.log('  1. Convert images to AVIF format');
console.log('  2. Update image references in code');
console.log('  3. Add lazy loading to components');
console.log('  4. Audit the results\n');

console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');

// Wait 5 seconds
setTimeout(() => {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('STEP 1: Converting images to AVIF');
    console.log('='.repeat(80) + '\n');
    execSync('npx ts-node scripts/optimize-images.ts', { stdio: 'inherit' });

    console.log('\n' + '='.repeat(80));
    console.log('STEP 2: Updating image references');
    console.log('='.repeat(80) + '\n');
    execSync('npx ts-node scripts/update-image-references.ts', { stdio: 'inherit' });

    console.log('\n' + '='.repeat(80));
    console.log('STEP 3: Adding lazy loading');
    console.log('='.repeat(80) + '\n');
    execSync('npx ts-node scripts/add-lazy-loading.ts', { stdio: 'inherit' });

    console.log('\n' + '='.repeat(80));
    console.log('STEP 4: Auditing lazy loading');
    console.log('='.repeat(80) + '\n');
    execSync('npx ts-node scripts/audit-lazy-loading.ts', { stdio: 'inherit' });

    console.log('\n' + '='.repeat(80));
    console.log('🎉 OPTIMIZATION COMPLETE!');
    console.log('='.repeat(80));
    console.log('\nNext steps:');
    console.log('  1. Review changes: git diff');
    console.log('  2. Test locally: npm run dev');
    console.log('  3. Build: npm run build');
    console.log('  4. Commit: git add . && git commit -m "Optimize images"');
    console.log('\nCheck IMAGE_OPTIMIZATION_GUIDE.md for detailed instructions.\n');

  } catch (error) {
    console.error('\n❌ Error during optimization:', error);
    process.exit(1);
  }
}, 5000);
