"use client";

import { FactoringCompany } from "@/data/companies";
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
            <TableHead className="w-[60px]">順位</TableHead>
            <TableHead className="min-w-[180px]">会社名</TableHead>
            <TableHead className="min-w-[120px]">手数料</TableHead>
            <TableHead className="min-w-[120px]">入金スピード</TableHead>
            <TableHead className="min-w-[120px]">買取可能額</TableHead>
            <TableHead className="w-[80px]">個人</TableHead>
            <TableHead className="min-w-[200px]">特徴</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company, index) => (
            <TableRow key={company.id}>
              <TableCell className="font-bold text-center">
                {index === 0 && <span className="text-2xl">🥇</span>}
                {index === 1 && <span className="text-2xl">🥈</span>}
                {index === 2 && <span className="text-2xl">🥉</span>}
                {index > 2 && <span className="text-lg">{index + 1}位</span>}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-bold text-base">{company.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ⭐ {company.rating} ({company.reviewCount}件)
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-primary">
                  {company.fees.min}%〜{company.fees.max}%
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="whitespace-nowrap">
                  ⚡{company.speed}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {company.minAmount === 0 ? "制限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}
                  〜
                  {company.maxAmount}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {company.personalSupport ? (
                  <span className="text-green-600 font-bold">✅</span>
                ) : (
                  <span className="text-gray-400">❌</span>
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
