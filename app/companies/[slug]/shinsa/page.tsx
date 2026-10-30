import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { feeIndex, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { editorialVerifications } from "@/data/editorialVerification";
import { getCompanyLead } from "@/data/companyLead";
import { SUBPAGE_SLUGS, pickFacts } from "@/data/subPages";
import { HOURS_LINK_SLUGS } from "@/data/hoursPages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DEFAULT_OG_IMAGES } from "@/lib/og";
import { getLastmod, toJaDate } from "@/lib/pageDates";

const SITE = "https://corp-factoring.com";

export function generateStaticParams() {
  return SUBPAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  const row = feeIndex.find((r) => r.slug === slug);
  if (!company || !row || !SUBPAGE_SLUGS.includes(slug)) return { title: "ページが見つかりません" };
  const title = `${company.name}の審査は？審査時間・必要書類・対象を公式確認`;
  const description = `${company.name}の審査について、公式サイトで確認した審査時間・最短入金（${row.speed}）・必要書類・対象（${row.target}）・審査で見られる点を掲載しています。審査に通らなかった場合の次の手も解説します。`;
  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}/shinsa/` },
    openGraph: { title, description, url: `${SITE}/companies/${slug}/shinsa/`, type: "article", images: DEFAULT_OG_IMAGES },
  };
}

export default async function CompanyScreeningPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SUBPAGE_SLUGS.includes(slug)) notFound();
  const company = getCompanyBySlug(slug);
  const row = feeIndex.find((r) => r.slug === slug);
  const ev = editorialVerifications[slug];
  if (!company || !row || !ev) notFound();
  const lead = getCompanyLead(slug);

  const timeFacts = pickFacts(slug, /審査|入金スピード|受付/);
  const docFacts = pickFacts(slug, /必要書類/);
  const targetFacts = pickFacts(slug, /対象|取引方式|契約方式/);
  const rateFacts = pickFacts(slug, /通過率|実績表示/);
  const auditFacts = lead?.auditFacts ?? [];

  const docText = docFacts.length ? docFacts.map((f) => f.value).join(" ") : "";
  const answer = `${company.name}の最短入金は公式表示で「${row.speed}」、対象は「${row.target}」です。${
    docText ? `必要書類は、公式表示で「${docText}」です。` : "必要書類は公式サイトで確認できた範囲では明示されていません。"
  }（公式サイト・${ev.checkedAt}確認）`;

  // 対象が近い他社（同じ審査ページを持つ会社から、個人事業主対応の有無が同じ会社を最大5社）
  const isKojin = (t: string) => /個人|フリーランス/.test(t) && !/個人事業主は利用不可|個人事業主・フリーランス不可|法人のみ|法人限定|法人専用/.test(t);
  const others = feeIndex
    .filter((r) => r.slug !== slug && SUBPAGE_SLUGS.includes(r.slug) && isKojin(r.target) === isKojin(row.target))
    .slice(0, 5);

  const faqs = [
    { question: `${company.name}の審査にかかる時間は？`, answer: timeFacts.length ? timeFacts.map((f) => `${f.label}：${f.value}`).join("。") + `（${ev.checkedAt}確認）` : `${company.name}の審査時間は、公式サイトで確認できた範囲では明示されていません。最短入金の公式表示は「${row.speed}」です。` },
    { question: `${company.name}の審査に必要な書類は？`, answer: docText ? `公式表示では「${docText}」です（${docFacts.map((f) => f.source).join("／")}）。審査の状況によって追加の書類を求められる場合があります。` : `${company.name}の必要書類は、公式サイトで確認できた範囲では明示されていません。申込前に問い合わせて確認してください。` },
    { question: `個人事業主でも${company.name}の審査を受けられますか？`, answer: `${company.name}の対象は、公式表示で「${row.target}」です（${ev.checkedAt}確認）。` },
    {
      question: `${company.name}の審査に落ちたらどうすればよいですか？`,
      answer: `ファクタリングの審査では、利用者本人よりも売掛先（請求書の支払い元）の信用力と、請求書の取引の実在性が重く見られるのが一般的です。断られた場合は、別の売掛先の請求書で申し込む、3社間ファクタリングを検討する、対象や金額の条件が合う別の会社に申し込む、といった方法があります。同じ請求書を複数の会社に同時に譲渡することはできません。`,
    },
  ];

  const lastmod = getLastmod(`/companies/${slug}/shinsa/`);
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${company.name}の審査（審査時間・必要書類・対象）`,
      ...(lastmod ? { dateModified: lastmod } : {}),
      author: { "@type": "Organization", name: "ファクタリング比較ナビ", url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: "ファクタリング比較ナビ", logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/companies/${slug}/shinsa/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE },
        { "@type": "ListItem", position: 2, name: company.name, item: `${SITE}/companies/${slug}/` },
        { "@type": "ListItem", position: 3, name: "審査", item: `${SITE}/companies/${slug}/shinsa/` },
      ],
    },
  ];

  const Facts = ({ items }: { items: { label: string; value: string; source: string }[] }) => (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-800">
      {items.map((f, i) => (
        <li key={i}>
          ・<strong>{f.label}</strong>：{f.value}
          <span className="block text-xs text-gray-500">出典：{f.source}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <Header />
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">ホーム</Link> ＞{" "}
          <Link href={`/companies/${slug}/`} className="hover:underline">{company.name}</Link> ＞ 審査
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{company.name}の審査（審査時間・必要書類・対象）</h1>
        <p className="mt-2 text-xs text-gray-500">
          {lastmod ? `更新日：${toJaDate(lastmod)}／` : ""}公式情報の編集部確認日：{ev.checkedAt}
        </p>

        <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">回答</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">{answer}</p>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">審査時間と入金までの時間</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">最短入金の公式表示は「{row.speed}」、オンライン完結は「{row.online}」です。</p>
          {timeFacts.length > 0 && <Facts items={timeFacts} />}
          {HOURS_LINK_SLUGS.includes(slug) && (
            <p className="mt-3 text-sm">
              <Link href={`/companies/${slug}/eigyo-jikan/`} className="text-blue-600 underline">{company.name}の営業時間・土日の扱い →</Link>
            </p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">必要書類</h2>
          {docFacts.length > 0 ? <Facts items={docFacts} /> : <p className="mt-3 text-sm leading-relaxed text-gray-800">{faqs[1].answer}</p>}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">審査の対象と条件</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">対象は公式表示で「{row.target}」、利用可能額は「{row.amount}」です。</p>
          {targetFacts.length > 0 && <Facts items={targetFacts} />}
          {auditFacts.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-800">
              {auditFacts.map((a, i) => (
                <li key={i}>・{a}</li>
              ))}
            </ul>
          )}
          {rateFacts.length > 0 && (
            <>
              <h3 className="mt-5 text-base font-bold text-gray-900">公式の審査通過率・実績の表示</h3>
              <Facts items={rateFacts} />
              <p className="mt-2 text-xs leading-relaxed text-gray-500">※会社が公式サイトで示している数値で、算出方法や対象期間は会社ごとに異なります。</p>
            </>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">審査に通らなかった場合</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{faqs[3].answer}</p>
          {others.length > 0 && (
            <>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">対象が近い他社（公式サイトで確認）：</p>
              <div className="mt-2 overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="px-3 py-2.5 text-left font-bold text-gray-700">会社名</th>
                      <th className="px-3 py-2.5 text-left font-bold text-gray-700">対象</th>
                      <th className="px-3 py-2.5 text-left font-bold text-gray-700">最短入金</th>
                    </tr>
                  </thead>
                  <tbody>
                    {others.map((o) => (
                      <tr key={o.slug} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2.5">
                          <Link href={`/companies/${o.slug}/shinsa/`} className="text-blue-600 hover:underline">{o.name}</Link>
                        </td>
                        <td className="px-3 py-2.5 text-gray-800">{o.target}</td>
                        <td className="px-3 py-2.5 text-gray-800">{o.speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <p className="mt-3 text-sm">
            <Link href="/articles/article-factoring-shinsa-ochita/" className="text-blue-600 underline">ファクタリングの審査に落ちる理由と対処法 →</Link>
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の審査に関するよくある質問</h2>
          <div className="mt-3 space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-900">Q. {f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">A. {f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg bg-gray-50 p-5">
          <p className="text-sm font-bold text-gray-800">関連ページ</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>・<Link href={`/companies/${slug}/`} className="text-blue-600 underline">{company.name}の口コミ・評判・会社概要</Link></li>
            <li>・<Link href={`/companies/${slug}/tesuryo/`} className="text-blue-600 underline">{company.name}の手数料と100万円の計算例</Link></li>
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング{FEE_COMPANY_COUNT}社の手数料・最短入金の比較（公式サイトで確認）</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
