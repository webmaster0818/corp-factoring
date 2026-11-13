import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeeSimulator } from "@/components/FeeSimulator";
import { feeIndex, feeCheckedAt, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { DEFAULT_OG_IMAGES, DEFAULT_OG_IMAGE_URL } from "@/lib/og";

// Dataset の期間・更新日は、表のデータの確認日（feeCheckedAt・各行の recheck / speedCheckedAt）から算出する（2026-11-02）
const toIsoDates = (text: string): string[] => {
  const out: string[] = [];
  let year = "";
  for (const m of text.matchAll(/(?:(\d{4})年)?(\d{1,2})月(\d{1,2})日/g)) {
    if (m[1]) year = m[1];
    if (!year) continue;
    out.push(`${year}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`);
  }
  return out;
};
const feeDatasetStart = toIsoDates(feeCheckedAt)[0];
const feeDatasetEnd = [feeCheckedAt, ...feeIndex.flatMap((r) => [r.recheck ?? "", r.speedCheckedAt ?? ""])]
  .flatMap(toIsoDates)
  .reduce((a, b) => (b > a ? b : a), feeDatasetStart);

// 2社間手数料の下限が2%未満の会社（2026-11-08 E2）。
// 区分は articles/article-factoring-koushiki-data.md の表1（2社間手数料の下限の分布）と同じ：
// feeIndex.fee2 の表示の先頭にある下限の率。一律の率・公式内で下限の表示が異なる会社・非公示・2社間の記載なしは含めない。
// 並びは下限の率の低い順。同じ率の会社は feeIndex の掲載順（順位・おすすめではない）。
const LOW_FEE2: { slug: string; low: number }[] = [
  { slug: "mf-earlypayment", low: 0.5 },
  { slug: "invoice-factor", low: 0.5 },
  { slug: "no1", low: 0.5 },
  { slug: "ququmo", low: 1 },
  { slug: "accel-factor", low: 1 },
  { slug: "paytoday", low: 1 },
  { slug: "owl-keizai", low: 1 },
  { slug: "gmo-btob-hayabarai", low: 1 },
  { slug: "jtc", low: 1.2 },
  { slug: "support-kinyu", low: 1.5 },
  { slug: "factoring-zero", low: 1.5 },
  { slug: "msfj", low: 1.8 },
];
const LOW_FEE2_CHECKED = "2026年11月8日";
const lowFee2Rows = LOW_FEE2.map((x) => {
  const row = feeIndex.find((r) => r.slug === x.slug);
  if (!row) throw new Error(`feeIndex に ${x.slug} がありません`);
  return { ...x, row };
});
const lowFee2Groups = Array.from(new Set(LOW_FEE2.map((x) => x.low))).map((low) => ({
  low,
  rows: lowFee2Rows.filter((x) => x.low === low),
}));
const nameOf = (slug: string) => lowFee2Rows.find((x) => x.slug === slug)?.row.name ?? slug;

export const metadata = {
  title: `ファクタリング手数料が安い会社は？${FEE_COMPANY_COUNT}社の公式表示で比較｜下限2%未満の${LOW_FEE2.length}社・計算方法`,
  description: `2社間ファクタリングの手数料の下限が最も低いのは、公式表示で0.5%〜の3社（マネーフォワード 早期入金・インボイスファクター・株式会社No.1）。${FEE_COMPANY_COUNT}社の公式表示から下限が2%未満の${LOW_FEE2.length}社を低い順に並べ（${LOW_FEE2_CHECKED}確認）、3社間の下限と手数料の計算方法・シミュレーターも掲載。`,
  keywords: "ファクタリング,手数料,安い,一覧,計算,シミュレーター",
  alternates: {
    canonical: "/fees",
  },
  openGraph: {
    title: `ファクタリング手数料が安い会社は？${FEE_COMPANY_COUNT}社の公式表示で比較｜下限2%未満の${LOW_FEE2.length}社`,
    description: `${FEE_COMPANY_COUNT}社の公式表示から、2社間手数料の下限が2%未満の${LOW_FEE2.length}社を低い順に並べ、3社間の下限と手数料の計算方法を掲載しています。`,
    type: "article",
    url: "https://corp-factoring.com/fees/",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary",
    images: [DEFAULT_OG_IMAGE_URL],
    title: `ファクタリング手数料が安い会社は？${FEE_COMPANY_COUNT}社の公式表示で比較｜下限2%未満の${LOW_FEE2.length}社`,
    description: `${FEE_COMPANY_COUNT}社の公式表示から、2社間手数料の下限が2%未満の${LOW_FEE2.length}社を低い順に並べ、3社間の下限と手数料の計算方法を掲載しています。`,
  },
};

export default function FeesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">ホーム</Link>
            <span className="mx-2">＞</span>
            <span className="text-gray-900 font-medium">ファクタリング手数料が安い会社（公式表示の比較）</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* ヘッダー */}
        <div className="bg-white rounded-md p-6 sm:p-8 mb-8 border border-gray-200">
          <div className="text-center">
            <Badge className="mb-4 bg-transparent hover:bg-transparent text-[#1B3A5C] border border-[#1B3A5C]/40 rounded-sm font-bold">手数料の解説</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              ファクタリング手数料が安い会社は？{FEE_COMPANY_COUNT}社の公式表示で比較
            </h1>
          </div>
          <div className="text-left space-y-3 text-gray-800 leading-relaxed">
            <p>
              当サイト掲載の{FEE_COMPANY_COUNT}社の公式表示で、<strong>2社間ファクタリングの手数料の下限が最も低いのは、{nameOf("mf-earlypayment")}・{nameOf("invoice-factor")}・{nameOf("no1")}の3社（いずれも0.5%〜）</strong>です。次いで{nameOf("ququmo")}・{nameOf("accel-factor")}・{nameOf("paytoday")}・{nameOf("owl-keizai")}・{nameOf("gmo-btob-hayabarai")}（請求書買取）が1%〜で、下限が2%未満の会社は{LOW_FEE2.length}社でした（{LOW_FEE2_CHECKED}に各社の公式サイトで確認）。
            </p>
            <p>
              下限は最も条件が良い場合の率で、上限を表示していない会社もあります。実際の手数料は、各社の見積もりで確かめてください。3社間ファクタリング（売掛先の承諾を得る方式）の下限は、{nameOf("accel-factor")}・{nameOf("no1")}・トップ・マネジメントが0.5%〜と表示しています（当サイトの記録・2026年10月14日〜11月8日確認。<a href="#low-fee-3" className="text-blue-600 underline">3社間の一覧</a>）。
            </p>
          </div>
          <div id="calc" className="mt-5 rounded-md border border-green-200 bg-white p-4 text-sm text-gray-800">
            <p className="font-bold text-gray-900 mb-1">手数料の計算方法</p>
            <p>
              手数料 ＝ 売掛金額（請求額）× 手数料率 ＋ その他の費用（振込手数料など）<br />
              入金額 ＝ 売掛金額 − 手数料
            </p>
            <p className="mt-1 text-gray-600">
              計算例：売掛金額100万円・手数料率5%・振込手数料330円の場合、手数料は50,330円、入金額は949,670円です（率と費用は例です）。
            </p>
            <p className="mt-2">
              金額を入れて試算するなら<a href="#simulator" className="text-blue-600 underline">手数料シミュレーター</a>、手数料の内訳と相場の考え方は「<Link href="/articles/article-factoring-tesuryo/" className="text-blue-600 hover:text-blue-700 underline">ファクタリング手数料の相場と内訳</Link>」をご覧ください。
            </p>
          </div>
        </div>

        {/* 目次 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-900">目次</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li>
                <Link href="#low-fee" className="text-blue-600 hover:text-blue-700 font-medium">
                  1. 2社間手数料の下限が2%未満の{LOW_FEE2.length}社（公式表示の低い順）
                </Link>
              </li>
              <li>
                <Link href="#market" className="text-blue-600 hover:text-blue-700 font-medium">
                  2. 2社間・3社間の手数料の違いと、手数料が変わる条件
                </Link>
              </li>
              <li>
                <Link href="#fee-index" className="text-blue-600 hover:text-blue-700 font-medium">
                  3. {FEE_COMPANY_COUNT}社の手数料・入金スピード一覧
                </Link>
              </li>
              <li>
                <Link href="#tips" className="text-blue-600 hover:text-blue-700 font-medium">
                  4. 手数料を抑えるために確かめたい4つの点
                </Link>
              </li>
              <li>
                <Link href="#simulator" className="text-blue-600 hover:text-blue-700 font-medium">
                  5. 手数料シミュレーター（無料）
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-blue-600 hover:text-blue-700 font-medium">
                  6. よくある質問
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 1. 2社間手数料の下限が2%未満の会社（公式表示の低い順・順位ではない） */}
        <section id="low-fee" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">2社間手数料の下限が2%未満の{LOW_FEE2.length}社（公式表示の低い順）</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 mb-6">
                <ul className="space-y-1.5 list-disc pl-5">
                  <li><strong>並びの基準：</strong>各社の公式サイトに表示された2社間ファクタリングの手数料の下限の率が低い順です。同じ率の会社は当サイトの掲載順で、順位やおすすめではありません。</li>
                  <li><strong>母数：</strong>当サイト掲載の{FEE_COMPANY_COUNT}社。そのうち2社間手数料の下限の率を公表している31社（一律の率の会社を除く）の中で、下限が2%未満だった{LOW_FEE2.length}社です。</li>
                  <li><strong>含めていない会社：</strong>一律の率の会社（ペイトナー・ラボル・バイオン・Chatwork 先払い。いずれも一律10%）、公式内でページによって下限の表示が異なる会社（例：建設Payはサイトに1%〜、運営会社の自社サイトに2%〜）、率を公表していない会社、2社間の手数料の記載がない会社。</li>
                  <li><strong>確認日：</strong>{LOW_FEE2_CHECKED}に{LOW_FEE2.length}社の公式サイトで下限の表示を確認しました。2社間・3社間の欄は当サイトの記録（下の一覧と同じ）です。</li>
                  <li>区分の方法は「<Link href="/articles/article-factoring-koushiki-data/" className="text-blue-600 underline">ファクタリング会社59社の公式表示の集計</Link>」の表1（2社間手数料の下限の分布）と同じです。</li>
                </ul>
              </div>

              <div className="space-y-6">
                {lowFee2Groups.map((g) => (
                  <div key={g.low}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      2社間の下限 {g.low}%〜（{g.rows.length}社）
                    </h3>
                    <div className="space-y-3">
                      {g.rows.map(({ slug, row }) => (
                        <div key={slug} className="rounded-md border-2 border-gray-100 bg-white p-4">
                          <h4 className="text-base font-bold text-gray-900 mb-2">
                            <Link href={`/companies/${slug}`} className="text-blue-700 hover:underline">{row.name}</Link>
                          </h4>
                          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-sm text-gray-700">
                            <dt className="font-bold text-gray-900">2社間</dt>
                            <dd className="break-words">{row.fee2}</dd>
                            <dt className="font-bold text-gray-900">3社間</dt>
                            <dd className="break-words">{row.fee3}</dd>
                            <dt className="font-bold text-gray-900">最短入金</dt>
                            <dd className="break-words">{row.speed}</dd>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                ※ {nameOf("owl-keizai")}は公式のよくある質問に「概ね手数料率1〜10％程度」と表示しています。{nameOf("gmo-btob-hayabarai")}の1%〜は請求書買取の率で、注文書買取は2%〜12%です。{nameOf("ququmo")}の公式トップの表記は「最大でも1%～」です。{nameOf("invoice-factor")}・{nameOf("mf-earlypayment")}・{nameOf("support-kinyu")}は下限のみの表示で、上限の記載はありません。
              </p>

              {/* 3社間の下限（2社間とは別に表示） */}
              <div id="low-fee-3" className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">3社間の手数料の下限を数字で示している会社（参考）</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  3社間ファクタリング（売掛先の承諾を得て売掛金を譲渡する方式）は、2社間とは別に示します。当サイトの記録（2026年10月14日〜11月10日確認）で、3社間の手数料の下限が1.2%以下と表示している会社は次のとおりです。医療・介護の報酬だけを対象とするサービスは、対象が限られるため分けて記載しています。
                </p>
                <div className="overflow-x-auto rounded-md border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800 text-white">
                        <th className="px-3 py-2 text-left font-bold">会社</th>
                        <th className="px-3 py-2 text-left font-bold">3社間の手数料（公式表示）</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { slug: "accel-factor", note: "" },
                        { slug: "no1", note: "" },
                        { slug: "top-management", note: "" },
                        { slug: "ace-trust", note: "" },
                        { slug: "try", note: "" },
                      ].map(({ slug }, i) => {
                        const r = feeIndex.find((x) => x.slug === slug);
                        if (!r) return null;
                        return (
                          <tr key={slug} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-3 py-2 font-bold align-top"><Link href={`/companies/${slug}`} className="text-blue-700 hover:underline">{r.name}</Link></td>
                            <td className="px-3 py-2 text-gray-700 align-top break-words">{r.fee3}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm font-bold text-gray-900 mt-4 mb-2">医療・介護の報酬専用のサービス</p>
                <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                  {["mufg-factor", "kaipoke-early", "medley", "fps-medical"].map((slug) => {
                    const r = feeIndex.find((x) => x.slug === slug);
                    if (!r) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/companies/${slug}`} className="text-blue-700 hover:underline font-bold">{r.name}</Link>：{r.fee3}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  ※ 三菱ＵＦＪファクターは診療報酬、カイポケ早期入金・メドレー早期資金サポート・FPSメディカル（アクリーティブ）は介護・医療などの報酬を、国保連・支払基金への通知で買い取るサービスです。一般の企業間の請求書には使えません。メドレーの「最安0.3%〜」はメドレーグループのサービスの利用実績がある場合の率です。FPSメディカル（アクリーティブ）の「月0.25%〜」は月あたりの率（年率換算3%〜）で、1回あたりの率とは単位が異なります。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. 2社間・3社間の違いと手数料が変わる条件（当サイトの記録で数えた事実・公式の記載のみ） */}
        <section id="market" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">2社間・3社間の手数料の違いと、手数料が変わる条件</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  手数料の相場を示す公的な統計は見当たりません。当サイトでは、平均を出さず、各社の公式表示を社数で数えています（「<Link href="/articles/article-factoring-koushiki-data/" className="text-blue-600 underline">59社の公式表示の集計</Link>」）。
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-5 rounded-md border border-blue-100">
                    <h3 className="font-bold text-blue-700 mb-3 text-xl">2社間ファクタリング</h3>
                    <p className="text-sm text-gray-700 mb-2">売掛先に知らせずに、利用者とファクタリング会社の2社で契約する方式です。</p>
                    <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                      <li>掲載59社のうち、2社間に対応すると公式に記載している会社は50社</li>
                      <li>2社間手数料の下限の率を公表している31社のうち、12社が2%未満、7社が5%以上</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-5 rounded-md border border-green-100">
                    <h3 className="font-bold text-green-700 mb-3 text-xl">3社間ファクタリング</h3>
                    <p className="text-sm text-gray-700 mb-2">売掛先の承諾を得て、売掛先から直接ファクタリング会社に支払ってもらう方式です。売掛先に利用が知られます。</p>
                    <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                      <li>掲載59社のうち、3社間に対応すると公式に記載している会社は36社、そのうち3社間の率を数字で示している会社は18社</li>
                      <li>2社間・3社間の両方の下限を数字で示している12社では、3社間の下限が2社間より低い会社が9社、同じ会社が3社、高い会社は0社</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  ※ 12社の内訳（2社間の下限→3社間の下限）：ビートレーディング4%→2%、アクセルファクター1%→0.5%、トップ・マネジメント3.5%→0.5%、エーストラスト5%→1.0%、ファクタリングのTRY3%→1.2%、エスコム5%→1.5%、事業資金エージェント5%→1.5%、ネクストワン5%→1.5%（3社間は公式内で表記が異なり、いずれも1.5%〜）、JPS5%→2%（よくある質問の原則）、株式会社No.1・ベストファクター・インボイスPayは同じ率。当サイトの記録（2026年10月14日〜11月10日確認）から数えました。
                </p>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xl">手数料が変わる条件（各社の公式の記載）</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    日本中小企業金融サポート機構は、よくある質問で「実際の手数料は、売掛金の金額、入金予定日までの期間、売掛先の信用力、契約方法などによって変動します。」と案内しています（{LOW_FEE2_CHECKED}確認）。ほかの会社の公式表示にも、次のような例があります。
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">売掛金の金額</h4>
                      <p className="text-sm text-gray-600">トラストゲートウェイは公式の手数料ページで、3社間の平均的な買取手数料を100万円8%／300万円5%／1,000万円4%／3,000万円1.5%と例示しています。ベストファクターも買取金額別の目安表を載せています。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">売掛先の信用</h4>
                      <p className="text-sm text-gray-600">インボイスPayは、実勢の手数料を2.5%〜6%とし、売掛先の信用などにより最大10%と表示しています。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">売掛先の承諾（3社間）</h4>
                      <p className="text-sm text-gray-600">JTCは公式で『取引先から事前に承諾が得られる方が手数料は安くなります』と記載しています。</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">利用実績</h4>
                      <p className="text-sm text-gray-600">メドレー早期資金サポートは、メドレーグループのサービスの利用実績がある場合の率として「最安0.3%〜」と表示しています（医療・介護の報酬専用）。</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 一次確認 手数料・入金スピード比較インデックス */}
        <section id="fee-index" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">ファクタリング{FEE_COMPANY_COUNT}社 手数料・入金スピード比較（公式サイトで確認）</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                主要{FEE_COMPANY_COUNT}社の<strong>手数料率（2社間/3社間）・最短入金・利用可能額・対象・オンライン完結</strong>を、各社の公式サイトで<strong>{feeCheckedAt}に1件ずつ確認</strong>し、一覧にしています（その後に再確認した会社は、会社名の下に確認日を記載しています）。公式サイトに手数料率の記載がない会社は「非公示（要見積もり）」と記載しています。改定の頻度が高い分野のため、月に1回を目安に再確認し、更新しています。
              </p>
              <div className="overflow-x-auto rounded-md border border-gray-200 mb-3">
                <table className="w-full text-xs sm:text-sm min-w-[900px]">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-3 py-3 text-left font-bold whitespace-nowrap">会社</th>
                      <th className="px-3 py-3 text-left font-bold">2社間 手数料</th>
                      <th className="px-3 py-3 text-left font-bold">3社間 手数料</th>
                      <th className="px-3 py-3 text-left font-bold">最短入金</th>
                      <th className="px-3 py-3 text-left font-bold">利用可能額</th>
                      <th className="px-3 py-3 text-left font-bold">対象</th>
                      <th className="px-3 py-3 text-left font-bold">オンライン</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeIndex.map((r, i) => (
                      <tr key={r.slug} className={i % 2 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-3 py-2.5 font-bold text-gray-900 align-top whitespace-nowrap">
                          <Link href={`/companies/${r.slug}`} className="text-blue-700 hover:underline">{r.name}</Link>
                          {r.recheck && <span className="block text-[11px] font-normal text-gray-500">{r.recheck}</span>}
                        </td>
                        <td className="px-3 py-2.5 text-gray-700 align-top">{r.fee2}</td>
                        <td className="px-3 py-2.5 text-gray-700 align-top">{r.fee3}</td>
                        <td className="px-3 py-2.5 text-gray-700 align-top whitespace-nowrap">{r.speed}</td>
                        <td className="px-3 py-2.5 text-gray-700 align-top">{r.amount}</td>
                        <td className="px-3 py-2.5 text-gray-700 align-top">{r.target}</td>
                        <td className="px-3 py-2.5 text-gray-700 align-top">{r.online}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500">
                ※ 各社公式サイトの表示を{feeCheckedAt}に当サイトが確認したものです。「〜」は下限、「非公示」は公式に手数料率の記載がないことを示します。実際の手数料・入金時間は、売掛先の信用力・契約内容・申込の時間帯によって変動します。契約前に、各社の見積もりにて総額をご確認ください。
              </p>

              {/* このデータについて（集計方法）＝E-E-A-T・引用されやすい一次データの透明化 */}
              <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                <p className="font-bold text-gray-900 mb-2">このデータについて（集計方法）</p>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li><strong>対象：</strong>ファクタリング主要{feeIndex.length}社</li>
                  <li><strong>確認方法：</strong>各社の公式サイトに表示された手数料率（2社間／3社間）・最短入金・利用可能額・対象・オンライン完結可否を、当サイト編集部が1件ずつ確認</li>
                  <li><strong>確認日：</strong>{feeCheckedAt}（その後に再確認した会社は、表の会社名の下に確認日を記載）</li>
                  <li><strong>非公示の扱い：</strong>公式サイトに手数料率の記載がない会社は、推測で補完せず「非公示（要見積もり）」と記載</li>
                  <li><strong>更新方針：</strong>改定の頻度が高い分野のため、月に1回を目安に再確認して更新</li>
                  <li><strong>運営・編集：</strong>本データの作成方針・運営者情報は<a href="/about/" className="text-blue-600 underline">運営者情報・編集方針</a>をご覧ください。実際の手数料・入金時間は契約条件等によって変動するため、契約前に各社の見積もりにて総額をご確認ください。</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. 手数料を抑えるために確かめたい点（各社の公式表示・当サイトの記録にもとづく） */}
        <section id="tips" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">手数料を抑えるために確かめたい4つの点</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    title: "1. 複数社の見積もりを総額で比べる",
                    description: "公式の下限は最も条件が良い場合の率で、上限を表示していない会社もあります。複数社から見積もりを取り、手数料率と手数料以外の費用を合わせた総額で比べてください。",
                    color: "blue",
                  },
                  {
                    title: "2. 3社間ファクタリングを使えるか確かめる",
                    description: "2社間・3社間の両方の下限を数字で示している12社では、3社間の下限が2社間より低い会社が9社、同じ会社が3社でした。売掛先の承諾を得られる場合は、3社間の見積もりも取ってみてください。",
                    color: "emerald",
                  },
                  {
                    title: "3. 売掛金の金額と売掛先で率が変わることを前提にする",
                    description: "トラストゲートウェイの金額別の例示や、インボイスPayの「売掛先の信用などにより最大10%」の表示のように、売掛金の金額や売掛先によって率が変わると示している会社があります。同じ会社でも、請求書ごとに見積もりの率が違うことがあります。",
                    color: "amber",
                  },
                  {
                    title: "4. 手数料以外の費用を確かめる",
                    description: "公式に手数料以外の費用を表示している会社があります。たとえばペイトナーは別途振込手数料330円、バイオンは別途振込手数料500円、カイポケ早期入金は初回手数料5,000円・月額費用2,000円です。一方、OLTAは「諸経費込み」と表示しています。",
                    color: "sky",
                  },
                ].map((tip, index) => (
                  <div key={index} className={`bg-${tip.color}-50 p-6 rounded-md border border-${tip.color}-100`}>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{tip.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                見積もりの率を下げる交渉の進め方は「<Link href="/articles/article-factoring-tesuryo-koushou/" className="text-blue-600 underline">ファクタリング手数料の交渉方法・引き下げ方</Link>」で解説しています。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 4. シミュレーター */}
        <section id="simulator" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">手数料シミュレーター（無料）</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                売掛金額と入金までの期間を入力すると、入金額の目安を計算できます。試算は手数料率1%〜20%の幅と入金までの期間による補正で計算した目安で、特定の会社の手数料や見積もりではありません。各社の公式表示の率は<a href="#low-fee" className="text-blue-600 underline">上の一覧</a>でご確認ください。
              </p>
              <FeeSimulator />
            </CardContent>
          </Card>
        </section>

        {/* 5. FAQ */}
        <section id="faq" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-bold text-gray-900">よくある質問</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    q: "手数料が一番安いファクタリング会社はどこですか？",
                    a: `当サイト掲載の${FEE_COMPANY_COUNT}社の公式表示では、2社間ファクタリングの手数料の下限が最も低いのは、マネーフォワード 早期入金・インボイスファクター・株式会社No.1の3社（いずれも0.5%〜）です（${LOW_FEE2_CHECKED}確認）。下限は最も条件が良い場合の率のため、実際の手数料は見積もりで確かめてください。`
                  },
                  {
                    q: "ファクタリング手数料はどう計算しますか？",
                    a: "手数料は「売掛金額 × 手数料率 ＋ その他の費用（振込手数料など）」で、入金額は「売掛金額 − 手数料」です。たとえば売掛金額100万円・手数料率5%・振込手数料330円なら、手数料は50,330円、入金額は949,670円です（率と費用は例です）。"
                  },
                  {
                    q: "ファクタリング手数料の相場はいくらですか？",
                    a: "手数料の相場を示す公的な統計は見当たりません。手数料は、契約形態（2社間・3社間）や取引金額、売掛先の信用力によって変わります。各社の公式表示は、このページの比較表で確認できます。"
                  },
                  {
                    q: "手数料が安いファクタリング会社は信頼できますか？",
                    a: "手数料が安いことが、信頼性が低いことを意味するわけではありません。ただし、手数料以外の費用（振込手数料など）がかからないかを確認する必要があります。当サイトでは、各社の運営会社の情報と公式表示の手数料を、会社ごとのページに記載しています。"
                  },
                  {
                    q: "手数料以外にかかる費用はありますか？",
                    a: "会社によって、振込手数料、債権譲渡登記の費用（登記をする場合）、初回手数料や月額費用などがかかります。たとえばペイトナーは別途振込手数料330円、カイポケ早期入金は初回手数料5,000円・月額費用2,000円と表示しています。契約前に総費用を確認してください。"
                  },
                  {
                    q: "手数料は交渉できますか？",
                    a: "交渉に応じるかどうかは会社によります。複数社の見積もりを比べてから相談すると、条件の違いを具体的に伝えられます。進め方は「ファクタリング手数料の交渉方法・引き下げ方」の記事で解説しています。"
                  },
                  {
                    q: "手数料が高いのはどんな場合ですか？",
                    a: "日本中小企業金融サポート機構は、実際の手数料が売掛金の金額、入金予定日までの期間、売掛先の信用力、契約方法などによって変動すると案内しています。インボイスPayのように、売掛先の信用などにより最大10%と表示している会社もあります。"
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-md border border-blue-100">
                    <h4 className="font-bold text-gray-900 mb-3 text-lg">Q. {faq.q}</h4>
                    <p className="text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-500">
                      A. {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 手数料クラスタの関連記事（相互リンク） */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[#1B3A5C] mb-4">手数料に関する解説記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { slug: "article-factoring-tesuryo", label: "ファクタリング手数料の相場と内訳｜2社間・3社間の違い" },
              { slug: "article-factoring-tesuryo-yasui", label: "ファクタリング手数料が安い会社の選び方" },
              { slug: "article-factoring-tesuryo-koushou", label: "ファクタリング手数料の交渉方法・引き下げ方" },
            ].map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`} className="block bg-white border border-gray-200 rounded-md p-4 hover:border-[#1B3A5C] hover:shadow-sm transition">
                <span className="text-xs font-semibold text-[#1B3A5C] bg-[#F0F6FC] px-2 py-0.5 rounded-full">解説記事</span>
                <p className="mt-2 text-sm font-medium text-gray-800 leading-snug">{a.label}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#1B3A5C] rounded-md p-8 sm:p-10 text-center text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            手数料が安いファクタリング会社を診断する
          </h2>
          <p className="mb-8 text-orange-100 text-lg leading-relaxed">
            無料診断ツールでは、選択した条件に合う手数料の低いファクタリング会社を表示します
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#diagnosis"
              className="bg-white text-orange-600 font-bold py-4 px-10 rounded-md hover:bg-gray-100 transition shadow-sm"
            >
              無料診断を始める
            </Link>
            <Link
              href="/#ranking"
              className="bg-orange-700 text-white font-bold py-4 px-10 rounded-md hover:bg-orange-800 transition border-2 border-orange-400"
            >
              掲載会社の一覧を見る
            </Link>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="text-center">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-bold text-lg inline-flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>

      <Footer />

      {/* パンくずリスト構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://corp-factoring.com/" },
              { "@type": "ListItem", "position": 2, "name": "手数料比較", "item": "https://corp-factoring.com/fees/" },
            ],
          }),
        }}
      />

      {/* Dataset 構造化データ＝一次確認データ資産を「引用可能なデータセット」として明示（AI/検索の権威づけ） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            "name": `ファクタリング${feeIndex.length}社 手数料・入金スピード比較データ（公式サイトで確認）`,
            "description": `ファクタリング主要${feeIndex.length}社の手数料率（2社間／3社間）・最短入金・利用可能額・対象・オンライン完結可否を、各社の公式サイトで1件ずつ確認して集計したデータセットです。`,
            "creator": { "@type": "Organization", "name": "corp-factoring 編集部", "url": "https://corp-factoring.com/" },
            "temporalCoverage": `${feeDatasetStart}/${feeDatasetEnd}`,
            "dateModified": feeDatasetEnd,
            "spatialCoverage": { "@type": "Place", "name": "日本" },
            "measurementTechnique": "各社公式サイトに表示された手数料率・入金スピード・条件の確認",
            "variableMeasured": ["2社間手数料率", "3社間手数料率", "最短入金", "利用可能額", "オンライン完結可否"],
            "isAccessibleForFree": true,
            "url": "https://corp-factoring.com/fees/",
          }),
        }}
      />
    </div>
  );
}
