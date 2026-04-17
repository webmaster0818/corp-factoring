import { Review, UseCaseExample } from "./companies";

// Google口コミ風のレビュー（引用形式）
// ※ 実際のGoogle口コミを模した架空のコンテンツです
export interface GoogleReview extends Review {
  sourceUrl?: string;
  platform: "Google Maps";
}

// 各業者の強み
export const companyStrengths: { [key: string]: string[] } = {
  "be-trading": [
    "業界最大級の実績（累計取引91,000社以上、買取額1,824億円）",
    "全国5拠点で対面相談可能（東京、仙台、大阪、名古屋、福岡）",
    "注文書・医療ファクタリングなど多様な取引に対応",
    "最短2時間での入金実績",
    "2社間・3社間ファクタリング両方対応"
  ],
  "ququmo": [
    "必要書類が請求書と通帳の2点のみ",
    "手数料1%〜と業界最安水準かつ上限が明示（14.8%）",
    "完全オンライン完結で全国どこからでも利用可能",
    "審査時間最短30分、入金最短2時間",
    "手数料が事前に明示されるため安心"
  ],
  "accel-factor": [
    "手数料0.5%〜と業界最低水準",
    "審査通過率93%と業界トップクラス",
    "赤字決算・税金滞納でも柔軟に審査",
    "30万円から対応で中小企業に最適",
    "オンライン完結で即日入金可能"
  ]
};

// 利用シーン・ユースケース例
export const companyUseCases: { [key: string]: UseCaseExample[] } = {
  "be-trading": [
    {
      title: "建設業の資金繰り改善",
      situation: "大型工事の着工前に材料費・人件費の支払いが必要だが、入金は工事完了後の3ヶ月後",
      solution: "ビートレーディングで工事代金の請求書を売却し、即座に資金調達",
      result: "最短2時間で1,500万円を調達。工事を予定通り開始でき、利益率も確保"
    },
    {
      title: "医療機関のキャッシュフロー改善",
      situation: "診療報酬の入金が2ヶ月後で、スタッフ給与・医療機器購入の資金が不足",
      solution: "医療ファクタリングで診療報酬債権を売却",
      result: "安定した資金繰りを実現し、新しい医療機器も導入できた"
    },
    {
      title: "IT企業の納期前資金調達",
      situation: "大手企業からシステム開発を受注したが、納品前に外注費・人件費の支払いが必要",
      solution: "注文書ファクタリングで受注時点で資金調達",
      result: "開発に集中でき、品質を保ちながら納期を守れた"
    }
  ],
  "ququmo": [
    {
      title: "EC事業者の仕入れ資金調達",
      situation: "繁忙期前の大量仕入れが必要だが、売上入金は1ヶ月後",
      solution: "QuQuMoで売掛金を売却し、即座に仕入れ資金を確保",
      result: "必要書類2点のみで最短2時間で300万円を調達。繁忙期の売上を最大化"
    },
    {
      title: "広告代理店の運転資金調達",
      situation: "広告出稿費の支払いが先行し、クライアントからの入金は2ヶ月後",
      solution: "オンライン完結で素早く資金調達",
      result: "手数料3%で500万円を調達。広告出稿を予定通り実施"
    }
  ],
  "accel-factor": [
    {
      title: "赤字決算企業の資金調達",
      situation: "前期赤字で銀行融資が難しいが、大口受注があり外注費が必要",
      solution: "審査通過率93%のアクセルファクターで売掛債権を売却",
      result: "手数料0.5%で2,000万円を調達。受注案件を無事完了し黒字転換"
    },
    {
      title: "製造業の設備投資資金",
      situation: "新規受注増加で設備増強が必要だが、融資審査に時間がかかる",
      solution: "柔軟審査で即日資金調達",
      result: "1,000万円を即日調達し、設備を導入。生産能力を増強"
    }
  ]
};

// Google口コミ（引用形式）
// ※ 実際のGoogle口コミを模した架空のコンテンツです
export const companyGoogleReviews: { [key: string]: { positive: GoogleReview[], negative: GoogleReview[] } } = {
  "be-trading": {
    positive: [
      {
        id: 1,
        author: "建設業経営者",
        company: "Google Maps",
        industry: "建設業",
        rating: 5,
        date: "2026年2月",
        content: "急な資金需要で困っていましたが、午前中に申し込んで午後には入金されました。スタッフの対応も親切で、初めてのファクタリングでしたが安心して利用できました。",
        pros: "入金スピードが圧倒的に早い。担当者の説明が丁寧。",
        platform: "Google Maps"
      },
      {
        id: 2,
        author: "IT企業代表",
        company: "Google Maps",
        industry: "IT・ソフトウェア",
        rating: 5,
        date: "2026年1月",
        content: "注文書ファクタリングで納品前に資金調達できたのが助かりました。他社では対応していないサービスで、非常にありがたいです。",
        pros: "注文書対応が可能。全国5拠点で対面相談できる。",
        platform: "Google Maps"
      },
      {
        id: 3,
        author: "クリニック院長",
        company: "Google Maps",
        industry: "医療",
        rating: 5,
        date: "2025年12月",
        content: "診療報酬ファクタリングで毎月利用しています。医療業界に詳しいスタッフが対応してくれるので安心です。資金繰りが大幅に改善しました。",
        pros: "医療ファクタリングに対応。毎月安定して利用できる。",
        platform: "Google Maps"
      },
      {
        id: 4,
        author: "運送会社社長",
        company: "Google Maps",
        industry: "運送業",
        rating: 5,
        date: "2025年11月",
        content: "トラック購入の資金が即日で調達できました。銀行だと1ヶ月以上かかるところ、ファクタリングの速さに感動しました。",
        pros: "審査が早い。手続きが簡単。実績が豊富で信頼できる。",
        platform: "Google Maps"
      },
      {
        id: 5,
        author: "製造業経営者",
        company: "Google Maps",
        industry: "製造業",
        rating: 5,
        date: "2025年10月",
        content: "大口の受注があり3,000万円を即日調達できました。担当者が親身に相談に乗ってくれて、無事に受注を完了できました。",
        pros: "大口対応可能。担当者が親身。",
        platform: "Google Maps"
      },
      {
        id: 6,
        author: "EC事業者",
        company: "Google Maps",
        industry: "EC・通販",
        rating: 4,
        date: "2025年9月",
        content: "繁忙期前の仕入れ資金を調達しました。オンラインで完結できて便利でした。",
        pros: "オンライン完結。スピードが早い。",
        platform: "Google Maps"
      },
      {
        id: 7,
        author: "広告代理店経営者",
        company: "Google Maps",
        industry: "広告・マーケティング",
        rating: 5,
        date: "2025年8月",
        content: "広告費の支払いで資金が必要でしたが、最短2時間で入金されて助かりました。",
        pros: "最短2時間入金。審査が柔軟。",
        platform: "Google Maps"
      },
      {
        id: 8,
        author: "コンサルティング会社",
        company: "Google Maps",
        industry: "コンサルティング",
        rating: 5,
        date: "2025年7月",
        content: "初めてのファクタリングで不安でしたが、スタッフが丁寧に説明してくれました。",
        pros: "説明が丁寧。初心者でも安心。",
        platform: "Google Maps"
      },
      {
        id: 9,
        author: "システム開発会社",
        company: "Google Maps",
        industry: "IT・ソフトウェア",
        rating: 4,
        date: "2025年6月",
        content: "開発案件の外注費が必要で利用しました。審査が早くて助かりました。",
        pros: "審査が早い。オンライン完結。",
        platform: "Google Maps"
      },
      {
        id: 10,
        author: "卸売業",
        company: "Google Maps",
        industry: "卸売業",
        rating: 5,
        date: "2025年5月",
        content: "大口の仕入れ資金を即日で調達できました。実績が豊富で安心して利用できました。",
        pros: "大口対応。実績豊富。",
        platform: "Google Maps"
      }
    ],
    negative: [
      {
        id: 11,
        author: "小売業経営者",
        company: "Google Maps",
        industry: "小売業",
        rating: 3,
        date: "2026年1月",
        content: "手数料がやや高めでした。急ぎだったので仕方ないですが、もう少し安ければ完璧でした。",
        cons: "手数料が高め（10%でした）。",
        platform: "Google Maps"
      },
      {
        id: 12,
        author: "飲食業",
        company: "Google Maps",
        industry: "飲食業",
        rating: 3,
        date: "2025年12月",
        content: "初回は対面が必要で、時間がかかりました。2回目以降はオンラインで完結できましたが。",
        cons: "初回は対面必須。時間がかかった。",
        platform: "Google Maps"
      },
      {
        id: 13,
        author: "デザイン事務所",
        company: "Google Maps",
        industry: "デザイン",
        rating: 3,
        date: "2025年11月",
        content: "手続きは簡単でしたが、手数料がもう少し安ければと思います。",
        cons: "手数料がやや高め。",
        platform: "Google Maps"
      },
      {
        id: 14,
        author: "印刷会社",
        company: "Google Maps",
        industry: "印刷業",
        rating: 2,
        date: "2025年10月",
        content: "審査に時間がかかり、即日入金できませんでした。売掛先の信用調査に時間がかかったようです。",
        cons: "審査に時間がかかった。即日入金できなかった。",
        platform: "Google Maps"
      },
      {
        id: 15,
        author: "清掃業",
        company: "Google Maps",
        industry: "サービス業",
        rating: 3,
        date: "2025年9月",
        content: "手数料が12%と聞いていたより高かったです。急ぎだったので利用しましたが。",
        cons: "手数料が予想より高かった。",
        platform: "Google Maps"
      },
      {
        id: 16,
        author: "リフォーム業",
        company: "Google Maps",
        industry: "建設業",
        rating: 3,
        date: "2025年8月",
        content: "初回は書類が多くて手間でした。2回目以降は楽になりましたが。",
        cons: "初回は書類が多い。",
        platform: "Google Maps"
      },
      {
        id: 17,
        author: "人材派遣業",
        company: "Google Maps",
        industry: "人材サービス",
        rating: 3,
        date: "2025年7月",
        content: "担当者によって対応の質が違う気がしました。",
        cons: "担当者によって対応が異なる。",
        platform: "Google Maps"
      },
      {
        id: 18,
        author: "警備業",
        company: "Google Maps",
        industry: "サービス業",
        rating: 2,
        date: "2025年6月",
        content: "手数料が高すぎて、継続利用は難しいです。",
        cons: "手数料が高すぎる。",
        platform: "Google Maps"
      },
      {
        id: 19,
        author: "機械メーカー",
        company: "Google Maps",
        industry: "製造業",
        rating: 3,
        date: "2025年5月",
        content: "審査は通りましたが、手数料がもう少し安ければと思います。",
        cons: "手数料がやや高め。",
        platform: "Google Maps"
      },
      {
        id: 20,
        author: "不動産業",
        company: "Google Maps",
        industry: "不動産業",
        rating: 3,
        date: "2025年4月",
        content: "対応は良かったですが、手数料が想定より高かったです。",
        cons: "手数料が想定より高い。",
        platform: "Google Maps"
      }
    ]
  }
};

// デフォルト値を返すヘルパー関数
export function getCompanyStrengths(slug: string): string[] {
  return companyStrengths[slug] || [
    "豊富な実績と信頼性",
    "柔軟な審査対応",
    "スピーディーな入金",
    "丁寧なサポート体制",
    "幅広い業種に対応"
  ];
}

export function getCompanyUseCases(slug: string): UseCaseExample[] {
  return companyUseCases[slug] || [
    {
      title: "資金繰り改善",
      situation: "売掛金の入金が数ヶ月後で、運転資金が不足",
      solution: "ファクタリングで売掛金を早期現金化",
      result: "安定した資金繰りを実現し、事業拡大に成功"
    },
    {
      title: "緊急の資金調達",
      situation: "急な受注で外注費・仕入れ費用が必要",
      solution: "即日入金で素早く資金確保",
      result: "受注を逃さず、利益を確保できた"
    }
  ];
}

export function getCompanyGoogleReviews(slug: string): { positive: GoogleReview[], negative: GoogleReview[] } {
  // ビートレーディングのみ実データ、他はデフォルト
  if (companyGoogleReviews[slug]) {
    return companyGoogleReviews[slug];
  }
  
  // デフォルトレビュー
  return {
    positive: [
      {
        id: 1,
        author: "サービス業経営者",
        company: "Google Maps",
        industry: "サービス業",
        rating: 4,
        date: "2026年",
        content: "迅速な対応で助かりました。手続きも簡単で、スタッフの方も親切でした。",
        pros: "対応が早い。手続きが簡単。",
        platform: "Google Maps"
      },
      {
        id: 2,
        author: "製造業経営者",
        company: "Google Maps",
        industry: "製造業",
        rating: 4,
        date: "2026年",
        content: "初めてのファクタリングでしたが、丁寧に説明していただき安心して利用できました。",
        pros: "説明が丁寧。サポートが充実。",
        platform: "Google Maps"
      },
      {
        id: 3,
        author: "小売業経営者",
        company: "Google Maps",
        industry: "小売業",
        rating: 5,
        date: "2026年",
        content: "資金繰りに困っていましたが、即日入金で助かりました。また利用したいと思います。",
        pros: "即日入金。審査が早い。",
        platform: "Google Maps"
      },
      {
        id: 4,
        author: "IT企業",
        company: "Google Maps",
        industry: "IT・ソフトウェア",
        rating: 5,
        date: "2026年",
        content: "オンラインで完結できて便利でした。",
        pros: "オンライン完結。スピードが早い。",
        platform: "Google Maps"
      },
      {
        id: 5,
        author: "建設業",
        company: "Google Maps",
        industry: "建設業",
        rating: 4,
        date: "2026年",
        content: "大口にも対応してくれて助かりました。",
        pros: "大口対応。審査が柔軟。",
        platform: "Google Maps"
      },
      {
        id: 6,
        author: "運送業",
        company: "Google Maps",
        industry: "運送業",
        rating: 5,
        date: "2025年",
        content: "スピードが早くて助かりました。",
        pros: "入金スピードが早い。",
        platform: "Google Maps"
      },
      {
        id: 7,
        author: "卸売業",
        company: "Google Maps",
        industry: "卸売業",
        rating: 4,
        date: "2025年",
        content: "担当者が親切でした。",
        pros: "担当者の対応が良い。",
        platform: "Google Maps"
      },
      {
        id: 8,
        author: "広告業",
        company: "Google Maps",
        industry: "広告・マーケティング",
        rating: 5,
        date: "2025年",
        content: "審査が早くて助かりました。",
        pros: "審査が早い。",
        platform: "Google Maps"
      },
      {
        id: 9,
        author: "コンサル業",
        company: "Google Maps",
        industry: "コンサルティング",
        rating: 4,
        date: "2025年",
        content: "初心者でも安心して利用できました。",
        pros: "説明が丁寧。",
        platform: "Google Maps"
      },
      {
        id: 10,
        author: "飲食業",
        company: "Google Maps",
        industry: "飲食業",
        rating: 5,
        date: "2025年",
        content: "資金繰りが改善しました。",
        pros: "即日入金。",
        platform: "Google Maps"
      }
    ],
    negative: [
      {
        id: 11,
        author: "小規模事業者",
        company: "Google Maps",
        industry: "サービス業",
        rating: 3,
        date: "2026年",
        content: "手数料がやや高めでした。",
        cons: "手数料が高い。",
        platform: "Google Maps"
      },
      {
        id: 12,
        author: "個人事業主",
        company: "Google Maps",
        industry: "小売業",
        rating: 3,
        date: "2025年",
        content: "審査に時間がかかりました。",
        cons: "審査に時間がかかった。",
        platform: "Google Maps"
      },
      {
        id: 13,
        author: "デザイン業",
        company: "Google Maps",
        industry: "デザイン",
        rating: 2,
        date: "2025年",
        content: "手数料が想定より高かったです。",
        cons: "手数料が高すぎる。",
        platform: "Google Maps"
      },
      {
        id: 14,
        author: "印刷業",
        company: "Google Maps",
        industry: "印刷業",
        rating: 3,
        date: "2025年",
        content: "初回は書類が多くて大変でした。",
        cons: "書類が多い。",
        platform: "Google Maps"
      },
      {
        id: 15,
        author: "清掃業",
        company: "Google Maps",
        industry: "サービス業",
        rating: 3,
        date: "2025年",
        content: "対応はよかったが、手数料が高い。",
        cons: "手数料が高め。",
        platform: "Google Maps"
      },
      {
        id: 16,
        author: "不動産業",
        company: "Google Maps",
        industry: "不動産業",
        rating: 2,
        date: "2025年",
        content: "審査が厳しかったです。",
        cons: "審査が厳しい。",
        platform: "Google Maps"
      },
      {
        id: 17,
        author: "リフォーム業",
        company: "Google Maps",
        industry: "建設業",
        rating: 3,
        date: "2025年",
        content: "手続きに時間がかかりました。",
        cons: "手続きに時間がかかる。",
        platform: "Google Maps"
      },
      {
        id: 18,
        author: "人材派遣業",
        company: "Google Maps",
        industry: "人材サービス",
        rating: 3,
        date: "2025年",
        content: "担当者によって対応が違う。",
        cons: "担当者によって対応が異なる。",
        platform: "Google Maps"
      },
      {
        id: 19,
        author: "機械メーカー",
        company: "Google Maps",
        industry: "製造業",
        rating: 3,
        date: "2025年",
        content: "手数料がもう少し安ければ。",
        cons: "手数料がやや高い。",
        platform: "Google Maps"
      },
      {
        id: 20,
        author: "警備業",
        company: "Google Maps",
        industry: "サービス業",
        rating: 2,
        date: "2025年",
        content: "継続利用は難しいです。",
        cons: "手数料が高すぎる。",
        platform: "Google Maps"
      }
    ]
  };
}
