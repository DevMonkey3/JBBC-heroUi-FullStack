'use client';
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Spin } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Text } = Typography;

interface Seminar {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  speakerName?: string;
  speakerTitle?: string;
}

export default function SeminarListPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const res = await fetch('/api/seminars');
      if (!res.ok) throw new Error('Failed to fetch seminars');
      const data = await res.json();
      setSeminars(data.seminars || []);
    } catch (error) {
      console.error('Error fetching seminars:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Title level={1} className="!text-3xl md:!text-4xl !font-bold !mb-4">
          セミナー・イベント
        </Title>
        <Text className="text-lg text-gray-600">
          JBBC主催の最新セミナー・イベント情報をご覧いただけます
        </Text>
      </div>

      {seminars.length === 0 ? (
        <div className="text-center py-20">
          <Title level={3} className="text-gray-400">
            現在開催予定のセミナーはありません
          </Title>
          <Text className="text-gray-500">
            新しいセミナーの情報をお待ちください
          </Text>
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {seminars.map((seminar) => (
            <Col xs={24} md={12} lg={8} key={seminar.id}>
              <Card
                hoverable
                className="h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
                cover={
                  seminar.thumbnail ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        alt={seminar.title}
                        src={seminar.thumbnail}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-[#1AA4DD] to-[#0c7ba8] flex items-center justify-center">
                      <CalendarOutlined className="text-6xl text-white opacity-30" />
                    </div>
                  )
                }
              >
                <div className="flex flex-col h-full">
                  {/* Date Badge */}
                  <div className="mb-3">
                    <div className="inline-block bg-[#FF6F00] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <CalendarOutlined className="mr-1" />
                      {formatDate(seminar.startsAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <Title level={4} className="!text-lg !mb-3 line-clamp-2">
                    {seminar.title}
                  </Title>

                  {/* Excerpt */}
                  {seminar.excerpt && (
                    <Text className="text-gray-600 mb-3 line-clamp-3 flex-grow">
                      {seminar.excerpt}
                    </Text>
                  )}

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarOutlined className="mr-2" />
                      <Text className="text-sm">
                        {formatTime(seminar.startsAt)} - {formatTime(seminar.endsAt)}
                      </Text>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <EnvironmentOutlined className="mr-2" />
                      <Text className="text-sm">{seminar.location}</Text>
                    </div>
                  </div>

                  {/* Speaker Info */}
                  {seminar.speakerName && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <Text strong className="block text-sm">登壇者</Text>
                      <Text className="text-sm">{seminar.speakerName}</Text>
                      {seminar.speakerTitle && (
                        <Text className="block text-xs text-gray-500">{seminar.speakerTitle}</Text>
                      )}
                    </div>
                  )}

                  {/* Button */}
                  <Link href={`/seminar/${seminar.slug}`}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      className="!bg-[#FF6F00] hover:!bg-[#e56300] !border-none !font-semibold mt-auto"
                      icon={<RightOutlined />}
                      iconPosition="end"
                    >
                      詳細を見る・申し込む
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
