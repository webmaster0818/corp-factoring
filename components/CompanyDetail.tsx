"use client";

import { FactoringCompany } from "@/data/companies";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CompanyDetailProps {
  company: FactoringCompany;
}

export function CompanyDetail({ company }: CompanyDetailProps) {
  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl">{company.name}</CardTitle>
              <CardDescription className="text-lg mt-2">
                ⭐ {company.rating} ({company.reviewCount}件のレビュー)
              </CardDescription>
            </div>
            <Button size="lg" className="whitespace-nowrap">
              公式サイトへ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{company.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {company.features.map((feature, idx) => (
              <Badge key={idx} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">手数料</span>
                <span className="text-primary font-bold">
                  {company.fees.min}%〜{company.fees.max}%
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">入金スピード</span>
                <span className="font-bold">⚡{company.speed}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">買取可能額</span>
                <span>
                  {company.minAmount === 0 ? "制限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}
                  〜{company.maxAmount}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">個人事業主対応</span>
                <span>{company.personalSupport ? "✅ 対応" : "❌ 非対応"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">設立年</span>
                <span>{company.companyInfo.established}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">資本金</span>
                <span>{company.companyInfo.capital}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* おすすめポイント */}
      <Card>
        <CardHeader>
          <CardTitle>✅ おすすめポイント</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {company.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 注意点 */}
      <Card>
        <CardHeader>
          <CardTitle>⚠️ 注意点</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {company.cons.map((con, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-600 mr-2 mt-1">×</span>
                <span className="text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 必要書類 */}
      <Card>
        <CardHeader>
          <CardTitle>📄 必要書類</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {company.requiredDocuments.map((doc, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">
                {doc}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* こんな人におすすめ */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">👤 こんな人におすすめ</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {company.category.includes("総合") && (
              <li className="text-blue-900">• 総合的にバランスの良い会社を探している</li>
            )}
            {company.category.includes("即日") && (
              <li className="text-blue-900">• 今日中に資金が必要</li>
            )}
            {company.category.includes("手数料安い") && (
              <li className="text-blue-900">• コストを抑えたい</li>
            )}
            {company.category.includes("審査甘い") && (
              <li className="text-blue-900">• 審査に不安がある</li>
            )}
            {company.category.includes("個人事業主") && (
              <li className="text-blue-900">• 個人事業主・フリーランス</li>
            )}
          </ul>
        </CardContent>
      </Card>

      {/* 会社情報 */}
      <Card>
        <CardHeader>
          <CardTitle>🏢 会社情報</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold text-gray-700">設立：</span>
              <span className="ml-2">{company.companyInfo.established}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">資本金：</span>
              <span className="ml-2">{company.companyInfo.capital}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">所在地：</span>
              <span className="ml-2">{company.companyInfo.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center py-6">
        <Button size="lg" className="px-12">
          {company.name}の公式サイトへ →
        </Button>
      </div>
    </div>
  );
}
