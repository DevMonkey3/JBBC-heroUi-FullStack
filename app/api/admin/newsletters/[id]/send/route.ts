// app/api/admin/newsletters/[id]/send/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendNewsletterEmail } from "@/lib/email";
import type { NewsletterResponse, ApiError } from "@/types";

/**
 * POST - Send existing newsletter to subscribers
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<NewsletterResponse | ApiError>> {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the newsletter
    const newsletter = await prisma.newsletter.findUnique({
      where: { id },
    });

    if (!newsletter) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
    }

    // Get all active subscribers
    const subscribers = await prisma.subscription.findMany({
      where: {
        unsubscribedAt: null,
      },
      select: { email: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ error: "No subscribers found" }, { status: 404 });
    }

    const emailList = subscribers.map((s:any) => s.email);
    console.log(emailList,"emailList");
    
    // Send emails
    const result = await sendNewsletterEmail(emailList, {
      title: newsletter.title,
      excerpt: newsletter.excerpt || undefined,
      body: newsletter.body,
      slug: newsletter.slug,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || "Failed to send emails" }, { status: 500 });
    }

    // Log notifications
    try {
      await prisma.notification.createMany({
        data: emailList.map((email:any) => ({
          type: 'newsletter',
          refId: newsletter.id,
          email,
        })),
      });
    } catch (logError) {
      console.error('Failed to log notifications:', logError);
    }

    return NextResponse.json({ newsletter });
  } catch (error) {
    console.error("POST send newsletter error:", error);
    return NextResponse.json({ error: "Failed to send newsletter" }, { status: 500 });
  }
}