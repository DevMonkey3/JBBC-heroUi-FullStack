import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const seminars = await prisma.seminar.findMany({
      where: {
        startsAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Include seminars from the last week
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
        speakerOrg: true,
      },
    });

    return NextResponse.json({ seminars });
  } catch (error) {
    console.error("Error fetching seminars:", error);
    return NextResponse.json(
      { error: "Failed to fetch seminars" },
      { status: 500 }
    );
  }
}
