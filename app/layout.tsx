import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "法人向けファクタリングおすすめ15選【2026年最新】手数料・審査・スピード徹底比較",
    template: "%s｜ファクタリング比較ナビ",
  },
  description: "法人向けファクタリング会社を徹底比較。手数料、審査スピード、入金速度を詳しく解説。即日対応、審査が通りやすい、手数料が安い会社を紹介します。",
  keywords: "ファクタリング,法人,おすすめ,比較,手数料,審査,即日",
  metadataBase: new URL("https://corp-factoring-deploy.pages.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "法人向けファクタリングおすすめ15選【2026年最新】",
    description: "手数料・審査・入金スピードを徹底比較。最適なファクタリング会社が見つかります。",
    url: "https://corp-factoring-deploy.pages.dev/",
    siteName: "ファクタリング比較ナビ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "法人向けファクタリングおすすめ15選【2026年最新】",
    description: "手数料・審査・入金スピードを徹底比較。最適なファクタリング会社が見つかります。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
