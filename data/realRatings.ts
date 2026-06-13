// Google Maps の実評価 (Places API で取得・取得日 2026-06-13)
// 取得方法: Text Search で「{社名} ファクタリング」を検索し、社名・住所が一致した拠点のみ採用。
// 一致が確認できなかった会社 (paytner / mf-earlypayment / freenance / ennavi / minna-factoring) は掲載しない。

export interface RealRating {
  entity: string; // Google Maps 上の名称
  rating: number;
  count: number;
  fetchedAt: string;
}

export const realRatings: { [slug: string]: RealRating } = {
  "be-trading": { entity: "株式会社ビートレーディング 東京本社", rating: 4.2, count: 206, fetchedAt: "2026年6月13日" },
  "ququmo": { entity: "株式会社アクティブサポート(QuQuMo運営)", rating: 4.7, count: 126, fetchedAt: "2026年6月13日" },
  "accel-factor": { entity: "株式会社アクセルファクター", rating: 4.3, count: 108, fetchedAt: "2026年6月13日" },
  "best-factor": { entity: "ベストファクター", rating: 3.3, count: 20, fetchedAt: "2026年6月13日" },
  "pmg": { entity: "ピーエムジー株式会社", rating: 4.9, count: 880, fetchedAt: "2026年6月13日" },
  "paytoday": { entity: "PAYTODAY", rating: 4.8, count: 29, fetchedAt: "2026年6月13日" },
  "labol": { entity: "株式会社ラボル", rating: 4.6, count: 1152, fetchedAt: "2026年6月13日" },
  "support-kinyu": { entity: "日本中小企業金融サポート機構", rating: 4.4, count: 152, fetchedAt: "2026年6月13日" },
  "top-management": { entity: "株式会社トップ・マネジメント", rating: 4.5, count: 30, fetchedAt: "2026年6月13日" },
  "mentor-capital": { entity: "株式会社 Mentor Capital", rating: 4.9, count: 27, fetchedAt: "2026年6月13日" },
};

export function getRealRating(slug: string): RealRating | undefined {
  return realRatings[slug];
}
