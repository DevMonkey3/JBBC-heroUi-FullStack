import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupNullSlugs() {
  try {
    console.log('Starting cleanup of null slugs...');

    // Use MongoDB's native methods through Prisma's $runCommandRaw
    // Delete all seminars with null slugs
    const deletedSeminars = await prisma.$runCommandRaw({
      delete: 'Seminar',
      deletes: [{
        q: { slug: null },
        limit: 0
      }]
    });
    console.log(`Deleted seminars with null slugs:`, deletedSeminars);

    // Delete all announcements with null slugs
    const deletedAnnouncements = await prisma.$runCommandRaw({
      delete: 'Announcement',
      deletes: [{
        q: { slug: null },
        limit: 0
      }]
    });
    console.log(`Deleted announcements with null slugs:`, deletedAnnouncements);

    // Also delete all blog posts with null slugs
    const deletedBlogs = await prisma.$runCommandRaw({
      delete: 'BlogPost',
      deletes: [{
        q: { slug: null },
        limit: 0
      }]
    });
    console.log(`Deleted blog posts with null slugs:`, deletedBlogs);

    console.log('Cleanup completed successfully!');
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupNullSlugs();
