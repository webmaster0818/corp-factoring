import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EditorialVerification } from "@/data/editorialVerification";

interface EditorialVerificationProps {
  companyName: string;
  data: EditorialVerification;
}

// 「編集部の検証欄」：公式サイト・公的情報から一次確認できた事実のみを出典付きで表示する。
// 口コミの創作・転載はしない。AggregateRating等の構造化データも出力しない。
export function EditorialVerificationSection({ companyName, data }: EditorialVerificationProps) {
  return (
    <section id="editorial-check" className="mb-8 scroll-mt-4">
      <Card className="border-2 border-blue-100 shadow-sm">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-2xl font-black text-gray-900">
            編集部の検証欄：{companyName}について確認できた事実
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            編集部確認日：{data.checkedAt}。{data.intro}
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700 w-32 whitespace-nowrap">項目</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">確認できた事実</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700 w-56">出典・確認日</th>
                </tr>
              </thead>
              <tbody>
                {data.facts.map((fact, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                    <th className="bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-700 align-top whitespace-nowrap">
                      {fact.label}
                    </th>
                    <td className="px-3 py-2.5 text-gray-800 leading-relaxed">{fact.value}</td>
                    <td className="px-3 py-2.5 text-xs text-gray-500 leading-relaxed">{fact.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3">利用を検討する際の確認ポイント</h3>
            <ul className="space-y-2">
              {data.checkpoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                  <span className="shrink-0 font-bold text-blue-600">・</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-xs text-gray-500 leading-relaxed">
            ※この欄は編集部が公式サイト等を直接確認した事実のみで構成しており、利用者の口コミ・体験談は含みません。条件は変更される場合があるため、最新情報は公式サイトでご確認ください。
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
