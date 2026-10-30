import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { feeIndex, feeCheckedAt, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { editorialVerifications } from "@/data/editorialVerification";
import { SUBPAGE_SLUGS, parseRate, isNotOffered, pickFacts } from "@/data/subPages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DEFAULT_OG_IMAGES } from "@/lib/og";
import { getLastmod, toJaDate } from "@/lib/pageDates";

const SITE = "https://corp-factoring.com";
const SAMPLE = 1_000_000; // 計算例の請求書額面

export function generateStaticParams() {
  return SUBPAGE_SLUGS.map((slug) => ({ slug }));
}

const yen = (n: number) => `${Math.round(n).toLocaleString("ja-JP")}円`;

function checkedOf(slug: string): string {
  const row = feeIndex.find((r) => r.slug === slug);
  const m = row?.recheck?.match(/(\d{4}年\d{1,2}月\d{1,2}日)/);
  return m ? m[1] : feeCheckedAt;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  const row = feeIndex.find((r) => r.slug === slug);
  if (!company || !row || !SUBPAGE_SLUGS.includes(slug)) return { title: "ページが見つかりません" };
  const title = `${company.name}の手数料は？2社間・3社間の率と100万円の計算例【公式確認】`;
  const description = `${company.name}の手数料は公式表示で2社間「${row.fee2}」${isNotOffered(row.fee3) ? "" : `、3社間「${row.fee3}」`}。100万円の請求書を売った場合の手取りの計算例、手数料以外の費用、他社との比較を、公式サイトで確認した内容（${checkedOf(slug)}確認）で掲載しています。`;
  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}/tesuryo/` },
    openGraph: { title, description, url: `${SITE}/companies/${slug}/tesuryo/`, type: "article", images: DEFAULT_OG_IMAGES },
  };
}

export default async function CompanyFeePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SUBPAGE_SLUGS.includes(slug)) notFound();
  const company = getCompanyBySlug(slug);
  const row = feeIndex.find((r) => r.slug === slug);
  if (!company || !row) notFound();

  const checked = checkedOf(slug);
  const ev = editorialVerifications[slug];
  const r2 = parseRate(row.fee2);
  const r3 = isNotOffered(row.fee3) ? {} : parseRate(row.fee3);
  const has3 = !isNotOffered(row.fee3);
  const costFacts = pickFacts(slug, /手数料以外|費用|プラン/);
  const feeFacts = pickFacts(slug, /^手数料/);

  // 計算例（公式表示の率をそのまま当てはめる）
  const examples: { label: string; rate: number }[] = [];
  if (r2.min !== undefined) examples.push({ label: `2社間・${r2.flat ? "一律" : "下限"}${r2.min}%`, rate: r2.min });
  if (r2.max !== undefined && !r2.flat) examples.push({ label: `2社間・上限${r2.max}%`, rate: r2.max });
  if (r3.min !== undefined) examples.push({ label: `3社間・下限${r3.min}%`, rate: r3.min });
  if (r3.max !== undefined && !r3.flat) examples.push({ label: `3社間・上限${r3.max}%`, rate: r3.max });

  // 比較：2社間の下限が公表されている他社を下限の低い順に5社
  const others = feeIndex
    .filter((r) => r.slug !== slug)
    .map((r) => ({ r, min: parseRate(r.fee2).min }))
    .filter((x) => x.min !== undefined)
    .sort((a, b) => (a.min as number) - (b.min as number))
    .slice(0, 5)
    .map((x) => x.r);

  // 2社間の提供がなく3社間だけ率が出ている会社（例：カイポケ早期入金）は3社間の率で判定する
  const upperUnknown =
    (r2.min !== undefined && r2.max === undefined) || (r2.min === undefined && r3.min !== undefined && r3.max === undefined);
  const answer = `${company.name}の手数料は、公式表示で2社間ファクタリングが「${row.fee2}」${has3 ? `、3社間ファクタリングが「${row.fee3}」` : "です（3社間は公式に対応の記載がありません）"}${has3 ? "です" : ""}。${
    upperUnknown ? "上限の率は公式に記載がないため、実際の率は見積もりで確認する必要があります。" : ""
  }${r2.min === undefined && r3.min === undefined ? "率が公式に示されていないため、見積もりで確認する必要があります。" : ""}（公式サイト・${checked}確認）`;

  const faqs = [
    { question: `${company.name}の手数料はいくらですか？`, answer },
    {
      question: `${company.name}で100万円の請求書を売ると、手元にいくら残りますか？`,
      answer:
        examples.length > 0
          ? `公式表示の率をそのまま当てはめると、${examples.map((e) => `${e.label}なら${yen(SAMPLE * (1 - e.rate / 100))}`).join("、")}です。実際の率は売掛先の信用力・金額・取引の状況で決まり、振込手数料などが別にかかる場合があります。`
          : `${company.name}は手数料率を公式に示していないため、計算例は出せません。見積もりで率と、手数料以外の費用の有無を確認してください。`,
    },
    {
      question: `${company.name}の手数料以外にかかる費用はありますか？`,
      answer:
        costFacts.length > 0
          ? costFacts.map((f) => `${f.label}：${f.value}（${f.source}）`).join(" ")
          : `手数料以外の費用（振込手数料・登記費用・印紙代など）の扱いは、${company.name}の公式サイトで確認できた範囲では記載がありませんでした（${checked}時点）。見積もりの際に、総額でいくらかかるかを確認してください。`,
    },
  ];

  const lastmod = getLastmod(`/companies/${slug}/tesuryo/`);
  const pageTitle = `${company.name}の手数料`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${pageTitle}（2社間・3社間の率と計算例）`,
      ...(lastmod ? { dateModified: lastmod } : {}),
      author: { "@type": "Organization", name: "ファクタリング比較ナビ", url: `${SITE}/about` },
      publisher: { "@type": "Organization", name: "ファクタリング比較ナビ", logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/companies/${slug}/tesuryo/` },
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
        { "@type": "ListItem", position: 3, name: "手数料", item: `${SITE}/companies/${slug}/tesuryo/` },
      ],
    },
  ];

  return (
    <>
      <Header />
      {ld.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">ホーム</Link> ＞{" "}
          <Link href={`/companies/${slug}/`} className="hover:underline">{company.name}</Link> ＞ 手数料
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{company.name}の手数料（2社間・3社間）</h1>
        <p className="mt-2 text-xs text-gray-500">
          {lastmod ? `更新日：${toJaDate(lastmod)}／` : ""}手数料の公式サイト確認日：{checked}
        </p>

        <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">回答</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">{answer}</p>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">公式サイトで確認した手数料と条件</h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["2社間ファクタリング", row.fee2],
                  ["3社間ファクタリング", row.fee3],
                  ["最短入金", row.speed],
                  ["利用可能額", row.amount],
                  ["対象", row.target],
                  ["オンライン完結", row.online],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100 last:border-0">
                    <th className="w-36 bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-700">{k}</th>
                    <td className="px-3 py-2.5 text-gray-800">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {feeFacts.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-gray-600">
              {feeFacts.map((f, i) => (
                <li key={i}>※{f.label}：{f.value}（出典：{f.source}）</li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">100万円の請求書を売った場合の計算例</h2>
          {examples.length > 0 ? (
            <>
              <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[420px] text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="px-3 py-2.5 text-left font-bold text-gray-700">適用する率</th>
                      <th className="px-3 py-2.5 text-right font-bold text-gray-700">手数料</th>
                      <th className="px-3 py-2.5 text-right font-bold text-gray-700">手元に残る額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examples.map((e) => (
                      <tr key={e.label} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2.5 text-gray-800">{e.label}</td>
                        <td className="px-3 py-2.5 text-right text-gray-800">{yen((SAMPLE * e.rate) / 100)}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-gray-900">{yen(SAMPLE * (1 - e.rate / 100))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                ※公式表示の率を額面100万円にそのまま当てはめた試算です。実際の率は審査で決まり、振込手数料・登記費用・印紙代などが別にかかる場合があります。{upperUnknown ? "上限の率は公式に記載がないため、上限側の計算はしていません。" : ""}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-gray-800">
              {company.name}は手数料率を公式に示していないため、計算例は出していません。複数社の見積もりを取り、手数料の率と手元に残る総額で比べることをおすすめします。
            </p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">手数料以外の費用</h2>
          {costFacts.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-800">
              {costFacts.map((f, i) => (
                <li key={i}>・{f.label}：{f.value}<span className="text-xs text-gray-500">（{f.source}）</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-gray-800">{faqs[2].answer}</p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">2社間の手数料の下限が低い他社との比較</h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">会社名</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">2社間</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">3社間</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">最短入金</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-3 py-2.5 font-bold text-gray-900">{company.name}</td>
                  <td className="px-3 py-2.5 text-gray-800">{row.fee2}</td>
                  <td className="px-3 py-2.5 text-gray-800">{row.fee3}</td>
                  <td className="px-3 py-2.5 text-gray-800">{row.speed}</td>
                </tr>
                {others.map((o) => (
                  <tr key={o.slug} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-2.5">
                      <Link href={`/companies/${o.slug}/tesuryo/`} className="text-blue-600 hover:underline">{o.name}</Link>
                    </td>
                    <td className="px-3 py-2.5 text-gray-800">{o.fee2}</td>
                    <td className="px-3 py-2.5 text-gray-800">{o.fee3}</td>
                    <td className="px-3 py-2.5 text-gray-800">{o.speed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            ※各社の公式サイトで確認した値です（確認日は会社により異なり、<Link href="/fees/" className="text-blue-600 underline">{FEE_COMPANY_COUNT}社の手数料比較</Link>に記載しています）。下限の率は条件が最も良い場合の値で、多くの利用者に適用される率ではありません。
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の手数料に関するよくある質問</h2>
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
            <li>・<Link href={`/companies/${slug}/shinsa/`} className="text-blue-600 underline">{company.name}の審査（審査時間・必要書類・対象）</Link></li>
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング{FEE_COMPANY_COUNT}社の手数料・最短入金の比較（公式サイトで確認）</Link></li>
            <li>・<Link href="/articles/article-factoring-tesuryo/" className="text-blue-600 underline">ファクタリングの手数料の相場と計算方法</Link></li>
          </ul>
          {ev && <p className="mt-3 text-xs text-gray-500">{company.name}の公式情報の編集部確認日：{ev.checkedAt}</p>}
        </section>
      </main>
      <Footer />
    </>
  );
}
