import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug, factoringCompanies, feeRange } from "@/data/companies";
import { getCompanyStrengths, getCompanyUseCases } from "@/data/companyExtended";
import { getRealRating } from "@/data/realRatings";
import { getReviewTrend } from "@/data/reviewTrends";
import { getCompanyDetails } from "@/data/companyDetails";
import { getEditorialVerification } from "@/data/editorialVerification";
import { feeIndex, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { HOURS_LINK_SLUGS } from "@/data/hoursPages";
import { getCompanyLead } from "@/data/companyLead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReviewSection } from "@/components/ReviewSection";
import { EditorialVerificationSection } from "@/components/EditorialVerification";
import { getAllArticles } from "@/lib/articles";
import { DEFAULT_OG_IMAGES, DEFAULT_OG_IMAGE_URL } from "@/lib/og";

// category はロジック用の内部キー。画面表示はこのラベルを使う（ビジネス文書基準 2026-10-16）
const CATEGORY_LABEL: { [key: string]: string } = {
  総合: "総合力",
  即日: "即日入金",
  実績: "取引実績",
  手数料安い: "手数料重視の方向け",
  審査甘い: "柔軟な審査",
  少額: "少額対応",
  高額: "高額対応",
  高額対応: "高額対応",
  個人事業主: "個人事業主対応",
  "3社間": "3社間対応",
  信頼性: "信頼性",
  "24時間": "24時間受付",
  法人専用: "法人専用",
  一括申込: "一括申込",
};

// 「柔軟な審査」ラベルは、公式サイトに審査の柔軟さを示す自社の記載がある会社だけ表示する（2026-10-28 公式確認）。
// 記載がない会社（アクセルファクター・ラボル・いーばんく）は category を残したまま（診断ツールの絞り込み用）ラベルを出さない
const FLEX_SHINSA_SOURCE: { [slug: string]: { quote: string; source: string; url: string } } = {
  "mentor-capital": { quote: "簡単審査 柔軟かつ迅速な対応 赤字･債務超過･個人事業・税金滞納でもOK！", source: "公式トップページ", url: "https://mentor-capital.jp/" },
  "best-factor": { quote: "審査通過率92.25％を誇る柔軟審査が強みのファクタリング会社", source: "公式サイトのガイド記事", url: "https://bestfactor.jp/guides/factoring-fee-rate/" },
  try: { quote: "赤字・小規模でも相談できるのが、ファクタリングのトライの柔軟審査です。", source: "公式トップページ", url: "https://www.factoring-try-sko.co.jp/" },
};
const showCategory = (slug: string, c: string) => c !== "審査甘い" || !!FLEX_SHINSA_SOURCE[slug];

export async function generateStaticParams() {
  return factoringCompanies.map((company) => ({
    slug: company.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);

  if (!company) {
    return {
      title: "ページが見つかりません",
      description: "お探しのページは見つかりませんでした。",
    };
  }

  const categoryText = company.category.filter((c) => showCategory(slug, c)).slice(0, 3).map((c) => CATEGORY_LABEL[c] ?? c).join("・");
  const metaFeeRow = feeIndex.find((r) => r.slug === slug);
  const metaFeeUndisclosed = !!metaFeeRow && /非公示|確認できず|個別査定/.test(metaFeeRow.fee2);
  const feeText = metaFeeUndisclosed
    ? "手数料は要見積もり"
    : company.fees.max > 0
      ? `手数料${feeRange(company.fees)}`
      : company.fees.min > 0
        ? `手数料${company.fees.min}%〜（上限は要問い合わせ）`
        : "手数料は要見積もり";
  
  const lead = getCompanyLead(slug);
  if (lead) {
    return {
      title: lead.metaTitle,
      description: lead.metaDescription,
      keywords: `${company.name},${company.nameKana},口コミ,評判,ファクタリング,手数料,営業時間`,
      openGraph: { title: lead.metaTitle, description: lead.metaDescription, type: "article", images: DEFAULT_OG_IMAGES },
      twitter: { card: "summary", images: [DEFAULT_OG_IMAGE_URL], title: lead.metaTitle, description: lead.metaDescription },
      alternates: { canonical: `/companies/${slug}` },
    };
  }

  return {
    title: `${company.name}の評判・手数料・営業時間・必要書類【公式確認】`,
    description: `${company.name}のファクタリングサービスについて解説しています。${company.speedIsReview ? `${feeText}で、公式FAQでは${company.speed}が出るとされています。` : `${feeText}、${company.speed}で入金が可能です。`}Googleマップの評価、メリット・デメリット、必要書類、活用シーンを掲載しています。`,
    keywords: `${company.name},${company.nameKana},ファクタリング,評判,口コミ,手数料,${categoryText}`,
    openGraph: {
      title: `${company.name}の評判・手数料・営業時間・必要書類【公式確認】`,
      description: `${feeText}、${company.speed}${company.speedIsReview ? "" : "で入金"}。${company.description}`,
      type: "article",
      images: DEFAULT_OG_IMAGES,
    },
    twitter: {
      card: "summary",
      images: [DEFAULT_OG_IMAGE_URL],
      title: `${company.name}の評判・手数料・営業時間・必要書類【公式確認】`,
      description: `${feeText}、${company.speed}${company.speedIsReview ? "" : "で入金"}。${company.description}`,
    },
    alternates: {
      canonical: `/companies/${slug}`,
    },
  };
}

export default function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const company = getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  const strengths = getCompanyStrengths(slug);
  const useCases = getCompanyUseCases(slug);
  const realRating = getRealRating(slug);
  const reviewTrend = getReviewTrend(slug);
  const details = getCompanyDetails(slug);
  const editorialVerification = getEditorialVerification(slug);
  const feeRow = feeIndex.find((f) => f.slug === slug);
  const feeUndisclosed = !!feeRow && /非公示|確認できず|個別査定/.test(feeRow.fee2);
  const lead = getCompanyLead(slug);
  // 買取可能額：公式で再確認した会社（lead あり）は /fees/ と同じ一次確認値を表示する
  const amountLabel =
    lead && feeRow && !lead.keepCompanyAmount
      ? feeRow.amount
      : company.amountText ?? `${company.minAmount === 0 ? "下限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}〜${company.maxAmount}`;
  // speed は「最短即日」「即日」など表記が混在するため、「最短」の二重表記を防ぐ
  const speedLabel = company.speed.startsWith("最短") ? company.speed : `最短${company.speed}`;
  // 強み欄：個別の強みデータ（companyExtended.ts）がない会社は、評価語ではなく公式確認値（早見表・/fees/ と同じ値）だけで「主な条件」を組み立てる（2026-10-28）
  const keyConditions: string[] = strengths ?? [
    company.speedIsReview
      ? `公式FAQでは、${company.speed}が出るとされています。入金までの時間は、公式サイトに記載がありません。`
      : `入金までの時間は${speedLabel}です。`,
    `2社間ファクタリングの手数料は${feeRow ? feeRow.fee2 : company.fees.max > 0 ? feeRange(company.fees) : `${company.fees.min}%〜`}です。`,
    `買取可能額は${amountLabel}です。`,
    ...(company.personalNote ? [`${company.personalNote}。`] : company.personalSupport ? ["個人事業主・フリーランスの利用に対応しています。"] : []),
  ];

  // 指名×具体サブ意図（営業時間・審査・必要書類・個人事業主可否）の即答FAQ。
  // 早見表と同じ一次確認済みフィールドから生成し、検索クエリと同じ言い回しで
  // FAQPage構造化データにも反映する（架空データなし）。
  const subIntentFaqs = details
    ? [
        {
          question: `${company.name}の営業時間は？`,
          answer: `${company.name}の営業・受付時間は「${details.operatingHours.weekdays}${details.operatingHours.saturday ? `／土: ${details.operatingHours.saturday}` : ""}${details.operatingHours.sunday ? `／日: ${details.operatingHours.sunday}` : ""}」です。${details.operatingHours.note ? details.operatingHours.note : "最新の受付時間は公式サイトでご確認ください。"}`,
        },
        {
          question: `${company.name}の審査・入金スピードはどのくらいですか？`,
          answer: company.speedIsReview
            ? `${company.name}の公式FAQでは、営業時間内で提出書類がそろっていれば、${company.speed}が出るとされています。入金までの時間は、公式サイトに記載がありません。実際の所要時間は、申込の時間帯・提出書類・売掛先の状況によって変動します。`
            : `${company.name}は、${speedLabel}での入金が可能とされています。実際の所要時間は、申込の時間帯・提出書類・売掛先の状況によって変動します。`,
        },
        {
          question: `${company.name}の必要書類は？`,
          answer: `主な必要書類は「${company.requiredDocuments.slice(0, 4).join("・")}」などです。会社や審査状況により追加書類を求められる場合があるため、詳細は公式サイトでご確認ください。`,
        },
        {
          question: `${company.name}は個人事業主・フリーランスでも利用できますか？`,
          answer: company.personalNote
            ? `${company.personalNote}。`
            : company.personalSupport
            ? `${company.name}は個人事業主・フリーランスの利用にも対応しています。`
            : `${company.name}は主に法人向けのサービスで、個人事業主・フリーランスの利用は要問い合わせです。`,
        },
      ]
    : [];
  // 指名×「手数料」サブ意図の即答FAQ。/fees/の一次確認feeIndexから生成（架空なし）。
  const feeFaqs = feeRow
    ? [
        {
          question: `${company.name}の手数料はいくらですか？`,
          answer: `${company.name}の手数料は、公式表示で2社間ファクタリングが「${feeRow.fee2}」${/^[―—\-\s]*$|非対応/.test(feeRow.fee3) ? "" : `、3社間が「${feeRow.fee3}」`}です。実際の手数料は売掛先の信用力・買取金額・継続利用の有無などで変動します。公式サイトで確認した最新の値は、当サイトの${FEE_COMPANY_COUNT}社の手数料比較（/fees/）でご確認いただけます。`,
        },
      ]
    : [];
  const allFaqs = [...(lead?.faqs ?? []), ...subIntentFaqs, ...feeFaqs, ...(details?.faqs ?? [])];

  // 構造化データ（JSON-LD）。aggregateRating は Google Maps の実評価が
  // 確認できた会社のみ実値で出力し、未確認の会社では出力しない（架空評価を出さない）。
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": company.name,
    "description": company.description,
    "provider": {
      "@type": "Organization",
      "name": company.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": company.companyInfo.address,
      }
    },
    ...(realRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: realRating.rating,
            reviewCount: realRating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(feeUndisclosed || company.fees.max === 0
      ? {}
      : {
          offers: {
            "@type": "Offer",
            price: `${company.fees.min}-${company.fees.max}%`,
            priceCurrency: "JPY",
          },
        })
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">ホーム</Link>
            <span className="mx-2">＞</span>
            <span className="text-gray-900 font-medium">{company.name}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* ヒーロー画像 */}
        {(slug === 'ququmo' || slug === 'accel-factor' || slug === 'best-factor') && (
          <div className="mb-8">
            <img
              src={`/images/companies/${slug}.png`}
              alt={`${company.name}の評判・口コミ・手数料の解説`}
              className="w-full rounded-lg shadow-md"
              width="1200"
              height="630"
              loading="lazy"
            />
          </div>
        )}

        {/* ヘッダー */}
        <div id="overview" className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-200 scroll-mt-4">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {lead?.h1 ?? company.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {company.description}
              </p>
              {lead && (
                <div id="lead-answer" className="mb-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                  <p className="text-base font-bold text-blue-900 mb-2">{lead.leadHeading}</p>
                  <div className="space-y-2">
                    {lead.leadBody.map((t, i) => (
                      <p key={i} className="text-sm leading-relaxed text-gray-800">{t}</p>
                    ))}
                  </div>
                  {lead.leadTable && (
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full text-sm border border-blue-200 bg-white">
                        <thead>
                          <tr className="bg-blue-100">
                            <th className="px-3 py-2 text-left font-bold text-blue-900 whitespace-nowrap">{lead.leadTable.head[0]}</th>
                            <th className="px-3 py-2 text-left font-bold text-blue-900">{lead.leadTable.head[1]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lead.leadTable.rows.map(([k, v]) => (
                            <tr key={k} className="border-t border-blue-100">
                              <th scope="row" className="px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap align-top">{k}</th>
                              <td className="px-3 py-2 text-gray-800 leading-relaxed">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    公式サイト等で{lead.checkedAt}に確認。
                    {HOURS_LINK_SLUGS.includes(slug) && !lead.related?.some((r) => r.href.endsWith("/eigyo-jikan/")) && (
                      <> <Link href={`/companies/${slug}/eigyo-jikan/`} className="text-blue-600 underline">{company.name}の営業時間・土日の扱いはこちら →</Link></>
                    )}
                    {lead.sources && lead.sources.length > 0 && (
                      <> <a href="#review-sources" className="text-blue-600 underline">口コミの出典一覧へ</a>／<a href="#editorial-check" className="text-blue-600 underline">公式で確認した事実へ</a></>
                    )}
                  </p>
                  {lead.officialLinks && lead.officialLinks.length > 0 && (
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                      出典：
                      {lead.officialLinks.map((l, i) => (
                        <React.Fragment key={l.url}>
                          {i > 0 && "／"}
                          <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{l.label}</a>
                        </React.Fragment>
                      ))}
                      （{lead.checkedAt}確認）
                    </p>
                  )}
                  {lead.related && lead.related.length > 0 && (
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                      関連：
                      {lead.related.map((r, i) => (
                        <React.Fragment key={r.href}>
                          {i > 0 && "／"}
                          <Link href={r.href} className="text-blue-600 underline">{r.label}</Link>
                        </React.Fragment>
                      ))}
                    </p>
                  )}
                </div>
              )}
              {realRating && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
                    <span className="text-xl font-bold text-amber-600">
                      ★ {realRating.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">/</span>
                    <span className="text-sm text-gray-500">5.0</span>
                    <span className="text-gray-400 text-sm ml-2">
                      （Google Maps実評価 {realRating.count.toLocaleString()}件・{realRating.fetchedAt}時点）
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {company.features.map((feature, index) => (
                  <Badge key={index} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* CTAボタン（affiliateUrl設定時はアフィリエイトリンク・sponsored） */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={company.affiliateUrl ?? company.url}
              target="_blank"
              rel={company.affiliateUrl ? "sponsored nofollow noopener" : "nofollow noopener"}
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-center shadow-sm hover:bg-blue-700 hover:shadow-md transition"
            >
              公式サイトで詳細を見る →
            </a>
            <Link
              href="/#diagnosis"
              className="bg-white border-2 border-sky-500 text-sky-600 font-bold py-4 px-10 rounded-2xl hover:bg-sky-50 transition text-center"
            >
              無料診断ツール
            </Link>
          </div>
        </div>

        {/* サブ意図クイックアンサー（営業時間・審査スピード・必要書類などの即答） */}
        <section id="quick-answer" className="mb-8 scroll-mt-4">
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-xl font-black text-gray-900">{company.name}の営業時間・審査スピード・必要書類の概要</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {company.speedIsReview ? (
                  <>{company.name}は、公式FAQで<strong>{company.speed}</strong>が出るとされ、</>
                ) : (
                  <>{company.name}は<strong>{speedLabel}での入金</strong>に対応し、</>
                )}
                {company.personalNote ? `${company.personalNote}。` : company.personalSupport ? "個人事業主・フリーランスも利用できます。" : "主に法人向けのサービスです。"}
                営業時間・必要書類・手数料など、問い合わせの多い項目を、公式サイトで確認した情報をもとに掲載しています。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-lg">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 w-36 whitespace-nowrap">営業時間</th>
                      <td className="px-3 py-2.5 text-gray-800">
                        {details.operatingHours.weekdays}
                        {details.operatingHours.saturday && <>／土 {details.operatingHours.saturday}</>}
                        {details.operatingHours.sunday && <>／日 {details.operatingHours.sunday}</>}
                        {HOURS_LINK_SLUGS.includes(slug) && (
                          <> — <Link href={`/companies/${slug}/eigyo-jikan/`} className="text-blue-600 underline whitespace-nowrap">営業時間の詳細</Link></>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">審査・入金スピード</th>
                      <td className="px-3 py-2.5 text-gray-800">{speedLabel}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">手数料</th>
                      <td className="px-3 py-2.5 text-gray-800">
                        {feeRow ? feeRow.fee2 : `${feeRange(company.fees)}`}（<Link href="/fees/" className="text-blue-600 hover:underline">{FEE_COMPANY_COUNT}社の手数料の比較</Link>／<Link href="/articles/article-factoring-tesuryo-yasui" className="text-blue-600 hover:underline">手数料の相場と安い会社</Link>）
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">買取可能額</th>
                      <td className="px-3 py-2.5 text-gray-800">
                        {amountLabel}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">必要書類</th>
                      <td className="px-3 py-2.5 text-gray-800">{company.requiredDocuments.slice(0, 4).join("・")}</td>
                    </tr>
                    <tr>
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">個人事業主・フリーランス</th>
                      <td className="px-3 py-2.5 text-gray-800">{company.personalNote ?? (company.personalSupport ? "対応" : "要問い合わせ（主に法人向け）")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {details.operatingHours.note && (
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">※ 営業時間：{details.operatingHours.note}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">※ ご利用前に、公式サイトにて最新の条件をご確認ください。手数料を公表していない会社は、見積もりにより個別に提示されます。</p>
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs font-bold text-gray-600 mb-2">関連記事：</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                  <Link href="/articles/article-factoring-shinsa/" className="text-blue-600 hover:underline">ファクタリングの審査基準と通過のポイント →</Link>
                  <Link href="/articles/article-factoring-nyuukin-jikan/" className="text-blue-600 hover:underline">最短入金・即日対応の実情 →</Link>
                  <Link href="/articles/article-factoring-hitsuyou-shorui/" className="text-blue-600 hover:underline">必要書類の一覧 →</Link>
                  <Link href="/fees/" className="text-blue-600 hover:underline">{FEE_COMPANY_COUNT}社の手数料を比較 →</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 目次 */}
        <nav className="mb-12 bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
            目次
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="#overview" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              会社概要・基本情報
            </a>
            {details.performance && details.performance.length > 0 && (
              <a href="#performance" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
                <span className="text-blue-600">→</span>
                実績推移データ
              </a>
            )}
            {details.mediaCoverage && details.mediaCoverage.length > 0 && (
              <a href="#media" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
                <span className="text-blue-600">→</span>
                メディア掲載実績
              </a>
            )}
            <a href="#pros-cons" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              メリット・デメリット
            </a>
            <a href="#strengths" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              {strengths ? `${company.name}の強み` : "おすすめの方・主な条件"}
            </a>
            <a href="#use-cases" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              活用シーン
            </a>
            {lead?.sources && lead.sources.length > 0 && (
              <a href="#review-sources" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
                <span className="text-blue-600">→</span>
                口コミ・評判の出典
              </a>
            )}
            {editorialVerification && (
              <a href="#editorial-check" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
                <span className="text-blue-600">→</span>
                公式で確認した事実（会社概要・手数料）
              </a>
            )}
            <a href="#reviews" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              利用者の口コミ
            </a>
            <a href="#offices" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              営業時間・拠点
            </a>
            <a href="#audit" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              審査について
            </a>
            <a href="#flow" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              利用の流れ
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              よくある質問
            </a>
            {details.comparisons.length > 0 && (
              <a href="#comparison" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
                <span className="text-blue-600">→</span>
                他社比較
              </a>
            )}
          </div>
        </nav>

        {/* 基本情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">基本情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">手数料</h3>
                <p className="text-3xl font-black text-blue-600">
                  {feeUndisclosed || company.fees.min === 0 ? "要見積もり" : company.fees.max > 0 ? `${feeRange(company.fees)}` : `${company.fees.min}%〜`}
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">入金スピード</h3>
                <p className="text-3xl font-black text-green-600">
                  {company.speed}
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">買取可能額</h3>
                <p className="text-xl font-bold text-gray-900">
                  {amountLabel}
                </p>
              </div>
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">個人事業主</h3>
                <p className="text-xl font-bold text-gray-900">
                  {company.personalNote ? (
                    <span className="text-gray-800 font-bold text-base">{company.personalNote}</span>
                  ) : company.personalSupport ? (
                    <span className="text-green-600 font-black">対応</span>
                  ) : (
                    <span className="text-gray-500 font-bold">要問い合わせ（主に法人向け）</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 手数料比較ハブへの内部リンク（回遊強化） */}
        <div className="mb-12 rounded-xl border border-blue-100 bg-blue-50/60 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            手数料や入金スピードは、会社ごとに大きく異なります。
            <span className="font-bold">公式サイトで確認したファクタリング{FEE_COMPANY_COUNT}社の比較表</span>で、
            {company.name}の条件を相場と比較いただけます。
          </p>
          <Link
            href="/fees/"
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            {FEE_COMPANY_COUNT}社の手数料・入金スピードを比較する →
          </Link>
        </div>

        {/* 実績データの推移 */}
        {details.performance && details.performance.length > 0 && (
          <section id="performance" className="mb-12 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl font-black text-gray-900">{company.name}の実績推移</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left p-3 font-black bg-gray-100">年度</th>
                        <th className="text-right p-3 font-black bg-gray-100">買取債権額</th>
                        <th className="text-right p-3 font-black bg-gray-100">利用者数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.performance.map((data, index) => (
                        <tr key={data.year} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="p-3 font-bold text-gray-700">{data.year}年</td>
                          <td className="p-3 text-right font-medium text-blue-600">{data.amount}</td>
                          <td className="p-3 text-right font-medium text-blue-600">{data.users}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  ※ 2024年3月時点のデータです。
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* メディア掲載実績 */}
        {details.mediaCoverage && details.mediaCoverage.length > 0 && (
          <section id="media" className="mb-12 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl font-black text-gray-900">{company.name}のメディア掲載実績</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {details.mediaCoverage.map((media, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-black text-lg">
                                                  </div>
                        <div className="flex-grow">
                          <h3 className="font-bold text-xl mb-2 text-gray-900">{media.name}</h3>
                          {media.description && (
                            <p className="text-gray-700 mb-3">{media.description}</p>
                          )}
                          {media.url && (
                            <a 
                              href={media.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                            >
                              詳細を見る →
                            </a>
                          )}
                          {media.date && (
                            <p className="text-sm text-gray-500 mt-2">掲載日: {media.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* メリット・デメリット */}
        <Card id="pros-cons" className="mb-8 border-2 border-gray-100 shadow-sm scroll-mt-4">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">メリット・デメリット</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* メリット */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-black text-green-700 mb-4 text-xl">
                  メリット
                </h3>
                <ul className="space-y-3">
                  {company.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-600 mt-0.5 text-lg font-bold">✓</span>
                      <span className="text-gray-700 leading-relaxed">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* デメリット（出典のある項目が無い会社は表示しない） */}
              {company.cons.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-black text-blue-700 mb-4 text-xl">
                  デメリット
                </h3>
                <ul className="space-y-3">
                  {company.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5 text-lg font-bold">✗</span>
                      <span className="text-gray-700 leading-relaxed">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 必要書類 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">必要書類</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {company.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="text-blue-600 text-xl"></span>
                  <span className="text-gray-700 font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 会社情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">会社情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">設立年</h3>
                  <p className="text-gray-900 font-bold text-lg">{company.companyInfo.established}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">資本金</h3>
                  <p className="text-gray-900 font-bold text-lg">{company.companyInfo.capital}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-gray-700 mb-2 text-sm">カテゴリ</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {company.category.filter((cat) => showCategory(slug, cat)).map((cat, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200 text-xs font-bold">
                        {CATEGORY_LABEL[cat] ?? cat}
                      </Badge>
                    ))}
                  </div>
                  {company.category.includes("審査甘い") && FLEX_SHINSA_SOURCE[slug] && (
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      「柔軟な審査」は公式の表記によります：「{FLEX_SHINSA_SOURCE[slug].quote}」（
                      <a href={FLEX_SHINSA_SOURCE[slug].url} target="_blank" rel="noopener noreferrer" className="underline">{FLEX_SHINSA_SOURCE[slug].source}</a>
                      ・2026年10月28日確認）
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">所在地</h3>
                <p className="text-gray-900 font-medium">{company.companyInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* こんな人におすすめ */}
        <Card id="strengths" className="mb-8 border-2 border-gray-100 shadow-sm scroll-mt-4">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">このような方におすすめです</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {company.category.includes("即日") && (
                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <span className="text-3xl"></span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      急ぎで資金が必要な方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {company.speed}で入金が可能なため、急ぎの資金調達に適しています。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("手数料安い") && !feeUndisclosed && (
                <div className="flex items-start gap-4 bg-green-50 p-5 rounded-xl border border-green-100">
                  <span className="text-3xl"></span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      手数料を抑えたい方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      手数料は{company.fees.min}%からです。上限と実際の率は、見積もりで確認してください。
                    </p>
                  </div>
                </div>
              )}
              {/* 旧「審査に不安がある方：審査が柔軟で、赤字決算や税金滞納がある場合でも…」は出典のない共通文のため削除（2026-10-28）。各社の審査の記載は公式の出典つきの個別データに限る */}
              {company.personalSupport && (
                <div className="flex items-start gap-4 bg-sky-50 p-5 rounded-xl border border-sky-100">
                  <span className="text-3xl"></span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      個人事業主・フリーランスの方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {company.personalNote ? `${company.personalNote}。` : "個人事業主・フリーランスにも対応しています。"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 強み */}
        <section className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{strengths ? `${company.name}の強み` : `${company.name}の主な条件`}</CardTitle>
              {!strengths && (
                <p className="text-sm text-gray-600 mt-2">
                  当サイトが公式サイトで確認した、入金までの時間・手数料・買取可能額などの条件です。手数料の出典と確認日は、<Link href="/fees/" className="text-blue-600 hover:underline">{FEE_COMPANY_COUNT}社の手数料の比較</Link>に掲載しています。
                </p>
              )}
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {keyConditions.map((strength, index) => (
                  <li key={index} className="flex items-start gap-4 bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <span className="text-2xl font-black text-blue-600">{index + 1}</span>
                    <p className="text-gray-700 leading-relaxed font-medium flex-1">{strength}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 利用シーン・ユースケース */}
        <section id="use-cases" className="mb-12 scroll-mt-4">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{company.name}が向いている活用シーン</CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                ※ 以下は一般的な利用シーンのイメージです。特定の利用者の実例ではありません。
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-black text-gray-900 mb-4 text-xl">{useCase.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">想定される状況</h4>
                        <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-gray-500">{useCase.situation}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-700 mb-2 text-sm">{company.name}での対応イメージ</h4>
                        <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-blue-500">{useCase.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 口コミ・評判の出典一覧（掲載サイト・確認日のみ。本文の転載はしない） */}
        {lead?.sources && lead.sources.length > 0 && (
          <section id="review-sources" className="mb-8 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl font-black text-gray-900">{company.name}の口コミ・評判の掲載先（出典一覧）</CardTitle>
                <p className="text-sm text-gray-600 mt-2">
                  {company.name}の口コミが掲載されている主なサイトと、{lead.sourcesCheckedAt ?? lead.checkedAt}時点の掲載状況です。当サイトでは、口コミ本文の転載や体験談の作成は行わず、掲載先と件数のみを掲載しています。評価は投稿の時期・件数によって変わるため、各サイトにて原文をご確認ください。
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full min-w-[520px] text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200 bg-gray-50">
                        <th className="px-3 py-2.5 text-left font-bold text-gray-700 w-40">掲載サイト</th>
                        <th className="px-3 py-2.5 text-left font-bold text-gray-700">掲載状況（{lead.sourcesCheckedAt ?? lead.checkedAt}確認）</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lead.sources.map((src, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 align-top">
                          <td className="px-3 py-2.5 font-semibold text-gray-800">
                            <a href={src.url} target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">{src.site}</a>
                          </td>
                          <td className="px-3 py-2.5 text-gray-700 leading-relaxed">{src.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                  ※口コミは個人の体験にもとづくものであり、手数料や審査結果は売掛先・請求書の内容によって変わります。条件は、以下の「編集部が確認した事実」（公式サイトで確認した内容）とあわせてご確認ください。
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 公開口コミの傾向（出典・調査年月つき） */}
        {reviewTrend && (
          <section id="review-trends" className="mb-8 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{company.name}の公開口コミの傾向</h2>
                <p className="text-xs text-gray-500 mb-5">出典：{reviewTrend.source}。口コミの傾向を要約したものであり、個別の体験には差があります。</p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="font-bold text-emerald-700 text-sm mb-2">好意的な傾向</p>
                    <ul className="space-y-2">
                      {reviewTrend.good.map((g, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed"><span className="text-emerald-600 shrink-0">◎</span><span>{g}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-orange-700 text-sm mb-2">否定的な傾向・注意点</p>
                    <ul className="space-y-2">
                      {reviewTrend.bad.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed"><span className="text-orange-500 shrink-0">△</span><span>{b}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* 編集部の検証欄（一次確認できた事実のみ・データがある会社のみ表示） */}
        {editorialVerification && (
          <EditorialVerificationSection
            companyName={company.name}
            data={editorialVerification}
          />
        )}

        {/* 利用者の口コミ（Google口コミ引用） */}
        <ReviewSection
          companyName={company.name}
          realRating={realRating}
          pros={company.pros}
          cons={company.cons}
        />

        {/* 営業時間・事業拠点 */}
        <section id="offices" className="mb-12 scroll-mt-4">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{company.name}の営業時間・事業拠点</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-8">
                <h3 className="font-bold text-xl mb-4">営業時間</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">平日</p>
                      <p className="font-bold text-lg">{details.operatingHours.weekdays}</p>
                    </div>
                    {details.operatingHours.saturday && (
                      <div>
                        <p className="text-gray-600 text-sm mb-1">土曜日</p>
                        <p className="font-bold text-lg">{details.operatingHours.saturday}</p>
                      </div>
                    )}
                    {details.operatingHours.sunday && (
                      <div>
                        <p className="text-gray-600 text-sm mb-1">日曜・祝日</p>
                        <p className="font-bold text-lg">{details.operatingHours.sunday}</p>
                      </div>
                    )}
                  </div>
                  {details.operatingHours.note && (
                    <p className="mt-4 text-gray-600 text-sm">{details.operatingHours.note}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl mb-4">事業拠点</h3>
                {details.officesNote && <p className="text-sm text-gray-600 mb-4 leading-relaxed">{details.officesNote}</p>}
                <div className="space-y-4">
                  {details.offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">{office.name}</h4>
                      <p className="text-gray-700 mb-2">{office.address}</p>
                      {office.tel && <p className="text-gray-600 text-sm mb-2">TEL {office.tel}</p>}
                      {office.mapUrl && (
                        <a 
                          href={office.mapUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                        >
                          Googleマップで見る →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 審査について */}
        <section id="audit" className="mb-12 scroll-mt-4">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{company.name}の審査について</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {details.audit.passRate && (
                <div className="mb-6 bg-blue-50 p-6 rounded-lg border-2 border-blue-100">
                  <h3 className="font-bold text-lg mb-2">審査通過率</h3>
                  <p className="text-3xl font-black text-blue-600">{details.audit.passRate}</p>
                </div>
              )}
              {lead?.auditTable && (
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">{lead.auditTable.heading}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {lead.auditTable.head.map((h, i) => (
                            <th key={i} className="px-3 py-2.5 text-left font-bold text-gray-700 border-b border-gray-200">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {lead.auditTable.rows.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 align-top">
                            <td className="px-3 py-2.5 font-bold text-gray-800 whitespace-nowrap">{row[0]}</td>
                            <td className="px-3 py-2.5 text-gray-700">{row[1]}</td>
                            <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {lead.auditTable.note && <p className="text-sm text-gray-600 mt-3 leading-relaxed">{lead.auditTable.note}</p>}
                  <p className="text-xs text-gray-500 mt-2">出典：{lead.auditTable.source}</p>
                </div>
              )}
              <h3 className="font-bold text-xl mb-4">審査の特徴</h3>
              <ul className="space-y-3">
                {(lead?.auditFacts ?? details.audit.features).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* 利用の流れ */}
        <section id="flow" className="mb-12 scroll-mt-4">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{company.name}の利用の流れ</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {(lead?.flow ?? details.flow).map((step) => (
                  <div key={step.step} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center font-black text-2xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-gray-700 mb-2">{step.description}</p>
                      {step.duration && (
                        <p className="text-blue-600 font-medium text-sm">{company.speedIsReview ? (step.title.includes("入金") ? "入金までの時間は公式に記載なし" : step.title.includes("審査") ? company.speed : step.duration) : step.duration === "最短即日" && step.title.includes("入金") && !speedLabel.includes("即日") ? speedLabel : step.duration}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* よくある質問（FAQ） */}
        <section id="faq" className="mb-12 scroll-mt-4">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">{company.name}のよくある質問</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {allFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Q. {faq.question}</h3>
                    <p className="text-gray-700 pl-6">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 他社比較 */}
        {details.comparisons.length > 0 && (
          <section id="comparison" className="mb-12 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl font-black text-gray-900">{company.name}と他社の比較</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 font-black">会社名</th>
                        <th className="text-left p-4 font-black">取扱額</th>
                        <th className="text-left p-4 font-black">入金スピード</th>
                        <th className="text-left p-4 font-black">対象</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-100">
                        <td className="p-4 font-bold">{company.name}</td>
                        <td className="p-4">{company.amountText ?? `${company.minAmount === 0 ? "下限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}〜${company.maxAmount}`}</td>
                        <td className="p-4">{company.speed}</td>
                        <td className="p-4">{company.personalSupport ? "個人事業主・法人" : "法人"}</td>
                      </tr>
                      {details.comparisons.map((comp, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-4 font-bold">{comp.companyName}</td>
                          <td className="p-4">{comp.amount}</td>
                          <td className="p-4">{comp.speed}</td>
                          <td className="p-4">{comp.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 space-y-2">
                  {details.comparisons.map((comp, index) => (
                    comp.note && (
                      <p key={index} className="text-sm text-gray-600">
                        ※ {comp.companyName}: {comp.note}
                      </p>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-blue-500 via-gray-500 to-blue-600 rounded-2xl shadow-2xl shadow-blue-500/30 p-10 text-center text-white mb-8">
          <h2 className="text-3xl font-black mb-4">
            {company.name}で無料見積もり
          </h2>
          <p className="mb-8 text-blue-100 text-lg leading-relaxed">
            見積もりは無料です。見積もりを依頼すると、手数料や条件を確認できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={company.affiliateUrl ?? company.url}
              target="_blank"
              rel={company.affiliateUrl ? "sponsored nofollow noopener" : "nofollow noopener"}
              className="bg-white text-blue-600 font-black py-4 px-10 rounded-2xl hover:bg-gray-100 transition shadow-lg"
            >
              公式サイトへ →
            </a>
            <Link
              href="/#diagnosis"
              className="bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl hover:bg-orange-800 transition border-2 border-orange-400"
            >
              無料診断ツール
            </Link>
          </div>
        </div>

        {/* 関連コラム */}
        {(() => {
          const articles = getAllArticles().slice(0, 3);
          return articles.length > 0 ? (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">関連コラム</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block border border-gray-200 rounded-xl p-5 hover:shadow-md transition bg-white"
                  >
                    {article.keyword && (
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 text-white"
                        style={{ backgroundColor: "#1B3A5C" }}
                      >
                        {article.keyword}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <span className="text-xs font-semibold" style={{ color: "#1B3A5C" }}>
                      記事を読む →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null;
        })()}

        {/* 戻るリンク */}
        <div className="text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-bold text-lg inline-flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>

      <Footer />

      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* FAQ構造化データ（JSON-LD） */}
      {allFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}

      {/* パンくずリスト構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://corp-factoring.com" },
              { "@type": "ListItem", "position": 2, "name": company.name, "item": `https://corp-factoring.com/companies/${slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
