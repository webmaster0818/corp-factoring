import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "ファクタリング比較ナビの利用規約です。本サイトをご利用いただく前に、必ずお読みください。",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsPage() {
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
            <span className="text-gray-900 font-medium">利用規約</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-[#1B3A5C]">
            利用規約
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
            <p>
              この利用規約（以下「本規約」）は、株式会社MediaX（以下「当社」）が運営するウェブサイト「ファクタリング比較ナビ」（以下「本サイト」）の利用条件を定めるものです。本サイトをご利用いただくすべての方（以下「利用者」）に本規約が適用されます。
            </p>

            {/* 第1条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第1条（サービスの目的）
              </h2>
              <p>
                本サイトは、法人・個人事業主・フリーランス向けのファクタリングサービスに関する比較・紹介情報の提供を目的としています。利用者が最適なファクタリング会社を選択するための参考情報を提供するものであり、特定のファクタリング会社との契約を仲介・斡旋するものではありません。
              </p>
            </section>

            {/* 第2条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第2条（定義）
              </h2>
              <p>本規約において、以下の用語は次の意味で使用します。</p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>
                  「本サービス」とは、本サイト上で提供されるファクタリング会社の比較情報、診断ツール、コラム記事、シミュレーター等のすべてのコンテンツおよび機能をいいます。
                </li>
                <li>
                  「利用者」とは、本サイトを閲覧し、または本サービスを利用するすべての方をいいます。
                </li>
                <li>
                  「掲載企業」とは、本サイトに情報が掲載されているファクタリング会社をいいます。
                </li>
              </ol>
            </section>

            {/* 第3条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第3条（規約への同意）
              </h2>
              <p>
                利用者は、本サイトを利用することにより、本規約のすべての条項に同意したものとみなされます。本規約に同意いただけない場合は、本サイトのご利用をお控えください。
              </p>
            </section>

            {/* 第4条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第4条（規約の変更）
              </h2>
              <p>
                当社は、利用者に事前の通知なく本規約を変更できるものとします。変更後の利用規約は、本サイト上に掲載した時点から効力を生じるものとし、利用者が変更後に本サイトを利用した場合、変更後の規約に同意したものとみなします。
              </p>
            </section>

            {/* 第5条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第5条（サービス内容）
              </h2>
              <p>本サイトは以下のサービスを提供します。</p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>ファクタリング会社の比較情報の提供</li>
                <li>ファクタリング会社のランキング・おすすめ情報の提供</li>
                <li>ファクタリングに関するコラム・解説記事の提供</li>
                <li>ファクタリング会社の診断ツールの提供</li>
                <li>手数料シミュレーターの提供</li>
                <li>その他、当社が適宜提供するサービス</li>
              </ol>
            </section>

            {/* 第6条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第6条（サービスの変更・中断・終了）
              </h2>
              <p>
                当社は、利用者に事前の通知なく、本サービスの内容を変更し、または本サービスの提供を中断・終了することができるものとします。これにより利用者に損害が生じた場合であっても、当社は一切の責任を負いません。
              </p>
            </section>

            {/* 第7条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第7条（禁止事項）
              </h2>
              <p>
                利用者は、本サイトの利用にあたり、以下の行為を行ってはなりません。
              </p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当社、掲載企業、その他の第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
                </li>
                <li>
                  本サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>本サイトの運営を妨害するおそれのある行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他の利用者に関する個人情報等を収集または蓄積する行為</li>
                <li>不正な目的を持って本サイトを利用する行為</li>
                <li>
                  本サイトの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
                </li>
                <li>他の利用者に成りすます行為</li>
                <li>
                  当社が許諾しない本サイト上での宣伝、広告、勧誘、または営業行為
                </li>
                <li>
                  本サイトのコンテンツを無断で複製、転載、改変、販売する行為
                </li>
                <li>反社会的勢力等への利益供与</li>
                <li>
                  本サイトの情報を利用した自動巡回プログラム（クローラー・スクレイピング等）による情報取得行為
                </li>
                <li>その他、当社が不適切と判断する行為</li>
              </ol>
            </section>

            {/* 第8条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第8条（知的財産権）
              </h2>
              <p>
                本サイトに掲載されているコンテンツ（文章、画像、動画、プログラム、データ等）に関する著作権その他の知的財産権は、当社または正当な権利を有する第三者に帰属します。利用者は、当社の事前の書面による承諾なく、これらのコンテンツを複製、転載、改変、販売、出版、その他二次利用することはできません。
              </p>
            </section>

            {/* 第9条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第9条（広告・アフィリエイトプログラムについて）
              </h2>
              <p>
                本サイトには、第三者の広告およびアフィリエイトプログラム（成果報酬型広告）が含まれています。利用者が本サイトを経由して掲載企業のサービスに申し込んだ場合、当社が広告報酬を受け取ることがあります。
              </p>
              <p className="mt-2">
                ただし、広告報酬の有無がランキングや評価内容に影響を与えることはありません。当社は独自の評価基準に基づき、客観的な情報提供に努めています。
              </p>
            </section>

            {/* 第10条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第10条（外部リンクについて）
              </h2>
              <p>
                本サイトには、掲載企業や外部サイトへのリンクが含まれています。リンク先のウェブサイトは当社の管理下にないため、リンク先のコンテンツ、プライバシーポリシー、セキュリティ等について当社は一切の責任を負いません。
              </p>
            </section>

            {/* 第11条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第11条（情報の正確性について）
              </h2>
              <p>
                当社は、本サイトに掲載する情報の正確性、完全性、最新性について可能な限り努力しますが、これを保証するものではありません。掲載企業の手数料、サービス内容、審査基準等は変更される場合があり、最新の情報は各掲載企業の公式サイトにてご確認ください。
              </p>
            </section>

            {/* 第12条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第12条（免責事項）
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  当社は、本サイトの情報に基づいて利用者が行った判断や行為について、一切の責任を負いません。
                </li>
                <li>
                  利用者と掲載企業との間で生じたトラブル、損害、紛争について、当社は一切の責任を負いません。
                </li>
                <li>
                  本サイトの利用に起因して利用者に生じた損害（直接的・間接的を問わず）について、当社は一切の責任を負いません。
                </li>
                <li>
                  当社は、本サイトが利用者の特定の目的に適合すること、期待する機能・正確性・有用性を有すること、本サイトの利用が利用者に適用のある法令に適合すること等について、何ら保証するものではありません。
                </li>
              </ol>
            </section>

            {/* 第13条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第13条（利用者の自己責任）
              </h2>
              <p>
                ファクタリングサービスの利用に関する最終的な判断は、利用者ご自身の責任で行ってください。本サイトの情報はあくまで参考情報であり、契約の締結に際しては、各掲載企業の利用規約、契約条件等を十分にご確認ください。
              </p>
            </section>

            {/* 第14条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第14条（個人情報の取扱い）
              </h2>
              <p>
                利用者の個人情報の取扱いについては、別途定める
                <Link
                  href="/privacy/"
                  className="text-[#1B3A5C] underline hover:no-underline"
                >
                  プライバシーポリシー
                </Link>
                に従うものとします。
              </p>
            </section>

            {/* 第15条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第15条（通知・連絡）
              </h2>
              <p>
                当社から利用者への通知・連絡は、本サイト上への掲載その他当社が適当と判断する方法により行うものとします。
              </p>
            </section>

            {/* 第16条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第16条（権利義務の譲渡禁止）
              </h2>
              <p>
                利用者は、当社の書面による事前の承諾なく、本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </section>

            {/* 第17条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第17条（分離可能性）
              </h2>
              <p>
                本規約のいずれかの条項が法令に基づき無効または執行不能と判断された場合であっても、本規約の残りの条項は引き続き有効に存続するものとします。
              </p>
            </section>

            {/* 第18条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第18条（損害賠償）
              </h2>
              <p>
                利用者が本規約に違反し、当社に損害を与えた場合、利用者は当社に対し、その損害（弁護士費用を含む）を賠償するものとします。
              </p>
            </section>

            {/* 第19条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第19条（準拠法）
              </h2>
              <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
            </section>

            {/* 第20条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第20条（管轄裁判所）
              </h2>
              <p>
                本サイトに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
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
