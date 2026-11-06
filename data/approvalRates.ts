// 公式サイトに審査通過率の記載がある会社だけを載せる（2026-11-05 宣言・11-06 実行）。
// 診断で「審査の通りやすさ」を選んだときは、この一覧にある会社だけを通過率の高い順に表示し、ほかの会社は出さない。
// value は並べ替え用（「〜以上」「〜超」は記載の数字をそのまま使う）。label は公式の表記どおり。
// 画像の中にしか数字が無い・公式内で数字が食い違う会社は載せない（インボイスファクター・No.1・かいそく）。

export interface ApprovalRate {
  value: number;
  label: string;
  sourceUrl: string;
  checkedAt: string;
}

export const approvalRates: { [slug: string]: ApprovalRate } = {
  "try": { value: 97, label: "97%", sourceUrl: "https://www.factoring-try-sko.co.jp/", checkedAt: "2026年11月6日" },
  "trust-gateway": { value: 93.8, label: "93.8%（直近30日平均）", sourceUrl: "https://trustgateway.co.jp/", checkedAt: "2026年11月6日" },
  "accel-factor": { value: 93, label: "93%超", sourceUrl: "https://accelfacter.co.jp/column/factoring/merit-demerit/", checkedAt: "2026年11月6日" },
  "best-factor": { value: 92.2, label: "92.2%", sourceUrl: "https://bestfactor.jp/", checkedAt: "2026年11月6日" },
  "mentor-capital": { value: 92, label: "92%（2023年1月〜12月実績）", sourceUrl: "https://mentor-capital.jp/", checkedAt: "2026年11月6日" },
  "urikakedo": { value: 92, label: "92%超", sourceUrl: "https://urikakedo.com/question", checkedAt: "2026年11月6日" },
  "ebank": { value: 90, label: "90%以上", sourceUrl: "https://tomodachi-my.com/", checkedAt: "2026年11月6日" },
  "safe-trust": { value: 90, label: "90%以上", sourceUrl: "https://safe-trust.co.jp/", checkedAt: "2026年11月6日" },
  "ace-trust": { value: 90, label: "90%以上", sourceUrl: "https://ace-trust.com/", checkedAt: "2026年11月6日" },
};

export function getApprovalRate(slug: string): ApprovalRate | null {
  return approvalRates[slug] ?? null;
}
