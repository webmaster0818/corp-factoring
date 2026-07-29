// ファクタリング19社の手数料・入金スピード等を各社公式サイトで一次確認（確認日 2026年7月21日。前回7月7日。jtc/yen-todayは2026年7月29日追加確認）。
// 公式に明示のない手数料率は「非公示（要見積もり）」と正直に記載。月次で再確認して更新する。

export interface FeeIndexRow {
  slug: string;
  name: string;
  fee2: string;   // 2社間手数料（公式表示）
  fee3: string;   // 3社間手数料（公式表示）
  speed: string;  // 最短入金
  amount: string; // 利用可能額
  target: string; // 対象
  online: string; // オンライン完結
}

export const feeCheckedAt = "2026年7月21日";

export const feeIndex: FeeIndexRow[] = [
  { slug: "be-trading", name: "ビートレーディング", fee2: "4〜12%", fee3: "2〜9%", speed: "最短2時間", amount: "1万円〜無制限（実績7億円）", target: "法人・個人・フリーランス", online: "可（クラウドサイン）" },
  { slug: "ququmo", name: "QuQuMo", fee2: "1%〜（上限は公式非公表）", fee3: "非対応", speed: "最短2時間", amount: "上限なし", target: "法人・個人・フリーランス", online: "可" },
  { slug: "accel-factor", name: "アクセルファクター", fee2: "1〜12%", fee3: "0.5〜10.5%", speed: "最短3時間（即日）", amount: "30万円〜無制限", target: "法人・個人事業主", online: "可（遠方はオンライン）" },
  { slug: "best-factor", name: "ベストファクター", fee2: "2%〜（下限のみ）", fee3: "非公示（要見積もり）", speed: "最短即日〜3営業日", amount: "30万円〜1億円", target: "法人・個人", online: "不可（契約時に面談要）" },
  { slug: "pmg", name: "PMG", fee2: "個別査定（買取率98%表記＝手数料2%相当。率は非公示）", fee3: "個別査定", speed: "最短即日", amount: "50万円〜上限なし（最大2億円）", target: "法人中心", online: "可" },
  { slug: "paytner", name: "ペイトナー", fee2: "一律10%", fee3: "―", speed: "最短10分・即日", amount: "1万円〜（初回上限30万円）", target: "個人事業主・一人法人", online: "可（面談不要）" },
  { slug: "labol", name: "ラボル", fee2: "一律10%", fee3: "―", speed: "審査最短60分・24時間365日入金", amount: "1万円〜", target: "フリーランス・個人", online: "可（Web完結）" },
  { slug: "paytoday", name: "PayToday", fee2: "1〜9.5%", fee3: "―", speed: "最短30分", amount: "10万円〜上限なし", target: "法人・個人・フリーランス", online: "可（AI審査）" },
  { slug: "support-kinyu", name: "日本中小企業金融サポート機構", fee2: "1.5%〜（下限のみ）", fee3: "「2者間より低手数料」（率は非公示）", speed: "最短3時間", amount: "実績1万円〜2億円", target: "法人・個人事業主", online: "可（クラウドサイン）" },
  { slug: "mf-earlypayment", name: "マネーフォワード 早期入金", fee2: "0.5%〜（下限のみ）", fee3: "―", speed: "最短即日", amount: "数万円〜数億円", target: "法人のみ（個人不可）", online: "可" },
  { slug: "top-management", name: "トップ・マネジメント", fee2: "3.5%〜（3.5〜12.5%）", fee3: "0.5%〜", speed: "最短即日", amount: "上限：売掛先1社1億円／総額3億円", target: "法人・個人事業主", online: "可（電ふぁく）" },
  { slug: "mentor-capital", name: "メンターキャピタル", fee2: "非公示（要見積もり／買取率最大98%表記）", fee3: "非公示", speed: "最短即日", amount: "公式では確認できず", target: "法人・個人", online: "確認できず" },
  { slug: "ennavi", name: "えんナビ", fee2: "非公示（要見積もり）", fee3: "非公示", speed: "最短1日", amount: "50万円〜5,000万円", target: "法人・個人事業主", online: "可" },
  { slug: "freenance", name: "FREENANCE（フリーナンス）", fee2: "3〜10%（受取口座の指定なしは一律10%）", fee3: "―", speed: "最短5分", amount: "1万円〜（上限額なし・審査）", target: "フリーランス・個人", online: "可" },
  { slug: "minna-factoring", name: "みんなのファクタリング", fee2: "公式では確認できず（JS描画のため取得不可）", fee3: "確認できず", speed: "最短60分", amount: "公式では確認できず", target: "法人・個人・フリーランス限定", online: "可" },
  { slug: "jtc", name: "JTC", fee2: "1.2〜10%（2社間/3社間の内訳は公式非明記）", fee3: "対応あり（率の内訳は非明記）", speed: "最短即日", amount: "100万円〜上限なし（売掛金の範囲内）", target: "法人・個人事業主（個人は売掛先の承諾前提）", online: "可（契約は事前予約制・出張対応あり）" },
  { slug: "yen-today", name: "¥Today（エントゥデイ）", fee2: "一括申込サービス自体は無料（手数料は紹介先3社の個別査定）", fee3: "―", speed: "最短30分で振込完了", amount: "紹介先による", target: "法人専用（個人事業主・フリーランス不可）", online: "可（Web完結）" },
  { slug: "ebank", name: "いーばんく（アクシアプラス）", fee2: "4%〜（下限のみ・上限は要問い合わせ）", fee3: "対応あり（率の内訳は要問い合わせ）", speed: "最短即日（平均2.3日と公式表示）", amount: "公式では確認できず", target: "公式明示なし（要問い合わせ）", online: "確認できず（24時間対応と公式表示）" },
  { slug: "invoice-factor", name: "インボイスファクター", fee2: "公式LPでは確認できず（要問い合わせ）", fee3: "確認できず", speed: "最短即日（公式LP「即日入金」表示）", amount: "公式では確認できず", target: "公式明示なし（要問い合わせ）", online: "確認できず" },
];
