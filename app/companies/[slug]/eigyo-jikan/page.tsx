import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { getCompanyDetails } from "@/data/companyDetails";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE = "https://corp-factoring.com";

// GSCで「会社名 営業時間」等のサブ意図に表示実績があり、かつ公式一次確認の営業時間データを持つ会社のみ切り出す。
// （表示実績の無い意図は親レビューのFAQに留め、薄いページ・カニバリを避ける方針）
const HOURS_SLUGS = [
  "jtc",
  "labol",
  "paytner",
  "accel-factor",
  "paytoday",
  "support-kinyu",
  "pmg",
  "ennavi",
  "freenance",
];

export function generateStaticParams() {
  return HOURS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company || !HOURS_SLUGS.includes(slug)) return { title: "ページが見つかりません" };
  const title = `${company.name}の営業時間は？土日・受付時間・入金対応を解説【2026年7月】｜ファクタリング比較`;
  const description = `${company.name}の営業時間・土日祝の対応・オンライン受付を、公式サイトで一次確認した情報で解説。定休日や「公式に記載がない項目」も正直に整理しています（確認日つき）。`;
  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}/eigyo-jikan/` },
    openGraph: { title, description, url: `${SITE}/companies/${slug}/eigyo-jikan/`, type: "article" },
  };
}

export default async function CompanyHoursPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!HOURS_SLUGS.includes(slug)) notFound();
  const company = getCompanyBySlug(slug);
  if (!company) notFound();
  const h = getCompanyDetails(slug).operatingHours;

  const rows: { k: string; v: string }[] = [
    { k: "平日", v: h.weekdays },
    ...(h.saturday ? [{ k: "土曜", v: h.saturday }] : []),
    ...(h.sunday ? [{ k: "日曜", v: h.sunday }] : []),
    ...(h.holidays ? [{ k: "祝日", v: h.holidays }] : []),
  ];

  const answer = `${company.name}の営業時間は「${h.weekdays}」です。${h.note ?? ""}`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${company.name}の営業時間は？土日も対応していますか？`,
        acceptedAnswer: { "@type": "Answer", text: answer },
      },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">ホーム</Link> ＞ <Link href={`/companies/${slug}/`} className="hover:underline">{company.name}</Link> ＞ 営業時間
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{company.name}の営業時間は？土日・受付時間を解説【2026年7月】</h1>

        {/* 40〜80字の即答（H1直下） */}
        <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">結論</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">{answer}</p>
        </div>

        {/* 営業時間の詳細（一次確認） */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の営業時間・受付</h2>
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
          <p className="mt-2 text-xs text-gray-500">
            ※本ページの営業時間は<strong>{company.name}公式サイト</strong>を当サイトが確認したものです。公式に明示がない項目は「確認できず」と正直に記載しています。最新は
            <a href={company.url} target="_blank" rel="sponsored nofollow noopener" className="text-blue-600 underline"> {company.name}公式サイト</a>
            でご確認ください。
          </p>
        </section>

        {/* 内部リンク（親レビュー・手数料データ） */}
        <section className="mt-8 rounded-lg bg-gray-50 p-5">
          <p className="text-sm font-bold text-gray-800">あわせて確認</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>・<Link href={`/companies/${slug}/`} className="text-blue-600 underline">{company.name}の評判・口コミ・手数料・必要書類を総合解説</Link></li>
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング15社の手数料・最短入金を一次確認で比較</Link></li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
