import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getAllArticles } from "@/lib/articles";
import { feeCheckedAt } from "@/data/feeIndex";

const PAGE_URL = "https://corp-factoring.com/guide/trouble/";
const CHECKED_AT = "2026年8月17日";

export const metadata: Metadata = {
  title: "ファクタリングのトラブル・法務ガイド｜違法業者の見分け方と相談窓口",
  description:
    "ファクタリングの違法性・偽装ファクタリング・契約書の確認点・契約後のトラブル対処を1ページに整理した法務ハブです。公的な相談窓口の連絡先もまとめています。",
  alternates: {
    canonical: "/guide/trouble",
  },
  openGraph: {
    title: "ファクタリングのトラブル・法務ガイド｜ファクタリング比較ナビ",
    description:
      "違法業者の見分け方、契約書で確認する条項、契約後のトラブル対処、公的な相談窓口までをまとめた法務ハブです。",
    type: "article",
  },
};

interface HubGroup {
  heading: string;
  summary: string;
  points: string[];
  slugs: string[];
}

const groups: HubGroup[] = [
  {
    heading: "1. 違法業者・偽装ファクタリングを避ける",
    summary:
      "売掛債権の買取（債権譲渡）として行われる取引と、実態が貸付にあたる取引は別物です。給与を対象にした「給与ファクタリング」や、買い戻し義務を課す契約は、貸金業の登録なしに行えば法令違反として問題になった経緯があります。まずは相手が何を売買しようとしているのかを確認してください。",
    points: [
      "売掛先ではなく給与・賃金を対象にしている勧誘には応じない",
      "「審査なし」「誰でも通る」など審査の存在を否定する広告表現に注意する",
      "契約書・見積書・会社の所在地や登記情報を必ず書面で確認する",
      "手数料が実質的な利率としてどの程度になるかを自分で試算する",
    ],
    slugs: [
      "article-factoring-ihou",
      "article-factoring-ihou-gyousha",
      "article-factoring-kyuuryo-gisou",
      "article-factoring-kyuuryo-chigai",
      "article-factoring-kashikingyou",
      "article-factoring-risoku-seigen",
      "article-factoring-sagi",
      "article-factoring-kinyuuchou",
    ],
  },
  {
    heading: "2. 契約書で必ず確認する条項",
    summary:
      "ファクタリングをめぐる相談の多くは、契約前に条項を読み切れていないことに起因します。償還請求権の有無、担保・保証の要求、債権譲渡登記の要否、途中でやめる場合の取り扱いは、契約書の記載によって結論が変わります。判断に迷う条項があれば、署名前に専門家へ確認してください。",
    points: [
      "償還請求権（買い戻し義務）の有無がどう書かれているか",
      "代表者の連帯保証・担保の差し入れを求める条項が入っていないか",
      "債権譲渡登記の要否と、その費用の負担者",
      "継続契約型の場合、契約期間・更新・終了の申し出方法がどう定められているか",
    ],
    slugs: [
      "article-factoring-keiyaku",
      "article-factoring-kaiyaku",
      "article-factoring-non-recourse",
      "article-factoring-shoufuri",
      "article-factoring-rentai-hoshou",
      "article-factoring-keiei-hoshou",
      "article-factoring-tanpo",
      "article-factoring-saiken-jyouto",
      "article-factoring-saiken-touki",
      "article-factoring-nijuujouto",
    ],
  },
  {
    heading: "3. 契約後に起きたトラブルへの対処",
    summary:
      "入金額が見積もりと違う、売掛先へ連絡されてしまった、売掛先が支払わない、といったトラブルは契約後に表面化します。まず契約書と当時のやり取り（メール・チャット・見積書）を時系列で保全し、そのうえで交渉するか、専門家や公的窓口へ相談するかを決めるのが実務的な順序です。",
    points: [
      "契約書・見積書・振込明細・やり取りの記録を保全する",
      "何がどの条項に反するのかを整理してから相手方へ連絡する",
      "支払い遅延や督促のトラブルは、記録が残る方法で連絡する",
      "取引先との関係に波及しそうな場合は、早い段階で専門家に相談する",
    ],
    slugs: [
      "article-factoring-trouble",
      "article-factoring-urikakesaki-tousan",
      "article-factoring-soshou",
      "article-factoring-bengoshi",
      "article-factoring-minpou",
      "article-factoring-shitaukehou",
      "article-factoring-hansha",
    ],
  },
  {
    heading: "4. 情報の取り扱いと社内・取引先への影響",
    summary:
      "提出書類には決算書・通帳・取引先情報など、機微な情報が含まれます。どの情報が何のために使われ、どこまで保管されるのかは、契約前に確認できる項目です。売掛先への通知の要否も、2社間・3社間のどちらを選ぶかで扱いが変わります。",
    points: [
      "提出書類の利用目的・保管期間・第三者提供の有無を確認する",
      "売掛先への通知・連絡の要否を契約書の記載で確認する",
      "従業員や取引先に知られたくない場合、どの方式なら回避できるかを整理する",
    ],
    slugs: [
      "article-factoring-kojinjouhou",
      "article-factoring-mynumber",
      "article-factoring-bareru",
      "article-factoring-2sha-3sha",
    ],
  },
  {
    heading: "5. 利用をやめたい・乗り換えたいとき",
    summary:
      "手数料負担が重い、依存が続いている、業者の対応に不安がある。理由によって取るべき選択肢は変わります。今回の取引を最後にする、条件の良い会社へ乗り換える、そもそも別の資金調達へ切り替える、違法業者の疑いがあるなら相談窓口へ。まずは自分がどの状況かを切り分けてください。",
    points: [
      "今回の個別契約を最後にするのか、継続契約を終了したいのかを区別する",
      "乗り換えを検討するなら、条件は複数社の見積もりで比較する",
      "資金繰りそのものの改善に手をつけないと、同じ状態に戻りやすい",
    ],
    slugs: [
      "article-factoring-yametai",
      "article-factoring-norikae",
      "article-factoring-keizoku-riyou",
      "article-factoring-tesuryo-koushou",
      "article-factoring-shikinguri",
      "article-factoring-cash-flow",
    ],
  },
];

const consultationDesks = [
  {
    name: "金融庁 金融サービス利用者相談室",
    tel: "0570-016811",
    target: "金融サービス全般に関する相談・情報提供",
    note: "貸金業の登録の有無や、金融サービスに関する一般的な相談の窓口です。",
  },
  {
    name: "日本貸金業協会 貸金業相談・紛争解決センター",
    tel: "0570-051-051",
    target: "貸金業に関する相談・苦情・紛争解決",
    note: "実態が貸付ではないかと疑われる取引について相談できます。",
  },
  {
    name: "法テラス（日本司法支援センター）",
    tel: "0570-078374",
    target: "法的トラブル全般の情報提供・相談窓口の案内",
    note: "どの専門家に相談すべきか分からないときの入口として使えます。",
  },
  {
    name: "消費者ホットライン",
    tel: "188",
    target: "消費生活全般の相談",
    note: "身近な消費生活センター等につながる全国共通の番号です。",
  },
  {
    name: "警察相談専用電話",
    tel: "#9110",
    target: "緊急ではない警察への相談",
    note: "脅迫的な取り立てなど、犯罪の可能性がある場合の相談先です。",
  },
];

const faqs = [
  {
    question: "ファクタリング自体は違法なのですか。",
    answer:
      "売掛債権の売買として適切に行われる取引と、実態が貸付にあたる取引は区別して考える必要があります。給与を対象にした取引や、買い戻し義務を伴う実質的な貸付は、貸金業の登録なしに行えば法令違反として問題になります。個別の契約がどちらにあたるかは契約内容によるため、疑わしい場合は本ページの相談窓口や弁護士へ確認してください。",
  },
  {
    question: "契約書に署名した後でも相談してよいですか。",
    answer:
      "署名後でも相談は可能です。契約書・見積書・振込明細・担当者とのやり取りを保全したうえで、法テラスや弁護士、貸金業に関する疑いがある場合は日本貸金業協会の窓口に状況を説明してください。取り扱いは契約内容と事実関係によって変わります。",
  },
  {
    question: "手数料が高いと感じます。どこを確認すればよいですか。",
    answer:
      "手数料率だけでなく、事務手数料・振込手数料・登記費用を含めた最終的な手取り額を書面で確認してください。各社の公表条件は当サイトの手数料比較ページで一次確認した内容を掲載しています（一次確認日 " +
      feeCheckedAt +
      "）。",
  },
  {
    question: "相談窓口に連絡する前に準備するものはありますか。",
    answer:
      "契約書・見積書・入出金の記録・担当者とのやり取り、そして時系列のメモを用意しておくと説明がスムーズです。金額と日付が分かる資料が揃っているほど、窓口側も状況を把握しやすくなります。",
  },
];

export default function TroubleGuidePage() {
  const allArticles = getAllArticles();
  const titleBySlug = new Map(allArticles.map((a) => [a.slug, a.title]));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://corp-factoring.com/" },
      { "@type": "ListItem", position: 2, name: "コラム", item: "https://corp-factoring.com/articles/" },
      { "@type": "ListItem", position: 3, name: "トラブル・法務ガイド", item: PAGE_URL },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "ファクタリングのトラブル・法務ガイド",
    description:
      "ファクタリングの違法性・偽装ファクタリング・契約書の確認点・契約後のトラブル対処と、公的な相談窓口をまとめた法務ハブです。",
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    author: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      url: "https://corp-factoring.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      logo: {
        "@type": "ImageObject",
        url: "https://corp-factoring.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition">
              ホーム
            </Link>
            {" > "}
            <Link href="/articles" className="hover:text-gray-700 transition">
              コラム
            </Link>
            {" > "}
            <span className="text-gray-600">トラブル・法務ガイド</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm font-semibold text-[#1B3A5C] mb-2">トラブル・法務ハブ</p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            ファクタリングのトラブル・法務ガイド
          </h1>
          <p className="text-gray-600 leading-relaxed mb-3">
            ファクタリングに関する相談は、「そもそも違法ではないのか」「契約書のこの条項は何を意味するのか」「契約後に起きた問題をどこへ相談すればよいのか」の3つに大きく分かれます。このページでは、当サイトの法務・トラブル関連の記事をテーマごとに整理し、あわせて公的な相談窓口の連絡先をまとめました。
          </p>
          <p className="text-gray-600 leading-relaxed">
            個別の契約について「解約できるか」「違約金がかかるか」といった結論は、契約書の記載と事実関係によって変わります。本ページは一般的な確認の観点を示すもので、法的助言ではありません。判断が必要な場面では、弁護士等の専門家または下記の公的窓口へご相談ください。
          </p>
          <p className="text-xs text-gray-500 mt-4">
            本ページの記載内容の確認日: {CHECKED_AT}（相談窓口の連絡先は各機関の公表情報に基づきます）
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* 目次 */}
        <nav className="bg-white border border-gray-200 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-bold text-[#1B3A5C] mb-3">このページの構成</h2>
          <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
            {groups.map((g) => (
              <li key={g.heading}>{g.heading}</li>
            ))}
            <li>公的な相談窓口一覧</li>
            <li>よくある質問</li>
          </ul>
        </nav>

        {/* テーマ別 */}
        {groups.map((group) => (
          <section key={group.heading} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-[#1B3A5C] pl-3">
              {group.heading}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{group.summary}</p>
            <div className="bg-[#F0F6FC] border border-[#1B3A5C]/15 rounded-lg p-5 mb-5">
              <p className="text-sm font-bold text-[#1B3A5C] mb-2">確認したいポイント</p>
              <ul className="space-y-1.5 text-sm text-gray-700 list-disc pl-5">
                {group.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.slugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/articles/${slug}/`}
                  className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-[#1B3A5C]/30 transition"
                >
                  <span className="text-sm text-gray-900 font-medium leading-snug">
                    {titleBySlug.get(slug) ?? slug}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 相談窓口 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-[#1B3A5C] pl-3">
            公的な相談窓口一覧
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            以下は公的機関・業界団体が公表している相談窓口です。受付時間や対象範囲は各機関の案内で最新情報をご確認ください。当サイトが独自の相談窓口を設けているものではありません。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border border-gray-200 font-bold text-gray-900">窓口</th>
                  <th className="p-3 border border-gray-200 font-bold text-gray-900">電話番号</th>
                  <th className="p-3 border border-gray-200 font-bold text-gray-900">主な相談内容</th>
                </tr>
              </thead>
              <tbody>
                {consultationDesks.map((desk) => (
                  <tr key={desk.tel} className="align-top">
                    <td className="p-3 border border-gray-200 text-gray-900 font-medium">{desk.name}</td>
                    <td className="p-3 border border-gray-200 text-gray-900 whitespace-nowrap">{desk.tel}</td>
                    <td className="p-3 border border-gray-200 text-gray-700">
                      {desk.target}
                      <span className="block text-gray-500 text-xs mt-1">{desk.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            上記以外の連絡先を名乗る「解決」「返金保証」などの勧誘には応じないでください。相談は公表されている窓口を経由するのが安全です。
          </p>
        </section>

        {/* 手数料データへの導線 */}
        <section className="mb-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1B3A5C] mb-2">条件を比べるときは一次確認データを使う</h2>
          <p className="text-sm text-gray-700 mb-4">
            各社の手数料・入金スピード・利用可能額は、当サイトが各社公式サイトを1件ずつ確認して掲載しています（一次確認日 {feeCheckedAt}）。公式に明示のない項目は「非公示」としてそのまま記載しています。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/fees/"
              className="inline-block bg-[#1B3A5C] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:opacity-90 transition"
            >
              手数料比較表を見る
            </Link>
            <Link
              href="/articles/article-factoring-yametai/"
              className="inline-block bg-white border border-[#1B3A5C] text-[#1B3A5C] text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#F0F6FC] transition"
            >
              ファクタリングをやめたい場合の選択肢
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-[#1B3A5C] pl-3">よくある質問</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-gray-200 rounded-lg p-5">
                <p className="font-bold text-gray-900 mb-2">{faq.question}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 関連ハブ */}
        <section className="text-center space-x-6">
          <Link href="/topics/kiso/" className="text-[#1B3A5C] hover:underline text-sm font-medium transition">
            基礎知識・審査・法律の記事一覧を見る
          </Link>
          <Link href="/articles/" className="text-gray-500 hover:text-gray-700 text-sm transition">
            コラム一覧に戻る
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
