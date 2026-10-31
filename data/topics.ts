export interface TopicGroup {
  heading: string;
  description: string;
  slugs: string[];
}

export interface Topic {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string[];
  groups: TopicGroup[];
}

export const topics: Topic[] = [
  {
    slug: "gyoushu",
    name: "業種別ファクタリング",
    title: "業種別ファクタリング活用ガイド｜建設・運送・医療・IT・飲食など25業種",
    description:
      "建設業・運送業・医療介護・IT・飲食店など業種ごとのファクタリング活用法を解説。業種特有の入金サイト、債権の特徴、審査で確認されるポイントと、業種に適したサービスの選び方を掲載しています。",
    intro: [
      "ファクタリングの利用方法は、業種によって大きく異なります。建設業のように工事代金の入金サイトが長い業種、診療報酬・介護報酬のように公的機関への債権を持つ業種、フリーランスのように少額の債権が中心の業種では、適したサービスも手数料の相場も異なります。",
      "このページでは、当サイトの業種別の記事を一覧で掲載しています。自社の業種に近い記事から順にご覧ください。",
    ],
    groups: [
      {
        heading: "建設・製造・物流",
        description: "入金サイトが長く、ファクタリングの利用が最も多い業種です。",
        slugs: [
          "article-factoring-kensetsu",
          "article-factoring-seizou",
          "article-factoring-unsou",
          "article-factoring-butsuryuu",
        ],
      },
      {
        heading: "医療・介護",
        description: "診療報酬・介護報酬債権を入金前に資金化する方法と、選び方を解説しています。",
        slugs: [
          "article-factoring-iryou",
          "article-factoring-kaigo",
          "article-factoring-clinic-kaigyou",
        ],
      },
      {
        heading: "IT・Web・広告",
        description: "請求書1枚から利用できるオンライン型のサービスに適した業種です。",
        slugs: [
          "article-factoring-it",
          "article-factoring-sysdev",
          "article-factoring-saas",
          "article-factoring-ec",
          "article-factoring-koukoku",
          "article-factoring-influencer",
        ],
      },
      {
        heading: "店舗・サービス業",
        description: "売上があるにもかかわらず手元資金が不足する場合の活用方法を解説します。",
        slugs: [
          "article-factoring-insyoku",
          "article-factoring-kouri",
          "article-factoring-biyoushitsu",
          "article-factoring-juku",
          "article-factoring-delivery",
        ],
      },
      {
        heading: "その他の業種・法人形態",
        description: "人材派遣・農業・不動産・NPO・士業など、個別の事情がある業種です。",
        slugs: [
          "article-factoring-jinzai",
          "article-factoring-nougyou",
          "article-factoring-fudousan",
          "article-factoring-npo",
          "article-factoring-shigyou",
          "article-factoring-ootedaikigyou",
        ],
      },
      {
        heading: "業種別の総合ガイド",
        description: "ファクタリングに適した業種を全体的に把握したい方向けの記事です。",
        slugs: ["article-factoring-gyoushu-guide"],
      },
    ],
  },
  {
    slug: "hikaku",
    name: "比較・おすすめ",
    title: "ファクタリング比較・おすすめガイド｜融資・手形割引・でんさいとの違いも解説",
    description:
      "ファクタリング会社の比較・おすすめの選び方と、銀行融資・ビジネスローン・手形割引・でんさい・ABLなど他の資金調達手段との違いを整理しています。自社に適した資金調達方法の検討にご活用ください。",
    intro: [
      "「どのファクタリング会社を選ぶか」と「ファクタリングが適した手段か」は、分けて検討する必要があります。手数料のみで選ぶと入金スピードや必要書類の条件が合わない場合があり、ファクタリングの利用を前提にすると、融資のほうが費用を抑えられるケースを見落とすおそれがあります。",
      "このページでは、サービスを比較する記事と、他の資金調達手段との違いを解説した記事を掲載しています。比較表で全体像を把握したうえで、個別の記事をご覧いただくことをおすすめします。",
    ],
    groups: [
      {
        heading: "おすすめ・ランキング・口コミ",
        description: "目的別にサービスを絞り込みたい方向けの記事です。",
        slugs: [
          "article-factoring-osusume",
          "article-factoring-hikaku",
          "article-factoring-houjin-osusume",
          "article-factoring-sokujitsu-osusume",
          "article-online-factoring",
          "article-seikyusho-kaitori",
          "article-factoring-kuchikomi",
        ],
      },
      {
        heading: "他の資金調達手段との違い",
        description: "融資・手形・でんさい等との費用や条件の違いを比較しています。",
        slugs: [
          "article-factoring-vs-ginkou",
          "article-factoring-vs-yuushi",
          "article-factoring-vs-business-loan",
          "article-factoring-vs-abl",
          "article-factoring-vs-densai",
          "article-factoring-vs-tegata",
          "article-factoring-vs-genkinka",
          "article-factoring-hojokin-chigai",
          "article-factoring-kyuuryo-chigai",
          "article-factoring-maebarai",
        ],
      },
      {
        heading: "契約方式の違い",
        description: "2社間・3社間、一括・個別、クラウド型の選び方を解説します。",
        slugs: [
          "article-factoring-2sha-3sha",
          "article-factoring-ikkatsu-kobetsu",
          "article-factoring-cloud",
        ],
      },
      {
        heading: "乗り換え",
        description: "現在の契約の手数料を見直したい方向けの記事です。",
        slugs: ["article-factoring-norikae"],
      },
    ],
  },
  {
    slug: "kojin",
    name: "個人事業主・フリーランス",
    title: "個人事業主・フリーランスの資金調達ガイド｜ファクタリング・融資・補助金",
    description:
      "個人事業主・フリーランス向けの資金調達方法を解説しています。少額に対応したファクタリング、日本政策金融公庫・制度融資・ビジネスローン、補助金、資金繰り表の作り方まで、事業規模に応じた方法を掲載しています。",
    intro: [
      "個人事業主の資金調達は、法人とは条件が異なります。銀行のプロパー融資は審査に通りにくい一方で、日本政策金融公庫・制度融資・少額のファクタリングなど、個人事業主が利用しやすい選択肢もあります。",
      "このページでは、資金が必要な時期と金額の観点から記事を整理しています。当日・翌日に資金が必要な場合はファクタリング、1か月以上先の資金であれば融資・補助金というように、使い分けるのが基本です。",
    ],
    groups: [
      {
        heading: "個人事業主×ファクタリング",
        description: "少額・即日入金など、個人事業主に多い利用方法を解説します。",
        slugs: [
          "article-factoring-kojin-jigyonushi",
          "article-factoring-kojin-osusume",
          "article-factoring-kojin-sokujitsu",
          "article-factoring-kojin-kakutei",
          "article-factoring-shougaku",
          "article-factoring-10man",
          "article-seikyusho-genkinkan",
        ],
      },
      {
        heading: "融資・公庫・ビジネスローン",
        description: "金利を重視して検討する、中期の資金調達方法です。",
        slugs: [
          "article-jfc-kojin",
          "article-kojin-jigyonushi-yushi",
          "article-business-loan-kojin",
          "article-kakuteishinkoku-yuushi",
          "article-seido-yuushi",
          "article-akaji-yuushi",
          "article-sogyo-yushi",
          "article-kaigyo-shikin",
          "article-kojin-okane-kariru",
        ],
      },
      {
        heading: "補助金・資金繰り改善",
        description: "返済不要の資金と、資金不足を防ぐための管理方法を解説します。",
        slugs: [
          "article-kojin-hojokin",
          "article-kojin-shikin-chotatsu",
          "article-freelance-shikin",
          "article-shikin-gurihyou",
        ],
      },
    ],
  },
  {
    slug: "kiso",
    name: "基礎知識・審査・法律",
    title: "ファクタリングの基礎知識｜仕組み・手数料・審査・法律・税務の解説",
    description:
      "ファクタリングの仕組み・手数料相場・審査基準から、違法業者の見分け方・債権譲渡登記・取適法（旧下請法）などの法律、仕訳・消費税などの税務会計まで、契約前に確認しておくべき事項を解説しています。",
    intro: [
      "ファクタリングは利便性の高いサービスですが、手数料の相場や違法業者の見分け方を把握せずに契約すると、不利な条件で契約してしまうおそれがあります。特に、給与ファクタリングを装った貸付や、相場を大きく超える手数料には注意が必要です。",
      "このページでは、基礎、利用の流れ、手数料・審査、法律・安全性、税務会計の順に記事を掲載しています。初めて利用する方は上から順に、契約を控えている方は法律・安全性の項目からご覧ください。",
    ],
    groups: [
      {
        heading: "はじめての方へ",
        description: "ファクタリングの仕組みと、メリット・デメリットを解説します。",
        slugs: [
          "article-factoring-toha",
          "article-factoring-merit-demerit",
          "article-factoring-hajimete",
          "article-factoring-faq",
          "article-factoring-urikakekin",
        ],
      },
      {
        heading: "利用の流れ・書類・スピード",
        description: "申込から入金までの実務を解説します。",
        slugs: [
          "article-factoring-kaigyoutodoke-nashi",
          "article-factoring-seikyusho-kakikata",
          "article-factoring-kessansho-fuyou",
          "article-factoring-tsucho-nashi",
          "article-factoring-site-120nichi",
          "article-factoring-kakutei-shinkokusho-nashi",
          "article-factoring-mooshikomi-nagare",
          "article-factoring-hitsuyou-shorui",
          "article-factoring-seikyusho-nomi",
          "article-factoring-keiyaku",
          "article-factoring-kaiyaku",
          "article-factoring-nyuukin-jikan",
          "article-factoring-sokujitsu",
          "article-factoring-donichi",
          "article-factoring-fukusu",
          "article-factoring-keizoku-riyou",
          "article-factoring-ooguchi",
        ],
      },
      {
        heading: "手数料",
        description: "手数料の相場の把握と交渉により、総費用は大きく変わります。",
        slugs: [
          "article-factoring-tesuryo",
          "article-factoring-tesuryo-yasui",
          "article-factoring-tesuryo-koushou",
        ],
      },
      {
        heading: "審査",
        description: "審査で確認されるポイントと、審査に通らなかった場合の対処法を解説します。",
        slugs: [
          "article-factoring-shinsetsu-houjin",
          "article-factoring-urikakesaki-shinsa",
          "article-factoring-shinsa-nashi",
          "article-factoring-shinsa",
          "article-factoring-shinsa-amai",
          "article-factoring-shinsa-ochita",
          "article-factoring-ai-shinsa",
          "article-factoring-shinyou-jouhou",
          "article-factoring-akaji",
          "article-factoring-bareru",
        ],
      },
      {
        heading: "ファクタリングの種類・仕組み",
        description: "注文書・将来債権・リバースなど、応用的な類型を解説します。",
        slugs: [
          "article-factoring-chuumonsho",
          "article-factoring-shourai-saiken",
          "article-factoring-non-recourse",
          "article-factoring-shoufuri",
          "article-factoring-reverse",
          "article-factoring-kokusai",
        ],
      },
      {
        heading: "法律・安全性・トラブル対策",
        description: "違法業者を避け、契約上のトラブルを防ぐための知識を解説します。",
        slugs: [
          "article-factoring-ihou",
          "article-factoring-ihou-gyousha",
          "article-factoring-sagi",
          "article-factoring-trouble",
          "article-factoring-yametai",
          "article-factoring-soshou",
          "article-factoring-bengoshi",
          "article-factoring-minpou",
          "article-factoring-kashikingyou",
          "article-factoring-risoku-seigen",
          "article-factoring-kinyuuchou",
          "article-factoring-shitaukehou",
          "article-factoring-hansha",
          "article-factoring-kyuuryo-gisou",
          "article-factoring-nijuujouto",
          "article-factoring-saiken-jyouto",
          "article-factoring-saiken-touki",
          "article-factoring-rentai-hoshou",
          "article-factoring-keiei-hoshou",
          "article-factoring-tanpo",
          "article-factoring-kojinjouhou",
          "article-factoring-mynumber",
          "article-factoring-urikakesaki-tousan",
        ],
      },
      {
        heading: "資金が足りないとき",
        description: "給料・外注費・税金などの支払いに間に合わない場合に、今日・今週できることを整理しています。",
        slugs: [
          "article-factoring-kyuryo-haraenai",
          "article-shiharai-maniawanai",
          "article-shikin-short-taisaku",
          "article-gaichuhi-haraenai",
        ],
      },
      {
        heading: "税務・会計・資金繰り",
        description: "仕訳・消費税の扱いから資金繰りの改善までを解説します。",
        slugs: [
          "article-factoring-invoice-mitouroku",
          "article-factoring-kanjokamoku",
          "article-factoring-shiwake",
          "article-factoring-kessansho",
          "article-factoring-houjinzei",
          "article-factoring-shouhizei",
          "article-factoring-inshizei",
          "article-factoring-zeikin",
          "article-factoring-cash-flow",
          "article-factoring-shikinguri",
          "article-factoring-tousan-boushi",
        ],
      },
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getTopicForArticle(articleSlug: string): Topic | undefined {
  return topics.find((t) =>
    t.groups.some((g) => g.slugs.includes(articleSlug))
  );
}

export function getRelatedSlugs(articleSlug: string, count = 4): string[] {
  const topic = getTopicForArticle(articleSlug);
  if (!topic) return [];
  const group = topic.groups.find((g) => g.slugs.includes(articleSlug));
  if (!group) return [];
  // Same group first (deterministic order), then fill from the rest of the topic
  const sameGroup = group.slugs.filter((s) => s !== articleSlug);
  const restOfTopic = topic.groups
    .filter((g) => g !== group)
    .flatMap((g) => g.slugs)
    .filter((s) => s !== articleSlug);
  return [...sameGroup, ...restOfTopic].slice(0, count);
}
