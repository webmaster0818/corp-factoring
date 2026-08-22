// 営業時間子ページ（/companies/<slug>/eigyo-jikan/）の対象スラッグと、公式一次確認日。
//
// 掲載条件：
//   1) GSCで「会社名 営業時間」等のサブ意図に表示実績がある
//   2) かつ operatingHoursMap（または個別詳細データ）に公式サイトの一次確認値がある
// 表示実績の無い意図は親レビューのFAQに留め、薄いページ・カニバリを避ける。
//
// 確認日は data/companyDetails.ts の operatingHoursMap の note に記載した確認日と一致させること。
// 新たに公式確認していない会社は、既存の確認日をそのまま引き継ぐ（日付の繰り上げ禁止）。

export const HOURS_SLUGS = [
  "jtc",
  "no1",
  "factor-plan",
  "try",
  "labol",
  "paytner",
  "accel-factor",
  "paytoday",
  "support-kinyu",
  "pmg",
  "ennavi",
  "freenance",
  "ququmo",
] as const;

// 静的セグメントで実装済みの営業時間子ページ（動的ルートの generateStaticParams からは除外する）
export const HOURS_STATIC_SLUGS = ["top-management"] as const;

// 親ページ（/companies/<slug>/）から「営業時間を詳しく」リンクを出す対象
export const HOURS_LINK_SLUGS: string[] = [...HOURS_SLUGS, ...HOURS_STATIC_SLUGS];

// 各社の営業時間を公式サイトで一次確認した日
export const HOURS_CHECKED_AT: { [slug: string]: string } = {
  ennavi: "2026年7月8日",
  "accel-factor": "2026年7月8日",
  freenance: "2026年7月8日",
  paytoday: "2026年7月8日",
  "support-kinyu": "2026年7月8日",
  paytner: "2026年7月8日",
  labol: "2026年7月8日",
  pmg: "2026年7月8日",
  jtc: "2026年7月29日",
  no1: "2026年7月29日",
  "factor-plan": "2026年7月29日",
  try: "2026年7月29日",
  ququmo: "2026年8月22日",
  "top-management": "2026年8月7日",
};

// 営業時間比較表に載せる候補（operatingHoursMapに一次確認値がある会社のみ）。
// 自社は除外し、先頭から所定件数を採用する。
export const HOURS_COMPARE_POOL = [
  "ennavi",
  "labol",
  "pmg",
  "accel-factor",
  "no1",
  "paytner",
  "paytoday",
  "top-management",
];
