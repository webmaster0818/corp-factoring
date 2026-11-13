import { existsSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQ } from "@/components/FAQ";
import { DiagnosisTool } from "@/components/DiagnosisTool";
import { FeeSimulator } from "@/components/FeeSimulator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { factoringCompanies, feeRange } from "@/data/companies";
import { getRealRating } from "@/data/realRatings";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES } from "@/lib/og";
import { AREAS, AREA_SLUGS, AREA_CHECKED_AT } from "@/data/areaOffices";

// canonical はページごとに自己参照で指定する（ルートレイアウトの canonical: "/" 既定値は全ページ継承の事故源のため撤去）
// og:url もルートレイアウトから撤去し（下層ページが TOP の URL を継承していたため）、TOP でのみ指定する
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "法人向けファクタリングおすすめ15選【2026年最新】",
    description: "手数料・審査・入金スピードを徹底比較。最適なファクタリング会社が見つかります。",
    url: "https://corp-factoring.com/",
    siteName: "ファクタリング比較ナビ",
    locale: "ja_JP",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
};

// 手数料の表示（ランキングと同じ式）
const feeText = (c: { fees: { min: number; max: number } }) =>
  c.fees.max > 0 ? `${feeRange(c.fees)}` : c.fees.min > 0 ? `${c.fees.min}%〜` : "要見積もり";

const hasShot = (slug: string) =>
  existsSync(join(process.cwd(), "public", "images", "companies", `${slug}.webp`));

// ファーストビューの「条件から探す」。リンク先はすべてサイト内の既存ページ
const conditionLinks = [
  { label: "2社間・3社間の違い", href: "/articles/article-factoring-2sha-3sha/" },
  { label: "即日入金", href: "/articles/article-factoring-sokujitsu/" },
  { label: "土日祝の対応", href: "/articles/article-factoring-donichi/" },
  { label: "個人事業主・フリーランス", href: "/articles/article-factoring-kojin-jigyonushi/" },
  { label: "オンライン完結", href: "/articles/article-online-factoring/" },
  { label: "少額（10万円〜）", href: "/articles/article-factoring-shougaku/" },
  { label: "手数料の安さ", href: "/fees/" },
  { label: "業種別", href: "/topics/gyoushu/" },
];

function SectionHeading({ title, lead, id }: { title: React.ReactNode; lead?: React.ReactNode; id?: string }) {
  return (
    <div className="mb-8">
      <h2 id={id} className="section-title">{title}</h2>
      {lead && <p className="section-lead pl-[calc(4px+0.85rem)]">{lead}</p>}
    </div>
  );
}

export default function Home() {
  const topCompanies = factoringCompanies;
  const rankOf = (slug: string) => topCompanies.findIndex((c) => c.slug === slug) + 1;
  const preview = topCompanies.slice(0, 5);
  const logoCompanies = topCompanies.filter((c) => hasShot(c.slug)).slice(0, 8);
  // 条件別：companies のデータ（ランキングと同じ値）で絞り込み、並びは総合ランキングの順
  const categories = [
    {
      title: "入金スピードの表示が「最短30分」",
      items: topCompanies.filter((c) => c.speed === "最短30分").slice(0, 3),
      more: { label: "即日ファクタリングガイド", href: "/articles/article-factoring-sokujitsu/" },
    },
    {
      title: "個人事業主・フリーランスにも対応",
      items: topCompanies.filter((c) => c.personalSupport).slice(0, 3),
      more: { label: "個人事業主向けの比較", href: "/articles/article-factoring-kojin-jigyonushi/" },
    },
    {
      title: "特徴に「オンライン完結」の表示",
      items: topCompanies.filter((c) => c.features.includes("オンライン完結")).slice(0, 3),
      more: { label: "オンラインファクタリングの比較", href: "/articles/article-online-factoring/" },
    },
  ];

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Global Navigation */}
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <div className="text-xs text-gray-500">
            <span className="text-gray-700">法人向けファクタリングおすすめ15選比較</span>
          </div>
        </div>
      </nav>

      {/* Hero（写真なし・文字と比較カードで構成） */}
      <section className="hero-grid border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-10 lg:pt-14 lg:pb-14">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
            <div className="min-w-0">
              <p className="inline-flex flex-wrap items-center gap-x-2 text-[13px] text-blue-700 font-semibold mb-4">
                <span className="inline-block w-5 h-px bg-blue-600" aria-hidden="true" />
                フリーランス・個人事業主・法人向け<br className="sm:hidden" />ファクタリング比較
              </p>
              <h1 className="text-[25px] sm:text-[34px] lg:text-[36px] font-bold text-ink leading-[1.4] tracking-[0.01em] mb-5">
                ファクタリング会社の<br />
                <span className="text-blue-600">手数料・審査・入金スピード</span>
                <span className="inline-block">を比較</span>
              </h1>
              <p className="text-[15px] sm:text-base text-gray-600 leading-[1.9] max-w-xl mb-7">
                即日入金への対応状況、審査の基準、手数料の目安を、<strong className="text-ink font-semibold">各社の公式サイトの情報</strong>にもとづいて掲載しています
              </p>

              {/* 条件から探す */}
              <div className="bg-white border border-line rounded-lg p-4 sm:p-5 mb-7">
                <p className="text-sm font-bold text-ink mb-3">条件から探す</p>
                <ul className="flex flex-wrap gap-2">
                  {conditionLinks.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="inline-flex items-center gap-1.5 min-h-[40px] pl-3 pr-2.5 py-1.5 rounded-md border border-line bg-soft text-[13px] leading-snug font-medium text-ink hover:border-blue-400 hover:bg-blue-50 transition"
                      >
                        <span>{c.label}</span>
                        <span aria-hidden="true" className="text-blue-500">›</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#ranking"
                  className="bg-cta text-white font-bold py-3.5 px-8 rounded-md text-base text-center hover:bg-cta-hover transition"
                >
                  ランキングTOP15を見る
                </Link>
                <Link
                  href="#diagnosis"
                  className="bg-white border border-blue-600 text-blue-700 font-bold py-3.5 px-8 rounded-md hover:bg-blue-50 transition text-center"
                >
                  無料診断ツール →
                </Link>
              </div>
            </div>

            {/* 比較プレビュー（ランキングと同じデータ） */}
            <div className="min-w-0 bg-white border border-line rounded-lg shadow-[0_1px_2px_rgba(20,40,74,0.04),0_8px_24px_-12px_rgba(20,40,74,0.12)]">
              <div className="px-5 pt-5 pb-3 border-b border-line">
                <h2 className="text-lg font-bold text-ink">資金調達の選択肢を比較・検討する</h2>
                <p className="text-xs text-gray-500 mt-1">公式サイトで確認｜<span className="font-semibold text-ink num">{FEE_COMPANY_COUNT}社</span>を比較</p>
              </div>
              <table className="w-full text-[13px] sm:text-sm num">
                <thead>
                  <tr className="text-[11px] text-gray-500 border-b border-line">
                    <th className="text-left font-medium py-2 pl-4 sm:pl-5 pr-2">会社名</th>
                    <th className="text-left font-medium py-2 px-2">手数料</th>
                    <th className="text-left font-medium py-2 pl-2 pr-4 sm:pr-5">入金スピード</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((c, i) => (
                    <tr key={c.slug} className="border-b border-line last:border-0">
                      <td className="py-3 pl-4 sm:pl-5 pr-2">
                        <Link href={`/companies/${c.slug}/`} className="flex items-center gap-2.5 font-semibold text-ink hover:text-blue-600">
                          <span className={`inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-sm text-[11px] font-bold ${i < 3 ? "bg-ink text-white" : "border border-line text-gray-600"}`}>{i + 1}</span>
                          <span className="min-w-0">{c.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-2 font-bold text-ink whitespace-nowrap">{feeText(c)}</td>
                      <td className="py-3 pl-2 pr-4 sm:pr-5 text-gray-700 whitespace-nowrap">{c.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-3 border-t border-line bg-soft rounded-b-lg">
                <Link href="#ranking" className="text-sm font-bold text-blue-600 hover:underline">
                  掲載{FEE_COMPANY_COUNT}社を見る →
                </Link>
              </div>
            </div>
          </div>

          {/* Social Proof（数値・文言はそのまま、表示を控えめに） */}
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
            <div className="bg-white px-4 py-3 flex items-baseline justify-center gap-2">
              <dt className="order-2 text-xs text-gray-500">掲載会社数</dt>
              <dd className="order-1 text-lg font-bold text-ink num">{FEE_COMPANY_COUNT}社</dd>
            </div>
            <div className="bg-white px-4 py-3 flex items-baseline justify-center gap-2">
              <dt className="order-2 text-xs text-gray-500">比較項目数</dt>
              <dd className="order-1 text-lg font-bold text-ink num">50+</dd>
            </div>
            <div className="bg-white px-4 py-3 flex items-baseline justify-center gap-2">
              <dt className="order-2 text-xs text-gray-500">情報更新</dt>
              <dd className="order-1 text-lg font-bold text-ink">毎月</dd>
            </div>
            <div className="bg-white px-4 py-3 flex items-baseline justify-center gap-2">
              <dt className="order-2 text-xs text-gray-500">診断ツール</dt>
              <dd className="order-1 text-lg font-bold text-ink">無料</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 主な掲載会社（既存の公式サイト画像のみ） */}
      <section className="py-12 lg:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="主な掲載会社" lead="各社の個別ページで、公式サイトで確認した手数料・入金スピード・会社概要を掲載しています" />
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {logoCompanies.map((c) => (
              <li key={c.slug} className="min-w-0">
                <Link href={`/companies/${c.slug}/`} className="group block border border-line rounded-lg overflow-hidden bg-white hover:border-blue-300 transition">
                  <div className="aspect-[1200/420] bg-soft border-b border-line overflow-hidden">
                    <img
                      src={`/images/companies/${c.slug}.webp`}
                      alt=""
                      className="w-full h-full object-cover object-left-top"
                      width="1200"
                      height="630"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-3 py-2.5 text-sm font-semibold text-ink group-hover:text-blue-600 truncate">{c.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 条件別 */}
      <section className="py-12 lg:py-14 bg-soft border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="条件別に見る" lead="ランキングと同じ掲載データから条件に当てはまる会社を表示しています。並びは総合ランキングの順位順です" />
          <div className="grid md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white border border-line rounded-lg flex flex-col min-w-0">
                <h3 className="px-5 pt-4 pb-3 text-[15px] font-bold text-ink border-b border-line">{cat.title}</h3>
                <ol className="flex-1">
                  {cat.items.map((c) => (
                    <li key={c.slug} className="border-b border-line last:border-0">
                      <Link href={`/companies/${c.slug}/`} className="flex items-center gap-3 px-5 py-3 hover:bg-soft transition">
                        <span className="text-[11px] text-gray-500 w-8 shrink-0 num">{rankOf(c.slug)}位</span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-ink truncate">{c.name}</span>
                          <span className="block text-xs text-gray-600 num">手数料 {feeText(c)} ／ {c.speed}</span>
                        </span>
                        <span aria-hidden="true" className="text-gray-400">›</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link href={cat.more.href} className="px-5 py-3 text-xs font-semibold text-blue-600 hover:underline border-t border-line">
                  関連：{cat.more.label} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANKING Section */}
      <section id="ranking" className="py-12 lg:py-16 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="おすすめTOP15ファクタリング会社"
            lead="手数料・審査・入金スピードをもとに総合的に評価しています"
          />

          <div className="grid gap-4">
            {topCompanies.map((company, index) => {
              const shot = hasShot(company.slug);
              return (
              <article
                key={company.id}
                className="bg-white border border-line rounded-lg p-4 sm:p-5 hover:border-blue-200 transition-colors"
              >
                <div className={`grid gap-4 sm:gap-6 ${shot ? "md:grid-cols-[232px_minmax(0,1fr)]" : ""}`}>
                  {/* Company Screenshot（画像があるのは一部の会社のみ。無い会社は枠ごと出さない） */}
                  {shot && (
                  <div className="rounded-md overflow-hidden border border-line bg-soft aspect-[1200/500] md:aspect-[1200/630] self-start">
                    <img
                      src={`/images/companies/${company.slug}.webp`}
                      alt={`${company.name}公式サイトのスクリーンショット - ファクタリング手数料${company.fees.min > 0 ? (company.fees.max > 0 ? feeRange(company.fees) : `${company.fees.min}%〜`) : "要見積もり"}`}
                      className="w-full h-full object-cover object-top"
                      width="1200"
                      height="630"
                      loading="lazy"
                    />
                  </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-md text-sm font-bold num ${
                        index < 3 ? "bg-ink text-white" : "bg-soft border border-line text-ink"
                      }`}>
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug">
                          {company.name}
                        </h3>
                        {(() => {
                          const rr = getRealRating(company.slug);
                          return rr ? (
                            <div className="text-xs text-gray-500 mt-0.5">
                              Googleマップの口コミ {rr.count.toLocaleString()}件（{rr.fetchedAt}時点）
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 border border-line rounded-md divide-y sm:divide-y-0 sm:divide-x divide-line mb-3 num">
                      <div className="px-3 py-2 min-w-0 flex sm:block items-baseline justify-between gap-3">
                        <div className="text-xs text-gray-500 sm:mb-0.5 shrink-0">
                          手数料
                        </div>
                        <div className="text-base font-bold text-ink text-right sm:text-left">
                          {company.fees.max > 0 ? `${feeRange(company.fees)}` : company.fees.min > 0 ? `${company.fees.min}%〜` : "要見積もり"}
                        </div>
                      </div>
                      <div className="px-3 py-2 min-w-0 flex sm:block items-baseline justify-between gap-3">
                        <div className="text-xs text-gray-500 sm:mb-0.5 shrink-0">
                          入金スピード
                        </div>
                        <div className="text-base font-bold text-ink text-right sm:text-left">
                          {company.speed}
                        </div>
                      </div>
                      <div className="px-3 py-2 min-w-0 flex sm:block items-baseline justify-between gap-3">
                        <div className="text-xs text-gray-500 sm:mb-0.5 shrink-0">
                          買取可能額
                        </div>
                        <div className="text-base font-bold text-ink text-right sm:text-left">
                          {company.amountText ?? (
                            <>
                              {company.minAmount === 0
                                ? "下限なし"
                                : `${(company.minAmount / 10000).toFixed(0)}万`}
                              〜{company.maxAmount}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {company.features.map((feature, idx) => (
                        <span key={idx} className="inline-block text-xs text-gray-700 bg-soft border border-line rounded-sm px-2 py-0.5">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link href={`/companies/${company.slug}`}>
                        <Button variant="outline" size="sm" className="border-line text-ink">
                          {company.name}の口コミ・評判
                        </Button>
                      </Link>
                      <Button size="sm">公式サイトへ →</Button>
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON Section */}
      <section id="comparison" className="py-12 lg:py-16 bg-soft border-y border-line scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="項目別比較表" lead="表は横にスクロールしてご覧いただけます" />
          <div className="bg-white border border-line rounded-lg">
            <ComparisonTable companies={topCompanies} />
          </div>
          <p className="text-sm text-gray-600 mt-6 max-w-3xl">
            病院・クリニック・調剤薬局が社保・国保連に請求する診療報酬を資金化する場合は、銀行系・医療専門のサービスを含めた
            <Link href="/articles/article-factoring-iryou/" className="text-blue-600 hover:underline">診療報酬ファクタリング会社6社の比較（手数料・調達可能額・入金スピード・必要書類）</Link>
            を、介護事業所が国保連に請求する介護報酬を資金化する場合は
            <Link href="/articles/article-factoring-kaigo/" className="text-blue-600 hover:underline">介護報酬ファクタリング対応会社6社の比較（手数料・掛目・入金までの期間）</Link>
            をご覧ください。
          </p>
        </div>
      </section>

      {/* BASIC Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="ファクタリングとは？" />

          <div className="max-w-3xl mb-8">
            <p className="text-base text-gray-700 leading-[1.9]">
              ファクタリングとは、売掛金をファクタリング会社に売却し、入金期日より前に現金化する資金調達方法です。審査では主に売掛先の信用力が確認されるため、銀行融資とは審査の観点が異なり、最短即日で資金調達できる場合があります。赤字決算や税金滞納がある場合でも利用できることが多く、中小企業の資金繰りの改善に用いられています。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "2社間ファクタリング", pros: ["売掛先に通知されない", "最短即日で資金化"], cons: ["手数料がやや高い"] },
              { title: "3社間ファクタリング", pros: ["手数料が安い"], cons: ["売掛先への通知が必要", "入金まで数日〜1週間"] },
            ].map((t) => (
              <div key={t.title} className="border border-line rounded-lg p-5">
                <h3 className="text-lg font-bold text-ink mb-4 pb-3 border-b border-line">
                  {t.title}
                </h3>
                <dl className="grid grid-cols-[4.5em_minmax(0,1fr)] gap-y-2 text-[15px]">
                  <dt className="text-xs font-semibold text-blue-700 pt-1">利点</dt>
                  <dd>
                    <ul className="space-y-1">
                      {t.pros.map((p) => <li key={p} className="text-gray-700">{p}</li>)}
                    </ul>
                  </dd>
                  <dt className="text-xs font-semibold text-gray-500 pt-1">注意点</dt>
                  <dd>
                    <ul className="space-y-1">
                      {t.cons.map((p) => <li key={p} className="text-gray-700">{p}</li>)}
                    </ul>
                  </dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIAGNOSIS Section */}
      <section id="diagnosis" className="py-12 lg:py-16 bg-soft border-y border-line scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="ファクタリング会社診断"
            lead={<>重視する項目を選択してください<br />（複数選択可）</>}
          />
          <p className="text-sm text-gray-500 -mt-5 mb-8 pl-[calc(4px+0.85rem)]">
            個人情報の入力は不要です
          </p>
          <DiagnosisTool />
        </div>
      </section>

      {/* Fee Simulator */}
      <section id="simulator" className="py-12 lg:py-16 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FeeSimulator />
        </div>
      </section>

      {/* 地域別（拠点の所在地を公式で確認した会社の一覧へ） */}
      <section id="area" className="py-12 bg-soft border-y border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            title="拠点のある地域から探す"
            lead={<>本社・支社・支店・営業所などの所在地を、各社の公式サイトで確認した会社の一覧です（{AREA_CHECKED_AT}確認）。</>}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AREA_SLUGS.map((a) => (
              <Link
                key={a}
                href={`/area/${a}/`}
                className="flex items-baseline justify-between bg-white rounded-md border border-line px-4 py-3 hover:border-blue-300 transition"
              >
                <span className="block font-bold text-ink">{AREAS[a].name}</span>
                <span className="block text-xs text-gray-500 mt-1 num">{AREAS[a].entries.length}社</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 lg:py-16 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading title="よくある質問" />
          <div className="max-w-4xl">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 lg:py-16 bg-soft border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["01", "中立的な立場で比較します", "特定のファクタリング会社に偏らず、手数料・審査・入金スピードを同一の基準で評価しています。"],
              ["02", "掲載情報を毎月更新します", "手数料やキャンペーンの情報を毎月確認し、変更があった項目を更新しています。"],
              ["03", "口コミは出典を明記して掲載しています", "口コミや評価は、掲載元のURLと取得日がわかるものだけを載せています。出典のない声や独自の星評価は掲載しません。"],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-white border border-line rounded-lg p-5">
                <div className="text-sm font-bold text-blue-600 num mb-2">{n}</div>
                <h3 className="font-bold text-ink mb-2">
                  {t}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-ink text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ファクタリング会社によっては最短30分で入金されます
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
            見積もりは無料です。手数料を比較するため、3社以上から見積もりを取ることをおすすめします
          </p>
          <Link
            href="#ranking"
            className="inline-block bg-cta text-white hover:bg-cta-hover font-bold px-8 py-4 text-base rounded-md"
          >
            ランキングTOP15を見る →
          </Link>
        </div>
      </section>

      {/* ItemList Structured Data for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "おすすめファクタリング会社TOP15",
            "itemListOrder": "https://schema.org/ItemListOrderDescending",
            "numberOfItems": topCompanies.length,
            "itemListElement": topCompanies.map((company, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": company.name,
              "url": `https://corp-factoring.com/companies/${company.slug}/`
            }))
          })
        }}
      />

      {/* Footer */}
      <div className="-mt-16"><Footer /></div>
    </div>
  );
}
