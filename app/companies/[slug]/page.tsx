import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug, factoringCompanies } from "@/data/companies";
import { getCompanyStrengths, getCompanyUseCases } from "@/data/companyExtended";
import { getRealRating } from "@/data/realRatings";
import { getReviewTrend } from "@/data/reviewTrends";
import { getCompanyDetails } from "@/data/companyDetails";
import { feeIndex } from "@/data/feeIndex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReviewSection } from "@/components/ReviewSection";
import { getAllArticles } from "@/lib/articles";

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

  const categoryText = company.category.slice(0, 3).join("・");
  const metaFeeRow = feeIndex.find((r) => r.slug === slug);
  const metaFeeUndisclosed = !!metaFeeRow && /非公示|確認できず|個別査定/.test(metaFeeRow.fee2);
  const feeText = metaFeeUndisclosed ? "手数料は要見積もり" : `手数料${company.fees.min}%〜${company.fees.max}%`;
  
  return {
    title: `【${company.name}】の評判・口コミ・手数料を徹底解説【2026年7月】`,
    description: `${company.name}のファクタリングサービスを徹底解説。${feeText}、${company.speed}で入金可能。Google Maps実評価・メリット・デメリット・必要書類・活用シーンを詳しく紹介。${categoryText}に最適なファクタリング業者です。`,
    keywords: `${company.name},${company.nameKana},ファクタリング,評判,口コミ,手数料,${categoryText},徹底解説`,
    openGraph: {
      title: `【${company.name}】の評判・口コミ・手数料を徹底解説【2026年7月】`,
      description: `${feeText}、${company.speed}で入金。${company.description}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `【${company.name}】の評判・口コミ・手数料を徹底解説【2026年7月】`,
      description: `${feeText}、${company.speed}で入金。${company.description}`,
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
  const feeRow = feeIndex.find((f) => f.slug === slug);
  const feeUndisclosed = !!feeRow && /非公示|確認できず|個別査定/.test(feeRow.fee2);

  // 指名×具体サブ意図（営業時間・審査・必要書類・個人事業主可否）の即答FAQ。
  // 早見表と同じ一次確認済みフィールドから生成し、検索クエリと同じ言い回しで
  // FAQPage構造化データにも反映する（架空データなし）。
  const subIntentFaqs = details
    ? [
        {
          question: `${company.name}の営業時間は？`,
          answer: `${company.name}の営業時間は、平日 ${details.operatingHours.weekdays}${details.operatingHours.saturday ? `／土 ${details.operatingHours.saturday}` : ""}${details.operatingHours.sunday ? `／日 ${details.operatingHours.sunday}` : ""} です。${details.operatingHours.note ? details.operatingHours.note : "最新の受付時間は公式サイトでご確認ください。"}`,
        },
        {
          question: `${company.name}の審査・入金スピードはどのくらいですか？`,
          answer: `${company.name}は最短${company.speed}での入金が可能とされています。実際の所要時間は、申込時間・提出書類・売掛先の状況により変動します。`,
        },
        {
          question: `${company.name}の必要書類は？`,
          answer: `主な必要書類は「${company.requiredDocuments.slice(0, 4).join("・")}」などです。会社や審査状況により追加書類を求められる場合があるため、詳細は公式サイトでご確認ください。`,
        },
        {
          question: `${company.name}は個人事業主・フリーランスでも使えますか？`,
          answer: company.personalSupport
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
          answer: `${company.name}の手数料は、公式表示で2社間ファクタリングが「${feeRow.fee2}」${/^[―—\-\s]*$|非対応/.test(feeRow.fee3) ? "" : `、3社間が「${feeRow.fee3}」`}です。実際の手数料は売掛先の信用力・買取金額・継続利用の有無などで変動します。最新の一次確認値は当サイトの17社手数料比較（/fees/）でご確認いただけます。`,
        },
      ]
    : [];
  const allFaqs = [...subIntentFaqs, ...feeFaqs, ...(details?.faqs ?? [])];

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
    ...(feeUndisclosed
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
            <Link href="/#ranking" className="hover:text-blue-600">ランキング</Link>
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
              alt={`${company.name}の評判・口コミ・手数料を徹底解説`}
              className="w-full rounded-lg shadow-md"
              width="1200"
              height="630"
              loading="lazy"
            />
          </div>
        )}

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
              {company.name}の強み
            </a>
            <a href="#use-cases" className="text-gray-700 hover:text-blue-600 font-medium py-3 px-4 bg-gray-50 rounded hover:bg-blue-50 transition border border-transparent hover:border-blue-200 flex items-center gap-3">
              <span className="text-blue-600">→</span>
              活用シーン
            </a>
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

        {/* ヘッダー */}
        <div id="overview" className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-200 scroll-mt-4">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {company.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                {company.description}
              </p>
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

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-center shadow-sm hover:bg-blue-700 hover:shadow-md transition"
            >
              公式サイトで詳細を見る →
            </Link>
            <Link
              href="/#diagnosis"
              className="bg-white border-2 border-sky-500 text-sky-600 font-bold py-4 px-10 rounded-2xl hover:bg-sky-50 transition text-center"
            >
              🧮 無料診断ツール
            </Link>
          </div>
        </div>

        {/* サブ意図クイックアンサー（営業時間・審査スピード・必要書類などの即答） */}
        <section id="quick-answer" className="mb-8 scroll-mt-4">
          <Card className="border-2 border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-xl font-black text-gray-900">{company.name}の営業時間・審査スピード・必要書類【早わかり】</CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {company.name}は<strong>最短{company.speed}での入金</strong>に対応し、
                {company.personalSupport ? "個人事業主・フリーランスも利用できます。" : "主に法人向けのサービスです。"}
                営業時間・必要書類・手数料などのよく調べられる項目を、公式サイトで確認した情報をもとにまとめました。
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
                        {["labol","paytner","accel-factor","paytoday","support-kinyu","pmg","ennavi","freenance"].includes(slug) && (
                          <> — <Link href={`/companies/${slug}/eigyo-jikan/`} className="text-blue-600 underline whitespace-nowrap">営業時間を詳しく</Link></>
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">審査・入金スピード</th>
                      <td className="px-3 py-2.5 text-gray-800">最短{company.speed}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">手数料</th>
                      <td className="px-3 py-2.5 text-gray-800">
                        {feeRow ? feeRow.fee2 : `${company.fees.min}%〜${company.fees.max}%`}（<Link href="/fees/" className="text-blue-600 hover:underline">17社の手数料を一次確認で比較</Link>／<Link href="/articles/article-factoring-tesuryo-yasui" className="text-blue-600 hover:underline">手数料の相場と安い会社</Link>）
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">買取可能額</th>
                      <td className="px-3 py-2.5 text-gray-800">
                        {company.minAmount === 0 ? "下限なし" : `${(company.minAmount / 10000).toFixed(0)}万円`}〜{company.maxAmount}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">必要書類</th>
                      <td className="px-3 py-2.5 text-gray-800">{company.requiredDocuments.slice(0, 4).join("・")}</td>
                    </tr>
                    <tr>
                      <th className="text-left align-top bg-gray-50 px-3 py-2.5 font-bold text-gray-700 whitespace-nowrap">個人事業主・フリーランス</th>
                      <td className="px-3 py-2.5 text-gray-800">{company.personalSupport ? "対応" : "要問い合わせ（主に法人向け）"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {details.operatingHours.note && (
                <p className="mt-3 text-xs text-gray-500 leading-relaxed">※ 営業時間：{details.operatingHours.note}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">※ 最新の条件は公式サイトでご確認ください。手数料の非公示社は「要見積もり」が実態です。</p>
              <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-xs font-bold text-gray-600 mb-2">もっと詳しく：</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                  <Link href="/articles/article-factoring-shinsa/" className="text-blue-600 hover:underline">ファクタリングの審査基準・通過のコツ →</Link>
                  <Link href="/articles/article-factoring-nyuukin-jikan/" className="text-blue-600 hover:underline">最短入金・即日対応の実態 →</Link>
                  <Link href="/articles/article-factoring-hitsuyou-shorui/" className="text-blue-600 hover:underline">必要書類の一覧 →</Link>
                  <Link href="/fees/" className="text-blue-600 hover:underline">17社の手数料を比較 →</Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 基本情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">📊 基本情報</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">💰 手数料</h3>
                <p className="text-3xl font-black text-blue-600">
                  {feeUndisclosed ? "要見積もり" : `${company.fees.min}%〜${company.fees.max}%`}
                </p>
              </div>
              <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">⚡ 入金スピード</h3>
                <p className="text-3xl font-black text-green-600">
                  {company.speed}
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">📈 買取可能額</h3>
                <p className="text-xl font-bold text-gray-900">
                  {company.minAmount === 0
                    ? "下限なし"
                    : `${(company.minAmount / 10000).toFixed(0)}万円`}
                  〜{company.maxAmount}
                </p>
              </div>
              <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
                <h3 className="font-bold text-gray-700 mb-2 text-sm">👤 個人事業主</h3>
                <p className="text-xl font-bold text-gray-900">
                  {company.personalSupport ? (
                    <span className="text-green-600 font-black">対応</span>
                  ) : (
                    <span className="text-gray-500 font-bold">非対応</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 手数料比較ハブへの内部リンク（回遊強化） */}
        <div className="mb-12 rounded-xl border border-blue-100 bg-blue-50/60 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            手数料や入金スピードは会社ごとに大きく異なります。
            <span className="font-bold">ファクタリング17社を公式サイトで一次確認して比較</span>し、
            {company.name}の条件を相場と見比べてみましょう。
          </p>
          <Link
            href="/fees/"
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
          >
            17社の手数料・入金スピードを比較する →
          </Link>
        </div>

        {/* 実績データの推移 */}
        {details.performance && details.performance.length > 0 && (
          <section id="performance" className="mb-12 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-2xl font-black text-gray-900">📊 {company.name}の実績推移</CardTitle>
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
                  ※ 2024年3月時点のデータです。継続的な成長を続けており、多くの企業に信頼されています。
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
                <CardTitle className="text-2xl font-black text-gray-900">📰 {company.name}のメディア掲載実績</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {details.mediaCoverage.map((media, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-black text-lg">
                          📰
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
            <CardTitle className="text-2xl font-black text-gray-900">⚖️ メリット・デメリット</CardTitle>
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

              {/* デメリット */}
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
            </div>
          </CardContent>
        </Card>

        {/* 必要書類 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">📄 必要書類</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {company.requiredDocuments.map((doc, index) => (
                <li key={index} className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="text-blue-600 text-xl">📄</span>
                  <span className="text-gray-700 font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 会社情報 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">🏢 会社情報</CardTitle>
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
                    {company.category.map((cat, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700 border-blue-200 text-xs font-bold">
                        {cat}
                      </Badge>
                    ))}
                  </div>
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
            <CardTitle className="text-2xl font-black text-gray-900">👥 こんな人におすすめ</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {company.category.includes("即日") && (
                <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      今すぐ資金が必要な方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {company.speed}で入金可能なので、緊急の資金調達に最適です。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("手数料安い") && (
                <div className="flex items-start gap-4 bg-green-50 p-5 rounded-xl border border-green-100">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      手数料を抑えたい方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      手数料{company.fees.min}%〜と業界最安水準なので、コストを抑えられます。
                    </p>
                  </div>
                </div>
              )}
              {company.category.includes("審査甘い") && (
                <div className="flex items-start gap-4 bg-blue-50 p-5 rounded-xl border border-blue-100">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      審査が不安な方
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      柔軟な審査で赤字決算や税金滞納でも対応可能です。
                    </p>
                  </div>
                </div>
              )}
              {company.personalSupport && (
                <div className="flex items-start gap-4 bg-sky-50 p-5 rounded-xl border border-sky-100">
                  <span className="text-3xl">👤</span>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">
                      個人事業主・フリーランス
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      個人事業主・フリーランスにも対応しています。
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
              <CardTitle className="text-2xl font-black text-gray-900">💎 {company.name}の強み</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {strengths.map((strength, index) => (
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

        {/* 公開口コミの傾向（出典・調査年月つき） */}
        {reviewTrend && (
          <section id="review-trends" className="mb-8 scroll-mt-4">
            <Card className="border-2 border-gray-100 shadow-sm">
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{company.name}の公開口コミの傾向</h2>
                <p className="text-xs text-gray-500 mb-5">出典：{reviewTrend.source}。口コミは傾向の要約で、個別の体験には差があります。</p>
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
                    <p className="font-bold text-orange-700 text-sm mb-2">気になる/否定的な傾向</p>
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
              <CardTitle className="text-2xl font-black text-gray-900">🏢 {company.name}の営業時間・事業拠点</CardTitle>
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
                <div className="space-y-4">
                  {details.offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">{office.name}</h4>
                      <p className="text-gray-700 mb-2">{office.address}</p>
                      {office.mapUrl && (
                        <a 
                          href={office.mapUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1"
                        >
                          📍 Googleマップで見る →
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
              <CardTitle className="text-2xl font-black text-gray-900">📋 {company.name}の審査について</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {details.audit.passRate && (
                <div className="mb-6 bg-blue-50 p-6 rounded-lg border-2 border-blue-100">
                  <h3 className="font-bold text-lg mb-2">審査通過率</h3>
                  <p className="text-3xl font-black text-blue-600">{details.audit.passRate}</p>
                </div>
              )}
              <h3 className="font-bold text-xl mb-4">審査の特徴</h3>
              <ul className="space-y-3">
                {details.audit.features.map((feature, index) => (
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
              <CardTitle className="text-2xl font-black text-gray-900">📝 {company.name}の利用の流れ</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {details.flow.map((step) => (
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
                        <p className="text-blue-600 font-medium text-sm">{step.duration}</p>
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
              <CardTitle className="text-2xl font-black text-gray-900">❓ {company.name}のよくある質問</CardTitle>
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
                <CardTitle className="text-2xl font-black text-gray-900">⚖️ {company.name}と他社の比較</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left p-4 font-black">業者名</th>
                        <th className="text-left p-4 font-black">取扱額</th>
                        <th className="text-left p-4 font-black">入金スピード</th>
                        <th className="text-left p-4 font-black">対象</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50 border-b border-gray-100">
                        <td className="p-4 font-bold">{company.name}</td>
                        <td className="p-4">{company.minAmount}万円〜{company.maxAmount}</td>
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
            まずは無料で見積もりを依頼してみましょう。手数料や条件を確認できます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="bg-white text-blue-600 font-black py-4 px-10 rounded-2xl hover:bg-gray-100 transition shadow-lg"
            >
              公式サイトへ →
            </Link>
            <Link
              href="/#diagnosis"
              className="bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl hover:bg-orange-800 transition border-2 border-orange-400"
            >
              🧮 無料診断ツール
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
      {details.faqs.length > 0 && (
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
              { "@type": "ListItem", "position": 2, "name": "おすすめランキング", "item": "https://corp-factoring.com/#ranking" },
              { "@type": "ListItem", "position": 3, "name": company.name, "item": `https://corp-factoring.com/companies/${slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
