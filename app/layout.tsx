import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "法人向けファクタリングおすすめ15選【2026年最新】手数料・審査・スピード徹底比較",
  description: "法人向けファクタリング会社を徹底比較。手数料、審査スピード、入金速度を詳しく解説。即日対応、審査が通りやすい、手数料が安い会社を紹介します。",
  keywords: "ファクタリング,法人,おすすめ,比較,手数料,審査,即日",
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
