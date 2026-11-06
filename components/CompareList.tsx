"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { FeeIndexRow } from "@/data/feeIndex";

// 会社の比較リスト（C2・2026-11-06）：feeIndex から最大4社を選び、選んだ順に横並びで表示する。★・順位は付けない
const MAX = 4;
const STORE_KEY = "cf-compare";

const FIELDS: { key: keyof FeeIndexRow; label: string }[] = [
  { key: "fee2", label: "2社間 手数料" },
  { key: "fee3", label: "3社間 手数料" },
  { key: "speed", label: "最短入金" },
  { key: "amount", label: "利用可能額" },
  { key: "target", label: "対象" },
  { key: "online", label: "オンライン契約" },
];

export function CompareList({ rows, pageSlugs, defaultCheckedAt }: { rows: FeeIndexRow[]; pageSlugs: string[]; defaultCheckedAt: string }) {
  const bySlug = new Map(rows.map((r) => [r.slug, r]));
  const valid = (list: string[]) => Array.from(new Set(list.filter((s) => bySlug.has(s)))).slice(0, MAX);
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("c");
    let saved: string[] = [];
    try {
      saved = JSON.parse(window.localStorage.getItem(STORE_KEY) || "[]");
    } catch {
      saved = [];
    }
    // URL の会社を先に、保存していた会社をあとに足す
    setSelected(valid([...(q ? q.split(",") : []), ...(Array.isArray(saved) ? saved : [])]));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    if (selected.length) url.searchParams.set("c", selected.join(","));
    else url.searchParams.delete("c");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(selected));
    } catch {
      /* 保存できない環境では URL だけで保持する */
    }
  }, [selected, ready]);

  const toggle = (slug: string) =>
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : cur.length >= MAX ? cur : [...cur, slug]));

  const picked = selected.map((s) => bySlug.get(s)!).filter(Boolean);
  const checkedAt = (r: FeeIndexRow) => {
    const base = r.recheck || `${defaultCheckedAt}確認`;
    return r.speedCheckedAt && !base.includes(r.speedCheckedAt) ? `${base}／入金スピードは${r.speedCheckedAt}確認` : base;
  };
  const nameCell = (r: FeeIndexRow) =>
    pageSlugs.includes(r.slug) ? (
      <Link href={`/companies/${r.slug}/`} className="text-blue-600 hover:underline">{r.name}</Link>
    ) : (
      r.name
    );

  return (
    <div>
      <section aria-labelledby="compare-table" className="mb-10">
        <h2 id="compare-table" className="text-xl font-black text-gray-900 mb-3">選んだ会社（{picked.length}／{MAX}社）</h2>
        {picked.length === 0 ? (
          <p className="text-sm text-gray-600 border border-dashed border-gray-300 rounded p-4">下の一覧から会社を選ぶと、ここに条件が並びます。</p>
        ) : (
          <>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="text-xs sm:text-sm border-collapse" style={{ minWidth: `${120 + picked.length * 200}px`, width: "100%" }}>
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-3 py-2 text-left font-bold w-28 sticky left-0 bg-gray-800">項目</th>
                    {picked.map((r) => (
                      <th key={r.slug} className="px-3 py-2 text-left font-bold align-top">
                        <span className="block">{r.name}</span>
                        <button type="button" onClick={() => toggle(r.slug)} className="mt-1 text-xs font-normal underline text-gray-200">外す</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <th className="px-3 py-2 text-left font-bold text-gray-700 bg-gray-50 sticky left-0">会社ページ</th>
                    {picked.map((r) => (
                      <td key={r.slug} className="px-3 py-2 align-top">{pageSlugs.includes(r.slug) ? nameCell(r) : "―"}</td>
                    ))}
                  </tr>
                  {FIELDS.map((f) => (
                    <tr key={f.key} className="border-t border-gray-200">
                      <th className="px-3 py-2 text-left font-bold text-gray-700 bg-gray-50 sticky left-0">{f.label}</th>
                      {picked.map((r) => (
                        <td key={r.slug} className="px-3 py-2 align-top leading-relaxed">{String(r[f.key] ?? "")}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200">
                    <th className="px-3 py-2 text-left font-bold text-gray-700 bg-gray-50 sticky left-0">確認日</th>
                    {picked.map((r) => (
                      <td key={r.slug} className="px-3 py-2 align-top text-gray-600 leading-relaxed">{checkedAt(r)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-gray-500">このページのURLには選んだ会社が入るため、URLを共有すると同じ比較を開けます。</p>
            <button type="button" onClick={() => setSelected([])} className="mt-2 text-xs text-blue-600 underline">すべて外す</button>
          </>
        )}
      </section>

      <section aria-labelledby="compare-pick">
        <h2 id="compare-pick" className="text-xl font-black text-gray-900 mb-3">会社を選ぶ（{rows.length}社・最大{MAX}社）</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {rows.map((r) => {
            const on = selected.includes(r.slug);
            const full = !on && selected.length >= MAX;
            return (
              <li key={r.slug}>
                <label className={`flex items-start gap-2 border rounded px-3 py-2 text-sm ${on ? "border-blue-500 bg-blue-50" : "border-gray-200"} ${full ? "opacity-50" : "cursor-pointer"}`}>
                  <input type="checkbox" checked={on} disabled={full} onChange={() => toggle(r.slug)} className="mt-1" />
                  <span>{r.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
        {selected.length >= MAX && <p className="mt-2 text-xs text-gray-600">4社まで選べます。ほかの会社を入れるときは、表の「外す」で1社外してください。</p>}
      </section>
    </div>
  );
}
