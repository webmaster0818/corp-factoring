// 会社別の「手数料」「審査」子ページ（/companies/<slug>/tesuryo/・/companies/<slug>/shinsa/）。
//
// 掲載条件：feeIndex に公式確認値の行があり、かつ editorialVerification に公式確認済みの事実欄がある会社。
// 本文は公式確認値（確認日つき）だけで組み立て、公式に記載がない項目は「公式に記載なし」と書く。
// 計算例は公式表示の率をそのまま当てはめた試算であり、実際の見積もりではないことを必ず併記する。
import { feeIndex } from "./feeIndex";
import { editorialVerifications } from "./editorialVerification";

export const SUBPAGE_SLUGS: string[] = feeIndex.map((r) => r.slug).filter((s) => Boolean(editorialVerifications[s]));

// 「1〜12%」「4%〜」「一律10%」「0.5〜15%」などから下限・上限を取り出す（取れない場合は undefined）
export function parseRate(text: string): { min?: number; max?: number; flat?: boolean } {
  const t = text.replace(/[％]/g, "%").replace(/[～~]/g, "〜");
  const flat = t.match(/一律\s*(\d+(?:\.\d+)?)%/);
  if (flat) return { min: Number(flat[1]), max: Number(flat[1]), flat: true };
  const range = t.match(/^(\d+(?:\.\d+)?)%?\s*〜\s*(\d+(?:\.\d+)?)%/);
  if (range) return { min: Number(range[1]), max: Number(range[2]) };
  const lower = t.match(/^(\d+(?:\.\d+)?)%\s*〜/);
  if (lower) return { min: Number(lower[1]) };
  return {};
}

// 2社間・3社間の表示が「対応なし」を表すか
export const isNotOffered = (text: string) => /^[―—\-\s]*$|非対応|確認できず/.test(text);

// 事実欄から項目名に語を含む行を拾う
export function pickFacts(slug: string, words: RegExp) {
  return (editorialVerifications[slug]?.facts ?? []).filter((f) => words.test(f.label));
}
