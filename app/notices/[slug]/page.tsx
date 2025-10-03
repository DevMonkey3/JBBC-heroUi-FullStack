import { notFound } from 'next/navigation';
import { Card, Tag, Typography, Divider } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

const { Title, Paragraph, Text } = Typography;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const [newsletter, seminar, announcement] = await Promise.all([
    prisma.newsletter.findUnique({ where: { slug } }),
    prisma.seminar.findUnique({ where: { slug } }),
    prisma.announcement.findUnique({ where: { slug } }),
  ]);

  const content = newsletter || seminar || announcement;

  if (!content) {
    return {
      title: 'お知らせが見つかりません',
    };
  }

  const type = newsletter ? 'ニュースレター' : seminar ? 'セミナー' : 'お知らせ';
  const description = content.excerpt || content.title;

  return {
    title: `${content.title} - ${type}`,
    description,
    openGraph: {
      title: content.title,
      description,
      type: 'article',
      publishedTime: content.publishedAt?.toISOString(),
      url: `${siteConfig.siteUrl}/notices/${slug}`,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.siteUrl}/notices/${slug}`,
    },
  };
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Try to find in all content types
  const [newsletter, seminar, announcement] = await Promise.all([
    prisma.newsletter.findUnique({ where: { slug } }),
    prisma.seminar.findUnique({ where: { slug } }),
    prisma.announcement.findUnique({ where: { slug } }),
  ]);

  const content = newsletter || seminar || announcement;

  if (!content) {
    notFound();
  }

  const type = newsletter ? 'newsletter' : seminar ? 'seminar' : 'announcement';

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'newsletter':
        return {
          color: '#1890ff',
          label: 'ニュースレター',
          icon: <MailOutlined />,
        };
      case 'seminar':
        return {
          color: '#52c41a',
          label: 'セミナー',
          icon: <CalendarOutlined />,
        };
      case 'announcement':
        return {
          color: '#fa8c16',
          label: 'お知らせ',
          icon: <NotificationOutlined />,
        };
      default:
        return {
          color: '#8c8c8c',
          label: '不明',
          icon: <NotificationOutlined />,
        };
    }
  };

  const typeConfig = getTypeConfig(type);
  const date = new Date(content.publishedAt);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/notices" className="text-blue-600 hover:underline mb-4 inline-block">
          ← お知らせ一覧に戻る
        </Link>

        <Card>
          {/* Header */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-3">
              <Tag icon={typeConfig.icon} color={typeConfig.color} className="text-sm py-1 px-3">
                {typeConfig.label}
              </Tag>
              <Text type="secondary" className="flex items-center gap-1">
                <ClockCircleOutlined />
                {date.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </div>

            <Title level={1} className="!mb-4">
              {content.title}
            </Title>

            {content.excerpt && (
              <Paragraph className="text-lg text-gray-600 mb-0">
                {content.excerpt}
              </Paragraph>
            )}
          </div>

          <Divider />

          {/* Seminar-specific info */}
          {type === 'seminar' && seminar && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg">
              <Title level={4} className="!mb-3">
                セミナー情報
              </Title>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CalendarOutlined className="mt-1 text-green-600" />
                  <div>
                    <Text strong>開催日時:</Text>
                    <br />
                    <Text>
                      {new Date(seminar.startsAt).toLocaleString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' 〜 '}
                      {new Date(seminar.endsAt).toLocaleString('ja-JP', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <EnvironmentOutlined className="mt-1 text-green-600" />
                  <div>
                    <Text strong>場所:</Text>
                    <br />
                    <Text>{seminar.location}</Text>
                  </div>
                </div>

                {seminar.speakerName && (
                  <div className="flex items-start gap-2">
                    <span className="mt-1 text-green-600">👤</span>
                    <div>
                      <Text strong>講師:</Text>
                      <br />
                      <Text>
                        {seminar.speakerName}
                        {seminar.speakerTitle && ` (${seminar.speakerTitle})`}
                        {seminar.speakerOrg && ` - ${seminar.speakerOrg}`}
                      </Text>
                    </div>
                  </div>
                )}

                {seminar.registrationUrl && (
                  <div className="mt-4">
                    <a
                      href={seminar.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                      セミナーに申し込む →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Body */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                type === 'seminar'
                  ? (seminar?.description || '')
                  : type === 'announcement'
                  ? (announcement?.body || '')
                  : (newsletter?.body || ''),
            }}
          />
        </Card>

        {/* Related Links */}
        <div className="mt-8 text-center">
          <Link href="/notices" className="text-blue-600 hover:underline">
            ← すべてのお知らせを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
