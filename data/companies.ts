export interface Review {
  id: number;
  author: string;
  company: string;
  industry: string;
  rating: number;
  date: string;
  content: string;
  pros?: string;
  cons?: string;
}

export interface UseCaseExample {
  title: string;
  situation: string;
  solution: string;
  result: string;
}

export interface FactoringCompany {
  id: number;
  name: string;
  nameKana: string;
  slug: string;
  logo?: string;
  rating: number;
  fees: {
    min: number;
    max: number;
  };
  speed: string;
  speedIsReview?: boolean; // true: speed は入金までではなく審査結果までの時間（入金までの時間が公式に記載されていない会社）
  minAmount: number;
  maxAmount: string;
  amountText?: string; // 設定時は買取可能額をこの文字列で表示する（公式に記載がない場合など）
  personalSupport: boolean;
  features: string[];
  description: string;
  pros: string[];
  cons: string[];
  reviewCount: number;
  companyInfo: {
    established: string;
    capital: string;
    address: string;
  };
  requiredDocuments: string[];
  url: string;
  affiliateUrl?: string; // アフィリエイトリンク（設定時はCTAがこちらを優先・rel="sponsored nofollow"）
  category: string[];
  strengths?: string[];
  useCases?: UseCaseExample[];
  reviews?: Review[];
}

export const factoringCompanies: FactoringCompany[] = [
  {
    id: 1,
    name: "ビートレーディング",
    nameKana: "びーとれーでぃんぐ",
    slug: "be-trading",
    rating: 4.8,
    fees: { min: 2.0, max: 0 }, // 公式表示は「手数料2%〜」（2社間4%〜・3社間2%〜）。上限率は公式に記載なし（2026年10月17日確認）
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限", // 公式サービスページ「3者間ファクタリングの特長 買取金額無制限」。トップは法人窓口「300万〜30億円」・Web審査「1万円〜300万円」（2026年10月22日確認）
    personalSupport: true,
    features: ["実績豊富", "注文書対応", "医療対応", "全国対応"],
    description: "業界でも上位の実績を持つ大手ファクタリング会社です。取引実績は9.1万社以上、累計買取額は1,824億円です（公式トップ・2026年3月時点）。", // betrading.jp（2026年10月22日確認）
    pros: [
      "取引実績9.1万社以上（公式・2026年3月時点）",
      "注文書ファクタリング対応",
      "医療ファクタリング対応",
      "全国5拠点（東京、仙台、大阪、名古屋、福岡）",
      "オンライン完結可能"
    ],
    cons: [
      "手数料上限がやや高め",
      "初回は面談が必要な場合あり"
    ],
    reviewCount: 2850,
    companyInfo: {
      established: "2012年",
      capital: "7,000万円",
      address: "東京都港区芝大門一丁目2-18 野依ビル3階・4階"
    },
    requiredDocuments: ["請求書", "通帳"],
    url: "https://betrading.jp/",
    category: ["総合", "即日", "実績"]
  },
  {
    id: 2,
    name: "QuQuMo",
    nameKana: "ククモ",
    slug: "ququmo",
    rating: 4.7,
    fees: { min: 1.0, max: 0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限", // 公式トップ「金額上限なし」（2026年10月22日確認）
    personalSupport: true, // 公式トップ「どなたでも 法人様・個人事業主様」（2026年10月22日確認）
    features: ["必要書類2点", "オンライン完結", "手数料明示"],
    description: "必要書類は2点で、オンラインで完結し、最短2時間で入金されます。手数料は1%からです（公式は「業界トップクラスの低コスト」と表示）。",
    pros: [
      "手数料1%〜（公式トップ。公式は「業界トップクラスの低コスト。最大でも1%～」と表示）", // https://ququmo.net/（2026年10月24日確認。「業界最安」の記載はなし）
      "必要書類2点のみ（請求書、通帳）",
      "オンライン完結",
      "お見積りの所要時間30分（公式「お見積り 所要時間：30分」。必要書類をもとに審査し、買取額と手数料を提示）" // https://ququmo.net/（2026年10月24日確認）
    ],
    cons: [
      "対面相談は不可",
      "2社間ファクタリングのみ（公式「当社との直接の2社間ファクタリング」）" // ququmo.net（2026年10月22日確認）
    ],
    reviewCount: 1820,
    companyInfo: {
      established: "公式に記載なし",
      capital: "公式に記載なし",
      address: "東京都豊島区南池袋2-13-10 南池袋山本ビル3階"
    },
    requiredDocuments: ["請求書", "通帳"],
    url: "https://ququmo.net/",
    category: ["総合", "手数料安い", "即日"]
  },
  {
    id: 3,
    name: "アクセルファクター",
    nameKana: "あくせるふぁくたー",
    slug: "accel-factor",
    rating: 4.6,
    fees: { min: 1.0, max: 12.0 },
    speed: "最短2時間", // 公式コラム（法人向けファクタリングおすすめ20選・更新日2026.10.12）「入金は最短2時間」・運転資金のコラム（2026.10.15）「最短2時間での資金化が可能」（2026年10月25日確認）。審査結果は公式FAQ「最短1時間」
    minAmount: 300000,
    maxAmount: "3億円", // 公式コラム「買取可能額は30万円～3億円」（accelfacter.co.jp/column/factoring/factoring-corporation/・2026年10月25日確認）。トップ・FAQ には金額の記載なし
    personalSupport: true,
    features: ["低手数料", "柔軟な審査", "全国対応"],
    description: "手数料は2社間1〜12%・3社間0.5〜10.5%（公式表示）です。審査結果は最短1時間で出ます（公式FAQ）。公式コラムでは、審査通過率93%超・買取可能額30万円〜3億円・入金は最短2時間としています。",
    pros: [
      "手数料の目安は3社間0.5〜10.5%・2社間1〜12%（公式FAQ）",
      "審査通過率93%超（公式コラム「アクセルファクターの審査通過率は93％を超えており」）", // accelfacter.co.jp/column/factoring/merit-demerit/（更新日2026.09.25・2026年10月25日確認）
      "買取可能額30万円〜3億円・入金は最短2時間（公式コラム）", // accelfacter.co.jp/column/factoring/factoring-corporation/（2026年10月25日確認）
      "原則即日対応（公式表示）", // accelfacter.co.jp/service/factoring/ 本文の特長欄「原則即日対応」（2026年10月21日確認）
      "オンラインで完結（公式表示）。面談は必須ではなく、オンライン面談も可能（公式FAQ）",
      "個人事業主にも対応（公式コラム「個人事業主様というだけでお取引を断ることは絶対にございません」）" // accelfacter.co.jp/column/factoring/self-employed/（債権の内容により買取不可の場合ありと併記）。3社間は FAQ「3社間ファクタリングで0.5～10.5％を目安」（2026年10月23日確認）
    ],
    cons: [
      "電話受付は平日10:00〜18:30（公式表示）"
    ],
    reviewCount: 1650,
    companyInfo: {
      established: "2018年",
      capital: "2億7,052万円（グループ総資本金）",
      address: "東京都豊島区高田3丁目32番1号 大東ビル3階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://accelfacter.co.jp/",
    category: ["手数料安い", "審査甘い"]
  },
  {
    id: 4,
    name: "ベストファクター",
    nameKana: "べすとふぁくたー",
    slug: "best-factor",
    rating: 4.7,
    fees: { min: 2.0, max: 20.0 },
    speed: "最短6時間",
    minAmount: 300000,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["少額対応", "審査通過率92.2%（公式表示）", "個人事業主に対応"],
    description: "公式FAQでは売掛債権の請求額30万円以上から利用でき、審査通過率は92.2%（公式表示）です。個人事業主・フリーランスの利用に適しています。",
    pros: [
      "公式FAQでは売掛債権30万円以上から利用可（トップには10万円〜の表記あり）",
      "審査通過率92.2%（公式表示）",
      "個人事業主・フリーランスOK",
      "2社間は必要書類がそろえば最短6時間で審査〜入金（公式FAQ）",
      "審査はオンラインで可能（契約時の面談の要否は公式内で記載が異なる）"
    ],
    cons: [
      "手数料上限が20%とやや高め"
    ],
    reviewCount: 1420,
    companyInfo: {
      established: "2017年",
      capital: "7,000万円",
      address: "東京都新宿区西新宿3-7-1 新宿パークタワーN棟28階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://bestfactor.jp/",
    category: ["審査甘い", "少額", "個人事業主"]
  },
  {
    id: 5,
    name: "PMG",
    nameKana: "ぴーえむじー",
    slug: "pmg",
    rating: 4.5,
    fees: { min: 0, max: 0 }, // 公式は手数料の範囲を記載せず「買取率98%（売買手数料2%）」と表示・実際の率は個別査定（2026年10月19日確認）。旧値 1〜10% は公式で確認できず
    speed: "最短2時間",
    minAmount: 500000,
    maxAmount: "2億円（応相談）",
    personalSupport: true,
    features: ["迅速な入金", "土日祝も受付", "オンライン完結"],
    description: "ピーエムジー株式会社（東京本社・大阪支店・福岡支店ほか全国12拠点）のファクタリングです。電話は8:00〜20:00、Webは24時間受付で、どちらも土日祝に対応しています。買取額は50万円からで、入金は最短2時間です（2026年10月18日公式確認）。",
    pros: [
      "最短2時間で入金",
      "買取率98%（公式の土日ファクタリングのページの表示）",
      "審査時間30分",
      "オンライン完結",
      "個人事業主OK"
    ],
    cons: [
      "実績が他社より少ない"
    ],
    reviewCount: 980,
    companyInfo: {
      established: "2015年6月",
      capital: "1億円",
      address: "東京都新宿区西新宿2丁目4番1号 新宿NSビル25F"
    },
    requiredDocuments: ["請求書・納品書などの成因資料", "身分証明書などの本人確認書類", "口座の入出金明細", "直近の決算書・確定申告書など（公式の土日ファクタリングのページに記載）"],
    url: "https://p-m-g.tokyo/",
    category: ["即日", "手数料安い"]
  },
  {
    id: 6,
    name: "ペイトナー",
    nameKana: "ぺいとなー",
    slug: "paytner",
    rating: 4.4,
    fees: { min: 10.0, max: 10.0 },
    speed: "最短即日",
    minAmount: 10000,
    maxAmount: "300万円（初回50万円）",
    personalSupport: true,
    features: ["手数料一律10%", "最短即日", "個人事業主向け"],
    description: "フリーランス・個人事業主・一人法人向けのサービスです。手数料は一律10%（別途振込手数料330円）で、審査後、最短即日で入金されます。",
    pros: [
      "手数料一律10%で分かりやすい",
      "審査後、最短即日で入金（公式）",
      "1万円から対応",
      "申込は年中無休・24時間受付（審査結果は原則19:00までの申込で当日中・公式FAQ）", // paytner.co.jp/faq/business-hours/（2026年10月22日確認）
      "個人事業主・一人法人向け（公式表示）" // paytner.co.jp トップ（2026年10月22日確認）
    ],
    cons: [
      "手数料が一律10%（少額だと割高）"
    ],
    reviewCount: 2150,
    companyInfo: {
      established: "2019年2月",
      capital: "8億6,745万円（資本準備金含む・2026年1月の公式発表時点）",
      address: "東京都港区虎ノ門5-9-1 麻布台ヒルズ ガーデンプラザB 5F"
    },
    requiredDocuments: ["請求書", "本人確認書類（初回のみ）", "直近3ヶ月分の入出金明細"],
    url: "https://paytner.co.jp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+5CB9NU+4PF6+609HU",
    category: ["個人事業主", "少額", "即日"]
  },
  {
    id: 7,
    name: "ラボル",
    nameKana: "らぼる",
    slug: "labol",
    rating: 4.4,
    fees: { min: 10.0, max: 10.0 },
    speed: "最短30分",
    minAmount: 10000,
    maxAmount: "上限は審査で個別設定",
    personalSupport: true,
    features: ["手数料一律10%", "個人事業主向け", "開業直後も利用可"],
    description: "個人事業主・フリーランス向けのサービスです。開業直後でも利用でき、手数料は一律10%です。",
    pros: [
      "手数料一律10%",
      "1万円から対応",
      "開業直後でも利用可能",
      "24時間申込可能"
    ],
    cons: [
      "手数料が一律10%",
      "買取対象は法人が取引先となる請求書のみ（公式FAQ）" // labol.co.jp トップのFAQ「個人間での取引の請求書は利用できますか？」（2026年10月22日確認）
    ],
    reviewCount: 1680,
    companyInfo: {
      established: "2021年",
      capital: "5,000万円",
      address: "東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア39階"
    },
    requiredDocuments: ["請求書", "身分証明書", "通帳"],
    url: "https://labol.co.jp/",
    category: ["個人事業主", "少額", "審査甘い"]
  },
  {
    id: 8,
    name: "PayToday",
    nameKana: "ぺいとぅでい",
    slug: "paytoday",
    rating: 4.6,
    fees: { min: 1.0, max: 9.5 },
    speed: "最短30分",
    minAmount: 100000,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["低手数料", "AI審査", "迅速な入金"],
    description: "手数料は1%〜9.5%です（公式FAQ。公式は「ファクタリング業界最低水準の手数料」と表示）。AI審査により、最短30分で入金されます。", // paytoday.jp トップ「1％〜というファクタリング業界最低水準の手数料を実現」（2026年10月25日確認）
    pros: [
      "手数料1%〜9.5%（公式FAQ「1%からで上限９．５％」）。公式は「ファクタリング業界最低水準の手数料」と表示", // paytoday.jp トップ・FAQ（2026年10月23日確認・10月25日再確認）
      "最短30分で入金",
      "独自のAI審査で、審査結果は最短15分〜24時間以内にメールで連絡（公式）", // 公式トップ「審査結果は最短15分〜、24時間以内にメールでお答えします」。営業時間は平日9:00-17:00（公式FAQ）。「24時間対応」の表記なし（2026年10月23日確認）
      "オンライン完結",
      "手数料上限が明示"
    ],
    cons: [
      "最低買取額10万円から"
    ], // 旧 cons「実績がやや少ない」は出典なし（公式トップは累計申込額のサービス実績を掲載）→削除（2026年10月23日）
    reviewCount: 850,
    companyInfo: {
      established: "2020年",
      capital: "1億円",
      address: "東京都港区南青山2-2-15 ウィン青山836"
    },
    requiredDocuments: ["請求書", "通帳"],
    url: "https://paytoday.jp/",
    category: ["手数料安い", "即日"]
  },
  {
    id: 9,
    name: "日本中小企業金融サポート機構",
    nameKana: "にほんちゅうしょうきぎょうきんゆうさぽーときこう",
    slug: "support-kinyu",
    rating: 4.5,
    fees: { min: 1.5, max: 0 }, // 上限率は公式で確認できず（2026年10月16日確認。公式表示は「1.5%〜」のみ）
    speed: "最短3時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["FACTOR⁺U（ファクトル）", "経営革新等支援機関", "非営利団体"],
    description: "経営革新等支援機関の認定を受けた一般社団法人。従来型のファクタリング（最短3時間入金・非対面/対面/郵送で契約）に加え、2024年10月からオンライン完結のAIファクタリング「FACTOR⁺U（ファクトル）」（審査最短10分・入金最短40分）を運営しています。手数料はいずれも1.5%〜です（公式・2026年10月16日確認）。",
    pros: [
      "非営利団体運営で信頼性高",
      "経営革新等支援機関認定",
      "手数料1.5%〜（上限は公式に記載なし）",
      "ファクタリングサービス「FACTOR⁺U（ファクトル）」はAI審査・必要書類2点・Web完結（公式・2026年7月29日確認）",
      "郵送契約可能",
      "個人事業主OK"
    ],
    cons: [
      "入金まで最短3時間とやや遅い",
      "審査が慎重"
    ],
    reviewCount: 1250,
    companyInfo: {
      established: "2017年5月",
      capital: "一般社団法人（資本金の制度なし）",
      address: "東京都港区芝大門1-2-18-2F（商業登記上の本店：東京都中央区銀座六丁目6番1号）"
    },
    requiredDocuments: ["口座の入出金履歴（直近3か月分）", "売掛金に関する書類（請求書・契約書など）", "代表者の身分証（FACTOR⁺Uのユーザー登録時）"],
    url: "https://chushokigyo-support.or.jp/",
    category: ["手数料安い", "信頼性"]
  },
  {
    id: 10,
    name: "Money Forward 早期入金",
    nameKana: "まねーふぉわーど あーりーぺいめんと",
    slug: "mf-earlypayment",
    rating: 4.3,
    fees: { min: 0.5, max: 10.0 },
    speed: "最短2営業日",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: false,
    features: ["東証プライム上場", "会計ソフト連携", "上場企業グループ"],
    description: "マネーフォワードグループが提供するサービスです。会計ソフトと連携しており、手続きを円滑に進められます。",
    pros: [
      "東証プライム上場企業運営",
      "会計ソフトと連携",
      "手数料最大10%",
      "追加費用なし",
      "個人事業主OK"
    ],
    cons: [
      "入金まで最短2営業日",
      "審査が厳しめ"
    ],
    reviewCount: 620,
    companyInfo: {
      established: "2012年",
      capital: "36億円（マネーフォワード連結）",
      address: "東京都港区芝浦3-1-21 msb Tamachi 田町ステーションタワーS 21階"
    },
    requiredDocuments: ["請求書", "通帳"],
    url: "https://mfkessai.co.jp/fast-receivables/top",
    category: ["信頼性", "手数料安い"]
  },
  {
    id: 11,
    name: "トップマネジメント",
    nameKana: "とっぷまねじめんと",
    slug: "top-management",
    rating: 4.2,
    fees: { min: 0.5, max: 0 }, // 公式FAQ「2社間3.5％～、3社間0.5％～、2.5社間1.8%～」。上限率は公式（トップ・商品案内・FAQ・コラム等93ページ）に記載なし（2026年10月26日確認）。旧値 12.5% は出典なし
    speed: "最短即日",
    minAmount: 300000,
    maxAmount: "3億円",
    personalSupport: true,
    features: ["高額対応", "3社間対応", "長期実績"],
    description: "2009年設立で、3社間ファクタリングにも対応しています。買取可能額は3億円まで（売掛先1社あたり1億円まで）です。", // 会社概要「設立年月日 平成21年4月21日」・公式コラム（2026年10月26日確認）
    pros: [
      "2009年設立（公式の会社概要）",
      "3社間ファクタリング対応",
      "最大3億円まで対応",
      "対面相談可能",
      "見積書・受注書・発注書での資金化に対応（公式）"
    ],
    cons: [
      "最低買取額30万円",
      "手数料の上限は公式に記載なし"
    ],
    reviewCount: 890,
    companyInfo: {
      established: "2009年",
      capital: "5,000万円",
      address: "東京都千代田区鍛冶町1-4-3 竹内ビル2階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書", "商業登記簿謄本"],
    url: "https://top-management.co.jp/",
    category: ["高額", "3社間"]
  },
  {
    id: 12,
    name: "メンターキャピタル",
    nameKana: "めんたーきゃぴたる",
    slug: "mentor-capital",
    rating: 4.1,
    fees: { min: 0, max: 0 },
    speed: "最短即日",
    minAmount: 300000,
    maxAmount: "公式では確認できず",
    amountText: "公式に記載なし", // 下限・上限とも公式サイト（トップ・FAQ・会社概要）に記載なし（2026年10月21日確認）
    personalSupport: true,
    features: ["審査通過率92%（2023年実績）", "対面・来社不要", "ノンリコース"],
    description: "2社間ファクタリングを中心に提供しています。償還請求権はなく（ノンリコース）、債権譲渡登記と取引先への通知は原則として留保されます。審査通過率は92%（2023年実績・公式表示）で、最短即日で現金化できます。",
    pros: [
      "審査通過率92%（2023年1〜12月実績・公式表示）",
      "赤字決算・税金滞納OK",
      "柔軟な審査",
      "即日対応",
      "全国対応"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要",
      "買取額の下限・上限が公式に記載されていない"
    ],
    reviewCount: 720,
    companyInfo: {
      established: "公式サイトでは確認できず",
      capital: "3,000万円",
      address: "東京都新宿区四谷4-30-13 クロスシー新宿御苑前ビル4F"
    },
    requiredDocuments: ["通帳のコピー（表紙付き・直近3か月分）", "売掛金に関する資料（請求書・契約書など）"],
    url: "https://mentor-capital.jp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+510162+5U0K+5YJRM",
    category: ["審査甘い", "即日"]
  },
  {
    id: 13,
    name: "えんナビ",
    nameKana: "えんなび",
    slug: "ennavi",
    rating: 4.0,
    fees: { min: 5.0, max: 0 }, // 公式は「手数料5%」の表示のみ。上限率は公式に記載なし（2026年10月17日確認）
    speed: "最短1日",
    minAmount: 300000,
    maxAmount: "5000万円",
    personalSupport: true, // ennavi.tokyo「法人様から個人事業主様まで対応」（2026年10月19日確認。ennavi-factoring.net には利用対象の記載なし）
    features: ["少額対応", "24時間対応", "法人・個人事業主に対応"],
    description: "30万円から利用でき、最短1日で入金されます。24時間受付で、土日祝も申し込むことができます。",
    pros: [
      "下限は30万円（ennavi-factoring.net）／50万円（ennavi.tokyo）と公式の表記が異なる",
      "24時間対応",
      "土日祝も申込可能",
      "個人事業主にも対応（ennavi.tokyo の表示）",
      "即日対応"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要"
    ],
    reviewCount: 580,
    companyInfo: {
      established: "公式に記載なし",
      capital: "公式に記載なし",
      address: "東京都中央区日本橋本町4-3-4 東海日本橋ビル3階" // 公式2サイトのフッター・ennavi.tokyo 会社概要（2026年10月18日確認）。ennavi-factoring.net の会社情報ページは旧所在地（東上野）のまま
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://ennavi-factoring.net/",
    category: ["即日", "24時間"]
  },
  {
    id: 14,
    name: "FREENANCE",
    nameKana: "ふりーなんす",
    slug: "freenance",
    rating: 4.3,
    fees: { min: 3.0, max: 10.0 },
    speed: "最短即日",
    minAmount: 10000,
    maxAmount: "上限なし", // 公式FAQ「初回利用時でも1万円〜上限額なしで利用できます」https://freenance.net/archives/faq/3850/（2026年10月21日確認）
    personalSupport: true,
    features: ["フリー株式会社（freee）運営", "損害賠償保険付帯", "個人事業主向け"],
    description: "東証グロース上場のフリー株式会社（freee）が運営するサービスです。損害賠償保険が付帯しています。", // freenance.net トップ・利用規約第1条（2026年10月21日確認）
    pros: [
      "東証グロース上場のfreeeが運営",
      "損害賠償保険付き",
      "1万円から対応",
      "個人事業主・フリーランス特化",
      "手数料3%〜10%"
    ],
    cons: [], // 旧「審査がやや厳しい」は出典なしのため削除（2026年10月22日）
    reviewCount: 1380,
    companyInfo: {
      established: "2012年7月（運営会社 フリー株式会社）", // corp.freee.co.jp/company/（2026年10月21日確認）
      capital: "公式に記載なし",
      address: "東京都品川区大崎1-2-2 アートヴィレッジ大崎セントラルタワー21階"
    },
    requiredDocuments: ["請求書", "身分証明書"],
    url: "https://freenance.net/",
    category: ["個人事業主", "少額", "信頼性"]
  },
  {
    id: 15,
    name: "みんなのファクタリング",
    nameKana: "みんなのふぁくたりんぐ",
    slug: "minna-factoring",
    rating: 4.0,
    fees: { min: 0, max: 0 }, // 手数料はサービスサイト・利用規約・運営会社の事業紹介に記載なし（2026年10月22日確認）。旧値 3〜15% は出典なし
    speed: "最短60分", // サービスサイト「土日祝でも最短60分でお振込」（2026年10月22日確認）
    minAmount: 0,
    maxAmount: "",
    amountText: "公式に記載なし", // 下限・上限ともサービスサイト・利用規約・事業紹介に記載なし（2026年10月22日確認）
    personalSupport: true, // 事業紹介「事業主様向け」「請求書をお持ちで事業をしている方限定」。利用規約は利用者が法人の場合の条件を別に定める（2026年10月22日確認）
    features: ["オンライン完結", "2社間限定", "独自のAI審査"],
    description: "登録から契約までWEBで完結し、土日祝でも最短60分で振り込まれます。毎日19時まで営業しています（運営会社の事業紹介・2026年10月22日確認）。",
    pros: [
      "登録から契約までWEB完結・非対面（公式）",
      "土日祝でも最短60分で振込（公式）",
      "毎日19時まで営業・土日祝対応（運営会社の事業紹介）",
      "決算書・事業計画は不要、独自のAI審査（運営会社の事業紹介）",
      "2社間限定で、債権譲渡登記は原則なし（運営会社の事業紹介）"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要",
      "電話対応なし（運営会社の事業紹介）",
      "利用者が法人の場合、代表者の保証書の差し入れが買取実行の条件（利用規約第10条）", // minnanofactoring.net/terms 第10条1項5号（2026年10月23日確認）
      "給与債権など直接請求できない債権や、手形・小切手・電子記録債権が発行された債権は対象外（利用規約第11条）" // 同 第11条1号・4号（2026年10月23日確認）
    ],
    reviewCount: 420,
    companyInfo: {
      established: "2023年1月20日", // 運営 株式会社チェンジ 会社概要 change-corp.jp/company/（2026年10月22日再確認・資本金 10,000,000円・住所とも一致）
      capital: "1,000万円",
      address: "東京都中央区日本橋室町一丁目11番12号"
    },
    requiredDocuments: ["公式に記載なし（決算書・事業計画は不要と運営会社の事業紹介に記載）"],
    url: "https://minnanofactoring.net/",
    category: ["個人事業主", "即日"]
  },
  {
    id: 16,
    name: "JTC",
    nameKana: "じぇいてぃーしー",
    slug: "jtc",
    rating: 0,
    fees: { min: 1.2, max: 10.0 },
    speed: "最短即日",
    minAmount: 1000000,
    maxAmount: "上限なし（売掛金の範囲内）",
    personalSupport: true,
    features: ["手数料1.2%〜", "取扱1万件超", "全国対応"],
    description: "2013年設立、名古屋に本社を置く会社です。手数料は1.2%〜10%で、取扱件数1万件超・取扱金額500億円の実績があります。100万円以上の中〜高額の債権に強みがあります。",
    pros: [
      "手数料1.2%〜10%と低水準（公式表示）",
      "2013年設立・取扱1万件超の実績",
      "2社間・3社間の両方に対応",
      "名古屋・東京・大阪の3拠点で全国対応（出張あり）",
      "ISO27001（ISMS）認証取得"
    ],
    cons: [
      "最低買取額が100万円以上で少額利用には不向き",
      "個人事業主の利用は売掛先の承諾（3社間）が前提",
      "契約は事前予約制"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2013年6月",
      capital: "8,000万円",
      address: "愛知県名古屋市中区錦2-17-28 CK15伏見ビル5階"
    },
    requiredDocuments: ["入金予定申請フォーム（仮審査・公式サイトでダウンロード）", "請求書（直近3回分）", "通帳（3ヶ月分）"],
    url: "https://j-t-c.info/",
    category: ["即日", "高額対応"]
  },
  {
    id: 17,
    name: "¥Today（エントゥデイ）",
    nameKana: "えんとぅでい",
    slug: "yen-today",
    rating: 0,
    fees: { min: 0, max: 0 },
    speed: "最短30分",
    minAmount: 0,
    maxAmount: "紹介先による",
    personalSupport: false,
    features: ["一括申込サービス", "利用料無料", "法人専用"],
    description: "株式会社ミネルバが運営する、法人専用のファクタリング一括申込サービスです。1回の入力で提携会社のうち3社に申込が配信され、条件を比較して契約先を選べます。¥Todayの利用料は無料です（手数料は契約先に支払います）。",
    pros: [
      "一括申込サービスの利用は完全無料",
      "最大3社の条件を比較してから契約先を選べる",
      "必要書類は請求書（注文書）と銀行通帳の2点",
      "最短30分で振込完了（公式表示）",
      "オンライン完結"
    ],
    cons: [
      "法人専用（個人事業主・フリーランスは利用不可）",
      "手数料は紹介先各社の見積もり次第（サービス側では決まらない）",
      "運営会社の設立が2026年3月と新しく実績の蓄積はこれから"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2026年3月",
      capital: "公式サイトでは確認できず",
      address: "東京都品川区上大崎3丁目14番34号 プラスワン402"
    },
    requiredDocuments: ["請求書（注文書）", "銀行通帳"],
    url: "https://www.yen-today.jp/",
    category: ["法人専用", "一括申込"]
  },
  {
    id: 18,
    name: "いーばんく（アクシアプラス）",
    nameKana: "いーばんく",
    slug: "ebank",
    rating: 0,
    fees: { min: 4.0, max: 0 },
    speed: "最短即日",
    minAmount: 0,
    maxAmount: "2,000万円（リーズナブルプランは50万円）",
    personalSupport: false,
    features: ["審査通過率90%以上", "24時間対応", "2社間・3社間対応"],
    description: "手数料は4%〜、入金は最短即日です（公式サイトでは平均2.3日という実績値も公表されています）。2社間・3社間の両方に対応し、審査通過率90%以上を公式に表示しています。※「いーばんく」は広告・プロモーション上の名称で、公式サイトの表記は「アクシアプラスのファクタリング」です。同社は「インボイスファクター」も運営しています。",
    pros: [
      "手数料4%〜（下限を公式表示）",
      "最短即日・平均2.3日という実測値を公式が公表",
      "2社間・3社間の両方に対応",
      "24時間対応（公式表示）",
      "審査通過率90%以上（公式表示）"
    ],
    cons: [
      "手数料の上限・買取可能額・必要書類が公式サイトに明示されておらず要問い合わせ",
      "個人事業主の利用可否が公式サイトに明示されていない",
      "設立2019年4月と比較的新しい"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2019年4月",
      capital: "1,000万円",
      address: "東京都千代田区神田小川町2-3-7-6F"
    },
    requiredDocuments: ["公式サイトに明示なし（問い合わせ時に案内）"],
    url: "https://tomodachi-my.com/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+56CXM2+4HV8+60OXE",
    category: ["審査甘い", "即日"]
  },
  {
    id: 19,
    name: "インボイスファクター",
    nameKana: "いんぼいすふぁくたー",
    slug: "invoice-factor",
    rating: 0,
    fees: { min: 0.5, max: 0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限（公式LPの比較表表記）",
    personalSupport: false,
    features: ["最短2時間入金", "手数料0.5%〜", "アクシアプラス運営"],
    description: "株式会社アクシアプラス（「いーばんく」と同じ運営会社）のファクタリングサービス。公式LPで手数料0.5%〜・最短2時間入金・審査通過率98%以上を表示しています。2社間・3社間に対応し、契約は非対面・対面・郵送から選択できます。",
    pros: [
      "即日入金（公式LP表示）",
      "運営会社は「いーばんく」と同じ株式会社アクシアプラス（法人実体を一次確認済み）",
      "参考: 同運営の「いーばんく」では手数料4%〜・2社間/3社間対応を公式表示"
    ],
    cons: [
      "手数料・買取可能額・必要書類・対象（個人事業主可否）が公式LPに明示されておらず要問い合わせ",
      "公式サイトがLPのみでサービス情報の記載が限定的",
      "設立2019年4月と比較的新しい"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2019年4月",
      capital: "1,000万円",
      address: "東京都千代田区神田小川町2-3-7-6F"
    },
    requiredDocuments: ["公式LPに明示なし（問い合わせ時に案内）"],
    url: "https://invoice-factor.jp/lp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+55RI0A+4HV8+BWVTE",
    category: ["即日"]
  },
  {
    id: 20,
    name: "株式会社No.1",
    nameKana: "なんばーわん",
    slug: "no1",
    rating: 0,
    fees: { min: 0.5, max: 15.0 },
    speed: "最短30分",
    minAmount: 500000,
    maxAmount: "3億円（以上は相談可）",
    personalSupport: true,
    features: ["手数料0.5%〜", "2社間・3社間対応", "診療・介護報酬対応"],
    description: "2016年設立、東池袋に本社を置く会社です。手数料は0.5%〜15%で、最短30分で振り込まれます。2社間・3社間の両方に対応し、診療報酬・介護報酬ファクタリングにも対応しています。",
    pros: [
      "手数料0.5%〜15%（公式表示）",
      "最短30分で振込（公式表示）",
      "2社間・3社間の両方に対応",
      "審査通過率95%以上（公式表示）",
      "診療報酬・介護報酬ファクタリングに対応",
      "名古屋・福岡支社あり・全国対応"
    ],
    cons: [
      "最低買取額が50万円〜で少額には不向き",
      "受付は平日9:00〜19:00のみ（土日祝休）"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2016年1月",
      capital: "8,000万円",
      address: "東京都豊島区東池袋1-18-1 Hareza Tower 20F"
    },
    requiredDocuments: ["請求書", "通帳コピー", "決算書（直近二期分・契約前の確認時）", "取引先との基本契約書（契約前の確認時）"],
    url: "https://no1service.co.jp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+48F84Q+4EKW+TS3OI",
    category: ["手数料安い", "即日"]
  },
  {
    id: 21,
    name: "セーフトラスト",
    nameKana: "せーふとらすと",
    slug: "safe-trust",
    rating: 0,
    fees: { min: 0, max: 0 },
    speed: "最短即日",
    minAmount: 200000,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["最大1億円", "2社間対応", "オンライン完結"],
    description: "2社間ファクタリング・最大1億円・最短即日入金のSAFE TRUST株式会社。手数料は、売掛先の与信や債権の内容により個別に決定されます（手数料率の公式表示はありません）。",
    pros: [
      "最短即日入金",
      "最大1億円まで対応",
      "審査通過率90%以上（公式表示）",
      "オンライン完結可",
      "法人・個人事業主とも対応",
      "売掛先への通知は原則なし・赤字決算でも相談可"
    ],
    cons: [
      "手数料率の公式表示がなく個別査定",
      "設立年・資本金・代表者が公式サイトで確認できず",
      "給与ファクタリング・個人間取引は不可"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "公式サイトでは確認できず",
      capital: "900万円",
      address: "大阪府大阪市中央区北久宝寺町3-6-1 本町南ガーデンシティ7階"
    },
    requiredDocuments: ["請求書", "直近3か月分の通帳履歴", "顔写真付き身分証明書", "決算書（法人）"],
    url: "https://safe-trust.co.jp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+50ELKA+5VEA+5YRHE",
    category: ["即日", "個人事業主"]
  },
  {
    id: 22,
    name: "エーストラスト",
    nameKana: "えーすとらすと",
    slug: "ace-trust",
    rating: 0,
    fees: { min: 1.0, max: 15.0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "5,000万円（審査により1億円）",
    personalSupport: false,
    features: ["最短2時間", "オンライン完結", "INBUYS"],
    description: "港区西新橋の債権買取会社。最短2時間で送金、来店・面談不要のオンライン完結型サービス「INBUYS」（2社間のみ）を提供しています。手数料は2社間5〜15%以内・3社間1.0〜4.9%以内（公式表示）で、償還請求権はありません。",
    pros: [
      "最短2時間で送金（公式表示）",
      "来店・面談不要のオンライン完結型（INBUYS）",
      "審査通過率90%以上（公式表示）",
      "2社間ファクタリング対応"
    ],
    cons: [
      "手数料表記がサイト内で1%〜と2%〜で混在しており実質は個別査定",
      "設立年・資本金が公式サイトで確認できず",
      "買取可能額・必要書類の明示なし",
      "個人事業主の利用可否が明示されていない"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "公式サイトでは確認できず",
      capital: "公式サイトでは確認できず",
      address: "東京都港区西新橋2-6-1 第二菊家ビル4階"
    },
    requiredDocuments: ["銀行口座の通帳（直近3か月分）", "請求書（発注書・請書・納品書など）", "身分証明書"],
    url: "https://ace-trust.com/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+5BPU22+5T7O+5YJRM",
    category: ["即日"]
  },
  {
    id: 23,
    name: "ファクタープラン",
    nameKana: "ふぁくたーぷらん",
    slug: "factor-plan",
    rating: 0,
    fees: { min: 0, max: 0 },
    speed: "最短即日",
    minAmount: 500000,
    maxAmount: "5,000万円",
    personalSupport: false,
    features: ["法人限定", "最短即日", "クラウドサイン契約"],
    description: "株式会社ワイズコーポレーションが運営する、法人限定のファクタリングです。最短即日で資金化でき、クラウドサインによる電子契約のため来店は不要です（印紙代0円）。最低買取額は50万円です。",
    pros: [
      "法人専門で専任担当者が一貫サポート",
      "最短即日で資金化",
      "クラウドサイン電子契約・来店不要（印紙代0円）",
      "担保・保証人不要",
      "取扱実績1万件超（公式表示）"
    ],
    cons: [
      "法人限定（個人事業主・フリーランスは利用不可）",
      "手数料率の公式表示がなく要見積もり（「明朗手数料」表記のみ）",
      "最低買取額50万円〜"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2017年3月（運営: 株式会社ワイズコーポレーション）",
      capital: "公式サイトでは確認できず",
      address: "東京都豊島区池袋2-50-9 第三共立ビル3F"
    },
    requiredDocuments: ["通帳の写し（過去3ヶ月分）", "売掛先との契約書・請求書・発注書等", "（契約時）会社謄本・印鑑証明書", "（契約時）代表者の住民票・顔写真付き身分証明証"],
    url: "https://factorplan.net/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+53Z76Y+5RC6+5YJRM",
    category: ["法人専用", "即日"]
  },
  {
    id: 24,
    name: "ファクタリングのTRY",
    nameKana: "ふぁくたりんぐのとらい",
    slug: "try",
    rating: 0,
    fees: { min: 3.0, max: 0 },
    speed: "最短2時間",
    minAmount: 100000,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["365日24時間受付", "債権譲渡登記不要", "2社間・3社間対応"],
    description: "株式会社SKOが運営しています。365日24時間受付で、オンライン契約の場合は最短2時間で入金されます。手数料は2社間3%〜・3社間1.2%〜で、債権譲渡登記は不要です。",
    pros: [
      "365日24時間受付（公式表示）",
      "最短2時間入金（オンライン契約時・公式表示）",
      "手数料2社間3%〜・3社間1.2%〜（公式表示）",
      "債権譲渡登記不要で利用可能",
      "審査通過率97%（公式表示）",
      "信用情報機関への照会なし"
    ],
    cons: [
      "設立年・資本金・代表者が公式サイトで確認できず",
      "必要書類の明示なし"
    ],
    reviewCount: 0,
    companyInfo: {
      established: "2018年2月（運営: 株式会社SKO）",
      capital: "1,000万円",
      address: "東京都台東区東上野2-21-1 ケーワイビル4F"
    },
    requiredDocuments: ["請求書", "発注書または契約書", "売掛先の住所・連絡先", "銀行通帳（3か月分）"],
    url: "https://www.factoring-try-sko.co.jp/",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4B650J+4BEE5M+50EQ+5YJRM",
    category: ["即日", "審査甘い"]
  }
];

export const getCompanyBySlug = (slug: string): FactoringCompany | undefined => {
  return factoringCompanies.find(company => company.slug === slug);
};

export const getCompaniesByCategory = (category: string): FactoringCompany[] => {
  return factoringCompanies.filter(company => company.category.includes(category));
};

export const getTopCompanies = (limit: number = 15): FactoringCompany[] => {
  return factoringCompanies.slice(0, limit);
};

// 手数料の範囲表示（上限と下限が同じ一律手数料は「10%」のように1つの値で表示する）
export const feeRange = (fees: { min: number; max: number }): string =>
  fees.min === fees.max ? `${fees.min}%` : `${fees.min}%〜${fees.max}%`;
