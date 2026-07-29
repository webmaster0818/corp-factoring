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
  minAmount: number;
  maxAmount: string;
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
    fees: { min: 6.4, max: 9.7 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["実績豊富", "注文書対応", "医療対応", "全国対応"],
    description: "業界トップクラスの実績を誇る大手ファクタリング会社。累計取引91,000社以上、累計買取1,824億円の圧倒的な実績。",
    pros: [
      "累計取引91,000社以上の実績",
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
    fees: { min: 1.0, max: 14.8 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["書類2点のみ", "オンライン完結", "手数料明示"],
    description: "必要書類2点のみ、オンライン完結で最短2時間入金。手数料1%〜と業界最安水準。",
    pros: [
      "手数料1%〜と業界最安水準",
      "必要書類2点のみ（請求書、通帳）",
      "オンライン完結",
      "審査時間最短30分",
      "手数料上限が明示されている"
    ],
    cons: [
      "対面相談は不可",
      "3社間ファクタリング非対応"
    ],
    reviewCount: 1820,
    companyInfo: {
      established: "2017年",
      capital: "1億円",
      address: "東京都豊島区東池袋3-1-1 サンシャイン60 45階"
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
    fees: { min: 0.5, max: 12.0 },
    speed: "最短2時間",
    minAmount: 300000,
    maxAmount: "上限なし",
    personalSupport: true,
    features: ["超低手数料", "柔軟審査", "全国対応"],
    description: "手数料0.5%〜と業界最低水準。審査通過率93%と高い通過率を誇る。",
    pros: [
      "手数料0.5%〜と業界最低",
      "審査通過率93%",
      "即日振込対応",
      "来店不要・オンライン完結",
      "個人事業主OK"
    ],
    cons: [
      "最低買取額30万円から",
      "3社間ファクタリング非対応"
    ],
    reviewCount: 1650,
    companyInfo: {
      established: "2018年",
      capital: "5,000万円",
      address: "東京都新宿区西新宿8-17-1 住友不動産新宿グランドタワー38階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://accelfacter.co.jp/",
    category: ["手数料安い", "審査甘い", "即日"]
  },
  {
    id: 4,
    name: "ベストファクター",
    nameKana: "べすとふぁくたー",
    slug: "best-factor",
    rating: 4.7,
    fees: { min: 2.0, max: 20.0 },
    speed: "最短即日",
    minAmount: 300000,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["少額対応", "審査通過率92.25%", "個人OK"],
    description: "10万円から対応、審査通過率92.25%。個人事業主・フリーランスに強い。",
    pros: [
      "10万円から少額対応",
      "審査通過率92.25%と高い",
      "個人事業主・フリーランスOK",
      "平均5分で審査完了",
      "オンライン完結"
    ],
    cons: [
      "手数料上限が20%とやや高め",
      "3社間非対応"
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
    fees: { min: 1.0, max: 10.0 },
    speed: "最短2時間",
    minAmount: 500000,
    maxAmount: "2億円（応相談）",
    personalSupport: true,
    features: ["超速入金", "手数料安い", "オンライン完結"],
    description: "最短2時間で入金可能。手数料1%〜と低水準で、スピードとコストを両立。",
    pros: [
      "最短2時間で入金",
      "手数料1%〜と低水準",
      "審査時間30分",
      "オンライン完結",
      "個人事業主OK"
    ],
    cons: [
      "実績が他社より少ない",
      "3社間非対応"
    ],
    reviewCount: 980,
    companyInfo: {
      established: "2015年6月",
      capital: "2,000万円",
      address: "東京都港区赤坂2-14-27 国際新赤坂ビル東館17階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
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
    speed: "最短10分",
    minAmount: 10000,
    maxAmount: "1000万円",
    personalSupport: true,
    features: ["手数料一律10%", "超速", "個人特化"],
    description: "フリーランス・個人事業主特化。手数料一律10%で分かりやすい。最短10分入金。",
    pros: [
      "手数料一律10%で分かりやすい",
      "最短10分で入金",
      "1万円から対応",
      "AI審査で24時間対応",
      "個人事業主・フリーランス特化"
    ],
    cons: [
      "手数料が一律10%（少額だと割高）",
      "法人には不向き"
    ],
    reviewCount: 2150,
    companyInfo: {
      established: "2019年",
      capital: "14億4,244万円",
      address: "東京都港区赤坂1-12-32 アーク森ビル3階"
    },
    requiredDocuments: ["請求書", "身分証明書", "通帳"],
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
    maxAmount: "無制限",
    personalSupport: true,
    features: ["手数料一律10%", "個人特化", "開業直後OK"],
    description: "個人事業主・フリーランス特化。開業直後でも利用可能。手数料一律10%。",
    pros: [
      "手数料一律10%",
      "1万円から対応",
      "開業直後でも利用可能",
      "個人間取引OK",
      "24時間申込可能"
    ],
    cons: [
      "手数料が一律10%",
      "法人には不向き"
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
    features: ["超低手数料", "AI審査", "超速"],
    description: "手数料1%〜9.5%と業界最安。AI審査で最短30分入金。",
    pros: [
      "手数料1%〜9.5%と業界最安",
      "最短30分で入金",
      "AI審査で24時間対応",
      "オンライン完結",
      "手数料上限が明示"
    ],
    cons: [
      "最低買取額10万円から",
      "実績がやや少ない"
    ],
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
    fees: { min: 1.5, max: 10.0 },
    speed: "最短3時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["FACTOR⁺U（ファクトル）", "経営革新等支援機関", "非営利団体"],
    description: "経営革新等支援機関認定の非営利団体。ファクタリングサービスの正式名称は「FACTOR⁺U（ファクトル）」。手数料1.5%〜10%と低水準。",
    pros: [
      "非営利団体運営で信頼性高",
      "経営革新等支援機関認定",
      "手数料1.5%〜10%",
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
      established: "2017年",
      capital: "非営利団体",
      address: "東京都港区芝公園一丁目3-5 ジー・イー・ジャパンビル2階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
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
    features: ["東証プライム上場", "会計ソフト連携", "信頼性抜群"],
    description: "マネーフォワードグループが提供。会計ソフト連携でスムーズ。信頼性抜群。",
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
    fees: { min: 0.5, max: 12.5 },
    speed: "最短即日",
    minAmount: 300000,
    maxAmount: "3億円",
    personalSupport: true,
    features: ["高額対応", "3社間対応", "長期実績"],
    description: "13年の実績。3社間ファクタリング対応。高額案件に強い。",
    pros: [
      "13年の長期実績",
      "3社間ファクタリング対応",
      "最大3億円まで対応",
      "対面相談可能",
      "建設業に強い"
    ],
    cons: [
      "最低買取額30万円",
      "オンライン完結不可"
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
    fees: { min: 2.0, max: 20.0 },
    speed: "最短即日",
    minAmount: 300000,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["審査通過率90%超", "柔軟審査", "全国対応"],
    description: "審査通過率90%超。赤字決算・税金滞納でも対応可能。",
    pros: [
      "審査通過率90%超",
      "赤字決算・税金滞納OK",
      "柔軟な審査",
      "即日対応",
      "全国対応"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要",
      "最低買取額30万円"
    ],
    reviewCount: 720,
    companyInfo: {
      established: "2009年9月",
      capital: "3,000万円",
      address: "東京都新宿区新宿4-3-17 FORECAST新宿SOUTH 8階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
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
    fees: { min: 5.0, max: 20.0 },
    speed: "最短即日",
    minAmount: 500000,
    maxAmount: "5000万円",
    personalSupport: false,
    features: ["少額対応", "24時間対応", "個人OK"],
    description: "50万円から対応。24時間対応で土日祝も申込可能。",
    pros: [
      "50万円から対応",
      "24時間対応",
      "土日祝も申込可能",
      "個人事業主OK",
      "即日対応"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要",
      "3社間非対応"
    ],
    reviewCount: 580,
    companyInfo: {
      established: "2017年",
      capital: "1,000万円",
      address: "東京都台東区東上野3-5-9 本池田第一ビル4階"
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
    maxAmount: "1000万円",
    personalSupport: true,
    features: ["GMO運営", "損害賠償保険付", "個人特化"],
    description: "GMOクリエイターズネットワーク運営。損害賠償保険付き。",
    pros: [
      "GMO運営で信頼性高",
      "損害賠償保険付き",
      "1万円から対応",
      "個人事業主・フリーランス特化",
      "手数料3%〜10%"
    ],
    cons: [
      "法人には不向き",
      "審査がやや厳しい"
    ],
    reviewCount: 1380,
    companyInfo: {
      established: "2018年",
      capital: "GMOグループ",
      address: "東京都渋谷区桜丘町26-1 セルリアンタワー"
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
    fees: { min: 3.0, max: 15.0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["オンライン完結", "個人OK", "柔軟審査"],
    description: "オンライン完結で最短2時間入金。個人事業主・フリーランスOK。",
    pros: [
      "オンライン完結",
      "最短2時間入金",
      "個人事業主OK",
      "少額対応",
      "柔軟審査"
    ],
    cons: [
      "手数料率が公式で非公示のため、事前に見積もりでの確認が必要",
      "実績が少ない"
    ],
    reviewCount: 420,
    companyInfo: {
      established: "2020年",
      capital: "1,000万円",
      address: "東京都中央区銀座7-13-6 サガミビル2階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
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
    description: "2013年設立・名古屋本社の老舗。手数料1.2%〜10%、取扱件数1万件超・取扱金額500億円の実績。100万円以上の中〜高額債権に強い。",
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
    features: ["一括申込サービス", "完全無料", "法人専用"],
    description: "法人専用のファクタリング一括申込サービス。1回の入力で最大3社に一括申込みでき、条件を比較して契約先を選べる。申込サービス自体は完全無料。",
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
    maxAmount: "公式では確認できず",
    personalSupport: false,
    features: ["審査通過率90%以上", "24時間対応", "2社間・3社間対応"],
    description: "手数料4%〜・最短即日（公式は平均2.3日という実測値も公表）。2社間・3社間の両方に対応し、審査通過率90%以上を公式表示。※「いーばんく」は広告・プロモーション上の名称で、公式サイトの表記は「アクシアプラスのファクタリング」。同社は「インボイスファクター」も運営。",
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
      address: "東京都千代田区神田小川町2-3-7 6F"
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
    fees: { min: 0, max: 0 },
    speed: "最短即日",
    minAmount: 0,
    maxAmount: "公式では確認できず",
    personalSupport: false,
    features: ["即日入金", "アクシアプラス運営", "いーばんくと同運営"],
    description: "株式会社アクシアプラス（「いーばんく」と同じ運営会社）のファクタリングサービス。公式LPで即日入金を訴求。手数料・買取可能額などの詳細は公式LPに明示がなく、要問い合わせ。",
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
      address: "東京都千代田区神田小川町2-3-7 6F"
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
    description: "2016年設立・東池袋本社。手数料0.5%〜15%、最短30分で振込。2社間・3社間両対応で、診療報酬・介護報酬ファクタリングにも対応。",
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
    requiredDocuments: ["請求書", "通帳コピー"],
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
    minAmount: 0,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["最大1億円", "2社間対応", "オンライン完結"],
    description: "2社間ファクタリング・最大1億円・最短即日入金のSAFE TRUST株式会社。手数料は売掛先の与信や債権内容により個別決定（率の公式表示なし）。",
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
      capital: "公式サイトでは確認できず",
      address: "公式サイトでは確認できず"
    },
    requiredDocuments: ["公式サイトに明示なし（問い合わせ時に案内）"],
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
    fees: { min: 0, max: 0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "公式では確認できず",
    personalSupport: false,
    features: ["最短2時間", "オンライン完結", "INBUYS"],
    description: "港区西新橋の債権買取会社。最短2時間で送金、来店・面談不要のオンライン完結型サービス「INBUYS」を提供。手数料は業界最安級を標榜（率は実質個別査定）。",
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
    requiredDocuments: ["公式サイトに明示なし（問い合わせ時に案内）"],
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
    maxAmount: "公式では確認できず",
    personalSupport: false,
    features: ["法人限定", "最短即日", "クラウドサイン契約"],
    description: "株式会社ワイズコーポレーション運営の法人限定ファクタリング。最短即日資金化・クラウドサイン電子契約で来店不要（印紙代0円）。最低買取額50万円〜。",
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
      established: "公式サイトでは確認できず（運営: 株式会社ワイズコーポレーション）",
      capital: "公式サイトでは確認できず",
      address: "東京都豊島区池袋2-50-9 第三共立ビル3F"
    },
    requiredDocuments: ["公式サイトに明示なし（問い合わせ時に案内）"],
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
    minAmount: 0,
    maxAmount: "1億円",
    personalSupport: true,
    features: ["365日24時間受付", "債権譲渡登記不要", "2社間・3社間対応"],
    description: "株式会社SKO運営。365日24時間受付・オンライン契約なら最短2時間入金。手数料は2社間3%〜/3社間1.2%〜、債権譲渡登記不要。",
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
      established: "公式サイトでは確認できず（運営: 株式会社SKO）",
      capital: "公式サイトでは確認できず",
      address: "東京都台東区東上野2-21-1 ケーワイビル4F"
    },
    requiredDocuments: ["公式サイトに明示なし（問い合わせ時に案内）"],
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
