import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-white py-12 mt-16 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* サイト情報 */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/logo-88.webp" alt="ファクタリング比較ナビ ロゴ" className="w-11 h-11" width="44" height="44" />
              <span className="text-lg font-bold text-white">
                ファクタリング比較ナビ
              </span>
            </div>
            <p className="text-blue-100/80 text-sm leading-relaxed">
              法人・個人事業主向けのファクタリング会社を、手数料・審査・入金スピードの観点から比較する情報サイトです。各社の公式サイトで公開されている情報をもとに掲載しています。
            </p>
          </div>

          {/* サイトマップ */}
          <div>
            <h3 className="font-bold text-white mb-4">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#ranking" className="text-blue-100/80 hover:text-white transition">
                  ランキング
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="text-blue-100/80 hover:text-white transition">
                  比較表
                </Link>
              </li>
              <li>
                <Link href="/#diagnosis" className="text-blue-100/80 hover:text-white transition">
                  診断ツール
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-blue-100/80 hover:text-white transition">
                  手数料比較
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-blue-100/80 hover:text-white transition">
                  コラム
                </Link>
              </li>
              <li>
                <Link href="/topics/kiso" className="text-blue-100/80 hover:text-white transition">
                  基礎知識・審査・法律
                </Link>
              </li>
              <li>
                <Link href="/topics/hikaku" className="text-blue-100/80 hover:text-white transition">
                  比較・おすすめ
                </Link>
              </li>
              <li>
                <Link href="/topics/gyoushu" className="text-blue-100/80 hover:text-white transition">
                  業種別ファクタリング
                </Link>
              </li>
              <li>
                <Link href="/topics/kojin" className="text-blue-100/80 hover:text-white transition">
                  個人事業主・フリーランス
                </Link>
              </li>
              <li>
                <Link href="/guide/trouble/" className="text-blue-100/80 hover:text-white transition">
                  トラブル・法務ガイド
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-blue-100/80 hover:text-white transition">
                  よくある質問
                </Link>
              </li>
              <li>
                <Link href="/about/" className="text-blue-100/80 hover:text-white transition">
                  運営者情報
                </Link>
              </li>
            </ul>
          </div>

          {/* 人気コラム */}
          <div>
            <h3 className="font-bold text-white mb-4">人気コラム</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles/article-factoring-toha" className="text-blue-100/80 hover:text-white transition">
                  ファクタリングとは？
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-merit-demerit" className="text-blue-100/80 hover:text-white transition">
                  メリット・デメリット
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-tesuryo" className="text-blue-100/80 hover:text-white transition">
                  手数料の仕組み
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-osusume" className="text-blue-100/80 hover:text-white transition">
                  おすすめ19選
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-sokujitsu" className="text-blue-100/80 hover:text-white transition">
                  即日対応15選
                </Link>
              </li>
              <li>
                <Link href="/articles/article-factoring-kuchikomi" className="text-blue-100/80 hover:text-white transition">
                  口コミ・評判
                </Link>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-bold text-white mb-4">お問い合わせ</h3>
            <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
              掲載内容に関するご質問・ご指摘は、こちらからお問い合わせください。
            </p>
            <Link
              href="/#contact"
              className="inline-block border border-white/40 text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-white/10 transition"
            >
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* ポリシーリンク */}
        <div className="border-t border-white/15 pt-6 pb-2">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/terms/" className="text-blue-100/80 hover:text-white transition">
              利用規約
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/privacy/" className="text-blue-100/80 hover:text-white transition">
              プライバシーポリシー
            </Link>
            <span className="text-white/30">|</span>
            <Link href="/content-policy/" className="text-blue-100/80 hover:text-white transition">
              記事の制作ポリシー
            </Link>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-white/15 pt-6 text-center">
          <p className="text-blue-100/80 text-sm">
            © 2026 ファクタリング比較ナビ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
