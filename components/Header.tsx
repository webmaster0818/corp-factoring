"use client";

import Link from "next/link";
import { useState } from "react";

const menuCategories = [
  {
    title: "ランキング・比較",
    links: [
      { href: "/#ranking", label: "おすすめTOP15ランキング" },
      { href: "/#comparison", label: "項目別比較表" },
      { href: "/fees", label: "手数料比較" },
    ],
  },
  {
    title: "ファクタリング基礎知識",
    links: [
      { href: "/articles/article-factoring-toha", label: "ファクタリングとは？" },
      { href: "/articles/article-factoring-merit-demerit", label: "メリット・デメリット" },
      { href: "/articles/article-factoring-tesuryo", label: "手数料の仕組み" },
      { href: "/articles/article-factoring-shinsa", label: "審査のポイント" },
      { href: "/articles/article-factoring-ihou", label: "違法？安全性について" },
    ],
  },
  {
    title: "おすすめ・口コミ",
    links: [
      { href: "/articles/article-factoring-osusume", label: "おすすめ20選" },
      { href: "/articles/article-factoring-sokujitsu", label: "即日対応15選" },
      { href: "/articles/article-factoring-hikaku", label: "徹底比較" },
      { href: "/articles/article-factoring-kuchikomi", label: "口コミ・評判" },
    ],
  },
  {
    title: "資金調達ガイド",
    links: [
      { href: "/articles/article-factoring-kojin-jigyonushi", label: "個人事業主向けFAQ" },
      { href: "/articles/article-freelance-shikin", label: "フリーランス資金繰り" },
      { href: "/articles/article-kojin-shikin-chotatsu", label: "資金調達10選" },
      { href: "/articles/article-sogyo-yushi", label: "創業融資ガイド" },
      { href: "/articles/article-seikyusho-kaitori", label: "請求書買取" },
    ],
  },
  {
    title: "ツール",
    links: [
      { href: "/#diagnosis", label: "無料診断ツール" },
      { href: "/#simulator", label: "手数料シミュレーター" },
    ],
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-17 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="ファクタリング比較ナビ ロゴ" className="w-11 h-11" width="44" height="44" />
          <span className="text-[19px] font-bold text-[#1B3A5C] tracking-wide">
            ファクタリング比較ナビ
          </span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="メニュー"
        >
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1B3A5C] transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4">
            {menuCategories.map((category) => (
              <div key={category.title} className="mb-4">
                <h3 className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-2 pb-1 border-b border-gray-100">
                  {category.title}
                </h3>
                <div className="space-y-1">
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1B3A5C] rounded-md transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href="/#diagnosis"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-[#1B3A5C] text-white text-center py-3 rounded-md font-bold text-sm hover:bg-[#152d47] transition"
              >
                無料診断する
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
