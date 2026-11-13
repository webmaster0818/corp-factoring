"use client";

import { FactoringCompany, feeRange } from "@/data/companies";
import { getRealRating } from "@/data/realRatings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ComparisonTableProps {
  companies: FactoringCompany[];
}

export function ComparisonTable({ companies }: ComparisonTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px] whitespace-nowrap">順位</TableHead>
            <TableHead className="min-w-[180px]">会社名</TableHead>
            <TableHead className="min-w-[120px]">手数料</TableHead>
            <TableHead className="min-w-[160px]">入金スピード</TableHead>
            <TableHead className="min-w-[200px]">買取可能額</TableHead>
            <TableHead className="w-[64px] whitespace-nowrap text-center">個人</TableHead>
            <TableHead className="min-w-[200px]">特徴</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={company.id}>
              <TableCell className="font-bold text-center whitespace-nowrap">
                <span className={`text-sm tabular-nums ${index < 3 ? "text-[#1B3A5C]" : "text-gray-600"}`}>{index + 1}位</span>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-bold text-base">{company.name}</div>
                  {(() => {
                    const rr = getRealRating(company.slug);
                    return rr ? (
                      <div className="text-xs text-gray-500 mt-1">
                        Googleマップの口コミ {rr.count.toLocaleString()}件（{rr.fetchedAt}時点）
                      </div>
                    ) : null;
                  })()}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-ink whitespace-nowrap">
                  {company.fees.max > 0 ? `${feeRange(company.fees)}` : company.fees.min > 0 ? `${company.fees.min}%〜` : "要見積もり"}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="whitespace-normal font-normal">
                  {company.speed}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {company.amountText ?? (
                    <>
                      {company.minAmount === 0 ? "制限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}
                      〜
                      {company.maxAmount}
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {company.personalSupport ? (
                  <span className="text-[#1B3A5C] font-bold" aria-label="対応">○</span>
                ) : (
                  <span className="text-gray-400" aria-label="非対応">—</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {company.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Button size="sm" className="whitespace-nowrap">
                  詳細を見る
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
