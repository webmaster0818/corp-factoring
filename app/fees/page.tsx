import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeeSimulator } from "@/components/FeeSimulator";
import { factoringCompanies } from "@/data/companies";

export const metadata = {
  title: "ファクタリング手数料が安い会社10選【2026年最新】相場・計算方法・抑えるコツ",
  description: "ファクタリング手数料の相場、計算方法、手数料が安い業者ランキング10選を徹底解説。手数料を抑えるポイント、無料シミュレーターも提供。2社間・3社間の違いも詳しく紹介します。",
  keywords: "ファクタリング,手数料,安い,相場,計算,シミュレーター",
  alternates: {
    canonical: "/fees",
  },
  openGraph: {
    title: "ファクタリング手数料が安い会社10選【2026年最新】",
    description: "ファクタリング手数料の相場、計算方法、手数料が安い業者ランキング10選を徹底解説。",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "ファクタリング手数料が安い会社10選【2026年最新】",
    description: "ファクタリング手数料の相場、計算方法、手数料が安い業者ランキング10選を徹底解説。",
  },
};

export default function FeesPage() {
  // 手数料が安い順に並べ替え
  const lowFeeCompanies = [...factoringCompanies]
    .sort((a, b) => a.fees.min - b.fees.min)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">ホーム</Link>
            <span className="mx-2">＞</span>
            <span className="text-gray-900 font-medium">ファクタリング手数料が安い会社10選</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* ヘッダー */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
          <div className="text-center">
            <Badge className="mb-4 bg-green-500 hover:bg-green-600 text-white font-bold">💰 手数料特化記事</Badge>
            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
              ファクタリング手数料が安い会社10選
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              手数料の相場、計算方法、手数料を抑えるコツを徹底解説。無料シミュレーターで手取り額もすぐに確認できます。
            </p>
          </div>
        </div>

        {/* 目次 */}
        <Card className="mb-8 border-2 border-gray-100 shadow-sm">
          <CardHeader className="bg-gray-50 border-b border-gray-100">
            <CardTitle className="text-2xl font-black text-gray-900">📖 目次</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2">
              <li>
                <Link href="#market" className="text-blue-600 hover:text-blue-700 font-medium">
                  1. ファクタリング手数料の相場
                </Link>
              </li>
              <li>
                <Link href="#ranking" className="text-blue-600 hover:text-blue-700 font-medium">
                  2. 手数料が安い会社ランキングTOP10
                </Link>
              </li>
              <li>
                <Link href="#tips" className="text-blue-600 hover:text-blue-700 font-medium">
                  3. 手数料を抑える5つのポイント
                </Link>
              </li>
              <li>
                <Link href="#simulator" className="text-blue-600 hover:text-blue-700 font-medium">
                  4. 手数料シミュレーター（無料）
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-blue-600 hover:text-blue-700 font-medium">
                  5. よくある質問
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 1. 手数料の相場 */}
        <section id="market" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">📊 ファクタリング手数料の相場</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    ファクタリング手数料は、契約形態（2社間・3社間）や取引金額、売掛先の信用力によって大きく異なります。
                  </p>
                </div>

                {/* 2社間・3社間の違い */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-black text-blue-700 mb-4 text-xl">2社間ファクタリング</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">手数料相場</p>
                        <p className="text-3xl font-black text-blue-600">5%〜20%</p>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>売掛先に通知不要</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>即日入金可能</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600">✗</span>
                          <span>手数料が高め</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-black text-green-700 mb-4 text-xl">3社間ファクタリング</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">手数料相場</p>
                        <p className="text-3xl font-black text-green-600">1%〜10%</p>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>手数料が安い</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          <span>審査が緩やか</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600">✗</span>
                          <span>売掛先に通知必要</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 手数料に影響する要因 */}
                <div>
                  <h3 className="font-black text-gray-900 mb-4 text-xl">💡 手数料に影響する要因</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">取引金額</h4>
                      <p className="text-sm text-gray-600">金額が大きいほど手数料率は低くなる傾向</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">売掛先の信用力</h4>
                      <p className="text-sm text-gray-600">大手企業や上場企業ほど手数料が安い</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">初回・2回目以降</h4>
                      <p className="text-sm text-gray-600">2回目以降は手数料が下がることが多い</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">入金スピード</h4>
                      <p className="text-sm text-gray-600">即日入金は手数料が高くなる傾向</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2. ランキングTOP10 */}
        <section id="ranking" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">🏆 手数料が安い会社ランキングTOP10</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {lowFeeCompanies.map((company, index) => (
                  <div
                    key={company.id}
                    className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                          index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-100 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-50 text-blue-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-black text-gray-900 mb-1">
                              {company.name}
                            </h3>
                            <p className="text-sm text-gray-600">{company.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">手数料</p>
                            <p className="text-2xl font-black text-green-600">
                              {company.fees.min}%〜
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {company.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} className="bg-orange-100 text-orange-700 border-orange-200 font-medium">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={`/companies/${company.slug}`}
                            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2 px-6 rounded-lg text-sm hover:shadow-lg transition"
                          >
                            詳細を見る →
                          </Link>
                          <Link
                            href="/#diagnosis"
                            className="bg-white border-2 border-sky-500 text-sky-600 font-bold py-2 px-6 rounded-lg hover:bg-sky-50 transition text-sm"
                          >
                            無料診断
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. 手数料を抑えるポイント */}
        <section id="tips" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">💡 手数料を抑える5つのポイント</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    title: "1. 複数社で相見積もりを取る",
                    description: "少なくとも3社から見積もりを取り、手数料を比較しましょう。相見積もりを取ることで、各社の競争意識が働き、手数料が下がる可能性があります。",
                    icon: "📊",
                    color: "blue"
                  },
                  {
                    title: "2. 売掛金額を大きくまとめる",
                    description: "少額の売掛金を何度も売却するより、ある程度まとめて売却する方が手数料率は低くなります。目安として100万円以上がおすすめです。",
                    icon: "💰",
                    color: "green"
                  },
                  {
                    title: "3. 信用力の高い売掛先を選ぶ",
                    description: "大手企業や上場企業の売掛金は、ファクタリング会社にとってリスクが低いため、手数料が安くなります。",
                    icon: "🏢",
                    color: "amber"
                  },
                  {
                    title: "4. 2回目以降の利用で交渉する",
                    description: "初回の取引実績があれば、2回目以降は手数料の引き下げ交渉がしやすくなります。継続利用を前提に交渉してみましょう。",
                    icon: "🤝",
                    color: "sky"
                  },
                  {
                    title: "5. 3社間ファクタリングを検討する",
                    description: "売掛先への通知が問題ない場合は、3社間ファクタリングを選ぶことで手数料を大幅に抑えられます（1%〜10%程度）。",
                    icon: "✅",
                    color: "emerald"
                  }
                ].map((tip, index) => (
                  <div key={index} className={`bg-${tip.color}-50 p-6 rounded-xl border border-${tip.color}-100`}>
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-black text-gray-900 mb-2 text-lg">{tip.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. シミュレーター */}
        <section id="simulator" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">🧮 手数料シミュレーター（無料）</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                売掛金額と手数料を入力するだけで、実際の入金額を簡単に計算できます。複数のパターンで比較してみましょう。
              </p>
              <FeeSimulator />
            </CardContent>
          </Card>
        </section>

        {/* 5. FAQ */}
        <section id="faq" className="mb-12">
          <Card className="border-2 border-gray-100 shadow-sm">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-2xl font-black text-gray-900">❓ よくある質問</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    q: "ファクタリング手数料の相場はいくらですか？",
                    a: "2社間ファクタリングは5%〜20%、3社間ファクタリングは1%〜10%が相場です。取引金額や売掛先の信用力によって変動します。"
                  },
                  {
                    q: "手数料が安い業者は信頼できますか？",
                    a: "手数料が安いからといって必ずしも信頼できないわけではありません。ただし、極端に安い場合は隠れコストがないか確認が必要です。当サイトでは信頼性と手数料の両面で厳選した業者のみを紹介しています。"
                  },
                  {
                    q: "手数料以外にかかる費用はありますか？",
                    a: "一般的には、審査手数料（無料の場合も多い）、債権譲渡登記費用（3社間の場合）、振込手数料などがかかる場合があります。事前に総コストを確認しましょう。"
                  },
                  {
                    q: "手数料は交渉できますか？",
                    a: "交渉は可能です。特に2回目以降の利用や、大口取引の場合は交渉の余地があります。複数社の見積もりを提示することで、より有利な条件を引き出せる可能性があります。"
                  },
                  {
                    q: "手数料が高いのはどんな場合ですか？",
                    a: "初回利用、少額取引（100万円未満）、売掛先の信用力が低い場合、即日入金を希望する場合などは手数料が高くなる傾向があります。"
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h4 className="font-black text-gray-900 mb-3 text-lg">Q. {faq.q}</h4>
                    <p className="text-gray-700 leading-relaxed pl-4 border-l-4 border-blue-500">
                      A. {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/30 p-10 text-center text-white mb-8">
          <h2 className="text-3xl font-black mb-4">
            手数料が安い業者を今すぐ見つける
          </h2>
          <p className="mb-8 text-orange-100 text-lg leading-relaxed">
            無料診断ツールで、あなたに最適な低手数料業者を自動マッチング
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#diagnosis"
              className="bg-white text-orange-600 font-black py-4 px-10 rounded-2xl hover:bg-gray-100 transition shadow-lg"
            >
              🧮 無料診断を始める
            </Link>
            <Link
              href="/#ranking"
              className="bg-orange-700 text-white font-bold py-4 px-10 rounded-2xl hover:bg-orange-800 transition border-2 border-orange-400"
            >
              🏆 ランキングTOP15を見る
            </Link>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="text-center">
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-bold text-lg inline-flex items-center gap-2"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>

      <Footer />

      {/* パンくずリスト構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://corp-factoring.com" },
              { "@type": "ListItem", "position": 2, "name": "手数料比較", "item": "https://corp-factoring.com/fees" },
            ],
          }),
        }}
      />
    </div>
  );
}
