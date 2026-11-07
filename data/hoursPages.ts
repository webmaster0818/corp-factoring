// 営業時間子ページ（/companies/<slug>/eigyo-jikan/）の対象スラッグと、公式一次確認日。
//
// 掲載条件（2026年11月1日改定・運営者の方針「faclog gap B7：営業時間ページを全社にそろえる」による）：
//   operatingHoursMap（または個別詳細データ）に、公式サイトで一次確認した営業時間・受付時間の値がある会社はすべて掲載する。
//   旧条件の「GSCで『会社名 営業時間』等の表示実績があること」は廃止。
//   公式サイトに営業時間・受付時間の記載が一つもない会社（例：coolpay）は、薄いページになるため掲載しない。
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
  "be-trading",
  // ▼ 2026年11月1日 追加（B7：各社公式サイトで営業時間を一次確認）
  "best-factor",
  "mf-earlypayment",
  "mentor-capital",
  "minna-factoring",
  "yen-today",
  "ebank",
  "invoice-factor",
  "safe-trust",
  "ace-trust",
  "msfj",
  "levanta",
  "trust-gateway",
  "bion",
  "rfd",
  "owl-keizai",
  "invoice-pay",
  "kaipoke-early",
  "urikakedo",
  "kaisoku",
  "olta",
  "gmo-btob-hayabarai",
  "goodplus",
  "next-one",
  "kkt",
  "factoring-zero",
  "nishinihon-factor",
  "jigyoshikin-agent",
  // ▼ 2026年11月3日 追加（新規掲載4社。各社公式サイトで受付時間を一次確認）
  "escom",
  "wit",
  "kensetsukun",
  "factors",
  // ▼ 2026年11月6日 追加（新規掲載6社。各社公式サイトで受付時間を一次確認）
  "kensetsu-pay",
  "bizpay",
  "chatwork-sakibarai",
  "mufg-factor",
  "ricoh-lease",
  "medley",
] as const;

// 2026年11月1日に追加した営業時間ページ（ページの最終確認日を2026年11月1日とする）
export const HOURS_ADDED_20261101: string[] = [
  "best-factor",
  "mf-earlypayment",
  "mentor-capital",
  "minna-factoring",
  "yen-today",
  "ebank",
  "invoice-factor",
  "safe-trust",
  "ace-trust",
  "msfj",
  "levanta",
  "trust-gateway",
  "bion",
  "rfd",
  "owl-keizai",
  "invoice-pay",
  "kaipoke-early",
  "urikakedo",
  "kaisoku",
  "olta",
  "gmo-btob-hayabarai",
  "goodplus",
  "next-one",
  "kkt",
  "factoring-zero",
  "nishinihon-factor",
  "jigyoshikin-agent",
];

// 静的セグメントで実装済みの営業時間子ページ（動的ルートの generateStaticParams からは除外する）
export const HOURS_STATIC_SLUGS = ["top-management"] as const;

// 親ページ（/companies/<slug>/）から「営業時間を詳しく」リンクを出す対象
export const HOURS_LINK_SLUGS: string[] = [...HOURS_SLUGS, ...HOURS_STATIC_SLUGS];

// 各社の営業時間を公式サイトで一次確認した日
export const HOURS_CHECKED_AT: { [slug: string]: string } = {
  ennavi: "2026年10月19日",
  "accel-factor": "2026年11月7日",
  freenance: "2026年7月8日",
  paytoday: "2026年10月19日",
  "support-kinyu": "2026年10月28日",
  paytner: "2026年10月28日",
  labol: "2026年10月31日",
  pmg: "2026年10月28日",
  jtc: "2026年10月30日",
  no1: "2026年11月6日",
  "factor-plan": "2026年10月14日",
  try: "2026年10月14日",
  ququmo: "2026年8月22日",
  "top-management": "2026年10月28日",
  "be-trading": "2026年10月29日",
  // ▼ 2026年11月1日 追加分（各社公式サイトで確認）
  "best-factor": "2026年11月1日",
  "mf-earlypayment": "2026年11月1日",
  "mentor-capital": "2026年11月1日",
  "minna-factoring": "2026年11月1日",
  "yen-today": "2026年11月1日",
  "ebank": "2026年11月1日",
  "invoice-factor": "2026年11月1日",
  "safe-trust": "2026年11月1日",
  "ace-trust": "2026年11月1日",
  "msfj": "2026年11月1日",
  "levanta": "2026年11月1日",
  "trust-gateway": "2026年11月1日",
  "bion": "2026年11月1日",
  "rfd": "2026年11月1日",
  "owl-keizai": "2026年11月1日",
  "invoice-pay": "2026年11月1日",
  "kaipoke-early": "2026年11月1日",
  "urikakedo": "2026年11月1日",
  "kaisoku": "2026年11月1日",
  "olta": "2026年11月1日",
  "gmo-btob-hayabarai": "2026年11月1日",
  "goodplus": "2026年11月1日",
  "next-one": "2026年11月1日",
  "kkt": "2026年11月1日",
  "factoring-zero": "2026年11月1日",
  "nishinihon-factor": "2026年11月1日",
  "jigyoshikin-agent": "2026年11月1日",
  // ▼ 2026年11月3日 追加分（新規掲載4社・各社公式サイトで確認）
  "escom": "2026年11月3日",
  "wit": "2026年11月3日",
  "kensetsukun": "2026年11月3日",
  "factors": "2026年11月3日",
  // ▼ 2026年11月6日 追加分（新規掲載6社・各社公式サイトで確認）
  "kensetsu-pay": "2026年11月6日",
  "bizpay": "2026年11月6日",
  "chatwork-sakibarai": "2026年11月6日",
  "mufg-factor": "2026年11月6日",
  "ricoh-lease": "2026年11月6日",
  "medley": "2026年11月6日",
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
