"use client";

import { FactoringCompany } from "@/data/companies";
import { getRealRating } from "@/data/realRatings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CategoryRankingProps {
  title: string;
  companies: FactoringCompany[];
  icon: string;
}

export function CategoryRanking({ title, companies, icon }: CategoryRankingProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="text-3xl">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              {/* 順位 */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {index + 1}
              </div>

              {/* 会社情報 */}
              <div className="flex-grow">
                <div className="font-bold text-lg mb-1">{company.name}</div>
                {(() => {
                  const rr = getRealRating(company.slug);
                  return rr ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>★ {rr.rating.toFixed(1)}</span>
                      <span>•</span>
                      <span>Google {rr.count.toLocaleString()}件</span>
                    </div>
                  ) : null;
                })()}
                <div className="flex flex-wrap gap-2">
                  {company.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 主要情報 */}
              <div className="flex-shrink-0 text-right">
                <div className="font-bold text-primary text-lg mb-1">
                  {company.fees.min}%〜{company.fees.max}%
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  ⚡{company.speed}
                </div>
                <Button size="sm" variant="outline">
                  詳細を見る
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
