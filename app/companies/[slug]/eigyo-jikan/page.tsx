import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { getCompanyDetails } from "@/data/companyDetails";
import { feeIndex, feeCheckedAt } from "@/data/feeIndex";
import { HOURS_SLUGS, HOURS_CHECKED_AT, HOURS_COMPARE_POOL } from "@/data/hoursPages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE = "https://corp-factoring.com";
const PAGE_UPDATED = "2026年8月22日";
const PAGE_UPDATED_ISO = "2026-08-22";

const SLUGS: string[] = [...HOURS_SLUGS];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

// 「2026年7月8日」→「2026年7月」
function toMonthLabel(checkedAt: string): string {
  const m = checkedAt.match(/^(\d{4})年(\d{1,2})月/);
  return m ? `${m[1]}年${m[2]}月` : checkedAt;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company || !SLUGS.includes(slug)) return { title: "ページが見つかりません" };
  const h = getCompanyDetails(slug).operatingHours;
  const checkedAt = HOURS_CHECKED_AT[slug] ?? "";
  const title = `${company.name}の営業時間・受付時間は？【${toMonthLabel(checkedAt)}公式確認】`;
  const description = `${company.name}の受付時間は公式表示で「${h.weekdays}」。公式サイトで一次確認した営業時間・土日祝の扱い・営業時間外の申し込み・他社との受付時間比較を、確認日つきで整理しました。`;
  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}/eigyo-jikan/` },
    openGraph: { title, description, url: `${SITE}/companies/${slug}/eigyo-jikan/`, type: "article" },
  };
}

export default async function CompanyHoursPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const h = getCompanyDetails(slug).operatingHours;
  const feeRow = feeIndex.find((f) => f.slug === slug);
  const checkedAt = HOURS_CHECKED_AT[slug] ?? "";
  const monthLabel = toMonthLabel(checkedAt);

  // 公式表示から機械的に判定できる範囲だけを条件分岐に使う（推測で断定しない）
  const is24h = /24時間|365日|常時/.test(h.weekdays);
  const weekendExplicit = Boolean(h.saturday || h.sunday || h.holidays);
  const cutoffDocumented = /\d{1,2}[:：]\d{2}まで|時までに|締切/.test(`${h.weekdays}${h.note ?? ""}`);
  const offHoursDocumented = /翌営業日|24時間|365日|常時受付/.test(`${h.weekdays}${h.note ?? ""}`);

  const rows: { k: string; v: string }[] = [
    { k: "平日", v: h.weekdays },
    { k: "土曜", v: h.saturday ?? "公式サイトでは確認できず" },
    { k: "日曜", v: h.sunday ?? "公式サイトでは確認できず" },
    { k: "祝日", v: h.holidays ?? "公式サイトでは確認できず" },
  ];

  const weekendSentence = weekendExplicit
    ? `土曜は${h.saturday ?? "公式サイトでは確認できず"}、日曜は${h.sunday ?? "公式サイトでは確認できず"}${h.holidays ? `、祝日は${h.holidays}` : ""}です。`
    : `土曜・日曜・祝日の個別の受付体制は、公式サイトでは確認できませんでした。`;

  const answer = `${company.name}の受付時間は公式表示で「${h.weekdays}」です。${weekendSentence}（公式サイト・${checkedAt}確認）`;

  const offHoursAnswer =
    is24h || offHoursDocumented
      ? `${company.name}の公式表示は「${h.weekdays}」です。ただし、申込の受付と、実際に審査・入金処理が行われる時間帯が同じとは限りません。本ページの受付時間欄・注記に記載した内容が公式サイトで確認できた範囲で、それ以外の運用（審査担当者が対応する時間帯、休業日の設定など）までは公式サイトでは確認できませんでした（${checkedAt}時点）。`
      : `受付時間外に申し込んだ場合の扱い（Webフォーム受付の可否、翌営業日対応になるのか等）は、公式サイトでは確認できませんでした（${checkedAt}時点）。確実に当日中の対応を受けたい場合は、公式表示の受付時間内に問い合わせるのが確実です。`;

  const sokujitsuAnswer = feeRow
    ? `${company.name}の入金スピードは公式表示で「${feeRow.speed}」です（${feeCheckedAt}確認）。受付時間は「${h.weekdays}」のため、${
        is24h
          ? "オンラインでの申込自体は時間帯を問わず可能と公式に表示されていますが、審査・契約の実処理が行われる時間帯は公式サイトでは確認できませんでした。"
          : "即日入金を目指す場合は、同日の受付時間内に申込・審査・契約まで完了させることが前提になります。"
      }${
        cutoffDocumented
          ? "即日扱いの締切については、本ページの受付時間欄・注記に記載した公式表示をご確認ください。"
          : `即日扱いとなる申込の締切時刻は公式サイトでは確認できなかったため（${checkedAt}時点）、余裕を持って早い時間帯に申し込み、当日入金の可否を直接確認することをおすすめします。`
      }`
    : `即日入金の可否・締切時刻は公式サイトでは確認できませんでした（${checkedAt}時点）。公式サイトで直接ご確認ください。`;

  const faqs = [
    { question: `${company.name}の営業時間・受付時間は？`, answer },
    {
      question: `${company.name}は土日祝も対応していますか？`,
      answer: `${weekendSentence}${
        weekendExplicit && /休業|定休/.test(`${h.saturday ?? ""}${h.sunday ?? ""}${h.holidays ?? ""}`)
          ? "土日に急ぎで資金化したい場合は、24時間365日受付をうたう会社など、休日対応の会社を検討する選択肢もあります（各社の受付体制は本ページの比較表に公式一次確認値を掲載）。"
          : "各社の受付体制は会社によって大きく異なるため、本ページの比較表に掲載した公式一次確認値もあわせてご確認ください。"
      }`,
    },
    { question: `${company.name}に営業時間外に申し込んだらどうなりますか？`, answer: offHoursAnswer },
    { question: `${company.name}で即日入金を受けるにはいつ申し込めばよいですか？`, answer: sokujitsuAnswer },
  ];

  const compareRows = HOURS_COMPARE_POOL.filter((s) => s !== slug)
    .slice(0, 5)
    .map((s) => {
      const c = getCompanyBySlug(s);
      const oh = getCompanyDetails(s).operatingHours;
      return { slug: s, name: c?.name ?? s, hours: oh.weekdays, sat: oh.saturday };
    })
    .filter((r) => Boolean(getCompanyBySlug(r.slug)));

  const pageTitle = `${company.name}の営業時間・受付時間は？【${monthLabel}公式確認】`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: `${company.name}の営業時間・受付時間を公式サイトの一次確認値で解説。土日祝の扱い・営業時間外の申し込み・他社比較を掲載。`,
    dateModified: PAGE_UPDATED_ISO,
    author: { "@type": "Organization", name: "ファクタリング比較ナビ", url: `${SITE}/about` },
    publisher: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/companies/${slug}/eigyo-jikan/` },
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
      { "@type": "ListItem", position: 2, name: company.name, item: `${SITE}/companies/${slug}/` },
      { "@type": "ListItem", position: 3, name: "営業時間・受付時間", item: `${SITE}/companies/${slug}/eigyo-jikan/` },
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
          <Link href="/" className="hover:underline">ホーム</Link> ＞{" "}
          <Link href={`/companies/${slug}/`} className="hover:underline">{company.name}</Link> ＞ 営業時間・受付時間
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {company.name}の営業時間・受付時間
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          最終確認日：{PAGE_UPDATED}（営業時間の公式一次確認：{checkedAt}）
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
            ※本ページの営業時間は{company.name}公式サイトを当サイトが{checkedAt}に確認したものです。公式に明示がない項目は「公式サイトでは確認できず」と記載しています。最新の受付時間は
            <a href={company.url} target="_blank" rel="sponsored nofollow noopener" className="text-blue-600 underline">公式サイト</a>
            でご確認ください。
          </p>
        </section>

        {/* 申込〜入金の時間帯の目安 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">申込から入金までの時間帯の目安</h2>
          {feeRow ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {company.name}の入金スピードは公式表示で「<strong>{feeRow.speed}</strong>」です（{feeCheckedAt}確認）。
                受付時間は「{h.weekdays}」で、申込から契約までのオンライン完結は「{feeRow.online}」です。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {is24h
                  ? "オンラインでの申込自体は時間帯を問わず可能と公式に表示されていますが、審査・契約の実処理が何時から何時まで行われるかは公式サイトでは確認できませんでした。"
                  : "即日入金を目指す場合は、同日の受付時間内に申込・審査・契約まで完了させることが前提になります。"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {cutoffDocumented
                  ? "即日扱いの締切時刻については、上の受付時間欄・注記に記載した公式表示をご確認ください。条件の詳細は公式サイトで直接ご確認いただくのが確実です。"
                  : `なお、即日扱いとなる申込の締切時刻は公式サイトでは確認できませんでした（${checkedAt}時点）。日程に余裕がない場合は、午前中など早い時間帯に申し込み、当日入金の可否を担当者に直接確認するのが確実です。`}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-gray-800">
              入金スピード・即日扱いの締切時刻は公式サイトでは確認できませんでした（{checkedAt}時点）。公式サイトで直接ご確認ください。
            </p>
          )}
        </section>

        {/* 営業時間外の申し込みの扱い */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">営業時間外・土日祝の申し込みの扱い</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{weekendSentence}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{offHoursAnswer}</p>
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
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">土曜</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-3 py-2.5 font-bold text-gray-900">{company.name}</td>
                  <td className="px-3 py-2.5 text-gray-800">{h.weekdays}</td>
                  <td className="px-3 py-2.5 text-gray-800">{h.saturday ?? "公式では確認できず"}</td>
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
            ※各社の営業時間は当サイトが各社公式サイトで一次確認した値です（確認日は2026年7月8日〜8月22日・会社により異なります）。「公式では確認できず」は公式サイトに明示がなかった項目です。
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
            <li>・<Link href={`/companies/${slug}/`} className="text-blue-600 underline">{company.name}の評判・手数料・必要書類を総合解説</Link></li>
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング24社の手数料・最短入金を一次確認で比較</Link></li>
            <li>・<Link href="/#comparison" className="text-blue-600 underline">ファクタリング会社の比較一覧から他社を確認する</Link></li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link href={`/companies/${slug}/`} className="text-sm font-bold text-blue-600 hover:underline">
            ← {company.name}の詳細ページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
