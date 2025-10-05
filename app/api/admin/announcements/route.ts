// app/api/admin/announcements/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendAnnouncementEmail } from "@/lib/email";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  excerpt: string | null;
  slug: string;
  publishedAt: Date;
}

export interface GetAnnouncementsResponse {
  announcements: Announcement[];
}

export interface CreateAnnouncementRequest {
  title: string;
  body: string;
  excerpt?: string;
  slug: string;
}

export interface AnnouncementResponse {
  announcement: Announcement;
}

export interface ApiError {
  error: string;
}

/**
 * GET - List all announcements
 */
export async function GET(): Promise<NextResponse<GetAnnouncementsResponse | ApiError>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const announcements = await prisma.announcement.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("GET announcements error:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

/**
 * POST - Create new announcement and send to subscribers
 */
export async function POST(req: Request): Promise<NextResponse<AnnouncementResponse | ApiError>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateAnnouncementRequest = await req.json();
    const { title, body: content, excerpt, slug } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Title, body, and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.announcement.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Announcement with this slug already exists" },
        { status: 409 }
      );
    }

    // Create announcement
    const announcement = await prisma.announcement.create({
      data: {
        title,
        body: content,
        excerpt,
        slug,
      },
    });

    // Get all active subscribers
    const subscribers = await prisma.subscription.findMany({
      where: {
        unsubscribedAt: null,
      },
      select: { email: true },
    });

    // Send emails in background (don't wait for completion)
    if (subscribers.length > 0) {
      const emailList = subscribers.map(s => s.email);

      // Send emails asynchronously
      sendAnnouncementEmail(emailList, {
        title: announcement.title,
        excerpt: announcement.excerpt || undefined,
        body: announcement.body,
        slug: announcement.slug,
      }).then(result => {
        if (result.success) {
          // Log notifications
          prisma.notification.createMany({
            data: emailList.map(email => ({
              type: 'announcement',
              refId: announcement.id,
              email,
            })),
          }).catch(err => console.error('Failed to log notifications:', err));
        }
      }).catch(err => console.error('Failed to send emails:', err));
    }

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    console.error("POST announcement error:", error);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
