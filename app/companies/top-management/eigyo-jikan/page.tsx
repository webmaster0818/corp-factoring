import Link from "next/link";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { getCompanyDetails } from "@/data/companyDetails";
import { feeIndex } from "@/data/feeIndex";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE = "https://corp-factoring.com";
const SLUG = "top-management";
const CHECKED_AT = "2026年8月7日"; // 公式サイト一次確認日（operatingHoursMap登録日）

// 営業時間比較表に載せる他社（operatingHoursMapに一次確認値がある会社のみ）
const COMPARE_SLUGS = ["ennavi", "labol", "pmg", "accel-factor", "no1"];

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "トップマネジメントの営業時間・受付時間は？【2026年8月公式確認】";
  const description =
    "トップマネジメントの営業時間は平日10:00〜19:00（土日祝・年末年始は休業）。公式サイトで一次確認した受付時間・営業時間外の申し込みの扱い・他社との営業時間比較を、確認日つきで解説します。";
  return {
    title,
    description,
    alternates: { canonical: `/companies/${SLUG}/eigyo-jikan/` },
    openGraph: {
      title,
      description,
      url: `${SITE}/companies/${SLUG}/eigyo-jikan/`,
      type: "article",
    },
  };
}

export default function TopManagementHoursPage() {
  const company = getCompanyBySlug(SLUG)!;
  const h = getCompanyDetails(SLUG).operatingHours;
  const feeRow = feeIndex.find((f) => f.slug === SLUG)!;

  const rows: { k: string; v: string }[] = [
    { k: "平日", v: h.weekdays },
    ...(h.saturday ? [{ k: "土曜", v: h.saturday }] : []),
    ...(h.sunday ? [{ k: "日曜", v: h.sunday }] : []),
    ...(h.holidays ? [{ k: "祝日", v: h.holidays }] : []),
  ];

  const compareRows = COMPARE_SLUGS.map((slug) => {
    const c = getCompanyBySlug(slug);
    const oh = getCompanyDetails(slug).operatingHours;
    return { slug, name: c?.name ?? slug, hours: oh.weekdays, sat: oh.saturday, sun: oh.sunday };
  });

  const answer = `${company.name}の営業時間は「平日 ${h.weekdays}」で、土日祝は休業（年末年始も休業）です。申込から契約まではオンライン完結に対応しています（公式サイト・${CHECKED_AT}確認）。`;

  const faqs = [
    {
      question: `${company.name}の営業時間・受付時間は？`,
      answer,
    },
    {
      question: `${company.name}は土日祝も対応していますか？`,
      answer: `土曜・日曜・祝日は休業です（年末年始も休業）。土日に急ぎで資金化したい場合は、24時間365日受付をうたう会社など、休日対応の会社を検討する選択肢もあります（各社の受付体制は公式サイトの一次確認値を本ページの比較表に掲載）。`,
    },
    {
      question: `${company.name}に営業時間外に申し込んだらどうなりますか？`,
      answer: `営業時間外（平日19時以降・土日祝）に申し込んだ場合の受付の扱い（受付可否や翌営業日対応の有無）は、公式サイトでは確認できませんでした（${CHECKED_AT}時点）。確実に当日中の対応を受けたい場合は、平日10:00〜19:00の営業時間内に問い合わせるのが確実です。`,
    },
    {
      question: `${company.name}で即日入金を受けるにはいつ申し込めばよいですか？`,
      answer: `公式表示の入金スピードは「最短即日」です（2026年7月21日確認）。営業時間が平日10:00〜19:00のため、即日入金を目指すなら同日の営業時間内に申込〜審査〜契約まで完了させる必要があります。即日扱いの具体的な締切時刻は公式サイトでは確認できなかったため、時間に余裕を持って午前中など早い時間帯に申し込み、直接確認することをおすすめします。`,
    },
  ];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "トップマネジメントの営業時間・受付時間は？【2026年8月公式確認】",
    description:
      "トップマネジメントの営業時間・受付時間を公式サイトの一次確認値で解説。土日祝の扱い・営業時間外の申し込み・他社比較を掲載。",
    dateModified: "2026-08-16",
    author: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      url: `${SITE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/companies/${SLUG}/eigyo-jikan/`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
      { "@type": "ListItem", position: 2, name: company.name, item: `${SITE}/companies/${SLUG}/` },
      { "@type": "ListItem", position: 3, name: "営業時間・受付時間", item: `${SITE}/companies/${SLUG}/eigyo-jikan/` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">ホーム</Link> ＞ <Link href={`/companies/${SLUG}/`} className="hover:underline">{company.name}</Link> ＞ 営業時間・受付時間
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {company.name}の営業時間・受付時間
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          最終確認日：2026年8月16日（営業時間の公式一次確認：{CHECKED_AT}）
        </p>

        {/* 結論の即答（H1直下） */}
        <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">結論</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">{answer}</p>
        </div>

        {/* 営業時間・定休日の詳細 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の営業時間・定休日（公式一次確認）</h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((r) => (
                  <tr key={r.k} className="border-b border-gray-100 last:border-0">
                    <th className="w-24 bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-700">{r.k}</th>
                    <td className="px-3 py-2.5 text-gray-800">{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {h.note && <p className="mt-3 text-xs leading-relaxed text-gray-500">※{h.note}</p>}
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            ※本ページの営業時間は{company.name}公式サイトを当サイトが{CHECKED_AT}に確認したものです。公式に明示がない項目は「確認できず」と記載しています。最新の受付時間は
            <a href={company.url} target="_blank" rel="nofollow noopener" className="text-blue-600 underline">公式サイト</a>
            でご確認ください。
          </p>
        </section>

        {/* 申込〜入金の時間帯の目安 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">申込から入金までの時間帯の目安</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">
            {company.name}の入金スピードは公式表示で「{feeRow.speed}」です（2026年7月21日確認）。
            営業時間が平日10:00〜19:00のため、<strong>即日入金を目指す場合は、同日の営業時間内に申込・審査・契約まで完了させる</strong>ことが前提になります。
            申込から契約まではオンライン完結（{feeRow.online}）に対応しています。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">
            なお、即日扱いとなる申込の締切時刻は公式サイトでは確認できませんでした。日程に余裕がない場合は、午前中など早い時間帯に申し込み、担当者に当日入金の可否を直接確認するのが確実です。
          </p>
        </section>

        {/* 営業時間外の申し込みの扱い */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">営業時間外・土日祝の申し込みの扱い</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">
            {company.name}は土日祝・年末年始が休業です。平日19時以降や休業日に申し込んだ場合の扱い（Webフォーム受付の可否や、翌営業日の対応になるのか等）は、<strong>公式サイトでは確認できませんでした</strong>（{CHECKED_AT}時点）。
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">
            土日祝に受付・対応してほしい場合は、24時間365日受付をうたう会社を含めて比較するのも選択肢です。下の比較表で、当サイトが公式サイトを一次確認した各社の受付時間を確認できます。
          </p>
        </section>

        {/* 他社との営業時間比較 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">他社との営業時間比較（公式一次確認値）</h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">会社名</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">営業時間・受付</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">土日</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-3 py-2.5 font-bold text-gray-900">{company.name}</td>
                  <td className="px-3 py-2.5 text-gray-800">平日 {h.weekdays}</td>
                  <td className="px-3 py-2.5 text-gray-800">休業</td>
                </tr>
                {compareRows.map((r) => (
                  <tr key={r.slug} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      <Link href={`/companies/${r.slug}/`} className="text-blue-600 hover:underline">{r.name}</Link>
                    </td>
                    <td className="px-3 py-2.5 text-gray-800">{r.hours}</td>
                    <td className="px-3 py-2.5 text-gray-800">{r.sat ?? "公式では確認できず"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            ※各社の営業時間は当サイトが各社公式サイトで一次確認した値です（確認日は2026年7月8日〜8月7日・会社により異なります）。「公式では確認できず」は公式サイトに明示がなかった項目です。
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の営業時間に関するよくある質問</h2>
          <div className="mt-3 space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-900">Q. {f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">A. {f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 親ページへの導線 */}
        <section className="mt-8 rounded-lg bg-gray-50 p-5">
          <p className="text-sm font-bold text-gray-800">あわせて確認</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>・<Link href={`/companies/${SLUG}/`} className="text-blue-600 underline">{company.name}の評判・手数料・必要書類を総合解説</Link></li>
            <li>・<Link href="/articles/article-ennavi-vs-top-management/" className="text-blue-600 underline">えんナビと{company.name}の比較（手数料・入金スピード・営業時間）</Link></li>
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング24社の手数料・最短入金を一次確認で比較</Link></li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link href={`/companies/${SLUG}/`} className="text-sm font-bold text-blue-600 hover:underline">
            ← {company.name}の詳細ページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
