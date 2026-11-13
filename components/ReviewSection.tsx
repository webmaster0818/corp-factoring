import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RealRating } from "@/data/realRatings";

interface ReviewSectionProps {
  companyName: string;
  realRating?: RealRating;
  pros: string[];
  cons: string[];
}

export function ReviewSection({ companyName, realRating, pros, cons }: ReviewSectionProps) {
  return (
    <section id="reviews" className="mb-12 scroll-mt-4">
      <Card className="border-2 border-gray-100 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {companyName}の口コミ・評判
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            当サイトでは出典が確認できた評価データのみ掲載しています。個別の口コミ本文はGoogleマップの各社ページでご確認ください。
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {realRating ? (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-6 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-700">{realRating.count.toLocaleString()}件</p>
                  <p className="text-xs text-gray-600 mt-1">Googleマップの口コミ</p>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm text-gray-700">
                    Googleマップ上の「{realRating.entity}」に寄せられた口コミの件数です。Googleマップの点数（★）は表示していません。口コミの本文はGoogleマップでご確認ください。
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    出典: Google Maps（Places APIで取得）／ {realRating.fetchedAt}時点。件数は変動します。
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-6">
              <p className="text-sm text-gray-600">
                {companyName}のGoogleマップの口コミの件数は、当サイトでは掲載していません。
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-700 mb-3">良い評判の傾向</h3>
              <ul className="space-y-2">
                {pros.map((p, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600 shrink-0">○</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {cons.length > 0 && (
            <div>
              <h3 className="font-bold text-amber-700 mb-3">注意が必要な点</h3>
              <ul className="space-y-2">
                {cons.map((c, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-amber-600 shrink-0">△</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
