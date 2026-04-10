import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "記事が見つかりません",
      description: "お探しの記事は見つかりませんでした。",
    };
  }

  return {
    title: `${article.title}｜ファクタリング比較ナビ`,
    description: `${article.title}。${article.keyword}について詳しく解説します。`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-2xl font-bold text-gray-900">記事が見つかりません</h1>
          <p className="mt-4 text-gray-600">お探しの記事は存在しないか、削除された可能性があります。</p>
          <Link href="/articles" className="mt-6 inline-block text-blue-600 hover:underline">
            → 記事一覧に戻る
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition">
              ホーム
            </Link>
            {" > "}
            <Link href="/articles" className="hover:text-gray-700 transition">
              コラム
            </Link>
            {" > "}
            <span className="text-gray-600">{article.title.slice(0, 30)}...</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>

          {article.keyword && (
            <div className="mb-8 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                {article.keyword}
              </span>
            </div>
          )}

          <div
            className="prose prose-gray max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-ul:my-4 prose-li:text-gray-700
              prose-table:border-collapse prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-gray-200
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
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

        {/* Back to articles */}
        <div className="mt-8 text-center">
          <Link
            href="/articles"
            className="text-gray-500 hover:text-gray-700 text-sm transition"
          >
            ← コラム一覧に戻る
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
