import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-17 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="" className="w-11 h-11" />
          <span className="text-[19px] font-bold text-[#1B3A5C] tracking-wide">
            ファクタリング比較ナビ
          </span>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-7">
          <Link href="/#ranking" className="text-gray-600 hover:text-[#1B3A5C] font-medium text-sm">
            ランキング
          </Link>
          <Link href="/#comparison" className="text-gray-600 hover:text-[#1B3A5C] font-medium text-sm">
            比較表
          </Link>
          <Link href="/#diagnosis" className="text-gray-600 hover:text-[#1B3A5C] font-medium text-sm">
            診断
          </Link>
          <Link href="/articles" className="text-gray-600 hover:text-[#1B3A5C] font-medium text-sm">
            コラム
          </Link>
          <Link href="/#faq" className="text-gray-600 hover:text-[#1B3A5C] font-medium text-sm">
            FAQ
          </Link>
          <Link
            href="/#diagnosis"
            className="bg-[#1B3A5C] text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-[#152d47] transition"
          >
            無料診断する
          </Link>
        </div>
      </div>
    </header>
  );
}
