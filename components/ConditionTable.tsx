import Link from "next/link";
import { getConditionRows, type ConditionDef } from "@/data/conditions";
import type { FeeIndexRow } from "@/data/feeIndex";
import { feeCheckedAt } from "@/data/feeIndex";

const FIRST = 10;

function RowsTable({ def, rows }: { def: ConditionDef; rows: FeeIndexRow[] }) {
  return (
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-3 py-2 text-left font-bold text-gray-700">会社名</th>
              <th className="px-3 py-2 text-left font-bold text-gray-700">{def.evidenceLabel}</th>
              <th className="px-3 py-2 text-left font-bold text-gray-700">2社間の手数料</th>
              {def.key !== "sokujitsu" && def.key !== "online" && <th className="px-3 py-2 text-left font-bold text-gray-700">最短入金</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-b border-gray-100 align-top last:border-0">
                <td className="px-3 py-2 font-medium">
                  <Link href={`/companies/${r.slug}/`} className="text-blue-600 hover:underline">{r.name}</Link>
                </td>
                <td className="px-3 py-2 text-gray-800">{def.evidence(r)}</td>
                <td className="px-3 py-2 text-gray-800">{r.fee2}</td>
                {def.key !== "sokujitsu" && def.key !== "online" && <td className="px-3 py-2 text-gray-800">{r.speed}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

// 条件別記事の冒頭に出す比較表（公式確認値から自動で作る）
export function ConditionTable({ articleSlug }: { articleSlug: string }) {
  const data = getConditionRows(articleSlug);
  if (!data || data.rows.length === 0) return null;
  const { def, rows } = data;
  return (
    <section className="my-8 rounded-xl border border-gray-200 bg-white p-4 md:p-6">
      <h2 className="text-lg font-bold text-[#1B3A5C]">{def.heading}</h2>
      <p className="mt-2 text-xs leading-relaxed text-gray-600">{def.criteria}</p>
      <RowsTable def={def} rows={rows.slice(0, FIRST)} />
      {rows.length > FIRST && (
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-blue-600">残りの{rows.length - FIRST}社を表示</summary>
          <RowsTable def={def} rows={rows.slice(FIRST)} />
        </details>
      )}
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        ※当サイトが各社の公式サイトで確認した値です（基準日{feeCheckedAt}、その後に再確認した会社は<Link href="/fees/" className="text-blue-600 underline">手数料比較</Link>に確認日を記載）。掲載会社が増えると、この表にも自動で追加されます。
      </p>
    </section>
  );
}
