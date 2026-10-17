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
    note: "年末年始は12月30日〜1月3日まで休業です。17時までに契約が完了すれば、即日入金が可能です。"
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
      "一般にリスクが高いとされる債権にも買取の実績あり",
      "月末の繁忙期は審査が厳しくなる傾向あり",
      "30万円以下の少額債権は審査の難易度が高い"
    ]
  },
  flow: [
    {
      step: 1,
      title: "問い合わせ",
      description: "電話・メール・Webフォーム・LINEで申し込みます。希望する調達額や調達日時の確認があります。",
      duration: "数分"
    },
    {
      step: 2,
      title: "必要書類提出・審査",
      description: "請求書と通帳のコピーを提出します。メール・LINE・FAXで送信できます。",
      duration: "最短30分"
    },
    {
      step: 3,
      title: "契約・入金",
      description: "買取金額の提示後に契約を締結し、オンラインで手続きが完了すると入金されます。",
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
      answer: "公式に表示されている手数料は、2社間ファクタリングが4%〜、3社間ファクタリングが2%〜で、上限率は公式に記載がありません。2024年度の平均は2社間10.3%・3社間6.8%と公式FAQに記載されています。売掛先の信用力や取引履歴によって変動します。"
    }
  ],
  comparisons: [
    {
      companyName: "PMG",
      amount: "50万円〜2億円以上",
      speed: "最短2時間",
      target: "法人",
      note: "大口の資金調達に対応"
    },
    {
      companyName: "ベストファクター",
      amount: "30万円〜1億円",
      speed: "最短30分",
      target: "個人事業主・法人",
      note: "入金までの時間が短い"
    },
    {
      companyName: "ペイトナー",
      amount: "1万円〜（初回50万円・最大300万円）",
      speed: "最短即日",
      target: "個人事業主・フリーランス",
      note: "少額の資金調達に対応"
    }
  ],
  // 実績推移データ・メディア掲載は出典の一次確認が取れていないため非表示（架空情報を出さない方針 2026-06-14）
  performance: [],
  mediaCoverage: []
};

// QuQuMo（ククモ）の詳細情報
const quQuMoDetails: CompanyDetailData = {
  // 2026年8月22日に公式サイト（https://ququmo.net/）で一次確認。
  // 旧値「平日 9:00〜18:00／土日祝 定休日」は Phase8 の自動生成値で公式表示と不一致だったため、
  // 公式のフリーダイヤル表記（TEL:0120-670-680 平日 9:00〜19:00）に置き換え、
  // 公式に明示のない定休日の記載は削除した（架空情報を出さない方針）。
  operatingHours: {
    weekdays: "電話受付 平日 9:00〜19:00",
    note: "公式サイトのフリーダイヤル表記（0120-670-680）に「平日 9:00〜19:00」と記載されています。土日祝の対応・定休日は、公式サイトでは確認できませんでした（2026年8月22日確認）。"
  },
  offices: [
    {
      name: "本社",
      address: "〒171-0022 東京都豊島区南池袋2-13-10 南池袋山本ビル3階"
    }
  ],
  audit: {
    features: [
      "オンライン完結で、審査は柔軟",
      "必要書類は請求書と通帳の2点",
      "手数料は1%からと業界でも低い水準",
      "売掛金があれば個人事業主も利用可能"
    ]
  },
  flow: [
    {
      step: 1,
      title: "お申込み",
      description: "メールアドレスとパスワードを登録し、Webフォームから必要な情報を入力します。",
      duration: "10分"
    },
    {
      step: 2,
      title: "お見積り",
      description: "請求書と通帳（3か月分）をアップロードします。審査後、買取額と手数料が提示されます。",
      duration: "30分"
    },
    {
      step: 3,
      title: "ご契約・送金",
      description: "クラウドサインで契約を締結します。契約後、最短で振り込まれます。",
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
    // 個別確認が済んでいない会社のフォールバック。実測値はoperatingHoursMapに登録すること（架空の時刻を置かない）
    weekdays: "公式サイトの最新の受付時間をご確認ください",
    note: "営業時間・定休日は公式サイトで直接ご確認ください。"
  },
  offices: [
    {
      name: "本社",
      address: "東京都内"
    }
  ],
  audit: {
    features: [
      "審査は柔軟",
      "実績にもとづく査定"
    ]
  },
  flow: [
    {
      step: 1,
      title: "問い合わせ",
      description: "電話・メール・Webフォームで申し込みます。",
      duration: "数分"
    },
    {
      step: 2,
      title: "必要書類提出・審査",
      description: "請求書などの必要書類を提出します。",
      duration: "最短即日"
    },
    {
      step: 3,
      title: "契約・入金",
      description: "契約の締結後に入金されます。",
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
      answer: "基本的にどの業種でも利用できます。詳しくは各社にお問い合わせください。"
    }
  ],
  comparisons: []
};

import { getCompanyBySlug } from "./companies";

// 各社公式サイトで確認した営業時間（確認日 2026年7月8日）。公式に明示のないものは note に「公式では確認できず」と記載。
const operatingHoursMap: { [slug: string]: CompanyOperatingHours } = {
  "ennavi": { weekdays: "24時間365日 対応（受付）", note: "公式サイトに「24時間365日対応」と記載されており、オンライン申込は常時受け付けています。具体的な電話受付の時間帯・定休日は、公式サイトでは確認できませんでした（2026年7月8日確認）。" },
  "accel-factor": { weekdays: "電話受付 平日 10:00〜18:30", saturday: "休業", sunday: "休業", holidays: "休業", note: "オンライン見積フォームは24時間365日受け付けています（公式・2026年7月8日確認）。" },
  "freenance": { weekdays: "オンライン完結（即日払いは当日16:30までの承認で当日振込・以降翌営業日）", note: "営業時間・定休日・土日の対応は、公式サイトでは確認できませんでした（2026年7月8日確認）。" },
  "paytoday": { weekdays: "平日 9:00〜17:00", note: "問い合わせフォームは24時間受け付けています。AI審査により、オンラインで完結します（公式FAQ・2026年7月8日確認）。" },
  "support-kinyu": { weekdays: "平日 9:30〜18:00", note: "機構の受付時間は平日9:30〜18:00です。オンラインのFACTOR⁺U（ファクトル）も営業時間は平日9:30〜18:00で、申請は24時間受け付けていますが、対応は翌営業日となります。契約の締結が17時以降の場合、銀行によっては入金が翌営業日となります。土日祝の対応は、公式サイトでは確認できませんでした（2026年10月16日確認）。" },
  "paytner": { weekdays: "審査 毎日10:00〜19:00（申込は24時間受付）", saturday: "審査 10:00〜19:00", sunday: "審査 10:00〜19:00", holidays: "審査 10:00〜19:00", note: "公式FAQに「審査について 土日祝を含む毎日10:00〜19:00に対応」「お申し込み自体は年中無休・24時間」と記載。原則として当日19:00までの申込であれば当日中に審査結果が連絡され、時間外の申請は翌営業日の入金となります。問い合わせはチャットのみで受け付けています（2026年10月14日確認）。" },
  "labol": { weekdays: "24時間365日 随時対応（オンライン完結）", note: "最短30分で入金されます。年始等に休業日が設定される場合があります（公式・2026年7月8日確認）。" },
  "pmg": { weekdays: "電話 8:00〜20:00（Webフォームは24時間受付）", saturday: "電話 8:00〜20:00（Webフォームは24時間受付）", sunday: "電話 8:00〜20:00（Webフォームは24時間受付）", holidays: "電話 8:00〜20:00（Webフォームは24時間受付）", note: "公式の土日ファクタリングのページに「電話 受付時間：8:00-20:00（平日/土日/祝日）」「WEBお問合せフォーム 受付時間：24時間（平日/土日/祝日）」と記載されています。振込時間外に契約が完了した場合は、翌営業日の振込となります。公式サイトの一部のページ下部には「電話サポート 営業時間：8:00〜22:00」との表記もあります（2026年10月14日確認）。" },
  "jtc": { weekdays: "電話受付 平日 9:00〜18:00", note: "土日祝も電話での対応が可能で、メール・FAXは24時間受け付けています。契約は事前予約制です（公式・2026年7月29日確認）。" },
  "ebank": { weekdays: "24時間対応（公式表示）", note: "電話・メールとも24時間対応と公式に表示されています。具体的な定休日は、公式サイトでは確認できませんでした（2026年10月14日確認）。" },
  "no1": { weekdays: "電話受付 平日 9:00〜19:00", saturday: "休業", sunday: "休業", holidays: "休業", note: "公式サイト全ページに「受付時間 平日 9：00 ～ 19：00（土日祝休）」と記載されています（2026年10月14日確認）。" },
  "factor-plan": { weekdays: "電話受付 平日 9:00〜19:00", note: "LINE・メールでの問い合わせは24時間受け付けています（公式・2026年10月14日確認）。" },
  "try": { weekdays: "営業時間 9:00〜18:00（電話・Web受付は365日24時間）", saturday: "定休（電話・Web受付は24時間）", sunday: "定休（電話・Web受付は24時間）", holidays: "定休（電話・Web受付は24時間）", note: "会社概要に「営業時間 9:00～18:00」「定休日 土曜日･日曜日･祝日」、トップページに「365日24時間受付中！」と記載されています。オンライン契約の場合、最短2時間で入金されます（公式・2026年10月14日確認）。" },
  // ▼ 2026年8月7日 公式サイト一次確認分（P0: 実務情報ブロック統一装填）
  "best-factor": { weekdays: "電話受付 平日 10:00〜19:00", note: "Webフォームは24時間受け付けています。審査に来店は不要ですが、契約時には面談（来社または訪問）が必要です。土日祝の電話対応は、公式サイトでは確認できませんでした（2026年8月7日確認）。" },
  "mf-earlypayment": { weekdays: "オンライン完結（AI仮審査は24時間利用可）", note: "面談は原則不要で、オンラインで完結します。電話受付時間・土日祝の対応は、公式サイトでは確認できませんでした（2026年8月7日確認）。" },
  "top-management": { weekdays: "10:00〜19:00", saturday: "休業", sunday: "休業", holidays: "休業（年末年始も休業）", note: "申込から契約まで、オンラインでの完結に対応しています（公式・2026年8月7日確認）。" },
  "mentor-capital": { weekdays: "電話受付 平日 9:30〜18:30", note: "公式サイトには「365日24時間全国対応可能」との記載もあります。契約はクラウド・来社・訪問から選択でき、2026年10月14日付のお知らせで「対面・来社不要で利用可能」と告知されています。連休中は休業日があります（公式・2026年10月14日確認）。" },
  "minna-factoring": { weekdays: "オンライン完結（土日でも最短60分で入金）", note: "電話・来社・現地確認が不要な、オンライン完結型のサービスです。受付時間の具体的な時刻は、公式サイトでは確認できませんでした（2026年8月7日確認）。" },
  "yen-today": { weekdays: "24時間受付（Web申込）", note: "公式サイトに「24時間受付中」と表示されています。申込後は提携ファクタリング会社から連絡があり、パソコン・スマートフォンでオンライン契約が完結します（来店不要）。電話受付時間・土日祝の対応は、公式サイトでは確認できませんでした（2026年10月16日確認）。" },
  "invoice-factor": { weekdays: "問い合わせは24時間対応（公式LP表示）", note: "電話（0120-686-766）・メールで問い合わせができます。契約方法は非対面・対面・郵送から選択できます（公式LP・2026年10月14日確認）。" },
  "safe-trust": { weekdays: "電話 平日10:00〜18:00（メール・LINEは年中無休24時間）", note: "基本的にオンラインで完結し、必要な場合のみ電話で連絡があります（公式「お問い合わせ」・2026年10月14日確認）。" },
  "ace-trust": { weekdays: "電話受付 平日 9:30〜18:30", note: "Webフォームは24時間受け付けています。来店・面談が不要なオンライン完結型のサービス（INBUYS）です。土日祝の電話対応は、公式サイトでは確認できませんでした（2026年10月14日確認）。" },
};

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
      const hours = operatingHoursMap[slug];

      return {
        ...defaultDetails,
        operatingHours: hours ?? defaultDetails.operatingHours,
        offices: [
          {
            name: "本社",
            address: company.companyInfo.address
          }
        ],
        // 営業時間・必要書類・手数料のFAQは会社ページ側で一次確認値（hours/feeIndex）から生成するため、
        // ここでは重複・未確認の汎用回答（「どの業種でも利用可」等）を出さない。
        faqs: [
        ]
      };
  }
}
