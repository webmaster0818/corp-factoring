// 会社ページの「公式表示で比べる表」と「向いていない可能性がある方」（P0-4）。
//
// どちらも data/feeIndex.ts の公式確認値だけから機械的に作る。編集部の主観による評価や順位は付けない。
// 「向いていない可能性がある方」は、公式の表示（対象・3社間・下限額・入金・契約方法・手数料の公表）から
// 条件に合わない人を示すだけで、各項目に判定に使った公式表示をそのまま添える。
import Link from "next/link";
import { feeIndex, feeCheckedAt, type FeeIndexRow } from "@/data/feeIndex";
import { parseRate, isNotOffered, SUBPAGE_SLUGS } from "@/data/subPages";

const isKojin = (t: string) =>
  /個人|フリーランス/.test(t) && !/個人事業主は利用不可|個人事業主・フリーランス不可|法人のみ|法人限定|法人専用|原則法人|受付.*停止|取扱.*停止/.test(t);
const head = (s: string) => s.split(/[（(]/)[0];
const sameDay = (r: FeeIndexRow) => /即日|\d+\s*(時間|分)/.test(head(r.speed)) && !/営業日|\d+日/.test(head(r.speed).replace(/即日/g, ""));
const minAmountYen = (r: FeeIndexRow): number | undefined => {
  if (/下限(上限)?なし|下限.*記載なし/.test(r.amount)) return 0;
  const m = r.amount.match(/^(?:最低)?(\d[\d,]*)(万)?円/);
  if (!m) return undefined;
  return Number(m[1].replace(/,/g, "")) * (m[2] ? 10000 : 1);
};
const checkedAt = (r: FeeIndexRow) => r.speedCheckedAt ?? feeCheckedAt;

// 同じ対象（個人事業主が使えるか）の会社のうち、2社間の手数料の下限が近い順に4社
function similar(row: FeeIndexRow): FeeIndexRow[] {
  const base = parseRate(row.fee2).min;
  return feeIndex
    .filter((r) => r.slug !== row.slug && isKojin(r.target) === isKojin(row.target))
    .map((r) => ({ r, d: base === undefined ? (parseRate(r.fee2).min ?? 99) : Math.abs((parseRate(r.fee2).min ?? 99) - base) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4)
    .map((x) => x.r);
}

export function CompanyCompareTable({ slug }: { slug: string }) {
  const row = feeIndex.find((r) => r.slug === slug);
  if (!row) return null;
  const rows = [row, ...similar(row)];
  const href = (s: string) => (SUBPAGE_SLUGS.includes(s) ? `/companies/${s}/tesuryo/` : `/companies/${s}/`);
  return (
    <section id="official-compare" className="mb-12 scroll-mt-4">
      <h2 className="text-2xl font-black text-gray-900 mb-2">{row.name}と条件の近い会社（公式表示で比較）</h2>
      <p className="text-sm text-gray-600 mb-4">
        {isKojin(row.target) ? "個人事業主・フリーランスも使える会社" : "個人事業主の利用が公式表示にない会社"}のうち、
        {parseRate(row.fee2).min === undefined ? "2社間の手数料の下限が低い順" : `2社間の手数料の下限が${row.name}に近い順`}に4社を並べています。値は各社の公式サイトの表示で、順位や評価ではありません。
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-bold border-b">会社名</th>
              <th className="text-left p-3 font-bold border-b">2社間の手数料</th>
              <th className="text-left p-3 font-bold border-b">3社間の手数料</th>
              <th className="text-left p-3 font-bold border-b">最短入金</th>
              <th className="text-left p-3 font-bold border-b">利用可能額</th>
              <th className="text-left p-3 font-bold border-b">対象</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className={r.slug === slug ? "bg-blue-50 border-b" : "border-b"}>
                <td className="p-3 font-bold whitespace-nowrap">
                  {r.slug === slug ? r.name : <Link href={href(r.slug)} className="text-blue-700 underline">{r.name}</Link>}
                </td>
                <td className="p-3">{r.fee2}</td>
                <td className="p-3">{r.fee3}</td>
                <td className="p-3">{r.speed}</td>
                <td className="p-3">{r.amount}</td>
                <td className="p-3">{r.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-2">各社の公式サイトで確認（{row.name}は{checkedAt(row)}確認）。全社の一覧は<Link href="/fees/" className="underline">手数料の比較表</Link>をご覧ください。</p>
    </section>
  );
}

export function CompanyNotFor({ slug }: { slug: string }) {
  const row = feeIndex.find((r) => r.slug === slug);
  if (!row) return null;
  const items: { who: string; why: string }[] = [];
  if (!isKojin(row.target)) items.push({ who: "個人事業主・フリーランスの方", why: `対象の公式表示：${row.target}` });
  if (isNotOffered(row.fee3) || /^非対応/.test(row.fee3)) items.push({ who: "売掛先の承諾を得て、3社間で手数料を抑えたい方", why: `3社間の公式表示：${row.fee3}` });
  const min = minAmountYen(row);
  if (min !== undefined && min >= 500000) items.push({ who: `${(min / 10000).toLocaleString()}万円未満の少額の売掛金を資金化したい方`, why: `利用可能額の公式表示：${row.amount}` });
  if (!sameDay(row)) items.push({ who: "申込の当日中に入金が必要な方", why: `最短入金の公式表示：${row.speed}` });
  if (!/^可/.test(row.online)) items.push({ who: "来店・面談なしで契約まで済ませたい方", why: `オンライン完結の公式表示：${row.online}` });
  if (parseRate(row.fee2).min === undefined && !isNotOffered(row.fee2)) items.push({ who: "申込前に手数料率を確かめてから比べたい方", why: `2社間の公式表示：${row.fee2}` });
  if (items.length === 0) return null;
  return (
    <section id="not-for" className="mb-12 scroll-mt-4">
      <h2 className="text-2xl font-black text-gray-900 mb-2">{row.name}が合わない可能性がある方</h2>
      <p className="text-sm text-gray-600 mb-4">公式サイトの表示から、条件に合わない可能性がある場合をまとめました。最新の条件は公式サイトや見積もりで確認してください。</p>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.who} className="border border-gray-200 rounded-lg p-4 bg-white">
            <p className="font-bold text-gray-900">{it.who}</p>
            <p className="text-sm text-gray-600 mt-1">{it.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
