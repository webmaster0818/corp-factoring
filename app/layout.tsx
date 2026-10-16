import type { Metadata } from "next";
import "./globals.css";
import { DEFAULT_OG_IMAGES, DEFAULT_OG_IMAGE_URL } from "@/lib/og";

export const metadata: Metadata = {
  title: {
    default: "法人向けファクタリングおすすめ15選【2026年最新】手数料・審査・入金スピードを比較",
    template: "%s｜ファクタリング比較ナビ",
  },
  description: "法人・個人事業主向けのファクタリング会社を、手数料・審査・入金スピードの観点から比較しています。各社の公式サイトで公開されている情報をもとに、即日入金への対応状況や手数料の目安を掲載しています。",
  keywords: "ファクタリング,法人,おすすめ,比較,手数料,審査,即日",
  metadataBase: new URL("https://corp-factoring.com"),
  openGraph: {
    title: "法人向けファクタリングおすすめ15選【2026年最新】",
    description: "ファクタリング会社の手数料・審査・入金スピードを、公式サイトの情報をもとに比較しています。",
    siteName: "ファクタリング比較ナビ",
    locale: "ja_JP",
    type: "website",
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE_URL],
    title: "法人向けファクタリングおすすめ15選【2026年最新】",
    description: "ファクタリング会社の手数料・審査・入金スピードを、公式サイトの情報をもとに比較しています。",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ファクタリング比較ナビ",
              "url": "https://corp-factoring.com",
              "logo": "https://corp-factoring.com/images/logo.png"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ファクタリング比較ナビ",
              "url": "https://corp-factoring.com"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "ホーム",
                  "item": "https://corp-factoring.com"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
