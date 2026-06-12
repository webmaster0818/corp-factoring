import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { topics, getTopicBySlug } from "@/data/topics";

export async function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);

  if (!topic) {
    return { title: "ページが見つかりません" };
  }

  return {
    title: topic.title,
    description: topic.description,
    alternates: {
      canonical: `/topics/${topic.slug}`,
    },
    openGraph: {
      title: `${topic.title}｜ファクタリング比較ナビ`,
      description: topic.description,
      type: "website",
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  const allArticles = getAllArticles();
  const titleBySlug = new Map(allArticles.map((a) => [a.slug, a.title]));

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-2xl font-bold text-gray-900">ページが見つかりません</h1>
          <Link href="/articles" className="mt-6 inline-block text-blue-600 hover:underline">
            → 記事一覧に戻る
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const articleCount = topic.groups.reduce((n, g) => n + g.slugs.length, 0);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://corp-factoring.com/" },
      { "@type": "ListItem", position: 2, name: "コラム", item: "https://corp-factoring.com/articles/" },
      { "@type": "ListItem", position: 3, name: topic.name, item: `https://corp-factoring.com/topics/${topic.slug}/` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition">
              ホーム
            </Link>
            {" > "}
            <Link href="/articles" className="hover:text-gray-700 transition">
              コラム
            </Link>
            {" > "}
            <span className="text-gray-600">{topic.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-blue-600 mb-2">
            {topic.name}の記事一覧（全{articleCount}記事）
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {topic.title.split("｜")[0]}
          </h1>
          {topic.intro.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Topic navigation */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-gray-500 py-1">他のカテゴリ:</span>
            {topics
              .filter((t) => t.slug !== topic.slug)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/topics/${t.slug}`}
                  className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-700 hover:bg-blue-100 transition"
                >
                  {t.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Article groups */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {topic.groups.map((group) => (
          <section key={group.heading} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-2 border-l-4 border-blue-600 pl-3">
              {group.heading}
            </h2>
            <p className="text-gray-600 text-sm mb-5">{group.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.slugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/articles/${slug}`}
                  className="block bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition"
                >
                  <span className="text-gray-900 font-medium leading-snug">
                    {titleBySlug.get(slug) ?? slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* CTA to comparison content */}
        <section className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            サービス選びに進む方へ
          </h2>
          <p className="text-gray-600 mb-6">
            知識を押さえたら、次は自社に合うサービス選びです。手数料・入金スピード・対応規模で比較できます。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/companies"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ファクタリング会社一覧を見る
            </Link>
            <Link
              href="/fees"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              手数料を比較する
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
