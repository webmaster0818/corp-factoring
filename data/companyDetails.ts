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
  tel?: string;
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
  officesNote?: string; // 事業拠点の補足（出典・確認日など）
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
  "ennavi": { weekdays: "電話・申込・相談 24時間365日受付", saturday: "24時間受付", sunday: "24時間受付", holidays: "24時間受付", note: "公式2サイトとも、フリーダイヤル0120-007-567を「24時間365日対応」（ennavi-factoring.net）・「24時間年中無休」（ennavi.tokyo）と表示し、ennavi.tokyo には「お申込み・ご相談は24時間365日受け付けています」と記載されています。入金の目安は ennavi.tokyo が「最短即日」、ennavi-factoring.net が「最短1日」です。入金の締め時刻と、土日祝日に振込まで行うかどうかは、どちらの公式サイトにも記載がありません（2026年10月19日確認）。" },
  "accel-factor": { weekdays: "電話受付 平日 10:00〜18:30", saturday: "休業", sunday: "休業", holidays: "休業", note: "オンライン見積フォームは24時間365日受け付けています（公式・2026年7月8日確認）。" },
  "freenance": { weekdays: "オンライン完結（即日払いは当日16:30までの承認で当日振込・以降翌営業日）", note: "営業時間・定休日・土日の対応は、公式サイトでは確認できませんでした（2026年7月8日確認）。" },
  "paytoday": { weekdays: "平日 9:00〜17:00", note: "公式FAQに「営業時間は平日 9:00-17:00となりますが、メールやお問い合わせフォームからのお問い合わせは24時間受け付けております」と記載されています。AI審査の結果は最短15分〜24時間以内にメールで連絡され、入金は契約完了後即日ですが、時間帯によって翌営業日になる場合があります。土日祝の審査・入金は公式に記載がありません（2026年10月19日確認）。" },
  "support-kinyu": { weekdays: "平日 9:30〜18:00", note: "機構の受付時間は平日9:30〜18:00です。オンラインのFACTOR⁺U（ファクトル）も営業時間は平日9:30〜18:00で、申請は24時間受け付けていますが、対応は翌営業日となります。契約の締結が17時以降の場合、銀行によっては入金が翌営業日となります。土日祝の対応は、公式サイトに記載がありません。機構の電話（0120-162-022・03-6435-7371）の受付時間も平日9:30〜18:00です（2026年10月23日確認）。" },
  "paytner": { weekdays: "審査 毎日10:00〜19:00（申込は24時間受付）", saturday: "審査 10:00〜19:00", sunday: "審査 10:00〜19:00", holidays: "審査 10:00〜19:00", note: "公式FAQに「審査について 土日祝を含む毎日10:00〜19:00に対応」「お申し込み自体は年中無休・24時間」と記載。原則として当日19:00までの申込であれば当日中に審査結果が連絡され、時間外の申請は翌営業日の入金となります。審査完了後の振込は土日祝を含む365日です。問い合わせはログイン後のチャットで年中無休・24時間受け付けており、オペレーター対応は平日10:00〜19:00です（2026年10月19日確認）。" },
  "labol": { weekdays: "土日祝も審査・入金（審査完了後の振込は24時間365日）", saturday: "審査・入金あり（平日より遅くなる場合あり）", sunday: "審査・入金あり（平日より遅くなる場合あり）", holidays: "審査・入金あり（平日より遅くなる場合あり）", note: "公式トップに「審査が完了した場合の振込対応時間です。審査の実施は24時間365日行っているものではございません」と記載されています。公式FAQには「土日・祝日も審査と入金を行っています」「平日の営業時間よりも対応が遅くなる場合がございます」「申請の内容次第では翌営業日までお時間をいただく場合もございます」とあります。審査の受付時刻は公式に記載がありません。最短30分で入金されます（2026年10月19日確認）。" },
  "pmg": { weekdays: "電話 8:00〜20:00（Webフォームは24時間受付）", saturday: "電話 8:00〜20:00（Webフォームは24時間受付）", sunday: "電話 8:00〜20:00（Webフォームは24時間受付）", holidays: "電話 8:00〜20:00（Webフォームは24時間受付）", note: "公式の土日ファクタリングのページに「電話 受付時間：8:00-20:00（平日/土日/祝日）」「WEBお問合せフォーム 受付時間：24時間（平日/土日/祝日）」と記載されています。振込時間外に契約が完了した場合は、翌営業日の振込となります。公式サイトの一部のページ下部には「電話サポート 営業時間：8:00〜22:00」との表記もあります。公式は、書類の不備に備えて午前9時〜11時など早い時間の申込と、24時間振込に対応した銀行口座の指定をすすめています（2026年10月18日確認）。" },
  "jtc": { weekdays: "電話受付 平日 9:00〜18:00", note: "土日祝も電話での対応が可能で、メール・FAXは24時間受け付けています。契約は事前予約制です（公式・2026年7月29日確認）。" },
  "ebank": { weekdays: "24時間対応（公式表示）", note: "電話・メールとも24時間対応と公式に表示されています。具体的な定休日は、公式サイトでは確認できませんでした（2026年10月14日確認）。" },
  "no1": { weekdays: "電話受付 平日 9:00〜19:00", saturday: "休業", sunday: "休業", holidays: "休業", note: "公式サイト全ページに「受付時間 平日 9：00 ～ 19：00（土日祝休）」と記載されています（2026年10月14日確認）。" },
  "factor-plan": { weekdays: "電話受付 平日 9:00〜19:00", note: "LINE・メールでの問い合わせは24時間受け付けています（公式・2026年10月14日確認）。" },
  "try": { weekdays: "営業時間 9:00〜18:00（電話・Web受付は365日24時間）", saturday: "定休（電話・Web受付は24時間）", sunday: "定休（電話・Web受付は24時間）", holidays: "定休（電話・Web受付は24時間）", note: "会社概要に「営業時間 9:00～18:00」「定休日 土曜日･日曜日･祝日」、トップページに「365日24時間受付中！」と記載されています。オンライン契約の場合、最短2時間で入金されます（公式・2026年10月14日確認）。" },
  // ▼ 2026年8月7日 公式サイト一次確認分（P0: 実務情報ブロック統一装填）
  "best-factor": { weekdays: "電話受付 平日 10:00〜19:00", note: "Webフォームは24時間受け付けています。公式トップページには「スマホ・PCでのオンライン完結可能。来店・郵送は不要です」と記載されていますが、公式FAQでは「審査はオンラインで可能です」「ご契約時には、ご面談が必要となります」（来社または訪社）と記載されています。契約方法は申込時に確認してください（2026年10月18日確認）。土日祝の電話対応は、公式サイトでは確認できませんでした（2026年8月7日確認）。" },
  "mf-earlypayment": { weekdays: "オンライン完結（AI仮審査は24時間利用可）", note: "面談は原則不要で、オンラインで完結します。電話受付時間・土日祝の対応は、公式サイトでは確認できませんでした（2026年8月7日確認）。" },
  "top-management": { weekdays: "10:00〜19:00", saturday: "休業", sunday: "休業", holidays: "休業（年末年始も休業）", note: "申込から契約まで、オンラインでの完結に対応しています（公式・2026年8月7日確認）。" },
  "mentor-capital": { weekdays: "電話受付 平日 9:30〜18:30", note: "公式サイトには「365日24時間全国対応可能」との記載もあります。契約はクラウド・来社・訪問から選択でき、2026年10月14日付のお知らせで「対面・来社不要で利用可能」と告知されています。連休中は休業日があります（公式・2026年10月14日確認）。" },
  "minna-factoring": { weekdays: "毎日19時まで営業（土日祝も対応）", saturday: "19時まで", sunday: "19時まで", holidays: "19時まで", note: "運営会社 株式会社チェンジの事業紹介に「毎日19時まで営業」「土日祝対応OK」「最短60分で振り込み」「電話対応なし」と記載されています（営業開始の時刻は記載なし）。臨時定休日・時短営業は運営会社のお知らせで告知されます。運営会社のお問い合わせ窓口は平日9:00〜18:00です（2026年10月19日確認）。" },
  "yen-today": { weekdays: "24時間受付（Web申込）", note: "公式サイトに「24時間受付中」と表示されています。申込後は提携ファクタリング会社から連絡があり、パソコン・スマートフォンでオンライン契約が完結します（来店不要）。電話受付時間・土日祝の対応は、公式サイトでは確認できませんでした（2026年10月16日確認）。" },
  "invoice-factor": { weekdays: "電話受付 平日 9:00〜19:00（フリーダイヤル 0120-686-766）", saturday: "電話受付は休業", sunday: "電話受付は休業（祝日も休業）", holidays: "電話受付は休業", note: "電話番号はフリーダイヤル 0120-686-766（受付時間 平日9:00〜19:00・土日祝休）で、公式LPの電話ボタンに表示されています。公式LPの会社概要に記載された運営会社（株式会社アクシアプラス）の代表電話は 03-6912-9644 です。公式LPの「ご利用の流れ」には「お問い合わせ 24時間対応可能」とも記載されています（電話の受付時間との関係は記載なし）。契約方法は非対面・対面・郵送から選択できます（公式LP・2026年10月22日確認）。" },
  "safe-trust": { weekdays: "電話 平日10:00〜18:00（メール・LINEは年中無休24時間）", note: "基本的にオンラインで完結し、必要な場合のみ電話で連絡があります（公式「お問い合わせ」・2026年10月14日確認）。" },
  "ace-trust": { weekdays: "電話受付 平日 9:30〜18:30（メールフォームは24時間受付）", saturday: "休業", sunday: "休業", holidays: "休業", note: "公式サイト各ページに「【受付時間】平日9:30〜18:30」、公式のお知らせ（2026年4月14日付）に「土日祝日は休業」「お問い合わせフォーム（24時間受付）」と記載されています。夏季・年末年始の休業期間はお知らせで告知され、休業中のフォームの問い合わせは休業明けから順次対応です。来店・面談が不要なオンライン完結型のサービス（INBUYS）もあります。LINEでの受付は公式サイトに記載がありません（2026年10月21日確認）。" },
};

// 公式のアクセスページで確認した拠点（確認日 2026年10月18日）。登録がない会社は companyInfo.address の本社のみ表示する。
const officesMap: { [slug: string]: { offices: CompanyOffice[]; note: string } } = {
  "invoice-factor": {
    offices: [
      { name: "本社（株式会社アクシアプラス）", address: "東京都千代田区神田小川町2-3-7-6F", tel: "03-6912-9644（代表）／問い合わせ フリーダイヤル 0120-686-766" },
    ],
    note: "出典：インボイスファクター公式LPの会社概要（https://invoice-factor.jp/lp/company.html）と電話ボタン（https://invoice-factor.jp/lp/ ・2026年10月22日確認）。フリーダイヤルの受付時間は平日9:00〜19:00（土日祝休）です。",
  },
  pmg: {
    offices: [
      { name: "東京本社", address: "〒163-0825 東京都新宿区西新宿2丁目4番1号 新宿NSビル25F", tel: "03-3347-3333" },
      { name: "大阪支店", address: "〒532-0003 大阪府大阪市淀川区宮原3-4-30 ニッセイ新大阪ビル18F", tel: "06-6396-8740" },
      { name: "福岡支店", address: "〒812-0012 福岡県福岡市博多区博多駅中央街7番26号 博多駅センタータワー7F", tel: "092-432-0310" },
      { name: "札幌営業所", address: "〒060-0042 北海道札幌市中央区大通西1丁目14番2号 桂和大通ビル50 9F", tel: "011-600-2453" },
      { name: "仙台営業所", address: "〒980-0013 宮城県仙台市青葉区花京院2丁目1番61号 タカノボル第5ビル 1F", tel: "022-200-2809" },
      { name: "西新宿営業所", address: "〒160-0023 東京都新宿区西新宿3-2-26 立花新宿ビル9階", tel: "0120-901-680" },
      { name: "渋谷営業所", address: "〒150-0046 東京都渋谷区松濤2-3-1", tel: "0120-901-680" },
      { name: "さいたま営業所", address: "〒330-0854 埼玉県さいたま市大宮区桜木町1丁目266番3号 シンワKIビル 2F", tel: "048-606-2695" },
      { name: "千葉営業所", address: "〒260-0015 千葉県千葉市中央区富士見1丁目14番13号 千葉大栄ビル 8F", tel: "043-400-0185" },
      { name: "横浜営業所", address: "〒220-0004 神奈川県横浜市西区北幸1丁目11番5号 相鉄KSビル 9F", tel: "045-900-1348" },
      { name: "名古屋営業所", address: "〒450-0002 愛知県名古屋市中村区名駅4丁目6番23号 名古屋第三堀内ビル 9F", tel: "052-990-1084" },
      { name: "広島営業所", address: "〒730-0022 広島県広島市中区銀山町3丁目1番 ひろしまハイビル21 16F", tel: "082-909-2819" },
    ],
    note: "出典：PMG公式のアクセスページ（https://p-m-g.tokyo/company-info/access ・2026年10月18日確認）。フリーダイヤル0120-901-680は全国共通です。拠点ごとの受付時間・来店の受付時間は公式サイトに記載がないため、来店する場合は事前に電話で確認してください。",
  },
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
        offices: officesMap[slug]?.offices ?? [
          {
            name: "本社",
            address: company.companyInfo.address
          }
        ],
        officesNote: officesMap[slug]?.note,
        // 営業時間・必要書類・手数料のFAQは会社ページ側で一次確認値（hours/feeIndex）から生成するため、
        // ここでは重複・未確認の汎用回答（「どの業種でも利用可」等）を出さない。
        faqs: [
        ]
      };
  }
}
