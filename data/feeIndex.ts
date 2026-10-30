// ファクタリング24社の手数料・入金スピード等を各社公式サイトで一次確認（確認日 2026年7月21日。前回7月7日。jtc/yen-todayは2026年7月29日追加確認。A8提携9社＝paytner/mentor-capital/ebank/invoice-factor/no1/safe-trust/ace-trust/factor-plan/try の行は2026年10月14日に再確認して更新。support-kinyu/yen-today は2026年10月16日に再確認。be-trading/best-factor の手数料と accel-factor の利用可能額は2026年10月17日に再確認して更新。best-factor の入金スピードと ennavi の手数料も2026年10月17日に再確認して更新。accel-factor の入金スピードと best-factor の契約方法（online）は2026年10月18日に再確認して更新。mf-earlypayment・jtc の行は2026年10月30日に再確認して更新）。
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
  { slug: "ququmo", name: "QuQuMo", fee2: "1%〜（上限は公式非公表）", fee3: "非対応（公式は2社間ファクタリング）", speed: "最短2時間", amount: "上限なし", target: "法人・個人事業主・フリーランス", online: "可" },
  { slug: "accel-factor", name: "アクセルファクター", fee2: "1〜12%", fee3: "0.5〜10.5%", speed: "最短2時間（公式コラム。審査結果は最短1時間・公式FAQ）", amount: "30万円〜3億円（公式コラム）", target: "法人・個人事業主", online: "可（遠方はオンライン）", recheck: "2026年10月25日再確認（入金スピード・利用可能額＝公式コラム「法人向けファクタリングおすすめ20選」accelfacter.co.jp/column/factoring/factoring-corporation/）", speedCheckedAt: "2026年10月25日" },
  { slug: "best-factor", name: "ベストファクター", fee2: "2〜20%（買取金額で変動・公式の目安表）", fee3: "2〜15%（買取金額で変動・公式の目安表）", speed: "最短6時間（2社間・必要書類が揃っている場合。3社間は数日〜1週間程度）", amount: "30万円〜1億円（公式FAQ。トップには「10万円〜」の表記あり）", target: "法人・個人", online: "公式内で記載が異なる（トップは「オンライン完結可能・来店不要」、FAQは「契約時に面談が必要」）", recheck: "2026年10月17日再確認（手数料・入金・利用可能額）・10月18日再確認（契約方法）", speedCheckedAt: "2026年10月17日" },
  { slug: "pmg", name: "PMG", fee2: "個別査定（率は非公示。公式に「買取率は98%」「掛け目は通常97〜92%」の表記）", fee3: "個別査定", speed: "最短即日", amount: "50万円〜上限なし（最大2億円）", target: "法人中心", online: "可" },
  { slug: "paytner", name: "ペイトナー", fee2: "一律10%（別途振込手数料330円）", fee3: "―", speed: "最短即日（審査は毎日10:00〜19:00）", amount: "1万円〜（初回50万円・実績に応じ最大300万円）", target: "個人事業主・一人法人（法人も可）", online: "可（面談不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "labol", name: "ラボル", fee2: "一律10%", fee3: "―", speed: "最短30分・振込は24時間365日（審査は除く）", amount: "1万円〜（上限は審査で個別設定）", target: "フリーランス・個人事業主・小規模事業者（法人アカウントあり）", online: "可（Web完結）", recheck: "2026年10月26日再確認", speedCheckedAt: "2026年10月26日" },
  { slug: "paytoday", name: "PayToday", fee2: "1〜9.5%", fee3: "―", speed: "最短30分", amount: "10万円〜上限なし", target: "法人・個人・フリーランス", online: "可（AI審査）" },
  { slug: "support-kinyu", name: "日本中小企業金融サポート機構", fee2: "1.5%〜（下限のみ）", fee3: "「2者間より低手数料」（率は非公示）", speed: "最短3時間（FACTOR⁺Uは最短40分）", amount: "下限上限なし（実績1万円〜2億円）", target: "法人・個人事業主", online: "可（クラウドサイン）", recheck: "2026年10月16日再確認", speedCheckedAt: "2026年10月16日" },
  { slug: "mf-earlypayment", name: "マネーフォワード 早期入金", fee2: "0.5%〜（上限は公式に記載なし。公式トップ『その他の費用は発生しません』）", fee3: "非対応（公式は2者間ファクタリング）", speed: "最短即日（公式トップ・必要書類提出後の目安。公式FAQは申込から平均3〜5営業日・条件確定の翌営業日に振込）", amount: "数万円〜数億円（公式トップの目安。FAQでは最低・上限金額は申込ごとの審査で判断）", target: "法人のみ（個人事業主は利用不可・公式FAQ）", online: "可（原則オンライン完結・面談は原則不要）", recheck: "2026年10月30日再確認（手数料・入金・利用可能額・対象・契約方法＝公式トップ・よくあるご質問 mfkessai.co.jp/fast-receivables/faq）", speedCheckedAt: "2026年10月30日" },
  { slug: "top-management", name: "トップ・マネジメント", fee2: "3.5%〜（上限は公式に記載なし）", fee3: "0.5%〜", speed: "最短即日", amount: "上限：売掛先1社1億円／総額3億円", target: "法人・個人事業主", online: "可（電ふぁく）" },
  { slug: "mentor-capital", name: "メンターキャピタル", fee2: "非公示（要見積もり／買取率最大98%表記）", fee3: "非公示", speed: "最短即日（査定結果は最短30分）", amount: "公式では確認できず", target: "法人・個人", online: "可（クラウド・来社・訪問から選択／対面・来社不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "ennavi", name: "えんナビ", fee2: "5%〜（上限は公式に記載なし）", fee3: "非公示", speed: "最短1日", amount: "30万円〜5,000万円", target: "法人・個人事業主（ennavi.tokyo の表示）", online: "可", recheck: "2026年10月17日再確認（手数料・入金・利用可能額）。対象は2026年10月19日確認", speedCheckedAt: "2026年10月17日" },
  { slug: "freenance", name: "FREENANCE（フリーナンス）", fee2: "3〜10%（受取口座の指定なしは一律10%）", fee3: "―", speed: "最短5分", amount: "1万円〜（上限額なし・審査）", target: "フリーランス・個人", online: "可" },
  { slug: "minna-factoring", name: "みんなのファクタリング", fee2: "非公示（サービスサイト・利用規約・運営会社の事業紹介に記載なし）", fee3: "非対応（2社間限定・運営会社の事業紹介）", speed: "最短60分", amount: "公式に記載なし", target: "事業主（公式「事業主様向け」）", online: "可" },
  { slug: "jtc", name: "JTC", fee2: "1.2〜10%（公式トップの比較表『取引先に知らせない場合の手数料率』）", fee3: "対応あり（率は公式に記載なし。公式は『取引先から事前に承諾が得られる方が手数料は安くなります』と記載）", speed: "最短即日（公式トップのFAQ。公式FAQページは『最短1日』。いずれも必要書類がそろっていることが前提）", amount: "100万円〜上限なし（売掛金の範囲内）", target: "法人・個人事業主（年商7,000万円以上・掛売り取引がある企業。個人事業主は取引先の承諾が必要）", online: "可（初回は原則対面・面談が難しい場合はオンライン契約に対応。契約は事前予約制・出張対応あり）", recheck: "2026年10月30日再確認（手数料・入金・利用可能額・対象・契約方法＝公式トップ・よくある質問 j-t-c.info/faq/）", speedCheckedAt: "2026年10月30日" },
  { slug: "yen-today", name: "¥Today（エントゥデイ）", fee2: "一括申込サービス自体は無料（手数料は紹介先3社の個別査定。公式の手数料体系は1〜12%）", fee3: "―", speed: "最短30分で振込完了", amount: "紹介先による", target: "法人専用（個人事業主・フリーランス不可）", online: "可（Web完結）", recheck: "2026年10月16日再確認", speedCheckedAt: "2026年10月16日" },
  { slug: "ebank", name: "いーばんく（アクシアプラス）", fee2: "4%〜（下限のみ・上限は要問い合わせ）", fee3: "対応あり（率の内訳は要問い合わせ）", speed: "最短即日（スピードプラン。平均2.3日と公式表示）", amount: "最大2,000万円（リーズナブルプランは最大50万円）", target: "公式明示なし（要問い合わせ）", online: "確認できず（24時間対応と公式表示）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "invoice-factor", name: "インボイスファクター", fee2: "0.5%〜（公式LP表示・上限は記載なし）", fee3: "対応（率の区分は公式LPで確認できず）", speed: "最短2時間（平均調達日数2.3日とも公式LP表示）", amount: "無制限（公式LPの比較表表記）", target: "公式明示なし（要問い合わせ）", online: "可（非対面／対面／郵送から選択）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "no1", name: "株式会社No.1", fee2: "0.5〜15%", fee3: "0.5〜5%", speed: "最短30分", amount: "50万円〜3億円（売掛先1社あたりは基本5,000万円まで）", target: "法人・個人事業主", online: "可（電子契約。手順ページには来社・訪問の記載も）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "safe-trust", name: "セーフトラスト", fee2: "非公示（債権内容により個別決定）", fee3: "確認できず（公式は2者間を明記）", speed: "最短即日（審査最短15分・契約後15分〜1時間で振込）", amount: "請求書額面20万円〜最大1億円", target: "法人・個人事業主", online: "可（オンライン完結）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "ace-trust", name: "エーストラスト", fee2: "5〜15%以内（公式「ご利用の流れ」表示。トップの「1%〜」は3社間の下限）", fee3: "1.0〜4.9%以内", speed: "最短2時間", amount: "売掛先1社5,000万円まで（審査により1億円）", target: "原則法人（個人事業主は公式内で表記が分かれる）", online: "可（INBUYS・クラウドサイン・来店不要）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "factor-plan", name: "ファクタープラン", fee2: "非公示（「明朗手数料」表記のみ・要見積もり）", fee3: "対応（率は非公示）", speed: "最短即日", amount: "50万円〜5,000万円", target: "法人限定", online: "可（クラウドサイン電子契約）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
  { slug: "try", name: "ファクタリングのTRY", fee2: "3%〜（下限のみ）", fee3: "1.2%〜（下限のみ）", speed: "最短2時間（オンライン契約）", amount: "10万円〜1億円（以上は相談可）", target: "法人・個人事業主", online: "可（クラウドサイン）", recheck: "2026年10月14日再確認", speedCheckedAt: "2026年10月14日" },
];
