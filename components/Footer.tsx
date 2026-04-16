import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* サイト情報 */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/logo.png" alt="ファクタリング比較ナビ ロゴ" className="w-11 h-11" width="44" height="44" />
              <span className="text-lg font-bold text-[#F5A623]">
                ファクタリング比較ナビ
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              法人向けファクタリングサービスを徹底比較。手数料・審査・入金スピードを元に、あなたに最適な1社を見つけるお手伝いをします。
            </p>
          </div>

          {/* サイトマップ */}
          <div>
            <h3 className="font-bold text-white mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#ranking" className="text-gray-400 hover:text-white transition">
                  ランキング
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="text-gray-400 hover:text-white transition">
                  比較表
                </Link>
              </li>
              <li>
                <Link href="/#diagnosis" className="text-gray-400 hover:text-white transition">
                  診断ツール
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-gray-400 hover:text-white transition">
                  手数料比較
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-400 hover:text-white transition">
                  コラム
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-gray-400 hover:text-white transition">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-white transition">
                  運営情報
                </Link>
              </li>
            </ul>
          </div>

          {/* 人気コラム */}
          <div>
            <h3 className="font-bold text-white mb-4">人気コラム</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles/article-factoring-toha" className="text-gray-400 hover:text-white transition">
                  ファクタリングとは？
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-merit-demerit" className="text-gray-400 hover:text-white transition">
                  メリット・デメリット
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-tesuryo" className="text-gray-400 hover:text-white transition">
                  手数料の仕組み
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-osusume" className="text-gray-400 hover:text-white transition">
                  おすすめ20選
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-sokujitsu" className="text-gray-400 hover:text-white transition">
                  即日対応15選
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-kuchikomi" className="text-gray-400 hover:text-white transition">
                  口コミ・評判
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-bold text-white mb-4">お問い合わせ</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              ご不明な点やご質問がございましたら、お気軽にお問い合わせください。
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-[#F5A623] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#E8841A] transition"
            >
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* ポリシーリンク */}
        <div className="border-t border-gray-800 pt-6 pb-2">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/terms/" className="text-gray-400 hover:text-white transition">
              利用規約
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/privacy/" className="text-gray-400 hover:text-white transition">
              プライバシーポリシー
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/content-policy/" className="text-gray-400 hover:text-white transition">
              記事の制作ポリシー
            </Link>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 ファクタリング比較ナビ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
