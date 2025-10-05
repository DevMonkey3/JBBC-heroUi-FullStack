'use client'
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { Image } from '@heroui/image';
import Breadcrumbs from "@/components/breadcrumb/page";
import BgFont from "@/components/bgFont/BgFont";
import Link from "next/link";
import { Spin } from "antd";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | string;
  likeCount: number;
}

const categories = [
  "すべて",
  "ライフスタイル",
  "取り組み",
  "在留資格",
  "外国人採用",
  "実績 / ノウハウ",
];

function CategoryPills() {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <li key={c}>
          <Button
            variant="bordered"
            className="px-3 py-1 rounded-full border-[#01ccea] bg-white hover:text-white hover:bg-[#01ccea] text-gray-700 text-xs md:text-sm"
          >
            {c}
          </Button>
        </li>
      ))}
    </ul>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative">
          <Image
            src={post.coverImage || '/home/blogPosts.png'}
            alt={post.title}
            className="w-full h-44 md:h-48 object-cover"
          />
          <span className="absolute left-3 top-3 inline-block bg-sky-500 text-white text-xs px-2 py-1 rounded">
            ライフスタイル
          </span>
          <span className="absolute right-3 bottom-3 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
            ❤️ {post.likeCount}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {post.excerpt || 'No excerpt available'}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
            </span>
            <span className="text-sky-600 hover:text-sky-700 text-xs">
              続きを読む →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [breadcrumbData] = useState([
    {
      key: "top",
      title: <span style={{ color: "#019cd4" }}>top</span>,
    },
    {
      key: "blog",
      title: "ブログ",
    },
  ]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-5">
      <Breadcrumbs
        breadcrumb={breadcrumbData}
        pageTitle={'blog'}
        breadcrumbTitle={breadcrumbData[breadcrumbData.length - 1].title}
      />
      <BgFont textBg={'blog'} title={'ブログ'} />

      {/* Category Pills */}
      <div className="mb-5 mt-5">
        <CategoryPills />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <Spin size="large" />
        </div>
      )}

      {/* No Posts */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500">まだブログ投稿がありません</p>
        </div>
      )}

      {/* Grid */}
      {!loading && posts.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </main>
  );
}
