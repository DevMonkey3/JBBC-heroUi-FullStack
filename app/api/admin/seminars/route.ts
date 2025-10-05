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
      sendSeminarNotificationEmail(emailList, {
        title: seminar.title,
        description: seminar.description || '',
        startsAt: seminar.startsAt,
        location: seminar.location,
        slug: seminar.slug,
      }).then(result => {
        if (result.success) {
          // Log notifications
          prisma.notification.createMany({
            data: emailList.map(email => ({
              type: 'seminar',
              refId: seminar.id,
              email,
            })),
          }).catch(err => console.error('Failed to log notifications:', err));
        }
      }).catch(err => console.error('Failed to send emails:', err));
    }

    return NextResponse.json({ seminar }, { status: 201 });
  } catch (error) {
    console.error('Error creating seminar:', error);
    return NextResponse.json(
      { error: 'Failed to create seminar' },
      { status: 500 }
    );
  }
}
