// Content10.tsx
"use client";

import { Typography, Row, Col, Button, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCdnUrl } from "@/config/cdn";

const Content10: React.FC = () => {
  const { Text, Title } = Typography;
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      // Get only the latest 3 posts
      setBlogPosts(data.posts?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      // Fallback to demo posts if API fails
      setBlogPosts([
        {
          id: '1',
          title: '日本での生活：バングラデシュ人労働者の一日',
          excerpt: '早朝の通勤から、清潔で効率的な職場、そして日本食を楽しみながら穏やかな夜を過ごすまで、このブログは、規律正しく、...',
          slug: 'demo-post-1',
          coverImage: getCdnUrl('/home/blogPosts.avif'),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-[#f0f8ff] px-4 py-8 md:py-10 mb-8">
        <div className="text-center py-10">
          <Text>読み込み中...</Text>
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="w-full bg-[#f0f8ff] px-4 py-8 md:py-10 mb-8">
        <div className="text-center py-10">
          <Text>ブログ投稿はまだありません</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f0f8ff] px-4 py-8 md:py-10 mb-8">
      {/* Blog Posts Section */}
      <div className="flex items-center justify-center space-x-4 md:space-x-6 overflow-x-auto pb-4">
        {/* Left Arrow Button */}
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          className="flex-shrink-0 bg-[#24D1F0] border-[#24D1F0] text-[#EDF8FC] hover:bg-[#1fc0df] hover:border-[#1fc0df] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md"
        />

        {/* Blog Cards */}
        <div className="flex space-x-4 md:space-x-6">
          {blogPosts.map((post, index) => (
            <Link key={post.id || index} href={`/blog/${post.slug}`}>
              <Card
                hoverable
                cover={
                  <div className="relative">
                    <img
                      alt={post.title}
                      src={post.coverImage || getCdnUrl('/home/blogPosts.avif')}
                      className="w-64 md:w-80 h-48 md:h-56 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-4 bg-[#24D1F0] text-white py-1 px-3 rounded-full text-xs md:text-sm font-medium">
                      ライフスタイル
                    </div>
                  </div>
                }
                className="flex-shrink-0 w-64 md:w-80 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white"
              >
                <div className="p-4">
                  <Title level={4} className="!text-base md:!text-lg !m-0 mb-2 line-clamp-2">
                    {post.title}
                  </Title>
                  <Text className="text-sm md:text-base text-gray-600 line-clamp-3">
                    {post.excerpt || 'No excerpt available'}
                  </Text>
                  <div className="mt-3 text-right">
                    <Button type="link" className="!p-0 !text-[#1AA4DD] hover:!text-[#178bc2]">
                      続きを読む
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Right Arrow Button */}
        <Button
          shape="circle"
          icon={<RightOutlined />}
          className="flex-shrink-0 bg-[#24D1F0] border-[#24D1F0] text-[#EDF8FC] hover:bg-[#1fc0df] hover:border-[#1fc0df] hover:text-white font-bold text-base w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md"
        />
      </div>

      {/* View More Button */}
      <Row justify="center" className="mt-6">
        <Col>
          <Link href="/blog">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="bg-[#EE6629] hover:bg-[#d95a20] border-none !px-6 !py-2 md:!px-8 md:!py-3 !text-base md:!text-lg"
            >
              記事一覧を見る →
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Content10;
