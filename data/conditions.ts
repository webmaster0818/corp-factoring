// 条件別の比較表（既存の条件別記事の冒頭に出す）。
//
// 新しいURLは作らず、同じテーマの既存記事に表を入れる（サイト内で同じ検索語を取り合わないため）。
// 表は data/feeIndex.ts の公式確認値だけから機械的に作る。並び順は「数値で比べられる基準」だけで決め、
// 編集部の主観による順位は付けない。条件に当てはまるかの判定に使った公式表記は、表にそのまま出す。
import { feeIndex, type FeeIndexRow } from "./feeIndex";
import { parseRate } from "./subPages";

export interface ConditionDef {
  key: string;
  heading: string; // 表の見出し
  criteria: string; // 表に載せる条件と並び順の説明
  evidence: (r: FeeIndexRow) => string; // 判定に使った公式表記
  evidenceLabel: string;
  match: (r: FeeIndexRow) => boolean;
  sortKey?: (r: FeeIndexRow) => number; // 小さい順
  limit?: number;
}

// 「最短2時間」「最短30分」「最短即日」は当日、「最短1日」「最短2営業日」は当日ではない
const head = (s: string) => s.split(/[（(]/)[0];
const sameDay = (r: FeeIndexRow) => /即日|\d+\s*(時間|分)/.test(head(r.speed)) && !/営業日|\d+日/.test(head(r.speed).replace(/即日/g, ""));
const minutes = (r: FeeIndexRow) => {
  const h = head(r.speed);
  const m = h.match(/(\d+)\s*分/);
  if (m) return Number(m[1]);
  const hh = h.match(/(\d+)\s*時間/);
  if (hh) return Number(hh[1]) * 60;
  return 24 * 60; // 「最短即日」のみ
};
const kojinOk = (r: FeeIndexRow) =>
  /個人|フリーランス/.test(r.target) && !/個人事業主は利用不可|個人事業主・フリーランス不可|法人のみ|法人限定|法人専用|原則法人|受付.*停止|取扱.*停止|個人事業主の可否は記載なし/.test(r.target);
// 利用可能額の下限（円）。読み取れない場合は undefined
const minAmountYen = (r: FeeIndexRow): number | undefined => {
  if (/下限(上限)?なし|下限.*記載なし|数万円/.test(r.amount)) return /数万円/.test(r.amount) ? 50000 : 0;
  const m = r.amount.match(/^(?:最低)?(\d[\d,]*)(万)?円/);
  if (!m) return undefined;
  return Number(m[1].replace(/,/g, "")) * (m[2] ? 10000 : 1);
};
const largeOk = (r: FeeIndexRow) => /億|無制限|上限なし|上限額なし/.test(r.amount);

export const CONDITIONS: { [articleSlug: string]: ConditionDef } = {
  "article-factoring-sokujitsu-osusume": {
    key: "sokujitsu",
    heading: "即日入金に対応する会社（公式表示の最短入金が早い順）",
    criteria: "公式サイトの最短入金の表示が「最短◯分」「最短◯時間」「最短即日」の会社を載せ、表示の時間が短い順に並べています。最短の時間は書類がそろっている場合などの条件付きの値です。",
    evidenceLabel: "最短入金（公式表示）",
    evidence: (r) => r.speed,
    match: sameDay,
    sortKey: minutes,
  },
  "article-factoring-kojin-osusume": {
    key: "kojin",
    heading: "個人事業主・フリーランスが使える会社（2社間の手数料の下限が低い順）",
    criteria: "公式サイトで対象に個人事業主またはフリーランスが含まれている会社を載せ、2社間の手数料の下限が低い順に並べています（率を公表していない会社は末尾）。",
    evidenceLabel: "対象（公式表示）",
    evidence: (r) => r.target,
    match: kojinOk,
    sortKey: (r) => parseRate(r.fee2).min ?? 99,
  },
  "article-factoring-tesuryo-yasui": {
    key: "tesuryo",
    heading: "2社間の手数料の下限が低い会社（公式表示の下限が低い順）",
    criteria: "公式サイトに2社間の手数料率が示されている会社を、下限の率が低い順に並べています。下限は最も条件が良い場合の値で、上限の記載がない会社もあります。",
    evidenceLabel: "2社間の手数料（公式表示）",
    evidence: (r) => r.fee2,
    match: (r) => parseRate(r.fee2).min !== undefined,
    sortKey: (r) => parseRate(r.fee2).min as number,
    limit: 15,
  },
  "article-factoring-shougaku": {
    key: "shougaku",
    heading: "10万円以下から使える会社（利用可能額の下限が低い順）",
    criteria: "公式サイトの利用可能額の下限が10万円以下、または下限なしの会社を、下限が低い順に並べています。",
    evidenceLabel: "利用可能額（公式表示）",
    evidence: (r) => r.amount,
    match: (r) => {
      const v = minAmountYen(r);
      return v !== undefined && v <= 100000;
    },
    sortKey: (r) => minAmountYen(r) ?? 1e9,
  },
  "article-factoring-ooguchi": {
    key: "ooguchi",
    heading: "1億円以上・上限なしの高額に対応する会社",
    criteria: "公式サイトの利用可能額に「1億円以上」「上限なし」「無制限」などの表示がある会社を載せています（並び順は2社間の手数料の下限が低い順）。",
    evidenceLabel: "利用可能額（公式表示）",
    evidence: (r) => r.amount,
    match: largeOk,
    sortKey: (r) => parseRate(r.fee2).min ?? 99,
  },
  "article-online-factoring": {
    key: "online",
    heading: "オンラインで契約まで完結できる会社（公式表示の最短入金が早い順）",
    criteria: "公式サイトでオンライン完結（来店・面談なしの契約）が「可」と確認できた会社を、最短入金の表示が短い順に並べています。初回だけ面談が必要など条件がある場合は、表の表記をご確認ください。",
    evidenceLabel: "オンライン完結（公式表示）",
    evidence: (r) => r.online,
    match: (r) => /^可/.test(r.online),
    sortKey: minutes,
  },
};

export function getConditionRows(articleSlug: string): { def: ConditionDef; rows: FeeIndexRow[] } | undefined {
  const def = CONDITIONS[articleSlug];
  if (!def) return undefined;
  let rows = feeIndex.filter(def.match);
  if (def.sortKey) rows = [...rows].sort((a, b) => (def.sortKey as (r: FeeIndexRow) => number)(a) - (def.sortKey as (r: FeeIndexRow) => number)(b));
  if (def.limit) rows = rows.slice(0, def.limit);
  return { def, rows };
}
