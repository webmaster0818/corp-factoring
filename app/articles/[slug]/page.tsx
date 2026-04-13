import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticleSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
import { factoringCompanies } from "@/data/companies";

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
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: `${article.title}｜ファクタリング比較ナビ`,
      description: `${article.title}。${article.keyword}について詳しく解説します。`,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  // Get related articles (3 random, excluding current)
  const allArticles = getAllArticles().filter((a) => a.slug !== slug);
  const shuffled = allArticles.sort(() => 0.5 - Math.random());
  const relatedArticles = shuffled.slice(0, 3);

  // Get top 3 companies for internal linking
  const topCompanies = factoringCompanies.slice(0, 3);

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

        {/* おすすめファクタリング会社 */}
        <section className="mt-12">
          <h2 className="text-lg font-bold text-[#1B3A5C] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#1B3A5C] rounded-full inline-block"></span>
            おすすめファクタリング会社
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCompanies.map((company) => (
              <Link
                key={company.slug}
                href={`/companies/${company.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-[#1B3A5C]/30 transition group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1B3A5C] transition">
                    {company.name}
                  </h3>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    ★ {company.rating}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  手数料 {company.fees.min}%〜{company.fees.max}% ／ {company.speed}
                </p>
                <span className="text-xs text-[#1B3A5C] font-medium group-hover:underline">
                  詳細を見る →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#1B3A5C] to-[#2a5280] rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-3">
            あなたに最適なファクタリング会社を見つけよう
          </h2>
          <p className="text-blue-200 mb-6 text-sm">
            30秒の簡単診断で、最適な業者がわかります
          </p>
          <Link
            href="/#diagnosis"
            className="inline-block bg-white text-[#1B3A5C] px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition"
          >
            無料診断スタート →
          </Link>
        </div>

        {/* 関連記事 */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-[#1B3A5C] mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#1B3A5C] rounded-full inline-block"></span>
              関連記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.slug}`}
                  className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#1B3A5C]/30 transition group"
                >
                  {related.keyword && (
                    <span className="inline-block bg-[#1B3A5C]/10 text-[#1B3A5C] text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                      {related.keyword}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1B3A5C] transition leading-snug mb-2">
                    {related.title}
                  </h3>
                  <span className="text-xs text-[#1B3A5C] font-medium group-hover:underline">
                    記事を読む →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

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

      {/* パンくずリスト構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://corp-factoring.com" },
              { "@type": "ListItem", "position": 2, "name": "コラム", "item": "https://corp-factoring.com/articles" },
              { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://corp-factoring.com/articles/${slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
