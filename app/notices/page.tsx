'use client'
import { useState, useEffect } from 'react';
import { Card, Row, Col, Tag, Typography, Spin, Input, Select } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  NotificationOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import type { Notice } from '../api/notices/route';

const { Title, Text } = Typography;
const { Search } = Input;

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetchNotices();
  }, []);

  useEffect(() => {
    filterNotices();
  }, [notices, searchQuery, typeFilter]);

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      setNotices(data.notices || []);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterNotices = () => {
    let filtered = notices;

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === typeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotices(filtered);
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={1} className="!mb-2">
            お知らせ・ニュース
          </Title>
          <Text type="secondary">
            JBBCの最新情報、セミナー、ニュースレターをご覧ください
          </Text>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Search
            placeholder="検索..."
            allowClear
            size="large"
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            size="large"
            style={{ width: 200 }}
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: 'すべて', value: 'all' },
              { label: 'ニュースレター', value: 'newsletter' },
              { label: 'セミナー', value: 'seminar' },
              { label: 'お知らせ', value: 'announcement' },
            ]}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <Spin size="large" />
          </div>
        )}

        {/* No Results */}
        {!loading && filteredNotices.length === 0 && (
          <div className="text-center py-20">
            <Text type="secondary">該当するお知らせが見つかりませんでした</Text>
          </div>
        )}

        {/* Notices Grid */}
        {!loading && filteredNotices.length > 0 && (
          <Row gutter={[16, 16]}>
            {filteredNotices.map((notice) => {
              const typeConfig = getTypeConfig(notice.type);
              const date = new Date(notice.publishedAt);

              return (
                <Col key={notice.id} xs={24} md={12} lg={8}>
                  <Link href={`/notices/${notice.slug}`}>
                    <Card
                      hoverable
                      className="h-full"
                      bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <Tag icon={typeConfig.icon} color={typeConfig.color}>
                          {typeConfig.label}
                        </Tag>
                        <Text type="secondary" className="text-xs flex items-center gap-1">
                          <ClockCircleOutlined />
                          {date.toLocaleDateString('ja-JP')}
                        </Text>
                      </div>

                      <Title level={4} className="!mb-2 line-clamp-2">
                        {notice.title}
                      </Title>

                      {notice.excerpt && (
                        <Text type="secondary" className="line-clamp-3">
                          {notice.excerpt}
                        </Text>
                      )}

                      <div className="mt-auto pt-4">
                        <Text className="text-blue-600 hover:underline">
                          続きを読む →
                        </Text>
                      </div>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}
