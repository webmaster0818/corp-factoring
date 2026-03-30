import React from "react";
import { notFound } from "next/navigation";
import { getCompanyBySlug, factoringCompanies } from "@/data/companies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return factoringCompanies.map((company) => ({
    slug: company.slug,
  }));
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {company.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                {company.description}
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-yellow-500">⭐</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {company.rating}
                  </span>
                  <span className="text-gray-600">
                    ({company.reviewCount}件)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {company.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTAボタン */}
          <div className="flex gap-4">
            <Button size="lg" className="px-8">
              公式サイトで詳細を見る →
            </Button>
            <Button size="lg" variant="outline">
              無料見積もりを依頼
            </Button>
          </div>
        </div>

        {/* 基本情報 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">基本情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">手数料</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {company.fees.min}%〜{company.fees.max}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">入金スピード</h3>
                <p className="text-2xl font-bold text-green-600">
                  {company.speed}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  買取可能額
                </h3>
                <p className="text-lg text-gray-900">
                  {company.minAmount === 0
                    ? "下限なし"
                    : `${(company.minAmount / 10000).toFixed(0)}万円`}
                  〜{company.maxAmount}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">個人事業主</h3>
                <p className="text-lg text-gray-900">
                  {company.personalSupport ? (
                    <span className="text-green-600 font-semibold">✓ 対応</span>
                  ) : (
                    <span className="text-gray-500">✗ 非対応</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* メリット・デメリット */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">メリット・デメリット</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* メリット */}
              <div>
                <h3 className="font-semibold text-green-700 mb-3 text-lg">
                  ✓ メリット
                </h3>
                <ul className="space-y-2">
                  {company.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* デメリット */}
              <div>
                <h3 className="font-semibold text-orange-700 mb-3 text-lg">
                  ✗ デメリット
                </h3>
                <ul className="space-y-2">
                  {company.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">✗</span>
                      <span className="text-gray-700">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 必要書類 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">必要書類</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {company.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-blue-600">📄</span>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 会社情報 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">会社情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">設立年</h3>
                  <p className="text-gray-900">{company.companyInfo.established}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">資本金</h3>
                  <p className="text-gray-900">{company.companyInfo.capital}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">カテゴリ</h3>
                  <div className="flex flex-wrap gap-1">
                    {company.category.map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">所在地</h3>
                <p className="text-gray-900">{company.companyInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* こんな人におすすめ */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">こんな人におすすめ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {company.category.includes("即日") && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      今すぐ資金が必要な方
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {company.speed}で入金可能なので、緊急の資金調達に最適です。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("手数料安い") && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      手数料を抑えたい方
                    </h4>
                    <p className="text-gray-600 text-sm">
                      手数料{company.fees.min}%〜と業界最安水準なので、コストを抑えられます。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("審査甘い") && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      審査が不安な方
                    </h4>
                    <p className="text-gray-600 text-sm">
                      柔軟な審査で赤字決算や税金滞納でも対応可能です。
                    </p>
                  </div>
                </div>
              )}
              {company.personalSupport && (
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      個人事業主・フリーランス
                    </h4>
                    <p className="text-gray-600 text-sm">
                      個人事業主・フリーランスにも対応しています。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {company.name}で無料見積もり
          </h2>
          <p className="mb-6 text-blue-100">
            まずは無料で見積もりを依頼してみましょう。手数料や条件を確認できます。
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 bg-white text-blue-700 hover:bg-gray-100"
            >
              公式サイトへ →
            </Button>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← トップページに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
