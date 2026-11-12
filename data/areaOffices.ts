// 地域ページ（/area/<area>/）の元データ。
//
// 方針（2026年11月12日作成）：
//  - 対象は data/companies.ts の掲載59社のみ。各社の公式サイトの会社概要・拠点一覧（ない場合は公式サイト内の運営会社欄など）を
//    2026年11月12日に開き、その地域（東京都／大阪府／愛知県名古屋市／福岡県）にある拠点だけを載せる。
//  - label（拠点の呼び方）と address（住所）は公式の表記のまま。郵便番号・全角数字・空白も公式どおり。
//  - group: "head" は本社、または会社概要の所在地（本社の表記がない会社）。"branch" は支社・支店・営業所・オフィス・店舗など。
//  - 公式で確かめられなかった会社は載せない。載っていないことは「その地域に拠点がない」という意味ではない。
//  - 評価・順位は付けない。並び順は「本社・所在地 → 支社・支店・営業所など」、同じ区分の中は会社名の読み（companies.ts の nameKana）の五十音順。
//
// 確認できなかった会社（2026年11月12日）：
//  - nishinihon-factor（西日本ファクター）：公式サイトの「会社概要」リンクの行き先が /admin/ を含むURLのため開いていない。
//    トップ・個人情報の取扱いのページには所在地の記載が見当たらなかった。
//  - chatwork-sakibarai（Chatwork 先払い）：サービスページが自動アクセス確認の画面になり、提供会社の記載を確認できなかった。
//  - three-s（スリーエス）：会社概要の拠点は本社・北浦和営業所（いずれも埼玉県さいたま市）。4地域の拠点は会社概要に記載なし。

export type AreaSlug = "tokyo" | "osaka" | "nagoya" | "fukuoka";

export interface AreaOffice {
  label: string; // 公式の拠点名の表記（例：東京本社、大阪支店、所在地）
  address: string; // 公式の住所の表記のまま
  group: "head" | "branch";
  sourceUrl: string; // 確認した公式ページ（ASPの計測リンクではない通常URL）
}

export interface AreaCompanyEntry {
  slug: string; // data/companies.ts の slug
  offices: AreaOffice[]; // その地域にある拠点（公式で確認できたもの）
  note?: string; // 運営会社名の補足や、公式内で表記が分かれる点など
}

export interface AreaDef {
  slug: AreaSlug;
  name: string; // 東京
  scope: string; // 東京都 / 大阪府 / 愛知県名古屋市 / 福岡県
  wardPattern: RegExp; // 住所から区・市を取り出す（地域内の内訳の表示用）
  entries: AreaCompanyEntry[];
}

export const AREA_CHECKED_AT = "2026年11月12日";
export const AREA_SLUGS: AreaSlug[] = ["tokyo", "osaka", "nagoya", "fukuoka"];

const tokyo: AreaCompanyEntry[] = [
  { slug: "be-trading", offices: [{ label: "東京本社", address: "〒105-0012 東京都港区芝大門一丁目2-18 野依ビル3階・4階", group: "head", sourceUrl: "https://betrading.jp/companyinfo/" }] },
  { slug: "ququmo", offices: [{ label: "所在地（運営会社 株式会社アクティブサポート）", address: "〒171-0022 東京都豊島区南池袋2-13-10 南池袋山本ビル3階", group: "head", sourceUrl: "https://ququmo.net/" }] },
  { slug: "accel-factor", offices: [{ label: "東京本社", address: "〒171-0033 東京都豊島区高田 3丁目 32番1号 大東ビル3階", group: "head", sourceUrl: "https://accelfacter.co.jp/company/" }] },
  { slug: "best-factor", offices: [{ label: "東京本社", address: "〒163-1524 東京都新宿区西新宿1-6-1 新宿エルタワー24階", group: "head", sourceUrl: "https://bestfactor.jp/company/" }] },
  {
    slug: "pmg",
    offices: [
      { label: "東京本社", address: "〒163-0825 東京都新宿区西新宿2丁目4番1号 新宿NSビル25F", group: "head", sourceUrl: "https://p-m-g.tokyo/company-info/access/tokyo" },
      { label: "西新宿営業所", address: "〒160-0023 東京都新宿区西新宿3-2-26 立花新宿ビル9階", group: "branch", sourceUrl: "https://p-m-g.tokyo/company-info/access/nishi-shinjuku" },
      { label: "渋谷営業所", address: "〒150-0046 東京都渋谷区松濤2-3-1", group: "branch", sourceUrl: "https://p-m-g.tokyo/company-info/access/shibuya" },
    ],
  },
  { slug: "paytner", offices: [{ label: "住所", address: "〒105-0001 東京都港区虎ノ門五丁目９番１号 麻布台ヒルズ ガーデンプラザB 5F", group: "head", sourceUrl: "https://corp.paytner.co.jp/about" }] },
  { slug: "labol", offices: [{ label: "所在地", address: "〒150-0043 東京都渋谷区道玄坂1-20-8 寿パークビル 7F", group: "head", sourceUrl: "https://labol.co.jp/corp/" }] },
  { slug: "paytoday", offices: [{ label: "本社所在地（運営会社 Dual Life Partners株式会社）", address: "東京都港区南青山2-26-37 VORT外苑前Ⅰ 9F", group: "head", sourceUrl: "https://paytoday.jp/company" }] },
  { slug: "support-kinyu", offices: [{ label: "所在地", address: "〒105-0012 東京都港区芝大門1-2-18-2F（商業登記上の本店所在地：東京都中央区銀座六丁目６番１号）", group: "head", sourceUrl: "https://chushokigyo-support.or.jp/about/outline/" }] },
  { slug: "mf-earlypayment", offices: [{ label: "所在地（マネーフォワードケッサイ株式会社）", address: "〒108-0023 東京都港区芝浦三丁目１番 21 号 msb Tamachi 田町ステーションタワーS 21 階", group: "head", sourceUrl: "https://mfkessai.co.jp/company" }] },
  { slug: "top-management", offices: [{ label: "所在地", address: "〒101-0044 東京都千代田区鍛冶町1-4-3竹内ビル2F", group: "head", sourceUrl: "https://top-management.co.jp/company/" }] },
  { slug: "mentor-capital", offices: [{ label: "住所", address: "〒160-0004 東京都新宿区四谷4-30-13 クロスシー新宿御苑前ビル4F", group: "head", sourceUrl: "https://mentor-capital.jp/company/" }] },
  { slug: "ennavi", offices: [{ label: "所在地", address: "〒103-0023 東京都中央区日本橋本町4-3-4 東海日本橋ビル3階", group: "head", sourceUrl: "https://ennavi.tokyo/company/" }] },
  { slug: "freenance", offices: [{ label: "本社住所（運営会社 freee株式会社）", address: "〒141-0032 東京都品川区大崎1-2-2アートヴィレッジ大崎セントラルタワー 21階", group: "head", sourceUrl: "https://corp.freee.co.jp/company/" }] },
  { slug: "minna-factoring", offices: [{ label: "住所（運営会社 株式会社チェンジ）", address: "東京都中央区 日本橋室町一丁目１１番１２号", group: "head", sourceUrl: "https://change-corp.jp/company/" }], note: "運営会社は公式サイト下部の「運営会社」リンク先（change-corp.jp）で確認" },
  { slug: "yen-today", offices: [{ label: "所在地", address: "東京都品川区上大崎3丁目14番34号プラスワン402", group: "head", sourceUrl: "https://www.yen-today.jp/company.php?ytid=0" }] },
  { slug: "ebank", offices: [{ label: "所在地", address: "〒170-0014 東京都千代田区神田小川町2-3-7-6F", group: "head", sourceUrl: "https://tomodachi-my.com/company/" }] },
  { slug: "invoice-factor", offices: [{ label: "所在地（株式会社アクシアプラス）", address: "〒170-0014 東京都千代田区神田小川町2-3-7-6F", group: "head", sourceUrl: "https://invoice-factor.jp/lp/company.html" }] },
  { slug: "no1", offices: [{ label: "東京本社", address: "〒170-0013 東京都豊島区東池袋1-18-1 Hareza Tower 20F", group: "head", sourceUrl: "https://no1service.co.jp/company/" }] },
  { slug: "ace-trust", offices: [{ label: "所在地", address: "〒105-0003 東京都港区西新橋二丁目６番１号 第二菊家ビル４階", group: "head", sourceUrl: "https://ace-trust.com/company/" }] },
  { slug: "factor-plan", offices: [{ label: "会社所在地（株式会社ワイズコーポレーション）", address: "東京都豊島区池袋2-50-9 第三共立ビル3F", group: "head", sourceUrl: "https://factorplan.net/company.php" }] },
  { slug: "try", offices: [{ label: "所在地", address: "〒110-0015 東京都台東区東上野2-21-1-4Fケーワイビル", group: "head", sourceUrl: "https://www.factoring-try-sko.co.jp/company/" }] },
  { slug: "msfj", offices: [{ label: "本社所在地", address: "〒106-0045 東京都 港区 麻布十番2-8-16 七面坂ビル4階", group: "head", sourceUrl: "https://msfj.co.jp/company/" }] },
  { slug: "levanta", offices: [{ label: "所在地", address: "〒103-0001 東京都中央区日本橋小伝馬町7-10 エムジー小伝馬町ビル4F", group: "head", sourceUrl: "https://www.lebanta.com/company.html" }] },
  { slug: "bion", offices: [{ label: "所在地", address: "〒101-0054 東京都千代田区神田錦町2丁目5番2号", group: "head", sourceUrl: "https://ai-factoring.jp/" }] },
  { slug: "rfd", offices: [{ label: "所在地", address: "東京都千代田区麹町3-1 KOJIMACHI TERRACE 10F", group: "head", sourceUrl: "https://rfd-tokyo.com/%e4%bc%9a%e7%a4%be%e6%a6%82%e8%a6%81/" }] },
  {
    slug: "owl-keizai",
    offices: [
      { label: "本社所在地", address: "〒103-0027 東京都中央区日本橋2-2-3 RISHEビルUCF4階", group: "head", sourceUrl: "https://owl-economy.jp/about.php" },
      { label: "豊島営業所", address: "〒170-0005 東京都豊島区南大塚1-60-20 天翔大塚駅前ビル3階", group: "branch", sourceUrl: "https://owl-economy.jp/about.php" },
    ],
  },
  { slug: "invoice-pay", offices: [{ label: "東京本社（スマートヘッジ株式会社）", address: "〒101-0032 東京都千代田区岩本町3-3-3 秋葉原サザンビル8F", group: "head", sourceUrl: "https://smart-hedge.co.jp/about.html" }] },
  { slug: "kaipoke-early", offices: [{ label: "所在地（株式会社エス・エム・エス フィナンシャルサービス）", address: "東京都港区芝公園2-11-1 住友不動産芝公園タワー", group: "head", sourceUrl: "https://finance.kaipoke.biz/aboutus/" }] },
  { slug: "urikakedo", offices: [{ label: "所在地", address: "〒101-0041 東京都千代田区神田須田町2-2-7 トーハン須田町ビル10", group: "head", sourceUrl: "https://urikakedo.com/company" }] },
  { slug: "kaisoku", offices: [{ label: "本社住所（運営会社 サンドボックス株式会社）", address: "〒171-0022 東京都豊島区南池袋2-19-4 南池袋ビル", group: "head", sourceUrl: "https://kai-soku.jp/company/" }] },
  { slug: "olta", offices: [{ label: "住所", address: "〒107-6004 東京都港区赤坂1-12-32 アーク森ビル 4F", group: "head", sourceUrl: "https://corp.olta.co.jp/about" }] },
  { slug: "gmo-btob-hayabarai", offices: [{ label: "フクラスオフィス（本社）", address: "〒150-0043 東京都渋谷区道玄坂1-2-3 渋谷フクラス（総合受付15階）", group: "head", sourceUrl: "https://www.gmo-pg.com/corp/company/" }], note: "提供会社 GMOペイメントゲートウェイの所在地" },
  { slug: "goodplus", offices: [{ label: "住所", address: "〒169-0075 東京都新宿区高田馬場1丁目29-20 6F", group: "head", sourceUrl: "https://goodplus-service.co.jp/profile/" }] },
  { slug: "next-one", offices: [{ label: "本社", address: "〒101-0047 東京都千代田区内神田3-24-4 9STAGEkanda 6F", group: "head", sourceUrl: "https://next1-one.jp/company.php" }] },
  { slug: "kkt", offices: [{ label: "所在地", address: "〒160-0004 東京都新宿区四谷1-18-6 四谷プラザビル7F", group: "head", sourceUrl: "https://kkt-inc.co.jp/about-company/" }] },
  { slug: "coolpay", offices: [{ label: "所在地（運営会社 株式会社エムライズ）", address: "〒143-0023 東京都大田区山王2-1-8-1003", group: "head", sourceUrl: "https://coolpay.jp/" }] },
  { slug: "jigyoshikin-agent", offices: [{ label: "所在地", address: "〒105-0004 東京都港区新橋4-9-1 新橋プラザビル5F", group: "head", sourceUrl: "https://js-agent.net/company.html" }] },
  { slug: "wit", offices: [{ label: "東京本社", address: "〒141-0031 東京都品川区西五反田2-24-4 THE CROSS GOTANDA 4F", group: "head", sourceUrl: "https://witservice.co.jp/factoring/" }] },
  { slug: "kensetsukun", offices: [{ label: "住所（公式サイト下部・個人情報保護方針の窓口）", address: "〒141-0031 東京都品川区西五反田2-24-4 THE CROSS GOTANDA 4F", group: "head", sourceUrl: "https://xn--y8jd4aybzqd.jp/" }] },
  { slug: "factors", offices: [{ label: "会社所在地（株式会社ワイズコーポレーション）", address: "〒171-0014 東京都豊島区池袋2-50-9 第三共立ビル3F", group: "head", sourceUrl: "https://factors.tokyo/company/" }] },
  { slug: "kensetsu-pay", offices: [{ label: "所在地", address: "〒107-0062 東京都港区南青山2丁目2番15号 Win Aoyamaビル UCF635", group: "head", sourceUrl: "https://kensetsu-pay.com/" }] },
  { slug: "bizpay", offices: [{ label: "運営会社（北海コンサルティング株式会社）の住所", address: "東京都目黒区東山1-11-15 ARK-2-3F", group: "head", sourceUrl: "https://untensupport.com/b-pay/" }] },
  { slug: "mufg-factor", offices: [{ label: "本社・東京第二支社・東京第三支社", address: "東京都千代田区神田淡路町2丁目101番地 ワテラスタワー", group: "head", sourceUrl: "https://www.muf.bk.mufg.jp/company/summary/" }] },
  { slug: "ricoh-lease", offices: [{ label: "本社", address: "〒105-7119 東京都港区東新橋1-5-2 汐留シティセンター19階", group: "head", sourceUrl: "https://www.r-lease.co.jp/corp/branches/" }] },
  { slug: "medley", offices: [{ label: "所在地（株式会社メドレーフィナンシャルサービス）", address: "〒106-6113 東京都港区六本木6-10-1 六本木ヒルズ森タワー 13F", group: "head", sourceUrl: "https://www.medley-fs.co.jp/company" }] },
  { slug: "jps", offices: [{ label: "本社", address: "〒112-0006 東京都文京区小日向4-6-21 ベルメゾン茗荷谷3F", group: "head", sourceUrl: "https://www.jps-tokyo.co.jp/company/" }] },
  { slug: "fps-medical", offices: [{ label: "東京本社", address: "東京都千代田区麹町5-1-1 住友不動産麹町ガーデンタワー", group: "head", sourceUrl: "https://accretive-factoring.jp/company/" }] },
  { slug: "progress", offices: [{ label: "住所", address: "〒110-0015 東京都 台東区東上野3-15-13 スエヒロビル4F", group: "head", sourceUrl: "https://progresstokyo.com/company" }] },
  { slug: "jbl", offices: [{ label: "所在地", address: "〒171-0022 東京都豊島区南池袋二丁目３３番６号 佐藤ビルディング７階", group: "head", sourceUrl: "https://jbl.tokyo/company/" }] },
  { slug: "jtc", offices: [{ label: "東京営業所", address: "東京都中央区日本橋本町3-3-6 ワカ末ビル7階", group: "branch", sourceUrl: "https://j-t-c.info/corporate" }], note: "本社は愛知県名古屋市" },
  { slug: "sokuderu", offices: [{ label: "神田店", address: "〒101-0045 東京都千代田区神田鍛冶町3-7-3 花瀧ビル2F", group: "branch", sourceUrl: "https://www.sokuderu.com/company.html" }], note: "本社は千葉県浦安市（運営会社 株式会社フラップコミュニケーション）" },
];

const osaka: AreaCompanyEntry[] = [
  { slug: "safe-trust", offices: [{ label: "所在地", address: "〒541-0057 大阪府大阪市中央区北久宝寺町3-6-1 本町南ガーデンシティ 7階", group: "head", sourceUrl: "https://safe-trust.co.jp/about/" }] },
  { slug: "escom", offices: [{ label: "本社所在地", address: "〒532-0011 大阪市淀川区西中島3-10-12 サムティ西中島ビル601", group: "head", sourceUrl: "https://scom-f.jp/%e4%bc%9a%e7%a4%be%e6%a6%82%e8%a6%81/" }] },
  { slug: "be-trading", offices: [{ label: "大阪支店", address: "〒530-0027 大阪府大阪市北区堂山町1-5 三共梅田ビル9階", group: "branch", sourceUrl: "https://betrading.jp/companyinfo/" }], note: "本社は東京都港区" },
  { slug: "accel-factor", offices: [{ label: "大阪営業所", address: "〒542-0081 大阪府大阪市中央区南船場3-11-10 心斎橋大陽ビル", group: "branch", sourceUrl: "https://accelfacter.co.jp/company/" }], note: "本社は東京都豊島区" },
  { slug: "best-factor", offices: [{ label: "大阪支社", address: "〒541-0057 大阪府大阪市中央区北久宝寺町3-6-1 本町南ガーデンシティ7階", group: "branch", sourceUrl: "https://bestfactor.jp/company/" }], note: "本社は東京都新宿区" },
  { slug: "pmg", offices: [{ label: "大阪支店", address: "〒532-0003 大阪府大阪市淀川区宮原3-4-30 ニッセイ新大阪ビル18F", group: "branch", sourceUrl: "https://p-m-g.tokyo/company-info/access/osaka" }], note: "本社は東京都新宿区" },
  { slug: "jtc", offices: [{ label: "大阪営業所", address: "大阪府大阪市西区江戸堀2-1-1 江戸堀センタービル9階", group: "branch", sourceUrl: "https://j-t-c.info/corporate" }], note: "本社は愛知県名古屋市" },
  { slug: "kaisoku", offices: [{ label: "大阪支社", address: "大阪府大阪市淀川区西中島7-1-3 6階", group: "branch", sourceUrl: "https://kai-soku.jp/company/" }], note: "本社は東京都豊島区" },
  { slug: "gmo-btob-hayabarai", offices: [{ label: "大阪（所在地一覧）", address: "〒530-0011 大阪市北区大深町3-1 グランフロント大阪タワーB 23階", group: "branch", sourceUrl: "https://www.gmo-pg.com/corp/company/" }], note: "提供会社 GMOペイメントゲートウェイの拠点。本社は東京都渋谷区" },
  { slug: "mufg-factor", offices: [{ label: "大阪支社", address: "大阪市中央区瓦町2丁目1番1号 瓦町三信ビル", group: "branch", sourceUrl: "https://www.muf.bk.mufg.jp/company/summary/" }], note: "本社は東京都千代田区" },
  { slug: "ricoh-lease", offices: [{ label: "関西支社", address: "〒530-0004 大阪府大阪市北区堂島浜2-2-28 堂島アクシスビル12F", group: "branch", sourceUrl: "https://www.r-lease.co.jp/corp/branches/" }], note: "本社は東京都港区" },
  { slug: "jps", offices: [{ label: "大阪支社", address: "〒530-0001 大阪府大阪市北区梅田2-6-20パシフィックマークス西梅田4F", group: "branch", sourceUrl: "https://www.jps-tokyo.co.jp/company/" }], note: "本社は東京都文京区" },
  { slug: "fps-medical", offices: [{ label: "大阪オフィス", address: "〒541-0056 大阪府大阪市中央区久太郎町1-4-8 NTPR堺筋本町ビル(6F) (旧 堺筋本町ガーデンスクエア)", group: "branch", sourceUrl: "https://accretive-factoring.jp/company/" }], note: "本社は東京都千代田区" },
];

const nagoya: AreaCompanyEntry[] = [
  { slug: "jtc", offices: [{ label: "本社住所", address: "愛知県名古屋市中区錦2-17-28 CK15伏見ビル５階", group: "head", sourceUrl: "https://j-t-c.info/corporate" }] },
  { slug: "be-trading", offices: [{ label: "名古屋支店", address: "〒460-0008 愛知県名古屋市中区栄二丁目4-1 広小路栄ビルディング5階", group: "branch", sourceUrl: "https://betrading.jp/companyinfo/" }], note: "本社は東京都港区" },
  { slug: "accel-factor", offices: [{ label: "名古屋営業所", address: "〒460-0002 愛知県名古屋市中区丸の内2-17-13 NK丸の内ビル2F", group: "branch", sourceUrl: "https://accelfacter.co.jp/company/" }], note: "本社は東京都豊島区" },
  { slug: "pmg", offices: [{ label: "名古屋営業所", address: "〒450-0002 愛知県名古屋市中村区名駅4丁目6番23号 名古屋第三堀内ビル9F", group: "branch", sourceUrl: "https://p-m-g.tokyo/company-info/access/nagoya" }], note: "本社は東京都新宿区" },
  { slug: "no1", offices: [{ label: "名古屋支社", address: "〒453-0014 愛知県名古屋市中村区則武2-3−2 サン・オフィス名古屋3F", group: "branch", sourceUrl: "https://no1service.co.jp/company/" }], note: "本社は東京都豊島区" },
  { slug: "mufg-factor", offices: [{ label: "名古屋支社", address: "名古屋市中区錦3丁目21番24号 三菱UFJ銀行名古屋ビル", group: "branch", sourceUrl: "https://www.muf.bk.mufg.jp/company/summary/" }], note: "本社は東京都千代田区" },
  { slug: "ricoh-lease", offices: [{ label: "中部支社", address: "〒451-6008 愛知県名古屋市西区牛島町6-1 名古屋ルーセントタワー8F", group: "branch", sourceUrl: "https://www.r-lease.co.jp/corp/branches/" }], note: "本社は東京都港区" },
  { slug: "fps-medical", offices: [{ label: "名古屋オフィス", address: "〒460-0003 愛知県名古屋市中区錦2-2-2 名古屋丸紅ビル（6F）", group: "branch", sourceUrl: "https://accretive-factoring.jp/company/" }], note: "本社は東京都千代田区" },
];

const fukuoka: AreaCompanyEntry[] = [
  { slug: "trust-gateway", offices: [{ label: "所在地（個人情報保護方針に記載の連絡先）", address: "〒810-0041 福岡県福岡市中央区大名2丁目2番42号", group: "head", sourceUrl: "https://trustgateway.co.jp/privacypolicy/" }], note: "公式サイトの「会社概要」リンクは管理用のURL（/admin/）のため開いておらず、個人情報保護方針のページで確認" },
  { slug: "factoring-zero", offices: [{ label: "所在地", address: "福岡市博多区博多駅東1-1-16第２高田ビル４０２", group: "head", sourceUrl: "https://factoringzero.jp/company/" }] },
  { slug: "be-trading", offices: [{ label: "福岡支店", address: "〒812-0037 福岡県福岡市博多区御供所町2-60 テクニカハウス福岡3階", group: "branch", sourceUrl: "https://betrading.jp/companyinfo/" }], note: "本社は東京都港区" },
  { slug: "best-factor", offices: [{ label: "福岡支社", address: "〒810-0001 福岡県福岡市中央区天神1-9-17 福岡天神フコク生命ビル15階", group: "branch", sourceUrl: "https://bestfactor.jp/company/" }], note: "本社は東京都新宿区" },
  { slug: "pmg", offices: [{ label: "福岡支店", address: "〒812-0012 福岡県福岡市博多区博多駅中央街7番26号 博多駅センタータワー7F", group: "branch", sourceUrl: "https://p-m-g.tokyo/company-info/access/fukuoka" }], note: "本社は東京都新宿区" },
  { slug: "no1", offices: [{ label: "福岡支社", address: "〒812-0011 福岡県福岡市博多区博多駅前1-15-20 NMF博多駅前ビル2F", group: "branch", sourceUrl: "https://no1service.co.jp/company/" }], note: "本社は東京都豊島区" },
  { slug: "gmo-btob-hayabarai", offices: [{ label: "九州（所在地一覧）", address: "〒810-0001 福岡市中央区天神2-8-35 天神住友生命FJビジネスセンター23階", group: "branch", sourceUrl: "https://www.gmo-pg.com/corp/company/" }], note: "提供会社 GMOペイメントゲートウェイの拠点。本社は東京都渋谷区" },
  { slug: "wit", offices: [{ label: "福岡支社", address: "〒812-0013 福岡県福岡市博多区博多駅東2-5-19 サンライフ第3ビル6F", group: "branch", sourceUrl: "https://witservice.co.jp/factoring/" }], note: "本社は東京都品川区" },
  { slug: "mufg-factor", offices: [{ label: "九州支社", address: "福岡県福岡市中央区天神1丁目12番7号 福岡ダイヤモンドビル", group: "branch", sourceUrl: "https://www.muf.bk.mufg.jp/company/summary/" }], note: "本社は東京都千代田区" },
  { slug: "ricoh-lease", offices: [{ label: "九州支社", address: "〒812-0013 福岡県福岡市博多区博多駅東2-10-35 博多プライムイースト3F", group: "branch", sourceUrl: "https://www.r-lease.co.jp/corp/branches/" }], note: "本社は東京都港区" },
  {
    slug: "fps-medical",
    offices: [{ label: "福岡オフィス", address: "〒810-0001 福岡県福岡市中央区天神2-8-49 ヒューリック福岡ビル(8F)", group: "branch", sourceUrl: "https://accretive-factoring.jp/company/" }],
    note: "本社は東京都千代田区。公式の「福岡オフィスのご紹介」ページ（accretive-factoring.jp/company/fukuoka/）では所在地が「福岡県福岡市中央区天神2-14-13 天神三井ビル（5F）」と書かれており、公式内で表記が分かれています。来店の前に公式で確認してください",
  },
];

export const AREAS: Record<AreaSlug, AreaDef> = {
  tokyo: { slug: "tokyo", name: "東京", scope: "東京都", wardPattern: /東京都\s*([^\s0-9０-９]+?[区市])/, entries: tokyo },
  osaka: { slug: "osaka", name: "大阪", scope: "大阪府", wardPattern: /大阪市\s*([^\s0-9０-９]+?区)/, entries: osaka },
  nagoya: { slug: "nagoya", name: "名古屋", scope: "愛知県名古屋市", wardPattern: /名古屋市\s*([^\s0-9０-９]+?区)/, entries: nagoya },
  fukuoka: { slug: "fukuoka", name: "福岡", scope: "福岡県", wardPattern: /福岡市\s*([^\s0-9０-９]+?区)/, entries: fukuoka },
};
