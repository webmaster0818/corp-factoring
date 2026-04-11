import Link from "next/link";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQ } from "@/components/FAQ";
import { DiagnosisTool } from "@/components/DiagnosisTool";
import { FeeSimulator } from "@/components/FeeSimulator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { factoringCompanies } from "@/data/companies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const topCompanies = factoringCompanies.slice(0, 15);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation */}
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="text-gray-900 font-medium">法人向けファクタリングおすすめ15選比較</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Eyecatch Image */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-20">
          {/* Eyecatch Image with Text Overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10 mx-auto" style={{ maxHeight: '300px' }}>
            <img
              src="/images/hero-eyecatch-v3.png"
              alt="法人向けファクタリングおすすめ15選 - 手数料・審査・入金スピード徹底比較2026年最新版"
              className="w-full h-full object-cover" style={{ objectPosition: '50% 55%' }}
              width="1344"
              height="768"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent flex items-start pt-8 sm:pt-10">
              <div className="pl-8 sm:pl-12 lg:pl-16 max-w-lg">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1B3A5C] leading-tight mb-3">
                  資金繰りの悩みを<br />即解決
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  フリーランス・個人事業主・法人向け<br />ファクタリング比較
                </p>
                <Link
                  href="#ranking"
                  className="inline-block bg-[#1B3A5C] text-white font-bold py-2.5 px-6 rounded-md text-sm hover:bg-[#152d47] transition"
                >
                  おすすめ15社を見る →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-5 py-2 rounded-md text-sm font-medium mb-6">
              <span className="text-gray-700">2026年4月 最新版｜<span className="text-[#1B3A5C] font-bold">15社</span>を徹底比較</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.2] mb-5">
              手数料・審査・入金スピードを<br />
              <span className="text-[#1B3A5C]">徹底比較</span>
              して最適な1社を見つけよう
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              即日対応、審査が通りやすい、手数料が安い会社を<strong className="text-gray-700">厳選</strong>しました
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#ranking"
                className="bg-[#1B3A5C] text-white font-bold py-4 px-10 rounded-md text-lg text-center hover:bg-[#152d47] transition"
              >
                ランキングTOP15を見る
              </Link>
              <Link
                href="#diagnosis"
                className="bg-white border-2 border-[#1B3A5C] text-[#1B3A5C] font-bold py-4 px-10 rounded-md hover:bg-blue-50 transition text-center"
              >
                無料診断ツール →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#1B3A5C]">15社</p>
              <p className="text-gray-500 text-sm mt-1">掲載会社数</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#2B5F8A]">50+</p>
              <p className="text-gray-500 text-sm mt-1">比較項目数</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#3A7CA5]">毎月</p>
              <p className="text-gray-500 text-sm mt-1">情報更新</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-black text-[#4A9BC5]">無料</p>
              <p className="text-gray-500 text-sm mt-1">診断ツール</p>
            </div>
          </div>
        </div>
      </section>

      {/* BASIC Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">BASIC</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ファクタリングとは？
            </h2>
          </div>

          <div className="prose max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              ファクタリングとは、売掛金を売却して早期に現金化する資金調達方法です。銀行融資と異なり、審査が柔軟で最短即日で資金調達が可能です。赤字決算や税金滞納があっても利用できるケースが多く、中小企業の資金繰り改善に有効です。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  2社間ファクタリング
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">売掛先にバレない</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">最短即日で資金化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">×</span>
                    <span className="text-gray-700">
                      手数料がやや高い（1〜20%）
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  3社間ファクタリング
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">手数料が安い（1〜10%）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">×</span>
                    <span className="text-gray-700">売掛先にバレる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">×</span>
                    <span className="text-gray-700">
                      入金まで数日〜1週間
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RANKING Section */}
      <section id="ranking" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">RANKING</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              おすすめTOP15ファクタリング会社
            </h2>
            <p className="text-gray-600">手数料・審査・スピードを総合評価</p>
          </div>

          <div className="grid gap-6 max-w-6xl mx-auto">
            {topCompanies.map((company, index) => (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Company Screenshot */}
                  <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={`/images/companies/${company.slug}.png`}
                      alt={`${company.name}公式サイト`}
                      className={`w-full object-cover object-top ${company.slug === 'ququmo' ? 'h-24' : 'h-40'}`}
                      width="1200"
                      height="160"
                    />
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        index === 0 ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-white' :
                        index === 1 ? 'bg-gradient-to-b from-gray-300 to-gray-500 text-white' :
                        index === 2 ? 'bg-gradient-to-b from-amber-600 to-amber-800 text-white' :
                        'bg-[#1B3A5C] text-white'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-500 text-lg">★</span>
                            <span className="text-lg font-semibold">
                              {company.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            手数料
                          </div>
                          <div className="text-lg font-semibold text-blue-600">
                            {company.fees.min}%〜{company.fees.max}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            入金スピード
                          </div>
                          <div className="text-lg font-semibold text-green-600">
                            {company.speed}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            買取可能額
                          </div>
                          <div className="text-lg font-semibold text-gray-900">
                            {company.minAmount === 0
                              ? "下限なし"
                              : `${(company.minAmount / 10000).toFixed(0)}万`}
                            〜{company.maxAmount}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {company.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/companies/${company.slug}`}>
                          <Button variant="outline" size="sm">
                            詳細を見る
                          </Button>
                        </Link>
                        <Button size="sm">公式サイトへ →</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON Section */}
      <section id="comparison" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">COMPARISON</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              項目別比較表
            </h2>
            <p className="text-gray-600">← 横にスクロールできます →</p>
          </div>
          <ComparisonTable companies={topCompanies} />
        </div>
      </section>

      {/* DIAGNOSIS Section */}
      <section id="diagnosis" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">DIAGNOSIS</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              最適なファクタリング会社診断
            </h2>
            <p className="text-gray-600">
              何を重視しますか？<br />
              複数選択OK
            </p>
            <p className="text-sm text-gray-500 mt-2">
              個人情報の入力は不要です
            </p>
          </div>
          <DiagnosisTool />
        </div>
      </section>

      {/* Fee Simulator */}
      <section id="simulator" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FeeSimulator />
        </div>
      </section>

      {/* VOICE Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">VOICE</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              利用者の声
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                    A
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    製造業 / 30代男性
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    利用額: 500万円
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  「銀行融資が間に合わない時にファクタリングを利用。申込から2時間で入金され、資金繰りが一気に解決しました。手数料も想像より安かったです。」
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                    B
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    IT企業 / 40代女性
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    利用額: 1,200万円
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  「オンライン完結で対面不要なのが助かりました。書類もたった2点で済み、忙しい中でもスムーズに資金調達できました。」
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3">
                    C
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    建設業 / 20代男性
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    利用額: 300万円
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  「創業2年目で銀行融資を断られましたが、ファクタリングなら赤字でも利用OK。このサイトで比較して最安の会社を見つけられました。」
                </p>
                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            ※ 利用者の感想であり、効果を保証するものではありません。
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm bg-[#1B3A5C] text-white">FAQ</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              よくある質問
            </h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#1B3A5C] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">01</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  中立な立場で比較
                </h3>
                <p className="text-sm text-gray-600">
                  特定のファクタリング会社に偏らず、手数料・審査・スピードを客観的に評価しています。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#1B3A5C] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">02</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  毎月情報を更新
                </h3>
                <p className="text-sm text-gray-600">
                  手数料やキャンペーン情報を毎月チェックし、常に最新の情報を掲載しています。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#1B3A5C] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">03</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  実体験ベース
                </h3>
                <p className="text-sm text-gray-600">
                  実際にファクタリングを利用した経験者の声を元に、リアルな情報を提供しています。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            資金調達でお困りですか？最短30分で入金可能
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            まずは無料で見積もり。3社以上の相見積もりがおすすめです
          </p>
          <Button
            size="lg"
            className="bg-white text-[#1B3A5C] hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
          >
            ランキングTOP15を見る →
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
