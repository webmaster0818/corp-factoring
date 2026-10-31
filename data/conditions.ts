// 条件別の比較表（既存の条件別記事の冒頭に出す）。
//
// 新しいURLは作らず、同じテーマの既存記事に表を入れる（サイト内で同じ検索語を取り合わないため）。
// 表は data/feeIndex.ts の公式確認値だけから機械的に作る。並び順は「数値で比べられる基準」だけで決め、
// 編集部の主観による順位は付けない。条件に当てはまるかの判定に使った公式表記は、表にそのまま出す。
import { feeIndex, type FeeIndexRow } from "./feeIndex";
import { parseRate } from "./subPages";
import { conditionFacts, type ConditionFactKey } from "./conditionFacts";

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

// 条件別の公式記載（data/conditionFacts.ts）から行を選ぶための補助。
// 値は「可」「条件付き（…）」「不要と明記」「一覧に記載なし」など、公式の記載を当サイトが区分したもの。
const fact = (r: FeeIndexRow, k: ConditionFactKey) => conditionFacts[r.slug]?.[k];
const factIs = (k: ConditionFactKey, ...vals: string[]) => (r: FeeIndexRow) => {
  const v = fact(r, k)?.value ?? "";
  return vals.some((x) => v === x || v.startsWith(x + "（"));
};
const rankBy = (k: ConditionFactKey, order: string[]) => (r: FeeIndexRow) => {
  const v = fact(r, k)?.value ?? "";
  const i = order.findIndex((x) => v === x || v.startsWith(x + "（"));
  return (i < 0 ? 9 : i) * 10000 + (parseRate(r.fee2).min ?? 99);
};
const short = (t: string, n = 90) => (t.length > n ? t.slice(0, n) + "…" : t);
const factEvidence = (k: ConditionFactKey) => (r: FeeIndexRow) => {
  const f = fact(r, k);
  if (!f) return "";
  const quote = f.quote ? `「${short(f.quote)}」` : "";
  return `${f.value}${quote ? "：" + quote : ""}${f.note ? `（${short(f.note, 60)}）` : ""}（${f.checkedAt}確認）`;
};

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
// 「売掛先は法人のみ」は売掛先の条件で利用者の条件ではないため、判定から外す（西日本ファクター・CoolPay 2026-11-01）。
// 「法人・個人事業主の別は明記なし」は個人事業主の可否が公式で確認できないため対象外（CoolPay）
const kojinOk = (r: FeeIndexRow) => {
  const t = r.target.replace(/売掛先は[^。）、]*/g, "");
  return /個人|フリーランス/.test(t) && !/個人事業主は利用不可|個人事業主・フリーランス不可|個人事業主不可|法人のみ|法人限定|法人専用|原則法人|受付.*停止|取扱.*停止|個人事業主の可否は記載なし|別は明記なし/.test(t);
};
// 利用可能額の下限（円）。読み取れない場合は undefined
const minAmountYen = (r: FeeIndexRow): number | undefined => {
  if (/下限(上限)?なし|下限.*記載なし|数万円/.test(r.amount)) return /数万円/.test(r.amount) ? 50000 : 0;
  // 「対象債権1万円以上」（GoodPlus）のように前置きのある下限も読む
  const m = r.amount.match(/^(?:最低|対象債権)?(\d[\d,]*)(万)?円/);
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

  "article-factoring-donichi": {
    key: "donichi",
    heading: "土日祝の審査・入金について公式の記載がある会社",
    criteria: "公式サイトに、土日祝にも審査や入金を行うと書いている会社（可）と、受付・相談だけなど条件付きで書いている会社を載せています。「可」を先に、同じ区分の中は2社間の手数料の下限が低い順に並べています。年末年始など特定の日を名指しした記載ではないため、利用する日の対応は公式サイトで確認してください。",
    evidenceLabel: "土日祝の対応（公式の記載）",
    evidence: factEvidence("donichi"),
    match: factIs("donichi", "可", "条件付き"),
    sortKey: rankBy("donichi", ["可", "条件付き"]),
  },
  "article-factoring-2sha-3sha": {
    key: "sansha",
    heading: "3社間ファクタリングに対応する会社（3社間の手数料の下限が低い順）",
    criteria: "公式サイトで3社間ファクタリングに対応していると確認できた会社を、3社間の手数料の下限が低い順に並べています（率を公表していない会社は末尾）。2社間は、ほぼすべての掲載会社が対応しているため表にしていません。",
    evidenceLabel: "3社間の手数料（公式表示）",
    evidence: (r) => r.fee3,
    match: factIs("sansha", "可", "条件付き"),
    sortKey: (r) => parseRate(r.fee3).min ?? 99,
  },
  "article-factoring-kessansho-fuyou": {
    key: "kessansho",
    heading: "決算書の提出について公式の記載がある会社",
    criteria: "公式サイトで決算書を「不要」と明記している会社を先に、次に条件付きの会社、最後に公式の必要書類の一覧に決算書が入っていない会社を載せています。一覧に入っていない会社でも、審査の途中で追加の書類を求められることがあります。",
    evidenceLabel: "決算書の扱い（公式の記載）",
    evidence: factEvidence("kessansho"),
    match: factIs("kessansho", "不要と明記", "条件付き", "一覧に記載なし"),
    sortKey: rankBy("kessansho", ["不要と明記", "条件付き", "一覧に記載なし"]),
  },
  "article-factoring-kakutei-shinkokusho-nashi": {
    key: "kakutei",
    heading: "確定申告書の提出について公式の記載がある会社（個人事業主が使える会社）",
    criteria: "個人事業主が使える会社のうち、公式サイトで確定申告書を「不要」と明記している会社を先に、次に条件付きの会社、最後に公式の必要書類の一覧に確定申告書が入っていない会社を載せています。一覧に入っていない会社でも、審査の途中で追加の書類を求められることがあります。",
    evidenceLabel: "確定申告書の扱い（公式の記載）",
    evidence: factEvidence("kakutei"),
    match: (r) => kojinOk(r) && factIs("kakutei", "不要と明記", "条件付き", "一覧に記載なし")(r),
    sortKey: rankBy("kakutei", ["不要と明記", "条件付き", "一覧に記載なし"]),
  },
  "article-factoring-saiken-touki": {
    key: "touki",
    heading: "債権譲渡登記をしない・留保できると公式に書いている会社",
    criteria: "公式サイトで、債権譲渡登記を行わない、または登記を留保できると書いている会社（可）と、金額や契約内容による条件付きの会社を載せています。「可」を先に、同じ区分の中は2社間の手数料の下限が低い順です。",
    evidenceLabel: "登記の扱い（公式の記載）",
    evidence: factEvidence("touki"),
    match: factIs("touki", "可", "条件付き"),
    sortKey: rankBy("touki", ["可", "条件付き"]),
  },
  "article-factoring-hitsuyou-shorui": {
    key: "docs",
    heading: "公式に挙げている必要書類の数（少ない順）",
    criteria: "各社の公式サイトに書かれた必要書類の一覧を、申込時に求められる書類の数が少ない順に並べています（同じ数の会社は2社間の手数料の下限が低い順）。一覧を載せていない会社は表に入れていません。審査の途中や契約時に追加の書類を求められる場合があります。",
    evidenceLabel: "必要書類（公式の記載）",
    evidence: (r) => {
      const f = fact(r, "docs");
      if (!f) return "";
      return `${f.count}点：${(f.list ?? []).join("・")}${f.note ? `（${short(f.note, 60)}）` : ""}（${f.checkedAt}確認）`;
    },
    match: (r) => (fact(r, "docs")?.count ?? 0) > 0,
    sortKey: (r) => (fact(r, "docs")?.count ?? 99) * 1000 + (parseRate(r.fee2).min ?? 99),
  },
  "article-factoring-iryou": {
    key: "shinryou",
    heading: "診療報酬債権を扱うと公式に書いている会社",
    criteria: "公式サイトで、診療報酬債権の買取に対応すると書いている会社（可）と、条件付きの会社を載せています。医療機関の利用事例があるだけの会社は入れていません。表は当サイトの掲載会社から作っています。本文の比較表は、掲載会社以外の専門サービスも含めて別に選んだものです。「可」を先に、同じ区分の中は2社間の手数料の下限が低い順です。",
    evidenceLabel: "診療報酬（公式の記載）",
    evidence: factEvidence("shinryou"),
    match: factIs("shinryou", "可", "条件付き"),
    sortKey: rankBy("shinryou", ["可", "条件付き"]),
  },
  "article-factoring-kaigo": {
    key: "kaigo",
    heading: "介護報酬債権を扱うと公式に書いている会社",
    criteria: "公式サイトで、介護報酬債権の買取に対応すると書いている会社を載せています。介護事業者の利用事例があるだけの会社は入れていません。表は当サイトの掲載会社から作っています。本文の比較表は、掲載会社以外の専門サービスも含めて別に選んだものです。並びは2社間の手数料の下限が低い順です。",
    evidenceLabel: "介護報酬（公式の記載）",
    evidence: factEvidence("kaigo"),
    match: factIs("kaigo", "可", "条件付き"),
    sortKey: rankBy("kaigo", ["可", "条件付き"]),
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
