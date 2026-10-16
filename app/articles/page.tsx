import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { topics } from "@/data/topics";
import { DEFAULT_OG_IMAGES, DEFAULT_OG_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: "ファクタリングコラム一覧｜ファクタリング比較ナビ",
  description:
    "ファクタリングの基礎知識、手数料、審査、おすすめの会社など、資金調達に関する記事を掲載しています。法人・個人事業主・フリーランス向けの情報を扱っています。",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "ファクタリングコラム一覧｜ファクタリング比較ナビ",
    description: "ファクタリングの基礎知識、手数料、審査、おすすめの会社など、資金調達に関する記事を掲載しています。",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary",
    images: [DEFAULT_OG_IMAGE_URL],
    title: "ファクタリングコラム一覧｜ファクタリング比較ナビ",
    description: "ファクタリングの基礎知識、手数料、審査、おすすめの会社など、資金調達に関する記事を掲載しています。",
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition">
              ホーム
            </Link>
            {" > "}
            <span className="text-gray-600">コラム</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            ファクタリングコラム
          </h1>
          <p className="text-gray-600 leading-relaxed">
            ファクタリングの基礎知識から実務での活用方法まで、資金調達に関する情報を掲載しています。
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Topic hubs */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-4">カテゴリから探す</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition group"
              >
                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition mb-2">
                  {topic.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  全{topic.groups.reduce((n, g) => n + g.slugs.length, 0)}記事
                </p>
                <span className="text-blue-600 text-sm font-medium">一覧を見る →</span>
              </Link>
            ))}
          </div>
        </section>

        <h2 className="text-lg font-bold text-gray-900 mb-4">すべての記事</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition group"
            >
              {article.keyword && (
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {article.keyword}
                </span>
              )}
              <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition leading-snug mb-3">
                {article.title}
              </h2>
              <span className="text-blue-600 text-sm font-medium">
                記事を読む →
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-3">
            条件に合うファクタリング会社を診断できます
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            いくつかの質問に回答すると、条件に合うファクタリング会社を表示します
          </p>
          <Link
            href="/#diagnosis"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-50 transition"
          >
            無料診断を始める →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
