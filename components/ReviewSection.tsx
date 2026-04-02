"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GoogleReview } from "@/data/companyExtended";

interface ReviewSectionProps {
  companyName: string;
  positiveReviews: GoogleReview[];
  negativeReviews: GoogleReview[];
}

export function ReviewSection({ companyName, positiveReviews, negativeReviews }: ReviewSectionProps) {
  const [activeTab, setActiveTab] = useState<"positive" | "negative">("positive");
  const [showAll, setShowAll] = useState(false);

  const currentReviews = activeTab === "positive" ? positiveReviews : negativeReviews;
  const displayReviews = showAll ? currentReviews : currentReviews.slice(0, 5);

  return (
    <section id="reviews" className="mb-12 scroll-mt-4">
      <Card className="border-2 border-gray-100 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-100">
          <CardTitle className="text-2xl font-black text-gray-900">
            💬 {companyName}の利用者の口コミ・評判（Googleマップより）
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            ※ Google マップに投稿された口コミを引用しています。個別の体験であり、すべての利用者に同様の結果を保証するものではありません。
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* タブ切り替え */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("positive")}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition ${
                activeTab === "positive"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              👍 良い口コミ ({positiveReviews.length}件)
            </button>
            <button
              onClick={() => setActiveTab("negative")}
              className={`flex-1 py-3 px-6 rounded-lg font-bold transition ${
                activeTab === "negative"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              👎 改善点の指摘 ({negativeReviews.length}件)
            </button>
          </div>

          {/* 口コミ一覧 */}
          <div className="space-y-6">
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className={`border-2 rounded-xl p-6 hover:shadow-md transition ${
                  activeTab === "positive"
                    ? "bg-green-50 border-green-100"
                    : "bg-orange-50 border-orange-100"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-black text-gray-900 text-lg">{review.author}</h4>
                      <Badge className="bg-gray-100 text-gray-700 font-medium">{review.industry}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{review.platform} / {review.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
                {review.pros && (
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-bold text-green-700 mb-2 text-sm">✓ 良かった点</h5>
                    <p className="text-gray-700 text-sm">{review.pros}</p>
                  </div>
                )}
                {review.cons && (
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-bold text-orange-700 mb-2 text-sm">△ 改善してほしい点</h5>
                    <p className="text-gray-700 text-sm">{review.cons}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* もっと見るボタン */}
          {currentReviews.length > 5 && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="px-8 py-6 font-bold text-lg"
              >
                {showAll ? "閉じる ↑" : `もっと見る（残り${currentReviews.length - 5}件）↓`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
