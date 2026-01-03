import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendSeminarNotificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      location,
      startsAt,
      endsAt,
      registrationUrl,
      slug,
      excerpt,
      heroImage,
      thumbnail,
      speakerName,
      speakerTitle,
      speakerOrg,
    } = body;

    const seminar = await prisma.seminar.create({
      data: {
        title,
        description: description || null,
        location,
        startsAt: new Date(startsAt),
        endsAt: new Date(endsAt),
        registrationUrl: registrationUrl || null,
        slug,
        excerpt: excerpt || null,
        heroImage: heroImage || null,
        thumbnail: thumbnail || null,
        speakerName: speakerName || null,
        speakerTitle: speakerTitle || null,
        speakerOrg: speakerOrg || null,
      },
    });

    // Send emails in background using cursor-based pagination to reduce RAM usage
    // Don't wait for completion - process asynchronously
    const sendEmailsInBackground = async () => {
      try {
        const batchSize = 500; // Process 500 subscribers at a time
        let cursor: string | undefined = undefined;
        let hasMore = true;

        while (hasMore) {
          const subscribers: { id: string; email: string }[] = await prisma.subscription.findMany({
            where: {
              unsubscribedAt: null,
            },
            select: { id: true, email: true },
            take: batchSize,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { id: 'asc' },
          });

          if (subscribers.length === 0) {
            hasMore = false;
            break;
          }

          const emailList = subscribers.map(s => s.email);

          // Send emails to this batch
          const result = await sendSeminarNotificationEmail(emailList, {
            title: seminar.title,
            description: seminar.description || '',
            startsAt: seminar.startsAt,
            location: seminar.location,
            slug: seminar.slug,
          });

          if (result.success) {
            // Log notifications for this batch
            await prisma.notification.createMany({
              data: emailList.map(email => ({
                type: 'seminar',
                refId: seminar.id,
                email,
              })),
            }).catch(err => console.error('Failed to log notifications:', err));
          }

          // Update cursor for next batch
          if (subscribers.length < batchSize) {
            hasMore = false;
          } else {
            cursor = subscribers[subscribers.length - 1].id;
          }

          // Clear batch from memory
          subscribers.length = 0;
          emailList.length = 0;
        }
      } catch (err) {
        console.error('Failed to send emails in background:', err);
      }
    };

    // Start background process (fire and forget)
    sendEmailsInBackground().catch(err => console.error('Background email error:', err));

    return NextResponse.json({ seminar }, { status: 201 });
  } catch (error) {
    console.error('Error creating seminar:', error);
    return NextResponse.json(
      { error: 'Failed to create seminar' },
      { status: 500 }
    );
  }
}
