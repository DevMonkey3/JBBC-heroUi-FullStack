import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function convertToAvif(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .avif({ quality: 80 })
      .toFile(outputPath);
    console.log(`✓ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error);
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');

  // Social icons in /home
  const homeIcons = [
    { input: 'home/facebook.png', output: 'home/facebook.avif' },
    { input: 'home/in.png', output: 'home/in.avif' },
    { input: 'home/instagram.png', output: 'home/instagram.avif' },
    { input: 'home/play.png', output: 'home/play.avif' },
    { input: 'home/jbbc.png', output: 'home/jbbcIcon.avif' }, // Rename to jbbcIcon
  ];

  // Carousel logos
  const carouselLogos = [
    'Carousal/Client-Logo-3.jpg',
    'Carousal/Client-Logo-4.jpg',
    'Carousal/Client-Logo-6.jpg',
    'Carousal/Client-Logo-7.jpg',
    'Carousal/Client-Logo-8.jpg',
    'Carousal/Client-Logo-9.jpg',
    'Carousal/Client-Logo-10.jpg',
    'Carousal/Client-Logo-11.jpg',
    'Carousal/Client-Logo-12.jpg',
    'Carousal/Client-Logo-DP.jpg',
  ].map(jpg => ({
    input: jpg,
    output: jpg.replace('.jpg', '.avif')
  }));

  const allConversions = [...homeIcons, ...carouselLogos];

  console.log(`Converting ${allConversions.length} images to AVIF...\n`);

  for (const { input, output } of allConversions) {
    const inputPath = path.join(publicDir, input);
    const outputPath = path.join(publicDir, output);

    try {
      await fs.access(inputPath);
      await convertToAvif(inputPath, outputPath);
    } catch (error) {
      console.error(`✗ File not found: ${input}`);
    }
  }

  console.log('\n✓ All conversions complete!');
}

main().catch(console.error);
