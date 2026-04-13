import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "ファクタリングコラム一覧｜ファクタリング比較ナビ",
  description:
    "ファクタリングに関する基礎知識、手数料、審査、おすすめ会社など、資金調達に役立つ記事を掲載。個人事業主・フリーランス・法人向けの情報を幅広くお届けします。",
  alternates: {
    canonical: "/articles",
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
            ファクタリングの基礎知識から実践的な活用法まで、資金調達に役立つ情報をお届けします。
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
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
            あなたに最適なファクタリング会社を見つけよう
          </h2>
          <p className="text-blue-100 mb-6 text-sm">
            30秒の簡単診断で、最適な業者がわかります
          </p>
          <Link
            href="/#diagnosis"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-50 transition"
          >
            無料診断スタート →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
