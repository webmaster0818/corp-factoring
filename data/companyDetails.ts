// 各業者の詳細情報（営業時間、拠点、FAQ、利用の流れなど）

export interface CompanyOperatingHours {
  weekdays: string;
  saturday?: string;
  sunday?: string;
  holidays?: string;
  note?: string;
}

export interface CompanyOffice {
  name: string;
  address: string;
  mapUrl?: string;
}

export interface CompanyAudit {
  passRate?: string;
  features: string[];
}

export interface CompanyFlowStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface CompanyFAQ {
  question: string;
  answer: string;
}

export interface CompanyComparison {
  companyName: string;
  amount: string;
  speed: string;
  target: string;
  note?: string;
}

export interface CompanyPerformanceData {
  year: number;
  amount: string; // 買取債権額（例: "1億円"）
  users: string;  // 利用者数（例: "350社"）
}

export interface CompanyMediaCoverage {
  name: string;
  url?: string;
  date?: string;
  description?: string;
}

export interface CompanyDetailData {
  operatingHours: CompanyOperatingHours;
  offices: CompanyOffice[];
  audit: CompanyAudit;
  flow: CompanyFlowStep[];
  faqs: CompanyFAQ[];
  comparisons: CompanyComparison[];
  performance?: CompanyPerformanceData[];
  mediaCoverage?: CompanyMediaCoverage[];
}

// ビートレーディングの詳細情報
const beTradingDetails: CompanyDetailData = {
  operatingHours: {
    weekdays: "平日 9:30 〜 18:00",
    saturday: "定休日",
    sunday: "定休日",
    holidays: "定休日",
    note: "年末年始は12月30日〜1月3日まで休業。17時までの契約完了で即日入金可能。"
  },
  offices: [
    {
      name: "東京本社",
      address: "〒105-0012 東京都港区芝大門1-2-18 野依ビル3階・4階",
      mapUrl: "https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%93%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0+%E6%9D%B1%E4%BA%AC%E6%9C%AC%E7%A4%BE"
    },
    {
      name: "仙台支店",
      address: "〒980-0014 宮城県仙台市青葉区本町1-12-7 三共仙台ビル3階",
      mapUrl: "https://www.google.com/maps/place/%E3%88%B1%E3%83%93%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0+%E4%BB%99%E5%8F%B0%E6%94%AF%E5%BA%97"
    },
    {
      name: "名古屋支店",
      address: "〒460-0008 愛知県名古屋市中区栄2-4-1 広小路栄ビルディング5階",
      mapUrl: "https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%93%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0+%E5%90%8D%E5%8F%A4%E5%B1%8B%E6%94%AF%E5%BA%97"
    },
    {
      name: "大阪支店",
      address: "〒530-0027 大阪府大阪市北区堂山町1-5 三共梅田ビル9階",
      mapUrl: "https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%93%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0+%E5%A4%A7%E9%98%AA%E6%94%AF%E5%BA%97"
    },
    {
      name: "福岡支店",
      address: "〒812-0013 福岡県福岡市博多区博多駅東1-1-33 はかた近代ビル8階",
      mapUrl: "https://www.google.com/maps/place/%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE%E3%83%93%E3%83%BC%E3%83%88%E3%83%AC%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0+%E7%A6%8F%E5%B2%A1%E6%94%AF%E5%BA%97"
    }
  ],
  audit: {
    passRate: "非公開",
    features: [
      "豊富な取引実績により、売掛債権の未回収リスクを正確に査定",
      "一般的にリスクが高いと思われる債権でも買取対応",
      "月末の繁忙期は審査が厳しくなる傾向",
      "30万円以下の少額債権は審査難易度が高い"
    ]
  },
  flow: [
    {
      step: 1,
      title: "問い合わせ",
      description: "電話・メール・Webフォーム・LINEで申し込み。希望調達額や調達日時をヒアリング。",
      duration: "数分"
    },
    {
      step: 2,
      title: "必要書類提出・審査",
      description: "請求書と通帳のコピーを提出。メール・LINE・FAXで送信可能。",
      duration: "最短30分"
    },
    {
      step: 3,
      title: "契約・入金",
      description: "買取金額の提示後、契約を締結。オンライン完結で入金。",
      duration: "最短2時間"
    }
  ],
  faqs: [
    {
      question: "土日に対応していますか？",
      answer: "土日は定休日のため、審査・入金には対応しておりません。平日9:30〜18:00の営業時間内にお問い合わせください。"
    },
    {
      question: "利用できない業種はありますか？",
      answer: "売掛先が法人であれば、どのような業種でも対応可能です。個人事業主・フリーランスの方もご利用いただけます。"
    },
    {
      question: "初めてのファクタリングでも利用できますか？",
      answer: "はい、初めての方でも丁寧にサポートいたします。専任担当者が付き、ファクタリングの仕組みから分かりやすく説明いたします。"
    },
    {
      question: "審査に必要な書類は？",
      answer: "基本的には請求書と通帳のコピー（2ヶ月分）の2点のみです。状況に応じて追加書類をお願いする場合がございます。"
    },
    {
      question: "手数料はどのくらいですか？",
      answer: "2社間ファクタリングは4〜12%程度、3社間ファクタリングは2〜9%程度です。売掛先の信用力や取引履歴によって変動します。"
    }
  ],
  comparisons: [
    {
      companyName: "PMG",
      amount: "50万円〜2億円以上",
      speed: "最短2時間",
      target: "法人",
      note: "大口の資金調達が得意"
    },
    {
      companyName: "ベストファクター",
      amount: "30万円〜1億円",
      speed: "最短30分",
      target: "個人事業主・法人",
      note: "入金スピードが早い"
    },
    {
      companyName: "ペイトナー",
      amount: "1万円〜30万円（初回）",
      speed: "最短10分",
      target: "個人事業主・フリーランス",
      note: "少額の資金調達が得意"
    }
  ],
  performance: [
    { year: 2013, amount: "1億円", users: "350社" },
    { year: 2014, amount: "32億円", users: "1,450社" },
    { year: 2015, amount: "61億円", users: "2,420社" },
    { year: 2016, amount: "80億円", users: "3,150社" },
    { year: 2017, amount: "105億円", users: "4,120社" },
    { year: 2018, amount: "125億円", users: "4,610社" },
    { year: 2019, amount: "142億円", users: "5,250社" },
    { year: 2020, amount: "144億円", users: "5,320社" },
    { year: 2021, amount: "156億円", users: "7,700社" },
    { year: 2022, amount: "173億円", users: "9,300社" },
    { year: 2023, amount: "216億円", users: "11,200社" },
    { year: 2024, amount: "250億円", users: "12,600社" }
  ],
  mediaCoverage: [
    {
      name: "日本経済新聞",
      url: "https://www.nikkei.com/article/DGXZQOGC225T70S1A120C2000000/",
      description: "ファクタリングサービスの先駆者として紹介"
    },
    {
      name: "東京MIX",
      url: "https://www.youtube.com/watch?v=w6U8biQ7BJQ",
      description: "おすすめのファクタリング会社として特集"
    }
  ]
};

// QuQuMo（ククモ）の詳細情報
const quQuMoDetails: CompanyDetailData = {
  operatingHours: {
    weekdays: "平日 9:00 〜 18:00（オンライン申込は24時間受付）",
    saturday: "定休日",
    sunday: "定休日",
    holidays: "定休日"
  },
  offices: [
    {
      name: "本社",
      address: "〒171-0022 東京都豊島区南池袋2-13-10 南池袋山本ビル3階"
    }
  ],
  audit: {
    features: [
      "オンライン完結で柔軟な審査",
      "必要書類は請求書と通帳の2点のみ",
      "手数料1%〜と業界最安水準",
      "売掛金があれば個人事業主も利用可能"
    ]
  },
  flow: [
    {
      step: 1,
      title: "お申込み",
      description: "メールアドレスとパスワードを登録。Webフォームから必要情報を入力。",
      duration: "10分"
    },
    {
      step: 2,
      title: "お見積り",
      description: "請求書と通帳（3ヶ月分）をアップロード。審査後、買取額と手数料を提示。",
      duration: "30分"
    },
    {
      step: 3,
      title: "ご契約・送金",
      description: "クラウドサインで契約締結。契約後、最短で振込。",
      duration: "1時間"
    }
  ],
  faqs: [
    {
      question: "融資とは違うのでしょうか？",
      answer: "違います。融資とは違い弊社が売掛金を買取する事で資金調達を行えます。"
    },
    {
      question: "担保は必要でしょうか？",
      answer: "いいえ、必要ございません。"
    },
    {
      question: "売掛先が倒産した場合はどうしたらいいのでしょうか？",
      answer: "売掛先の倒産リスクも含めてお買取をさせていただきますので、お客様に返済の義務はございません。QuQuMoではノンリコース【償還請求権なし】での契約になりますのでご安心ください。"
    },
    {
      question: "銀行借入がありますが、資金調達は可能でしょうか？",
      answer: "はい、売掛金があれば可能です。QuQuMoの契約は借入とは異なる為、信用情報にも一切関わりなくご利用いただけます。"
    },
    {
      question: "契約や利用するにあたり面談はありますでしょうか？",
      answer: "いいえ、必要ございません。申込から契約締結まで全てオンライン完結で利用可能です。ただし、お客様の状況に応じてサポート窓口よりお電話にて簡単なヒアリングをさせていただく場合があります。"
    },
    {
      question: "入金までどのくらいの時間がかかりますか？",
      answer: "最短で申込から入金まで2時間です。ただし、必要書類がそろっている前提となります。"
    }
  ],
  comparisons: []
};

// デフォルトの詳細情報（他の業者用）
const defaultDetails: CompanyDetailData = {
  operatingHours: {
    weekdays: "平日 9:00 〜 18:00",
    saturday: "定休日",
    sunday: "定休日",
    holidays: "定休日"
  },
  offices: [
    {
      name: "本社",
      address: "東京都内"
    }
  ],
  audit: {
    features: [
      "柔軟な審査対応",
      "豊富な実績による正確な査定"
    ]
  },
  flow: [
    {
      step: 1,
      title: "問い合わせ",
      description: "電話・メール・Webフォームで申し込み。",
      duration: "数分"
    },
    {
      step: 2,
      title: "必要書類提出・審査",
      description: "請求書などの必要書類を提出。",
      duration: "最短即日"
    },
    {
      step: 3,
      title: "契約・入金",
      description: "契約を締結後、入金。",
      duration: "最短即日"
    }
  ],
  faqs: [
    {
      question: "土日に対応していますか？",
      answer: "営業時間については公式サイトをご確認ください。"
    },
    {
      question: "利用できない業種はありますか？",
      answer: "基本的にどの業種でもご利用いただけます。詳しくはお問い合わせください。"
    }
  ],
  comparisons: []
};

import { getCompanyBySlug } from "./companies";

export function getCompanyDetails(slug: string): CompanyDetailData {
  switch (slug) {
    case "be-trading":
      return beTradingDetails;
    case "ququmo":
      return quQuMoDetails;
    default:
      // 既存のcompanyInfoから詳細データを生成
      const company = getCompanyBySlug(slug);
      if (!company) return defaultDetails;
      
      return {
        ...defaultDetails,
        offices: [
          {
            name: "本社",
            address: company.companyInfo.address
          }
        ],
        faqs: [
          {
            question: "土日に対応していますか？",
            answer: "営業時間については公式サイトをご確認ください。"
          },
          {
            question: "利用できない業種はありますか？",
            answer: "基本的にどの業種でもご利用いただけます。詳しくはお問い合わせください。"
          },
          {
            question: "初めてのファクタリングでも利用できますか？",
            answer: "はい、初めての方でも安心してご利用いただけます。専任担当者が丁寧にサポートいたします。"
          },
          {
            question: "審査に必要な書類は？",
            answer: `基本的には${company.requiredDocuments.join("、")}が必要です。状況に応じて追加書類をお願いする場合がございます。`
          },
          {
            question: "手数料はどのくらいですか？",
            answer: `手数料は${company.fees.min}%〜${company.fees.max}%程度です。売掛先の信用力や取引履歴によって変動します。`
          }
        ]
      };
  }
}
