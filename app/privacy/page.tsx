import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "ファクタリング比較ナビのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyPage() {
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
              プライバシーポリシー
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-[#1B3A5C]">
            プライバシーポリシー
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
            <p>
              株式会社MediaX（以下「当社」）は、当社が運営するウェブサイト「ファクタリング比較ナビ」（以下「本サイト」）における利用者の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
            </p>

            {/* 第1条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第1条（個人情報の定義）
              </h2>
              <p>
                本ポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、メールアドレス、電話番号その他の記述等により特定の個人を識別できるもの、および個人識別符号が含まれるものをいいます。
              </p>
            </section>

            {/* 第2条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第2条（個人情報の収集方法）
              </h2>
              <p>
                当社は、以下の方法により個人情報を取得することがあります。
              </p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>
                  お問い合わせフォームからの送信時（氏名、メールアドレス等）
                </li>
                <li>
                  アクセス解析ツールによる自動取得（IPアドレス、ブラウザ情報、閲覧ページ等）
                </li>
                <li>Cookie等の技術を用いた自動取得</li>
              </ol>
            </section>

            {/* 第3条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第3条（個人情報の利用目的）
              </h2>
              <p>当社は、収集した個人情報を以下の目的で利用します。</p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>本サイトのサービス提供および運営のため</li>
                <li>利用者からのお問い合わせに回答するため</li>
                <li>
                  本サイトの利用状況の分析およびサービス改善のため
                </li>
                <li>本サイトのコンテンツの改善・開発のため</li>
                <li>
                  ファクタリング会社の比較情報の精度向上のため
                </li>
                <li>利用規約に違反した利用者への対応のため</li>
                <li>
                  本サイトに関する重要なお知らせ等の通知のため
                </li>
                <li>広告の配信および効果測定のため</li>
                <li>マーケティングデータの統計・分析のため</li>
                <li>不正アクセス・不正利用の防止のため</li>
                <li>法令に基づく対応のため</li>
                <li>当社の権利・財産の保護のため</li>
                <li>
                  上記の利用目的に付随する目的のため
                </li>
              </ol>
            </section>

            {/* 第4条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第4条（個人情報の第三者提供）
              </h2>
              <p>
                当社は、以下の場合を除き、利用者の同意なく個人情報を第三者に提供することはありません。
              </p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                </li>
              </ol>
            </section>

            {/* 第5条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第5条（Google Analyticsの利用について）
              </h2>
              <p>
                本サイトでは、Googleによるアクセス解析ツール「Google
                Analytics」を使用しています。Google
                Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              </p>
              <p className="mt-2">
                この機能はCookieを無効にすることで収集を拒否できますので、お使いのブラウザの設定をご確認ください。Google
                Analyticsの利用規約およびプライバシーポリシーについては、Google
                Analyticsの公式サイトをご参照ください。
              </p>
            </section>

            {/* 第6条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第6条（Cookie（クッキー）の使用について）
              </h2>
              <p>本サイトでは、以下の目的でCookieを使用しています。</p>
              <ol className="list-decimal pl-6 mt-2 space-y-1">
                <li>利用者の利便性向上のため</li>
                <li>アクセス解析のため（Google Analytics）</li>
                <li>
                  広告の配信・効果測定のため（アフィリエイト広告を含む）
                </li>
              </ol>
              <p className="mt-2">
                利用者はブラウザの設定によりCookieの受け入れを拒否することができますが、その場合本サイトの一部の機能がご利用いただけなくなることがあります。
              </p>
              <p className="mt-2">
                本サイトでは、アフィリエイトプログラム（成果報酬型広告）を利用しています。利用者が本サイトを経由してファクタリング会社のサービスに申し込まれた場合、当社が広告報酬を受け取ることがあります。アフィリエイト広告の計測のためにCookieが使用される場合があります。
              </p>
            </section>

            {/* 第7条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第7条（個人情報の管理）
              </h2>
              <p>
                当社は、利用者の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行います。
              </p>
            </section>

            {/* 第8条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第8条（個人情報の開示・訂正・削除）
              </h2>
              <p>
                利用者が自己の個人情報の開示・訂正・追加・削除・利用停止を希望される場合は、下記のお問い合わせ先までご連絡ください。ご本人確認のうえ、合理的な範囲で速やかに対応いたします。
              </p>
            </section>

            {/* 第9条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第9条（プライバシーポリシーの変更）
              </h2>
              <p>
                当社は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本サイト上に掲載した時点から効力を生じるものとします。重要な変更がある場合には、本サイト上でお知らせいたします。
              </p>
            </section>

            {/* 第10条 */}
            <section>
              <h2 className="text-xl font-bold text-[#1B3A5C] mb-3">
                第10条（お問い合わせ窓口）
              </h2>
              <p>
                本ポリシーに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-6">
                <p className="font-bold text-gray-900">株式会社MediaX</p>
                <p className="mt-1">所在地：東京都渋谷区</p>
                <p className="mt-1">
                  お問い合わせ：本サイトのお問い合わせフォームよりご連絡ください
                </p>
              </div>
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
