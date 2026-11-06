import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareList } from "@/components/CompareList";
import { factoringCompanies } from "@/data/companies";
import { feeIndex, feeCheckedAt, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { DEFAULT_OG_IMAGES, DEFAULT_OG_IMAGE_URL } from "@/lib/og";

const title = `ファクタリング会社の比較リスト｜${FEE_COMPANY_COUNT}社から最大4社を選んで条件を並べる`;
const description = `当サイトが各社の公式サイトで確認したファクタリング${FEE_COMPANY_COUNT}社の手数料（2社間・3社間）・最短入金・利用可能額・対象・オンライン契約を、選んだ会社だけ横に並べて比べられます。確認日は会社ごとに表示しています。`;

export const metadata = {
  title,
  description,
  alternates: { canonical: "/compare/" },
  openGraph: { title, description, type: "website", images: DEFAULT_OG_IMAGES },
  twitter: { card: "summary", images: [DEFAULT_OG_IMAGE_URL], title, description },
};

export default function ComparePage() {
  const pageSlugs = factoringCompanies.map((c) => c.slug);
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <nav className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">ホーム</Link>
            <span className="mx-2">＞</span>
            <span className="text-gray-900 font-medium">会社の比較リスト</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl py-10">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">ファクタリング会社の比較リスト</h1>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">
          当サイトの手数料一覧にある{FEE_COMPANY_COUNT}社から、最大4社を選んで条件を横に並べて比べられます。表の値は、当サイトが各社の公式サイトの表示を確認したものです。確認日は会社ごとに表の最後の行に記載しています（基準の確認日は{feeCheckedAt}で、その後に再確認した会社はその日付です）。
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-6">
          並び順は選んだ順で、順位や評価ではありません。条件は変わることがあるため、申し込む前に各社の公式サイトで最新の内容をご確認ください。全社の一覧は<Link href="/fees/" className="text-blue-600 hover:underline">{FEE_COMPANY_COUNT}社の手数料の比較</Link>にあります。
        </p>
        <CompareList rows={feeIndex} pageSlugs={pageSlugs} defaultCheckedAt={feeCheckedAt} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "ホーム", item: "https://corp-factoring.com/" },
              { "@type": "ListItem", position: 2, name: "会社の比較リスト", item: "https://corp-factoring.com/compare/" },
            ],
          }),
        }}
      />
      <Footer />
    </div>
  );
}
