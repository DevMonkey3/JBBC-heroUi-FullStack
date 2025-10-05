import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import SeminarList from './seminar-list';

interface Seminar {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  speakerName?: string;
  speakerTitle?: string;
}

const getSeminars = cache(async (): Promise<Seminar[]> => {
  try {
    const seminars = await prisma.seminar.findMany({
      where: {
        startsAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        startsAt: 'asc',
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        startsAt: true,
        endsAt: true,
        slug: true,
        excerpt: true,
        thumbnail: true,
        speakerName: true,
        speakerTitle: true,
      },
    });

    return seminars.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      location: s.location,
      slug: s.slug,
      startsAt: s.startsAt.toISOString(),
      endsAt: s.endsAt.toISOString(),
      excerpt: s.excerpt || undefined,
      thumbnail: s.thumbnail || undefined,
      speakerName: s.speakerName || undefined,
      speakerTitle: s.speakerTitle || undefined,
    }));
  } catch (error) {
    console.error('Error fetching seminars:', error);
    return [];
  }
});

export const revalidate = 300; // Revalidate every 5 minutes

export default async function SeminarPage() {
  const seminars = await getSeminars();
  return <SeminarList seminars={seminars} />;
}
