import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* サイト情報 */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/logo.png" alt="" className="w-11 h-11" />
              <span className="text-lg font-bold text-[#F5A623]">
                ファクタリング比較ナビ
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              法人向けファクタリングサービスを徹底比較。手数料・審査・入金スピードを元に、あなたに最適な1社を見つけるお手伝いをします。
            </p>
          </div>

          {/* ナビゲーション */}
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

        {/* コピーライト */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 ファクタリング比較ナビ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
