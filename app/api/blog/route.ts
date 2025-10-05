// app/api/blog/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  excerpt: string | null;
  publishedAt: Date | string;
  likeCount: number;
}

export interface GetBlogPostsResponse {
  posts: BlogPost[];
}

/**
 * GET - Get all public blog posts
 * Public endpoint - no authentication required
 */
export async function GET(): Promise<NextResponse<GetBlogPostsResponse>> {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("GET blog posts error:", error);
    return NextResponse.json({ posts: [] });
  }
}
