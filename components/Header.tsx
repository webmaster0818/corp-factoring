"use client";

import Link from "next/link";
import { useState } from "react";
import { FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { ScrollMotion } from "@/components/ScrollMotion";

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
      { href: "/articles/article-factoring-ihou", label: "違法性と安全性" },
    ],
  },
  {
    title: "おすすめ・口コミ",
    links: [
      { href: "/articles/article-factoring-osusume", label: "おすすめ19選" },
      { href: "/articles/article-factoring-sokujitsu", label: "即日対応15選" },
      { href: "/articles/article-factoring-hikaku", label: "ファクタリング会社比較" },
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
    <>
    <ScrollMotion />
    <header className="sticky top-0 z-50">
      {/* 景品表示法対応: 広告表記バー */}
      <div className="bg-soft border-b border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-gray-600 leading-snug">
          <span className="border border-gray-400 text-gray-600 font-semibold px-1.5 rounded-sm text-[10px] leading-4 shrink-0">PR</span>
          <span>当サイトはアフィリエイトプログラムによる収益を得ています。掲載の順番はサービスへの評価に影響しません。</span>
        </div>
      </div>
      <div className="bg-white border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/images/logo-88.webp" alt="ファクタリング比較ナビ ロゴ" className="w-9 h-9" width="44" height="44" />
          <span className="text-[17px] font-bold text-ink tracking-wide">
            ファクタリング比較ナビ
          </span>
        </Link>

        {/* 掲載数（サイト内の既存の数値のみ） */}
        <div className="hidden lg:flex items-center gap-5 pl-5 border-l border-line text-ink">
          <div className="leading-tight">
            <span className="block text-[10px] text-gray-500">掲載会社数</span>
            <span className="text-base font-bold tabular-nums"><span data-count>{FEE_COMPANY_COUNT}</span><span className="text-xs font-semibold ml-0.5">社</span></span>
          </div>
          <div className="leading-tight">
            <span className="block text-[10px] text-gray-500">比較項目数</span>
            <span className="text-base font-bold tabular-nums" data-count>50+</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link href="/#ranking" className="text-ink/80 hover:text-blue-600 font-medium text-sm">
            ランキング
          </Link>
          <Link href="/#comparison" className="text-ink/80 hover:text-blue-600 font-medium text-sm">
            比較表
          </Link>
          <Link href="/#diagnosis" className="text-ink/80 hover:text-blue-600 font-medium text-sm">
            診断
          </Link>
          <Link href="/articles" className="text-ink/80 hover:text-blue-600 font-medium text-sm">
            コラム
          </Link>
          <Link href="/#faq" className="text-ink/80 hover:text-blue-600 font-medium text-sm">
            FAQ
          </Link>
          <Link
            href="/#diagnosis"
            className="bg-cta text-white px-5 py-2.5 rounded-md font-bold text-sm hover:bg-cta-hover transition"
          >
            無料診断する
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="メニュー"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4">
            {menuCategories.map((category) => (
              <div key={category.title} className="mb-4">
                <h3 className="text-xs font-bold text-ink tracking-wider mb-2 pb-1 border-b border-gray-100">
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
                className="block w-full bg-cta text-white text-center py-3 rounded-md font-bold text-sm hover:bg-cta-hover transition"
              >
                無料診断する
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
    </>
  );
}
