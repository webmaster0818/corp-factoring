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
    fees: { min: 2.0, max: 12.0 },
    speed: "最短2時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["実績豊富", "注文書対応", "医療対応", "全国対応"],
    description: "業界トップクラスの実績を誇る大手ファクタリング会社。累計取引71,000社、累計買取1,550億円の圧倒的な実績。",
    pros: [
      "累計取引71,000社の実績",
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
    url: "https://example.com/be-trading",
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
    url: "https://example.com/ququmo",
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
    maxAmount: "1億円",
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
    url: "https://example.com/accel-factor",
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
    minAmount: 100000,
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
      capital: "3,000万円",
      address: "東京都新宿区西新宿3-7-1 新宿パークタワーN棟28階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://example.com/best-factor",
    category: ["審査甘い", "少額", "個人事業主"]
  },
  {
    id: 5,
    name: "PMG",
    nameKana: "ぴーえむじー",
    slug: "pmg",
    rating: 4.5,
    fees: { min: 2.0, max: 15.0 },
    speed: "最短1.5時間",
    minAmount: 0,
    maxAmount: "無制限",
    personalSupport: true,
    features: ["超速入金", "手数料安い", "オンライン完結"],
    description: "最短1.5時間で入金可能。手数料2%〜と低水準で、スピードとコストを両立。",
    pros: [
      "最短1.5時間で入金",
      "手数料2%〜と低水準",
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
      established: "2019年",
      capital: "2,000万円",
      address: "東京都港区赤坂2-14-27 国際新赤坂ビル東館17階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://example.com/pmg",
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
      capital: "5億円",
      address: "東京都港区赤坂1-12-32 アーク森ビル3階"
    },
    requiredDocuments: ["請求書", "身分証明書", "通帳"],
    url: "https://example.com/paytner",
    category: ["個人事業主", "少額", "即日"]
  },
  {
    id: 7,
    name: "ラボル",
    nameKana: "らぼる",
    slug: "labol",
    rating: 4.4,
    fees: { min: 10.0, max: 10.0 },
    speed: "最短即日",
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
      capital: "3億円",
      address: "東京都渋谷区渋谷2-24-12 渋谷スクランブルスクエア39階"
    },
    requiredDocuments: ["請求書", "身分証明書", "通帳"],
    url: "https://example.com/labol",
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
    url: "https://example.com/paytoday",
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
    features: ["非営利団体", "経営革新等支援機関", "信頼性高"],
    description: "経営革新等支援機関認定の非営利団体。手数料1.5%〜10%と低水準。",
    pros: [
      "非営利団体運営で信頼性高",
      "経営革新等支援機関認定",
      "手数料1.5%〜10%",
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
    url: "https://example.com/support-kinyu",
    category: ["手数料安い", "信頼性"]
  },
  {
    id: 10,
    name: "マネーフォワード アーリーペイメント",
    nameKana: "まねーふぉわーど あーりーぺいめんと",
    slug: "mf-earlypayment",
    rating: 4.3,
    fees: { min: 1.0, max: 10.0 },
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
    url: "https://example.com/mf-earlypayment",
    category: ["信頼性", "手数料安い"]
  },
  {
    id: 11,
    name: "トップマネジメント",
    nameKana: "とっぷまねじめんと",
    slug: "top-management",
    rating: 4.2,
    fees: { min: 3.5, max: 12.5 },
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
    url: "https://example.com/top-management",
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
      "手数料上限20%とやや高め",
      "最低買取額30万円"
    ],
    reviewCount: 720,
    companyInfo: {
      established: "2016年",
      capital: "3,000万円",
      address: "東京都新宿区新宿4-3-17 FORECAST新宿SOUTH 8階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://example.com/mentor-capital",
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
      "手数料5%〜20%とやや高め",
      "3社間非対応"
    ],
    reviewCount: 580,
    companyInfo: {
      established: "2017年",
      capital: "1,000万円",
      address: "東京都台東区東上野3-5-9 本池田第一ビル4階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://example.com/ennavi",
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
    url: "https://example.com/freenance",
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
      "手数料3%〜15%とやや高め",
      "実績が少ない"
    ],
    reviewCount: 420,
    companyInfo: {
      established: "2020年",
      capital: "1,000万円",
      address: "東京都中央区銀座7-13-6 サガミビル2階"
    },
    requiredDocuments: ["請求書", "通帳", "身分証明書"],
    url: "https://example.com/minna-factoring",
    category: ["個人事業主", "即日"]
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
