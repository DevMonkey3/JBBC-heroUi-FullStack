// app/api/admin/blog/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendNewsletterEmail } from "@/lib/email";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  excerpt: string | null;
  publishedAt: Date;
  likeCount: number;
}

export interface GetBlogPostsResponse {
  posts: BlogPost[];
}

export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  excerpt?: string;
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface ApiError {
  error: string;
}

/**
 * GET - List all blog posts (admin view)
 */
export async function GET(): Promise<NextResponse<GetBlogPostsResponse | ApiError>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET blog posts error:", error);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

/**
 * POST - Create new blog post
 */
export async function POST(req: Request): Promise<NextResponse<BlogPostResponse | ApiError>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateBlogPostRequest = await req.json();
    const { title, slug, content, coverImage, excerpt } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Blog post with this slug already exists" },
        { status: 409 }
      );
    }

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        coverImage: coverImage || null,
        excerpt: excerpt || null,
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
      sendNewsletterEmail(emailList, {
        title: post.title,
        excerpt: post.excerpt || undefined,
        body: post.content,
        slug: post.slug,
      }).then(result => {
        if (result.success) {
          // Log notifications
          prisma.notification.createMany({
            data: emailList.map(email => ({
              type: 'blog',
              refId: post.id,
              email,
            })),
          }).catch(err => console.error('Failed to log notifications:', err));
        }
      }).catch(err => console.error('Failed to send emails:', err));
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("POST blog post error:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
