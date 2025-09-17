// app/blog/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブログ | JBBC",
};

type Post = {
  id: string;
  title: string;
  excerpt: string;
  tag: string;              // 表示用バッジ
  image: string;            // /public/blog/***
  href: string;             // 記事詳細（あとで差し替えOK）
};

const categories = [
  "すべて",
  "Uncategorized",
  "取り組み",
  "在留資格",
  "外国人採用",
  "実績 / ノウハウ",
];

const posts: Post[] = [
  {
    id: "1",
    tag: "ライフスタイル",
    title:
      "マレーシアの人の性格・特徴を2分に要約！面接で見ておくべきポイント",
    excerpt:
      "勤勉で時間を守る、家族や宗教を大切にする…そんなマレーシア人材の特徴を簡単にご紹介。採用の注意点もまとめました。",
    image: "/home/Japan1.jpg",
    href: "/blog/1",
  },
  {
    id: "2",
    tag: "ライフスタイル",
    title:
      "雇用する前に知っておくべき外国人の住まい事情と採用のポイント",
    excerpt:
      "家賃相場や初期費用、ルームシェアの実態など、住居関連のリアルをご紹介。受け入れ企業が準備すべきこととは？",
    image: "/home/Mt-Fuji-and-Cherry-Blossom-at-lake-Kawaguchiko.jpg",
    href: "/blog/2",
  },
  {
    id: "3",
    tag: "ライフスタイル",
    title:
      "中国人の性格や価値観？ 2割を占める“家族のX”を理解して採用を成功に！",
    excerpt:
      "考え方の違いから起こりやすい誤解と対処方法を実例で解説。現場で生きるコミュニケーションのコツも。",
    image: "/home/Japan-travel-tips-photographer-flytographer-21-2846066585.jpeg",
    href: "/blog/3",
  },
  {
    id: "4",
    tag: "ライフスタイル",
    title:
      "タイ人の性格や特徴を知る！ タイ人材採用で注意したいポイント",
    excerpt:
      "温厚で協調性がある一方で“察する文化”も。面接時・就業後の対応で気をつけたいポイントを解説します。",
    image: "/home/IMG_4102-1024x683.jpg",
    href: "/blog/4",
  },
  {
    id: "5",
    tag: "ライフスタイル",
    title:
      "フィリピン人を採用する際に知っておきたいVISA・POLOの最新事情",
    excerpt:
      "フィリピン籍人材の受け入れで押さえるべき制度・書類の最新情報。トラブルを防ぐためのチェックリストも。",
    image: "/home/20-The-Ultimate-Travel-Itinerary-Japan-body.jpg",
    href: "/blog/5",
  },
  {
    id: "6",
    tag: "ライフスタイル",
    title:
      "日本での生活： バングラデシュ人労働者の一日",
    excerpt:
      "仕事・日本語学習・コミュニティ。日本で働くバングラデシュ人の1日を追いかけ、現場のリアルを紹介します。",
    image: "/home/shutterstock_1830039815.jpg",
    href: "/blog/6",
  },
  {
    id: "7",
    tag: "ライフスタイル",
    title:
      "日本での生活： バングラデシュ人労働者の一日（続編）",
    excerpt:
      "文化の違い・宗教行事・休日の過ごし方など、実際の声から見える課題とサポートのヒントをまとめました。",
    image: "/home/japan-tourism.avif",
    href: "/blog/7",
  },
  {
    id: "8",
    tag: "ライフスタイル",
    title:
      "現場がラクになる！外国人材の“伝わる”指示の出し方",
    excerpt:
      "NG例→OK例で一発理解。図・動画・言い換え・確認方法まで、現場で今日から使えるテクニック集。",
    image: "/home/blogPosts.png",
    href: "/blog/8",
  },
  {
    id: "9",
    tag: "ライフスタイル",
    title:
      "面接官必見：外国人材の評価で見落としがちな3ポイント",
    excerpt:
      "言語・慣習の違いを踏まえた評価のコツ。履歴書より重要な“態度”と“伸び代”の見極め方とは？",
    image: "/home/20-The-Ultimate-Travel-Itinerary-Japan-body.jpg",
    href: "/blog/9",
  },
];

function CategoryPills() {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <li key={c}>
          <button
            type="button"
            className="px-3 py-1 rounded-full border bg-white hover:bg-sky-50 text-gray-700 text-xs md:text-sm"
          >
            {c}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-lg border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-44 md:h-48 object-cover"
        />
        <span className="absolute left-3 top-3 inline-block bg-sky-500 text-white text-xs px-2 py-1 rounded">
          {post.tag}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{post.excerpt}</p>
        <div className="flex justify-end">
          <a
            href={post.href}
            className="text-sky-600 hover:text-sky-700 text-xs"
          >
            続きを読む
          </a>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* ページタイトル */}
      <div className="mb-6">
        <div className="text-xs text-sky-600 font-semibold mb-2">blog</div>
        <h1 className="text-2xl md:text-3xl font-bold">ブログ</h1>
      </div>

      {/* 背景の大きい薄字を真似る（装飾） */}
      <div className="relative mb-6">
        <span className="select-none pointer-events-none text-[64px] md:text-[112px] font-extrabold text-gray-200">
          blog
        </span>
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl font-bold">
          ブログ
        </span>
      </div>

      {/* カテゴリーピル */}
      <div className="mb-5">
        <CategoryPills />
      </div>

      {/* グリッド */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </main>
  );
}
