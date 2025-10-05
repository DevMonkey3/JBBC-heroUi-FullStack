'use client';
import { useState, useEffect } from 'react';
import { Typography, Button, Card, Row, Col } from 'antd';
import { RightOutlined, CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

interface Announcement {
  id: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  slug: string;
}

export default function NewsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements?limit=3');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 md:p-10 shadow-sm">
        {/* Section Header */}
        <div className="text-center mb-8">
          <Title level={2} className="!text-2xl md:!text-3xl !font-bold !mb-2 !text-[#1AA4DD]">
            最新のお知らせ
          </Title>
          <Text className="text-base text-gray-600">
            JBBCからの最新情報をお届けします
          </Text>
        </div>

        {/* News Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          {announcements.map((announcement) => (
            <Col xs={24} md={8} key={announcement.id}>
              <Link href={`/notices/${announcement.slug}`}>
                <Card
                  hoverable
                  className="h-full shadow-sm hover:shadow-md transition-shadow duration-300"
                  styles={{ body: { padding: '16px' } }}
                >
                  <div className="flex flex-col h-full">
                    {/* Date */}
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <CalendarOutlined className="mr-2" />
                      <Text className="text-sm">{formatDate(announcement.publishedAt)}</Text>
                    </div>

                    {/* Title */}
                    <Title level={5} className="!text-base !mb-2 !font-semibold line-clamp-2 flex-grow">
                      {announcement.title}
                    </Title>

                    {/* Excerpt */}
                    {announcement.excerpt && (
                      <Text className="text-sm text-gray-600 line-clamp-3">
                        {announcement.excerpt}
                      </Text>
                    )}
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/notices">
            <Button
              type="primary"
              size="large"
              shape="round"
              className="!bg-[#1AA4DD] hover:!bg-[#0d8bb8] !border-none !font-semibold px-8"
              icon={<RightOutlined />}
              iconPosition="end"
            >
              すべてのお知らせを見る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
