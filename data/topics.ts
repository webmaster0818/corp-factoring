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
      "建設業・運送業・医療介護・IT・飲食店など業種ごとのファクタリング活用法を解説。業種特有の入金サイト・債権の特徴・審査で見られるポイントと、相性の良いサービスの選び方がわかります。",
    intro: [
      "ファクタリングの使い勝手は業種によって大きく変わります。建設業のように工事代金の入金サイトが長い業種、診療報酬・介護報酬のように公的機関への債権を持つ業種、フリーランスのように少額債権が中心の業種では、選ぶべきサービスも手数料相場も異なります。",
      "このページでは、当サイトの業種別記事を一覧で整理しました。ご自身の業種に近いものから読むことで、最短で自分に合った資金調達の形が見つかります。",
    ],
    groups: [
      {
        heading: "建設・製造・物流",
        description: "入金サイトが長く、ファクタリング利用が最も多い業種群です。",
        slugs: [
          "article-factoring-kensetsu",
          "article-factoring-seizou",
          "article-factoring-unsou",
          "article-factoring-butsuryuu",
        ],
      },
      {
        heading: "医療・介護",
        description: "診療報酬・介護報酬債権は公的債権のため手数料が低い傾向があります。",
        slugs: [
          "article-factoring-iryou",
          "article-factoring-kaigo",
          "article-factoring-clinic-kaigyou",
        ],
      },
      {
        heading: "IT・Web・広告",
        description: "請求書1枚から使えるオンライン型と相性が良い業種です。",
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
        description: "売上はあるのに現金が足りない、を解決する使い方を解説します。",
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
        description: "人材派遣・農業・不動産・NPO・士業など個別事情のある業種です。",
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
        description: "まずどの業種がファクタリングに向いているかを俯瞰したい方へ。",
        slugs: ["article-factoring-gyoushu-guide"],
      },
    ],
  },
  {
    slug: "hikaku",
    name: "比較・おすすめ",
    title: "ファクタリング比較・おすすめガイド｜融資・手形割引・でんさいとの違いも解説",
    description:
      "ファクタリング会社の比較・おすすめの選び方と、銀行融資・ビジネスローン・手形割引・でんさい・ABLなど他の資金調達手段との違いを整理。自社に合う方法が最短で判断できます。",
    intro: [
      "「どのファクタリング会社を選ぶべきか」と「そもそもファクタリングが最適なのか」は分けて考える必要があります。手数料だけで選ぶと入金スピードや必要書類で失敗し、ファクタリングありきで考えると融資のほうが安く済むケースを見落とします。",
      "このページでは、サービス選びの比較記事と、他の資金調達手段との違いを解説した記事を整理しました。比較表で全体像を掴んでから個別記事へ進むのがおすすめです。",
    ],
    groups: [
      {
        heading: "おすすめ・ランキング・口コミ",
        description: "目的別にサービスを絞り込みたい方はここから。",
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
        description: "融資・手形・でんさい等と比べて本当に得かを判断できます。",
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
        description: "2社間/3社間・一括/個別・クラウド型の選び方です。",
        slugs: [
          "article-factoring-2sha-3sha",
          "article-factoring-ikkatsu-kobetsu",
          "article-factoring-cloud",
        ],
      },
      {
        heading: "乗り換え",
        description: "今の契約の手数料が高いと感じたら。",
        slugs: ["article-factoring-norikae"],
      },
    ],
  },
  {
    slug: "kojin",
    name: "個人事業主・フリーランス",
    title: "個人事業主・フリーランスの資金調達ガイド｜ファクタリング・融資・補助金",
    description:
      "個人事業主・フリーランス向けの資金調達を網羅。少額OKのファクタリング、日本政策金融公庫・制度融資・ビジネスローン、補助金、資金繰り表の作り方まで、規模に合った方法が見つかります。",
    intro: [
      "個人事業主の資金調達は法人と勝手が違います。銀行のプロパー融資は通りにくい一方で、公庫・制度融資・少額ファクタリングなど個人事業主だからこそ使いやすい選択肢もあります。",
      "このページでは「急ぎ度」と「金額」で記事を整理しました。今日明日の資金ならファクタリング、1ヶ月先を見据えるなら融資・補助金、と使い分けるのが基本です。",
    ],
    groups: [
      {
        heading: "個人事業主×ファクタリング",
        description: "少額・即日対応など個人事業主特有の使い方です。",
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
        description: "金利の安い順に検討したい中期の資金調達です。",
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
        description: "返済不要のお金と、資金ショートを防ぐ仕組みづくりです。",
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
    title: "ファクタリングの基礎知識｜仕組み・手数料・審査・法律・税務まで全解説",
    description:
      "ファクタリングの仕組み・手数料相場・審査基準から、違法業者の見分け方・債権譲渡登記・下請法などの法律、仕訳・消費税などの税務会計まで。契約前に知るべき知識を網羅しています。",
    intro: [
      "ファクタリングは便利な反面、手数料の相場観や違法業者の見分け方を知らずに契約すると損をしやすいサービスです。特に給与ファクタリングを装った貸付や、相場を大きく超える手数料には注意が必要です。",
      "このページでは、基礎 → 利用の流れ → 手数料・審査 → 法律・安全性 → 税務会計の順に記事を整理しました。初めての方は上から、契約直前の方は法律・安全性のセクションから読むのがおすすめです。",
    ],
    groups: [
      {
        heading: "はじめての方へ",
        description: "仕組みとメリット・デメリットをまず押さえましょう。",
        slugs: [
          "article-factoring-toha",
          "article-factoring-merit-demerit",
          "article-factoring-hajimete",
          "article-factoring-faq",
          "article-factoring-urikakekin",
          "article-factoring-seikou-jirei",
          "article-factoring-shijou-kibo",
        ],
      },
      {
        heading: "利用の流れ・書類・スピード",
        description: "申し込みから入金までの実務がわかります。",
        slugs: [
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
        description: "相場の把握と交渉で総コストは大きく変わります。",
        slugs: [
          "article-factoring-tesuryo",
          "article-factoring-tesuryo-yasui",
          "article-factoring-tesuryo-koushou",
        ],
      },
      {
        heading: "審査",
        description: "審査で見られるポイントと通らないときの対処法です。",
        slugs: [
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
        description: "注文書・将来債権・リバースなど発展的な類型です。",
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
        description: "違法業者を避け、契約トラブルを防ぐための知識です。",
        slugs: [
          "article-factoring-ihou",
          "article-factoring-ihou-gyousha",
          "article-factoring-sagi",
          "article-factoring-trouble",
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
        heading: "税務・会計・資金繰り",
        description: "仕訳・消費税の扱いから資金繰り改善までカバーします。",
        slugs: [
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
