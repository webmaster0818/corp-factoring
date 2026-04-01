import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug, factoringCompanies } from "@/data/companies";
import { getCompanyStrengths, getCompanyUseCases, getCompanyReviews } from "@/data/companyExtended";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return factoringCompanies.map((company) => ({
    slug: company.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const categoryText = company.category.slice(0, 3).join("・");
  
  return {
    title: `${company.name}の評判・口コミ【2026年最新】手数料${company.fees.min}%〜 | ${categoryText}`,
    description: `${company.name}のファクタリングサービスを徹底解説。手数料${company.fees.min}%〜${company.fees.max}%、${company.speed}で入金可能。${company.reviewCount}件の実績、利用者の口コミ・評判、メリット・デメリットを詳しく紹介。`,
    keywords: `${company.name},${company.nameKana},ファクタリング,評判,口コミ,手数料,${categoryText}`,
    openGraph: {
      title: `${company.name}の評判・口コミ | ファクタリング手数料${company.fees.min}%〜`,
      description: `${company.description}`,
      type: "article",
    },
  };
}

export default function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const strengths = getCompanyStrengths(slug);
  const useCases = getCompanyUseCases(slug);
  const reviews = getCompanyReviews(slug);

  // 構造化データ（JSON-LD）
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": company.name,
    "description": company.description,
    "provider": {
      "@type": "Organization",
      "name": company.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": company.companyInfo.address,
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": company.rating,
      "reviewCount": company.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": `${company.fees.min}-${company.fees.max}%`,
      "priceCurrency": "JPY"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">ホーム</Link>
            <span className="mx-2">＞</span>
            <Link href="/#ranking" className="hover:text-orange-600">ランキング</Link>
            <span className="mx-2">＞</span>
            <span className="text-gray-900 font-medium">{company.name}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
                {company.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {company.description}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-yellow-500">⭐</span>
                  <span className="text-2xl font-black text-gray-900">
                    {company.rating}
                  </span>
                  <span className="text-gray-600 font-medium">
                    ({company.reviewCount}件)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {company.features.map((feature, index) => (
                  <Badge key={index} className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 px-10 rounded-2xl text-center shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 transition"
            >
              公式サイトで詳細を見る →
            </Link>
            <Link
              href="/#diagnosis"
              className="bg-white border-2 border-sky-500 text-sky-600 font-bold py-4 px-10 rounded-2xl hover:bg-sky-50 transition text-center"
            >
              🧮 無料診断ツール
            </Link>
          </div>
        </div>

        {/* 基本情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">📊 基本情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">💰 手数料</h3>
                <p className="text-3xl font-black text-blue-600">
                  {company.fees.min}%〜{company.fees.max}%
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">⚡ 入金スピード</h3>
                <p className="text-3xl font-black text-green-600">
                  {company.speed}
                </p>
              </div>
              <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">📈 買取可能額</h3>
                <p className="text-xl font-bold text-gray-900">
                  {company.minAmount === 0
                    ? "下限なし"
                    : `${(company.minAmount / 10000).toFixed(0)}万円`}
                  〜{company.maxAmount}
                </p>
              </div>
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">👤 個人事業主</h3>
                <p className="text-xl font-bold text-gray-900">
                  {company.personalSupport ? (
                    <span className="text-green-600 font-black">✓ 対応</span>
                  ) : (
                    <span className="text-gray-500 font-bold">✗ 非対応</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* メリット・デメリット */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">⚖️ メリット・デメリット</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* メリット */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-black text-green-700 mb-4 text-xl">
                  ✓ メリット
                </h3>
                <ul className="space-y-3">
                  {company.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-0.5 text-lg font-bold">✓</span>
                      <span className="text-gray-700 leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* デメリット */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="font-black text-orange-700 mb-4 text-xl">
                  ✗ デメリット
                </h3>
                <ul className="space-y-3">
                  {company.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-600 mt-0.5 text-lg font-bold">✗</span>
                      <span className="text-gray-700 leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 必要書類 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">📄 必要書類</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {company.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="text-blue-600 text-xl">📄</span>
                  <span className="text-gray-700 font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 会社情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">🏢 会社情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">設立年</h3>
                  <p className="text-gray-900 font-bold text-lg">{company.companyInfo.established}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">資本金</h3>
                  <p className="text-gray-900 font-bold text-lg">{company.companyInfo.capital}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">カテゴリ</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {company.category.map((cat, index) => (
                      <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-200 text-xs font-bold">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">所在地</h3>
                <p className="text-gray-900 font-medium">{company.companyInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* こんな人におすすめ */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">👥 こんな人におすすめ</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {company.category.includes("即日") && (
                <div className="flex items-start gap-4 bg-amber-50 p-5 rounded-xl border border-amber-100">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      今すぐ資金が必要な方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {company.speed}で入金可能なので、緊急の資金調達に最適です。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("手数料安い") && (
                <div className="flex items-start gap-4 bg-green-50 p-5 rounded-xl border border-green-100">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      手数料を抑えたい方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      手数料{company.fees.min}%〜と業界最安水準なので、コストを抑えられます。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("審査甘い") && (
                <div className="flex items-start gap-4 bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      審査が不安な方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      柔軟な審査で赤字決算や税金滞納でも対応可能です。
                    </p>
                  </div>
                </div>
              )}
              {company.personalSupport && (
                <div className="flex items-start gap-4 bg-sky-50 p-5 rounded-xl border border-sky-100">
                  <span className="text-3xl">👤</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      個人事業主・フリーランス
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      個人事業主・フリーランスにも対応しています。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 強み */}
        <section className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">💎 {company.name}の強み</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-4 bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <span className="text-2xl font-black text-blue-600">{index + 1}</span>
                    <p className="text-gray-700 leading-relaxed font-medium flex-1">{strength}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 利用シーン・ユースケース */}
        <section className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">📖 {company.name}の活用事例</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-black text-gray-900 mb-4 text-xl">{useCase.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">💡 状況</h4>
                        <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-amber-500">{useCase.situation}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">🔧 解決策</h4>
                        <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-blue-500">{useCase.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">✅ 結果</h4>
                        <p className="text-gray-700 font-medium leading-relaxed pl-4 border-l-4 border-green-500">{useCase.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 利用者の口コミ */}
        <section className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">💬 {company.name}の利用者の口コミ・評判</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-black text-gray-900 text-lg">{review.author}</h4>
                          <Badge className="bg-gray-100 text-gray-700 font-medium">{review.industry}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{review.company} / {review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                    {review.pros && (
                      <div className="bg-green-50 p-4 rounded-lg mb-2">
                        <h5 className="font-bold text-green-700 mb-2 text-sm">✓ 良かった点</h5>
                        <p className="text-gray-700 text-sm">{review.pros}</p>
                      </div>
                    )}
                    {review.cons && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h5 className="font-bold text-orange-700 mb-2 text-sm">△ 改善してほしい点</h5>
                        <p className="text-gray-700 text-sm">{review.cons}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  ※ 口コミは利用者の主観的な意見であり、効果を保証するものではありません。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/30 p-10 text-center text-white mb-8">
          <h2 className="text-3xl font-black mb-4">
            {company.name}で無料見積もり
          </h2>
          <p className="mb-8 text-orange-100 text-lg leading-relaxed">
            まずは無料で見積もりを依頼してみましょう。手数料や条件を確認できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="bg-white text-orange-600 font-black py-4 px-10 rounded-2xl hover:bg-gray-100 transition shadow-lg"
            >
              公式サイトへ →
            </Link>
            <Link
              href="/#diagnosis"
              className="bg-orange-700 text-white font-bold py-4 px-10 rounded-2xl hover:bg-orange-800 transition border-2 border-orange-400"
            >
              🧮 無料診断ツール
            </Link>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="text-center">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-bold text-lg inline-flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>

      <Footer />

      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
