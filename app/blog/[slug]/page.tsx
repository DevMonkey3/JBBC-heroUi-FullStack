'use client'
import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Button, Spin, message } from 'antd';
import { HeartOutlined, HeartFilled, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  excerpt: string | null;
  publishedAt: Date | string;
  likeCount: number;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
      checkLikeStatus();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        throw new Error('Failed to fetch post');
      }
      const data = await res.json();
      setPost(data.post);
      setLikeCount(data.post.likeCount);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkLikeStatus = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}/like`);
      if (res.ok) {
        const data = await res.json();
        setLiked(data.liked);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleLike = async () => {
    setLiking(true);
    try {
      const res = await fetch(`/api/blog/${slug}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to like post');
      }

      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(data.likeCount);

      if (data.liked) {
        message.success('記事をいいねしました！');
      }
    } catch (error) {
      message.error('いいねに失敗しました');
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  const publishedDate = new Date(post.publishedAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-gray-50">
      {/* Hero Section with Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          {/* Back Button on Image */}
          <div className="absolute top-6 left-6 z-10">
            <Link href="/blog">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                size="large"
                className="bg-white/90 hover:bg-white text-gray-900 border-none shadow-lg backdrop-blur-sm"
              >
                ブログ一覧に戻る
              </Button>
            </Link>
          </div>

          {/* Title Overlay on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-16">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 md:gap-6 text-white/90">
                <span className="inline-flex items-center gap-2 text-base md:text-lg bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                  <CalendarOutlined />
                  {publishedDate.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-2 text-base md:text-lg bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                  <HeartFilled className="text-red-400" />
                  {likeCount} いいね
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* If no cover image, show title here */}
        {!post.coverImage && (
          <>
            <div className="mb-8">
              <Link href="/blog">
                <Button
                  type="link"
                  icon={<ArrowLeftOutlined />}
                  size="large"
                  className="text-sky-600 hover:text-sky-700 px-0"
                >
                  ブログ一覧に戻る
                </Button>
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <CalendarOutlined />
                  {publishedDate.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <HeartFilled className="text-red-500" />
                  {likeCount} いいね
                </span>
              </div>
            </div>
          </>
        )}

        {/* Main Content Card */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-10 lg:p-14">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="mb-10 p-6 bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-500 rounded-lg">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Content Body */}
            <div
              className="prose prose-lg md:prose-xl max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-sky-200
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:my-2 prose-li:text-gray-700
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-sky-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:shadow-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Like Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <div className="text-center">
            <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
              この記事は役に立ちましたか？
            </p>
            <Button
              type={liked ? 'primary' : 'default'}
              size="large"
              icon={liked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
              loading={liking}
              className={`
                ${liked
                  ? 'bg-red-500 hover:bg-red-600 border-red-500 text-white shadow-lg shadow-red-200'
                  : 'border-2 border-gray-300 hover:border-red-500 hover:text-red-500 hover:shadow-lg'
                }
                px-10 py-6 h-auto text-lg md:text-xl font-semibold rounded-full transition-all duration-300
              `}
              danger={liked}
            >
              {liked ? 'いいね済み' : 'いいね'} ({likeCount})
            </Button>
          </div>
        </div>

        {/* Back to Blog Link */}
        <div className="text-center">
          <Link href="/blog">
            <Button
              type="default"
              icon={<ArrowLeftOutlined />}
              size="large"
              className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 px-8 rounded-full font-semibold"
            >
              ブログ一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
