import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事の制作ポリシー",
  description:
    "ファクタリング比較ナビの記事制作ポリシーです。ユーザーファーストの姿勢で、正確・中立・わかりやすい情報提供を心がけています。",
  alternates: {
    canonical: "/content-policy/",
  },
};

export default function ContentPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#1B3A5C] transition">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              記事の制作ポリシー
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-[#1B3A5C]">
            記事の制作ポリシー
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 space-y-12 text-gray-700 leading-relaxed">
            <p>
              「ファクタリング比較ナビ」では、法人・個人事業主・フリーランスの方々が最適なファクタリングサービスを見つけられるよう、以下のポリシーに基づいて記事を制作しています。
            </p>

            {/* 4つの基本方針 */}
            <section>
              <h2 className="text-2xl font-bold text-[#1B3A5C] mb-6">
                4つの基本方針
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* 方針1 */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#1B3A5C]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1B3A5C] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      01
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      ユーザーファースト
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    利用者のファクタリング選びを徹底サポートします。「資金繰りに困っている経営者が、安心して最適なファクタリング会社を見つけられること」を最優先に考え、コンテンツを制作しています。広告主の利益ではなく、利用者にとって本当に役立つ情報を提供します。
                  </p>
                </div>

                {/* 方針2 */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#2B5F8A]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#2B5F8A] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      02
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      情報の正確性
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    各ファクタリング会社の手数料・審査基準・入金スピード等の情報は、公式サイトおよび公開情報を元に収集し、定期的に更新しています。料金や手数料の変更があった場合は速やかに反映し、常に最新の情報を掲載するよう努めています。
                  </p>
                </div>

                {/* 方針3 */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#3A7CA5]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#3A7CA5] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      03
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      中立・公正なレビュー
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    特定のファクタリング会社に偏ることなく、客観的な評価基準に基づいて比較・レビューを行います。広告報酬の有無がランキングや評価に影響を与えることはありません。メリットだけでなく、デメリットや注意点も正直にお伝えします。
                  </p>
                </div>

                {/* 方針4 */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-[#4A9BC5]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#4A9BC5] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      04
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      わかりやすさ
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    ファクタリングは専門的な金融サービスですが、初めて利用する方でも理解できるよう、専門用語にはわかりやすい解説を添え、図表や比較表を活用して情報を整理しています。難しい内容も、できるだけシンプルにお伝えします。
                  </p>
                </div>
              </div>
            </section>

            {/* 記事制作フロー */}
            <section>
              <h2 className="text-2xl font-bold text-[#1B3A5C] mb-6">
                記事制作フロー
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#1B3A5C] text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      情報収集・調査
                    </h3>
                    <p className="text-sm leading-relaxed">
                      各ファクタリング会社の公式サイト、プレスリリース、業界ニュース等から最新の情報を収集します。手数料、審査基準、対応エリア、買取可能額、入金スピードなど、利用者が比較検討に必要な項目を網羅的に調査します。
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#2B5F8A] text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      記事執筆・構成
                    </h3>
                    <p className="text-sm leading-relaxed">
                      収集した情報を元に、利用者の検索意図やニーズに合わせた記事構成を設計します。SEOの観点も考慮しつつ、読みやすさとわかりやすさを重視した記事を執筆します。
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#3A7CA5] text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      ファクトチェック・校正
                    </h3>
                    <p className="text-sm leading-relaxed">
                      執筆した記事の内容を、公式情報と照合してファクトチェックを行います。手数料率や条件などの数値情報は特に慎重に確認し、誤った情報が掲載されないよう努めています。また、文章の読みやすさ・わかりやすさの観点から校正を行います。
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#4A9BC5] text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      公開後の定期更新
                    </h3>
                    <p className="text-sm leading-relaxed">
                      公開後も定期的に情報の鮮度を確認し、手数料の変更やサービス内容の更新があった場合は速やかに記事を修正します。毎月の情報更新を基本とし、常に最新の比較情報を提供できる体制を維持しています。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* アフィリエイト広告について */}
            <section>
              <h2 className="text-2xl font-bold text-[#1B3A5C] mb-4">
                アフィリエイト広告について
              </h2>
              <p>
                本サイトは、アフィリエイトプログラム（成果報酬型広告）を利用しています。利用者が本サイトのリンクを経由してファクタリング会社に申し込まれた場合、当社が広告報酬を受け取ることがあります。
              </p>
              <p className="mt-2">
                ただし、広告報酬の有無や金額がランキング順位や記事内容に影響を与えることはありません。当社独自の評価基準に基づき、利用者にとって有益な情報を中立的な立場で提供しています。
              </p>
            </section>

            {/* お問い合わせ */}
            <section>
              <h2 className="text-2xl font-bold text-[#1B3A5C] mb-4">
                お問い合わせ
              </h2>
              <p>
                記事の内容に関するご指摘、情報の修正依頼、その他ご不明な点がございましたら、お問い合わせフォームよりお気軽にご連絡ください。正確な情報提供のため、皆さまからのフィードバックを歓迎いたします。
              </p>
            </section>

            {/* 制定日 */}
            <div className="border-t border-gray-200 pt-6 mt-10 text-right text-sm text-gray-500">
              <p>制定日：2026年4月16日</p>
              <p className="mt-1">株式会社MediaX</p>
              <p>東京都渋谷区</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
