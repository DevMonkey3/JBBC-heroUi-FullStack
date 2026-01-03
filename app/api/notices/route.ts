// app/api/notices/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface Notice {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  publishedAt: Date | string;
  type: 'newsletter' | 'seminar' | 'announcement';
}

export interface GetNoticesResponse {
  notices: Notice[];
}

/**
 * GET - Get all public notices (newsletters, seminars, announcements)
 * Public endpoint - no authentication required
 */
export async function GET(): Promise<NextResponse<GetNoticesResponse>> {
  try {
    // Reduced limit to 20 each (60 total) instead of 150 to reduce RAM usage
    // Most users won't scroll through more than 60 items anyway
    const limit = 20;

    // Fetch all types of notices
    const [newsletters, seminars, announcements] = await Promise.all([
      prisma.newsletter.findMany({
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
      }),
      prisma.seminar.findMany({
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
      }),
      prisma.announcement.findMany({
        select: {
          id: true,
          title: true,
          excerpt: true,
          slug: true,
          publishedAt: true,
        },
        orderBy: { publishedAt: 'desc' },
        take: limit,
      }),
    ]);

    // Combine and add type
    const notices: Notice[] = [
      ...newsletters.map(n => ({ ...n, type: 'newsletter' as const })),
      ...seminars.map(s => ({ ...s, type: 'seminar' as const })),
      ...announcements.map(a => ({ ...a, type: 'announcement' as const })),
    ];

    // Sort by published date descending
    notices.sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return dateB - dateA;
    });

    // Return only the top 30 most recent notices to further reduce payload size
    const topNotices = notices.slice(0, 30);

    return NextResponse.json({ notices: topNotices });
  } catch (error) {
    console.error("GET notices error:", error);
    return NextResponse.json({ notices: [] });
  }
}
