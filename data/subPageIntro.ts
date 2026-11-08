// 子ページ（/companies/<slug>/eigyo-jikan/・/tesuryo/・/shinsa/）の「回答」の下に出す、会社名で検索した人向けの一文。
//
// 会社名だけ（例「アウル経済」「えんナビ」）や「会社名 評判」で子ページが表示されている組（GSC 2026年10月25日〜11月7日・5〜25位）に、
// 運営会社と会社ページ（口コミ・会社概要）への導線を冒頭で示す。公式サイトで確認した事実だけを書き、確認日と出典を付ける。
// キーは「<slug>/<子ページ種別>」。

export interface SubPageIntro {
  text: string; // 本文（公式確認値・確認日つき）
  sources: { label: string; url: string }[]; // 出典（公式・口コミサイトの通常URL。ASP計測リンクは不可）
  linkLabel: string; // 会社ページへのリンク文言
}

export const SUBPAGE_INTRO: { [key: string]: SubPageIntro } = {
  // GSC：「えんナビ」21.7位・「えんナビ ファクタリング」24.3位
  "ennavi/tesuryo": {
    text: "えんナビは、株式会社インターテック（代表取締役 伊藤公治、東京都中央区日本橋本町4-3-4 東海日本橋ビル3階）が運営するファクタリングサービスです。公式サイトは ennavi-factoring.net と ennavi.tokyo の2つがあります（2026年11月8日に公式の会社概要で確認）。口コミの掲載先と件数・営業時間は、えんナビの会社ページにまとめています。",
    sources: [
      { label: "えんナビ 会社概要", url: "https://ennavi.tokyo/company/" },
      { label: "えんナビ 公式トップ", url: "https://ennavi-factoring.net/" },
    ],
    linkLabel: "えんナビの口コミ・評判と営業時間（会社ページ）",
  },
  // GSC：「インボイスファクター」9位・「0120 686 766」12位
  "invoice-factor/eigyo-jikan": {
    text: "インボイスファクターは、株式会社アクシアプラスが運営するファクタリングサービスです。フリーダイヤル 0120-686-766 は、公式LPの電話ボタンに設定されている番号です（2026年11月8日に公式LPで確認）。同じ会社が運営する「いーばんく」との違い、口コミの掲載先、手数料は、インボイスファクターの会社ページにまとめています。",
    sources: [{ label: "インボイスファクター 公式LP", url: "https://invoice-factor.jp/lp/" }],
    linkLabel: "インボイスファクターの口コミ・評判と電話番号（会社ページ）",
  },
  // GSC：「みんなのファクタリング」19位
  "minna-factoring/eigyo-jikan": {
    text: "みんなのファクタリングは、株式会社チェンジ（代表取締役 辻 秀樹、東京都中央区日本橋室町一丁目11番12号、2023年1月20日設立）が運営する、登録から契約までWEBで完結するファクタリングです（2026年11月8日に運営会社の会社概要で確認）。口コミの掲載先・必要書類は、みんなのファクタリングの会社ページにまとめています。",
    sources: [{ label: "株式会社チェンジ 会社概要", url: "https://change-corp.jp/company/" }],
    linkLabel: "みんなのファクタリングの営業時間・口コミ（会社ページ）",
  },
  // GSC：「アウル経済」5位・「アウル経済 ファクタリング」7位
  "owl-keizai/eigyo-jikan": {
    text: "アウル経済のファクタリングは、株式会社アウル経済（代表取締役 諸喜田 憲、平成9年8月設立、資本金4,850万円、本社 東京都中央区日本橋2-2-3）が運営する法人限定のファクタリングです。公式LPでは、手数料を概ね1〜10％程度としています（2026年11月8日に公式の企業概要・LPで確認）。手数料・審査・会社概要は、アウル経済の会社ページにまとめています。",
    sources: [
      { label: "アウル経済 企業概要", url: "https://owl-economy.jp/about.php" },
      { label: "アウル経済 ファクタリングのページ", url: "https://owl-economy.jp/lp04/" },
    ],
    linkLabel: "アウル経済のファクタリング：手数料・審査・会社概要（会社ページ）",
  },
  // GSC：「アウル経済 ファクタリング」5.5位
  "owl-keizai/shinsa": {
    text: "アウル経済のファクタリングは、株式会社アウル経済（代表取締役 諸喜田 憲、平成9年8月設立、資本金4,850万円、本社 東京都中央区日本橋2-2-3）が運営する法人限定のファクタリングです。公式LPでは、手数料を概ね1〜10％程度としています（2026年11月8日に公式の企業概要・LPで確認）。手数料・営業時間・会社概要は、アウル経済の会社ページにまとめています。",
    sources: [
      { label: "アウル経済 企業概要", url: "https://owl-economy.jp/about.php" },
      { label: "アウル経済 ファクタリングのページ", url: "https://owl-economy.jp/lp04/" },
    ],
    linkLabel: "アウル経済のファクタリング：手数料・審査・会社概要（会社ページ）",
  },
  // GSC：「トップ・マネジメント 評判」24.7位
  "top-management/tesuryo": {
    text: "株式会社トップ・マネジメントの評判を口コミサイトの件数で見ると、ファクタリング口コミサイト「ファクコミ」に30件（表示されている投稿は2023年のもの）、比較サイト「FundBridge」に9件（表示されている投稿日は2026年3月2日）が掲載されています（2026年11月8日確認）。当サイトは口コミ本文の転載や独自の点数づけはしていません。掲載先の一覧と営業時間は、トップマネジメントの会社ページにまとめています。",
    sources: [
      { label: "ファクコミ（トップマネジメント）", url: "https://fackomi.com/company/top-management/" },
      { label: "FundBridge（トップ・マネジメント）", url: "https://fundbridge.jp/factoring/top-management/" },
    ],
    linkLabel: "トップマネジメントの評判・口コミの掲載先と営業時間（会社ページ）",
  },
};

export function getSubPageIntro(slug: string, kind: "eigyo-jikan" | "tesuryo" | "shinsa"): SubPageIntro | undefined {
  return SUBPAGE_INTRO[`${slug}/${kind}`];
}
