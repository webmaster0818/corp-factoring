// ファクタリング24社の手数料・入金スピード等を各社公式サイトで一次確認（確認日 2026年7月21日。前回7月7日。jtc/yen-todayは2026年7月29日追加確認。A8提携9社＝paytner/mentor-capital/ebank/invoice-factor/no1/safe-trust/ace-trust/factor-plan/try の行は2026年10月14日に再確認して更新。support-kinyu/yen-today は2026年10月16日に再確認。be-trading/best-factor の手数料と accel-factor の利用可能額は2026年10月17日に再確認して更新。best-factor の入金スピードと ennavi の手数料も2026年10月17日に再確認して更新）。
// 再確認した行は recheck に確認日と項目を入れて /fees/ の表に表示する。speedCheckedAt は入金スピードを確認した日（営業時間ページに表示）。
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
  recheck?: string; // feeCheckedAt 以降に再確認した行の確認日と項目（/fees/ の表に表示）
  speedCheckedAt?: string; // 入金スピード（speed）を確認した日。未設定は feeCheckedAt
}

export const feeCheckedAt = "2026年7月21日";

export const feeIndex: FeeIndexRow[] = [
  { slug: "be-trading", name: "ビートレーディング", fee2: "4%〜（上限は公式に記載なし。2024年度平均10.3%）", fee3: "2%〜（上限は公式に記載なし。2024年度平均6.8%）", speed: "最短2時間", amount: "1万円〜無制限（実績7億円）", target: "法人・個人・フリーランス", online: "可（クラウドサイン）", recheck: "2026年10月17日再確認（手数料・入金）", speedCheckedAt: "2026年10月17日" },
  { slug: "ququmo", name: "QuQuMo", fee2: "1%〜（上限は公式非公表）", fee3: "非対応", speed: "最短2時間", amount: "上限なし", target: "法人・個人・フリーランス", online: "可" },
  { slug: "accel-factor", name: "アクセルファクター", fee2: "1〜12%", fee3: "0.5〜10.5%", speed: "最短即日（審査最短1時間）", amount: "公式に記載なし", target: "法人・個人事業主", online: "可（遠方はオンライン）", recheck: "2026年10月17日再確認（利用可能額）" },
  { slug: "best-factor", name: "ベストファクター", fee2: "2〜20%（買取金額で変動・公式の目安表）", fee3: "2〜15%（買取金額で変動・公式の目安表）", speed: "最短6時間（2社間・必要書類が揃っている場合。3社間は数日〜1週間程度）", amount: "30万円〜1億円（公式FAQ。トップには「10万円〜」の表記あり）", target: "法人・個人", online: "不可（契約時に面談要）", recheck: "2026年10月17日再確認（手数料・入金・利用可能額）", speedCheckedAt: "2026年10月17日" },
  { slug: "pmg", name: "PMG", fee2: "個別査定（買取率98%表記＝手数料2%相当。率は非公示）", fee3: "個別査定", speed: "最短即日", amount: "50万円〜上限なし（最大2億円）", target: "法人中心", online: "可" },
  { slug: "paytner", name: "ペイトナー", fee2: "一律10%（別途振込手数料330円）", fee3: "―", speed: "最短即日（審査は毎日10:00〜19:00）", amount: "1万円〜（初回50万円・実績に応じ最大300万円）", target: "個人事業主・一人法人（法人も可）", online: "可（面談不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "labol", name: "ラボル", fee2: "一律10%", fee3: "―", speed: "最短30分・24時間365日入金", amount: "1万円〜（上限は審査で個別設定）", target: "フリーランス・個人", online: "可（Web完結）" },
  { slug: "paytoday", name: "PayToday", fee2: "1〜9.5%", fee3: "―", speed: "最短30分", amount: "10万円〜上限なし", target: "法人・個人・フリーランス", online: "可（AI審査）" },
  { slug: "support-kinyu", name: "日本中小企業金融サポート機構", fee2: "1.5%〜（下限のみ）", fee3: "「2者間より低手数料」（率は非公示）", speed: "最短3時間（FACTOR⁺Uは最短40分）", amount: "下限上限なし（実績1万円〜2億円）", target: "法人・個人事業主", online: "可（クラウドサイン）", recheck: "2026年10月16日再確認", speedCheckedAt: "2026年10月16日" },
  { slug: "mf-earlypayment", name: "マネーフォワード 早期入金", fee2: "0.5%〜（下限のみ）", fee3: "―", speed: "最短即日", amount: "数万円〜数億円", target: "法人のみ（個人不可）", online: "可" },
  { slug: "top-management", name: "トップ・マネジメント", fee2: "3.5%〜（3.5〜12.5%）", fee3: "0.5%〜", speed: "最短即日", amount: "上限：売掛先1社1億円／総額3億円", target: "法人・個人事業主", online: "可（電ふぁく）" },
  { slug: "mentor-capital", name: "メンターキャピタル", fee2: "非公示（要見積もり／買取率最大98%表記）", fee3: "非公示", speed: "最短即日（査定結果は最短30分）", amount: "公式では確認できず", target: "法人・個人", online: "可（クラウド・来社・訪問から選択／対面・来社不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "ennavi", name: "えんナビ", fee2: "5%〜（上限は公式に記載なし）", fee3: "非公示", speed: "最短1日", amount: "30万円〜5,000万円", target: "法人（個人事業主は要問い合わせ）", online: "可", recheck: "2026年10月17日再確認（手数料・入金・利用可能額）", speedCheckedAt: "2026年10月17日" },
  { slug: "freenance", name: "FREENANCE（フリーナンス）", fee2: "3〜10%（受取口座の指定なしは一律10%）", fee3: "―", speed: "最短5分", amount: "1万円〜（上限額なし・審査）", target: "フリーランス・個人", online: "可" },
  { slug: "minna-factoring", name: "みんなのファクタリング", fee2: "公式では確認できず（JS描画のため取得不可）", fee3: "確認できず", speed: "最短60分", amount: "公式では確認できず", target: "法人・個人・フリーランス限定", online: "可" },
  { slug: "jtc", name: "JTC", fee2: "1.2〜10%（2社間/3社間の内訳は公式非明記）", fee3: "対応あり（率の内訳は非明記）", speed: "最短即日", amount: "100万円〜上限なし（売掛金の範囲内）", target: "法人・個人事業主（個人は売掛先の承諾前提）", online: "可（契約は事前予約制・出張対応あり）" },
  { slug: "yen-today", name: "¥Today（エントゥデイ）", fee2: "一括申込サービス自体は無料（手数料は紹介先3社の個別査定。公式の手数料体系は1〜12%）", fee3: "―", speed: "最短30分で振込完了", amount: "紹介先による", target: "法人専用（個人事業主・フリーランス不可）", online: "可（Web完結）", recheck: "2026年10月16日再確認", speedCheckedAt: "2026年10月16日" },
  { slug: "ebank", name: "いーばんく（アクシアプラス）", fee2: "4%〜（下限のみ・上限は要問い合わせ）", fee3: "対応あり（率の内訳は要問い合わせ）", speed: "最短即日（スピードプラン。平均2.3日と公式表示）", amount: "最大2,000万円（リーズナブルプランは最大50万円）", target: "公式明示なし（要問い合わせ）", online: "確認できず（24時間対応と公式表示）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "invoice-factor", name: "インボイスファクター", fee2: "0.5%〜（公式LP表示・上限は記載なし）", fee3: "対応（率の区分は公式LPで確認できず）", speed: "最短2時間（平均調達日数2.3日とも公式LP表示）", amount: "無制限（公式LPの比較表表記）", target: "公式明示なし（要問い合わせ）", online: "可（非対面／対面／郵送から選択）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "no1", name: "株式会社No.1", fee2: "0.5〜15%", fee3: "0.5〜5%", speed: "最短30分", amount: "50万円〜3億円（売掛先1社あたりは基本5,000万円まで）", target: "法人・個人事業主", online: "可（電子契約。手順ページには来社・訪問の記載も）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "safe-trust", name: "セーフトラスト", fee2: "非公示（債権内容により個別決定）", fee3: "確認できず（公式は2者間を明記）", speed: "最短即日（審査最短15分・契約後15分〜1時間で振込）", amount: "請求書額面20万円〜最大1億円", target: "法人・個人事業主", online: "可（オンライン完結）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "ace-trust", name: "エーストラスト", fee2: "5〜15%以内（公式「ご利用の流れ」表示。トップの「1%〜」は3社間の下限）", fee3: "1.0〜4.9%以内", speed: "最短2時間", amount: "売掛先1社5,000万円まで（審査により1億円）", target: "原則法人（個人事業主は公式内で表記が分かれる）", online: "可（INBUYS・クラウドサイン・来店不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "factor-plan", name: "ファクタープラン", fee2: "非公示（「明朗手数料」表記のみ・要見積もり）", fee3: "対応（率は非公示）", speed: "最短即日", amount: "50万円〜5,000万円", target: "法人限定", online: "可（クラウドサイン電子契約）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "try", name: "ファクタリングのTRY", fee2: "3%〜（下限のみ）", fee3: "1.2%〜（下限のみ）", speed: "最短2時間（オンライン契約）", amount: "10万円〜1億円（以上は相談可）", target: "法人・個人事業主", online: "可（クラウドサイン）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
];
