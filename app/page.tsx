import { ComparisonTable } from "@/components/ComparisonTable";
import { CompanyDetail } from "@/components/CompanyDetail";
import { FAQ } from "@/components/FAQ";
import { factoringCompanies } from "@/data/companies";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
            法人向けファクタリング比較ナビ
          </h1>
          <p className="text-sm text-gray-600 mt-1">最終更新: 2026年3月</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            法人向けファクタリング<br className="md:hidden" />おすすめ15選
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4">
            手数料・審査・入金スピードを徹底比較
          </p>
          <p className="text-base text-gray-600 mb-8">
            即日対応、審査が通りやすい、手数料が安い会社を厳選
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#ranking" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors"
            >
              おすすめランキングを見る
            </a>
            <a 
              href="#diagnosis" 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors"
            >
              診断ツールで最適な会社を探す
            </a>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">最短2時間で入金</h3>
            <p className="text-sm text-gray-600">
              オンライン完結で即日対応可能な会社を厳選
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">手数料1%〜</h3>
            <p className="text-sm text-gray-600">
              業界最安水準の手数料で資金調達コストを削減
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">審査通過率90%超</h3>
            <p className="text-sm text-gray-600">
              赤字決算・税金滞納でも利用できる柔軟審査
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">目次</h3>
          <ol className="space-y-3">
            <li>
              <a href="#what-is-factoring" className="text-blue-600 hover:underline">
                1. ファクタリングとは？
              </a>
            </li>
            <li>
              <a href="#ranking" className="text-blue-600 hover:underline">
                2. 法人向けファクタリングおすすめ15選
              </a>
            </li>
            <li>
              <a href="#comparison" className="text-blue-600 hover:underline">
                3. 項目別比較（手数料・審査・スピード）
              </a>
            </li>
            <li>
              <a href="#diagnosis" className="text-blue-600 hover:underline">
                4. 診断ツール：最適なファクタリング会社を探す
              </a>
            </li>
            <li>
              <a href="#how-to-choose" className="text-blue-600 hover:underline">
                5. ファクタリング会社の選び方
              </a>
            </li>
            <li>
              <a href="#faq" className="text-blue-600 hover:underline">
                6. よくある質問（FAQ）
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* What is Factoring */}
      <section id="what-is-factoring" className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          ファクタリングとは？
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            ファクタリングとは、売掛金を売却して早期に現金化する資金調達方法です。
          </p>
          <p className="text-gray-700">
            銀行融資と異なり、審査が柔軟で最短即日で資金調達が可能です。赤字決算や税金滞納があっても利用できるケースが多く、中小企業の資金繰り改善に有効です。
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          2社間ファクタリングと3社間ファクタリングの違い
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
            <h4 className="font-bold text-xl text-green-700 mb-3">2社間ファクタリング</h4>
            <p className="text-sm text-gray-700 mb-4">
              利用者とファクタリング会社の2社間で契約。売掛先に知られずに資金調達可能。
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>売掛先にバレない</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>最短即日で資金化</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">×</span>
                <span>手数料がやや高い（1〜20%）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500">
            <h4 className="font-bold text-xl text-blue-700 mb-3">3社間ファクタリング</h4>
            <p className="text-sm text-gray-700 mb-4">
              利用者、ファクタリング会社、売掛先の3社間で契約。売掛先の同意が必要。
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>手数料が安い（1〜10%）</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">×</span>
                <span>売掛先にバレる</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">×</span>
                <span>入金まで数日〜1週間</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section id="ranking" className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          【総合ランキング】おすすめファクタリング会社TOP3（モックアップ）
        </h2>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ComparisonTable companies={factoringCompanies.slice(0, 3)} />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ※ この比較表は動作確認用のモックアップです（3社のみ表示）
          </p>
        </div>
      </section>

      {/* Company Detail Section */}
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          1位: ビートレーディング 詳細レビュー（モックアップ）
        </h2>
        
        <CompanyDetail company={factoringCompanies[0]} />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQ />
        </div>
      </section>

      {/* Coming Soon Sections */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">コンテンツ準備中</h2>
          <p className="text-gray-600 mb-6">以下のコンテンツを順次公開予定です</p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">📊 おすすめ15選ランキング（完全版）</h3>
              <p className="text-sm text-gray-600">
                QuQuMo、アクセルファクター、ベストファクターなど15社を徹底比較
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">🧮 診断ツール</h3>
              <p className="text-sm text-gray-600">
                あなたに最適なファクタリング会社を10個の質問で診断
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">💰 手数料シミュレーター</h3>
              <p className="text-sm text-gray-600">
                売掛金額を入力して実際の受取額を即座に計算
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2">❓ FAQ50項目</h3>
              <p className="text-sm text-gray-600">
                よくある質問に網羅的に回答
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2026 法人向けファクタリング比較ナビ</p>
          <p className="text-xs text-gray-400 mt-2">
            当サイトは情報提供を目的としており、特定のサービスを推奨するものではありません。
          </p>
        </div>
      </footer>
    </div>
  );
}
