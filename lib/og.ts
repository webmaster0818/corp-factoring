// サイト共通のデフォルトOG画像（サイト名のみ。数字を入れない＝ハウスルール）
// Next.js ではページ側で openGraph を定義すると親の openGraph が丸ごと置き換わるため、
// openGraph を持つページは必ず images: DEFAULT_OG_IMAGES を指定すること。
export const DEFAULT_OG_IMAGE_URL = "https://corp-factoring.com/og-default.png";

export const DEFAULT_OG_IMAGES = [
  {
    url: DEFAULT_OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: "ファクタリング比較ナビ",
  },
];
