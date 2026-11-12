import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/data/companies";
import { getCompanyDetails } from "@/data/companyDetails";
import { feeIndex, feeCheckedAt, FEE_COMPANY_COUNT } from "@/data/feeIndex";
import { HOURS_SLUGS, HOURS_CHECKED_AT, HOURS_COMPARE_POOL, HOURS_ADDED_20261101 } from "@/data/hoursPages";
import { SUBPAGE_SLUGS, pickFacts } from "@/data/subPages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OtherHoursLinks } from "@/components/OtherHoursLinks";
import { DEFAULT_OG_IMAGES } from "@/lib/og";
import { SubPageIntroBox } from "@/components/SubPageIntroBox";

const SITE = "https://corp-factoring.com";
const PAGE_UPDATED = "2026年8月22日";
const PAGE_UPDATED_ISO = "2026-08-22";

const SLUGS: string[] = [...HOURS_SLUGS];

// 検索で使われる別表記（例：「ピーエムジー 営業時間」）を title/H1 に併記する
// no1：同社が運営する「Easy factor（イージーファクター）」の名前で検索されている（公式「会社概要」で運営会社を2026年11月10日確認）
// support-kinyu：機構が運営するオンラインの FACTOR⁺U（ファクトル）の名前で検索されている（「ファクトル 営業時間」が会社ページに表示・2026年10月27日〜11月7日）
// ququmo・msfj：カタカナ表記（「ククモ 営業時間」「エムエスエフジェイ 営業時間」）で検索されている
const NAME_ALIAS: { [slug: string]: string } = {
  pmg: "PMG（ピーエムジー）",
  no1: "株式会社No.1（イージーファクター）",
  "support-kinyu": "日本中小企業金融サポート機構（ファクトル）",
  ququmo: "QuQuMo（ククモ）",
  msfj: "MSFJ（エムエスエフジェイ）",
};
// 営業時間を再確認したページは最終確認日も更新する
const PAGE_UPDATED_OVERRIDE: { [slug: string]: [string, string] } = {
  pmg: ["2026年10月28日", "2026-10-28"],
  "be-trading": ["2026年10月29日", "2026-10-29"],
  paytner: ["2026年10月28日", "2026-10-28"],
  "support-kinyu": ["2026年10月28日", "2026-10-28"],
  no1: ["2026年10月14日", "2026-10-14"],
  "factor-plan": ["2026年10月14日", "2026-10-14"],
  try: ["2026年10月14日", "2026-10-14"],
  // 2026年11月3日 新規掲載4社
  escom: ["2026年11月3日", "2026-11-03"],
  wit: ["2026年11月3日", "2026-11-03"],
  kensetsukun: ["2026年11月3日", "2026-11-03"],
  factors: ["2026年11月3日", "2026-11-03"],
  // 2026年11月6日 新規掲載6社
  "kensetsu-pay": ["2026年11月6日", "2026-11-06"],
  "bizpay": ["2026年11月6日", "2026-11-06"],
  "chatwork-sakibarai": ["2026年11月6日", "2026-11-06"],
  "mufg-factor": ["2026年11月6日", "2026-11-06"],
  "ricoh-lease": ["2026年11月6日", "2026-11-06"],
  "medley": ["2026年11月6日", "2026-11-06"],
  // 2026年11月10日 新規掲載
  "sokuderu": ["2026年11月10日", "2026-11-10"],
  "jps": ["2026年11月10日", "2026-11-10"],
  "fps-medical": ["2026年11月10日", "2026-11-10"],
  "progress": ["2026年11月10日", "2026-11-10"],
  "jbl": ["2026年11月10日", "2026-11-10"],
};

// 冒頭の即答に足す、会社ごとの公式確認値（受付手段・時間外の扱い）。公式に書かれていることだけを書く
const ANSWER_EXTRA: { [slug: string]: string } = {
  "support-kinyu":
    "電話（0120-162-022）の受付時間も平日9:30〜18:00です。運営するオンラインのFACTOR⁺U（ファクトル）は、Web申請を24時間受け付けますが、営業時間外の申請への対応は翌営業日です。",
  paytner:
    "原則、当日19:00までの申込は当日中に審査結果が連絡され、19:00以降の申請は翌営業日の入金です。審査完了後の振込は土日祝を含む365日、オペレーターの対応は平日10:00〜19:00です。",
  "be-trading":
    "Webフォーム・LINEの利用相談と、ポータルサイトからの審査申込は24時間受け付けていますが、電話の問い合わせと審査・入金は営業時間内のみで、営業時間外・土日の問い合わせや審査依頼への対応は翌営業日です。",
  "best-factor":
    "公式の即日ファクタリングのページでは、土日祝日について「フォームからのご相談は24時間受け付けていますが、審査・契約・振込の実行は営業日や金融機関の処理状況に左右されます。土日祝日の即日入金を前提にせず、次の営業日に向けて早めにご相談ください」と案内されています。",
  ebank:
    "電話の受付時間は公式サイトの画像で表示されています。一方、公式サイトの「ファクタリングでの現金化のながれ」には「お電話・メールどちらでも問題ございませんのでお気軽にご連絡ください。24時間対応可能です。」とも記載されており、ページ内で表記が異なります。",
  "mentor-capital":
    "各ページには「365日24時間 全国対応可能」との記載もありますが、電話以外の受付手段の時間や土日祝の審査・入金の扱いは区別して書かれていません。",
  pmg: "PMG（ピーエムジー）の電話（0120-901-680）は平日・土日・祝日とも8:00〜20:00、Webフォームは24時間受付です。振込時間外に契約が完了した場合は翌営業日の振込です。",
};

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

// 「2026年7月8日」→「2026年7月」
function toMonthLabel(checkedAt: string): string {
  const m = checkedAt.match(/^(\d{4})年(\d{1,2})月/);
  return m ? `${m[1]}年${m[2]}月` : checkedAt;
}

// タイトルの月表記は、確認月がビルド月と同じ場合のみ表示する（古い月表記をタイトルに残さない）
function titleLabel(checkedAt: string): string {
  const now = new Date();
  const current = `${now.getFullYear()}年${now.getMonth() + 1}月`;
  return toMonthLabel(checkedAt) === current ? `【${current}公式確認】` : "【公式確認】";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company || !SLUGS.includes(slug)) return { title: "ページが見つかりません" };
  const h = getCompanyDetails(slug).operatingHours;
  const checkedAt = HOURS_CHECKED_AT[slug] ?? "";
  const title = `${NAME_ALIAS[slug] ?? company.name}の営業時間・受付時間は？土日祝の対応も${titleLabel(checkedAt)}`;
  const description = `${NAME_ALIAS[slug] ?? company.name}の受付時間は公式表示で「${h.weekdays}」。公式サイトで確認した営業時間、土日祝の扱い、営業時間外の申込の扱い、他社との受付時間の比較を掲載しています。掲載情報には確認日を記載しています。`;
  return {
    title,
    description,
    alternates: { canonical: `/companies/${slug}/eigyo-jikan/` },
    openGraph: { title, description, url: `${SITE}/companies/${slug}/eigyo-jikan/`, type: "article", images: DEFAULT_OG_IMAGES },
  };
}

export default async function CompanyHoursPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const h = getCompanyDetails(slug).operatingHours;
  const feeRow = feeIndex.find((f) => f.slug === slug);
  // 入金までの時間が公式に記載されていない会社は「入金スピードは公式表示で〜」と書かず、記載がない旨と審査時間を分けて表示する
  const SPEED_UNDOCUMENTED = "入金までの時間は公式に記載なし";
  const speedLead = feeRow
    ? feeRow.speed.startsWith(SPEED_UNDOCUMENTED)
      ? `${company.name}の入金までの時間は、公式サイトに記載がありません${feeRow.speed.slice(SPEED_UNDOCUMENTED.length)}`
      : `${company.name}の入金スピードは公式表示で「${feeRow.speed}」です`
    : "";
  const checkedAt = HOURS_CHECKED_AT[slug] ?? "";

  // 公式表示から機械的に判定できる範囲だけを条件分岐に使う（推測で断定しない）
  const is24h = /24時間|365日|常時/.test(h.weekdays);
  const weekendExplicit = Boolean(h.saturday || h.sunday || h.holidays);
  const cutoffDocumented = /\d{1,2}[:：]\d{2}まで|時までに|締切/.test(`${h.weekdays}${h.note ?? ""}`);
  const offHoursDocumented = /翌営業日|24時間|365日|常時受付/.test(`${h.weekdays}${h.note ?? ""}`);

  const rows: { k: string; v: string }[] = [
    { k: "平日", v: h.weekdays },
    { k: "土曜", v: h.saturday ?? "公式サイトでは確認できず" },
    { k: "日曜", v: h.sunday ?? "公式サイトでは確認できず" },
    { k: "祝日", v: h.holidays ?? "公式サイトでは確認できず" },
  ];

  const weekendSentence = weekendExplicit
    ? `土曜は${h.saturday ?? "公式サイトでは確認できず"}、日曜は${h.sunday ?? "公式サイトでは確認できず"}${h.holidays ? `、祝日は${h.holidays}` : ""}です。`
    : `土曜・日曜・祝日の個別の受付体制は、公式サイトでは確認できませんでした。`;

  // 公式で確認した受付時間の事実（editorialVerification の「受付時間」「営業時間」「電話受付」等）。
  // 審査ページから移した受付時間の事実を、ここに出典つきで残す（2026-11-10 E4）
  const hoursFacts = pickFacts(slug, /受付|営業時間|年末年始/).filter((f) => !/審査/.test(f.label));
  // 電話番号：受付時間の事実（出典つき）に1つだけ書かれている番号を優先し、なければ営業時間欄に1つだけ書かれている番号を使う。
  // 番号が複数ある会社（サイトにより番号が異なる等）は即答に出さず、下の注記・事実欄に任せる
  const PHONE_RE = /0\d{1,4}-\d{1,4}-\d{3,4}/g;
  const uniq = (a: string[]) => [...new Set(a)];
  const factPhones = uniq(hoursFacts.flatMap((f) => f.value.match(PHONE_RE) ?? []));
  const hoursPhones = uniq(`${h.weekdays} ${h.note ?? ""}`.match(PHONE_RE) ?? []);
  const phone = factPhones.length === 1 ? factPhones[0] : factPhones.length === 0 && hoursPhones.length === 1 ? hoursPhones[0] : undefined;
  const phoneFact = phone ? hoursFacts.find((f) => f.value.includes(phone)) : undefined;
  const phoneDate = phoneFact?.source.match(/\d{4}年\d{1,2}月\d{1,2}日/)?.[0] ?? checkedAt;
  const baseAnswer = `${company.name}の受付時間は公式表示で「${h.weekdays}」です。${weekendSentence}${ANSWER_EXTRA[slug] ?? ""}`;
  const showPhone = Boolean(phone && !baseAnswer.includes(phone));
  // 確認日が営業時間と同じなら文末の確認日にまとめ、違う場合は電話番号の文に自分の確認日を付けて後ろに置く
  const answer =
    showPhone && phoneDate === checkedAt
      ? `${baseAnswer}電話番号は公式表示で ${phone} です。（公式サイト・${checkedAt}確認）`
      : `${baseAnswer}（公式サイト・${checkedAt}確認）${showPhone ? `電話番号は公式表示で ${phone} です（${phoneDate}確認）。` : ""}`;

  const offHoursAnswer =
    is24h || offHoursDocumented
      ? `${company.name}の公式表示は「${h.weekdays}」です。ただし、申込の受付と、実際に審査・入金処理が行われる時間帯が同じとは限りません。本ページの受付時間欄・注記に記載した内容が公式サイトで確認できた範囲で、それ以外の運用（審査担当者が対応する時間帯、休業日の設定など）までは公式サイトでは確認できませんでした（${checkedAt}時点）。`
      : `受付時間外に申し込んだ場合の扱い（Webフォームでの受付の可否、翌営業日の対応となるか等）は、公式サイトでは確認できませんでした（${checkedAt}時点）。確実に当日中の対応を受けたい場合は、公式に表示されている受付時間内にお問い合わせください。`;

  const sokujitsuAnswer = feeRow
    ? `${speedLead}（${feeRow.speedCheckedAt ?? feeCheckedAt}確認）。受付時間は「${h.weekdays}」のため、${
        is24h
          ? "オンラインでの申込は時間帯を問わず可能と公式に表示されていますが、審査・契約の処理が行われる時間帯は公式サイトでは確認できませんでした。"
          : "即日入金を希望する場合は、同日の受付時間内に申込・審査・契約まで完了させることが前提になります。"
      }${
        cutoffDocumented
          ? "即日扱いの締切については、本ページの受付時間欄・注記に記載した公式表示をご確認ください。"
          : `即日扱いとなる申込の締切時刻は公式サイトでは確認できなかったため（${checkedAt}時点）、余裕を持って早い時間帯に申し込み、当日入金の可否を直接確認することをおすすめします。`
      }`
    : `即日入金の可否・締切時刻は公式サイトでは確認できませんでした（${checkedAt}時点）。公式サイトで直接ご確認ください。`;

  const faqs = [
    { question: `${company.name}の営業時間・受付時間は？`, answer },
    {
      question: `${company.name}は土日祝も対応していますか？`,
      answer: `${weekendSentence}${
        weekendExplicit && /休業|定休/.test(`${h.saturday ?? ""}${h.sunday ?? ""}${h.holidays ?? ""}`)
          ? "土日に急ぎで資金化したい場合は、24時間365日受付を掲げる会社など、休日に対応している会社を検討する方法もあります（各社の受付体制は、公式サイトで確認した内容を本ページの比較表に掲載しています）。"
          : "各社の受付体制は会社によって大きく異なるため、本ページの比較表に掲載した、公式サイトで確認した内容もあわせてご確認ください。"
      }`,
    },
    { question: `${company.name}に営業時間外に申し込んだ場合、どのように扱われますか？`, answer: offHoursAnswer },
    { question: `${company.name}で即日入金を受けるにはいつ申し込めばよいですか？`, answer: sokujitsuAnswer },
  ];

  const compareRows = HOURS_COMPARE_POOL.filter((s) => s !== slug)
    .slice(0, 5)
    .map((s) => {
      const c = getCompanyBySlug(s);
      const oh = getCompanyDetails(s).operatingHours;
      return { slug: s, name: c?.name ?? s, hours: oh.weekdays, sat: oh.saturday };
    })
    .filter((r) => Boolean(getCompanyBySlug(r.slug)));

  // 比較表の注記に出す確認日の範囲（表に載せた会社の HOURS_CHECKED_AT から算出する）
  const toKey = (d: string) => {
    const m = d.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日/);
    return m ? Number(m[1]) * 10000 + Number(m[2]) * 100 + Number(m[3]) : 0;
  };
  const compareDates = [slug, ...compareRows.map((r) => r.slug)]
    .map((s) => HOURS_CHECKED_AT[s])
    .filter((d): d is string => Boolean(d))
    .sort((a, b) => toKey(a) - toKey(b));
  const compareDateRange =
    compareDates.length === 0
      ? ""
      : compareDates[0] === compareDates[compareDates.length - 1]
        ? compareDates[0]
        : `${compareDates[0]}〜${compareDates[compareDates.length - 1]}`;

  const displayName = NAME_ALIAS[slug] ?? company.name;
  const [pageUpdated, pageUpdatedIso] =
    PAGE_UPDATED_OVERRIDE[slug] ??
    (HOURS_ADDED_20261101.includes(slug) ? ["2026年11月1日", "2026-11-01"] : [PAGE_UPDATED, PAGE_UPDATED_ISO]);
  const pageTitle = `${displayName}の営業時間・受付時間は？土日祝の対応も${titleLabel(checkedAt)}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: `${company.name}の営業時間・受付時間を公式サイトで確認した内容をもとに解説しています。土日祝の扱い、営業時間外の申込の扱い、他社との比較も掲載しています。`,
    dateModified: pageUpdatedIso,
    author: { "@type": "Organization", name: "ファクタリング比較ナビ", url: `${SITE}/about` },
    publisher: {
      "@type": "Organization",
      name: "ファクタリング比較ナビ",
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/companies/${slug}/eigyo-jikan/` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: company.name, item: `${SITE}/companies/${slug}/` },
      { "@type": "ListItem", position: 3, name: "営業時間・受付時間", item: `${SITE}/companies/${slug}/eigyo-jikan/` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-xs text-gray-500">
          <Link href="/" className="hover:underline">ホーム</Link> ＞{" "}
          <Link href={`/companies/${slug}/`} className="hover:underline">{company.name}</Link> ＞ 営業時間・受付時間
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {displayName}の営業時間・受付時間（土日祝の対応）
        </h1>
        <p className="mt-2 text-xs text-gray-500">
          最終確認日：{pageUpdated}（営業時間の公式サイト確認日：{checkedAt}）
        </p>

        {/* 結論の即答（H1直下） */}
        <div className="mt-5 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="text-sm font-bold text-blue-900">回答</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">{answer}</p>
        </div>
        <SubPageIntroBox slug={slug} kind="eigyo-jikan" />

        {/* 営業時間・定休日の詳細 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の営業時間・定休日（公式サイトで確認）</h2>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {rows.map((r) => (
                  <tr key={r.k} className="border-b border-gray-100 last:border-0">
                    <th className="w-24 bg-gray-50 px-3 py-2.5 text-left font-semibold text-gray-700">{r.k}</th>
                    <td className="px-3 py-2.5 text-gray-800">{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {h.note && <p className="mt-3 text-xs leading-relaxed text-gray-500">※{h.note}</p>}
          {hoursFacts.length > 0 && (
            <>
              <h3 className="mt-5 text-base font-bold text-gray-900">公式サイトで確認した受付時間の記載（出典）</h3>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-gray-800">
                {hoursFacts.map((f, i) => (
                  <li key={i}>
                    ・<strong>{f.label}</strong>：{f.value}
                    <span className="block text-xs text-gray-500">出典：{f.source}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            ※本ページの営業時間は{company.name}公式サイトを当サイトが{checkedAt}に確認したものです。公式サイトに記載がない項目は「公式サイトでは確認できず」と記載しています。最新の受付時間は
            <a href={company.url} target="_blank" rel="sponsored nofollow noopener" className="text-blue-600 underline">公式サイト</a>
            でご確認ください。
          </p>
        </section>

        {/* 申込〜入金の時間帯の目安 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">申込から入金までの時間帯の目安</h2>
          {feeRow ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {feeRow.speed.startsWith(SPEED_UNDOCUMENTED) ? `${speedLead}（${feeRow.speedCheckedAt ?? feeCheckedAt}確認）。` : <>{company.name}の入金スピードは公式表示で「<strong>{feeRow.speed}</strong>」です（{feeRow.speedCheckedAt ?? feeCheckedAt}確認）。</>}
                受付時間は「{h.weekdays}」で、申込から契約までのオンライン完結は「{feeRow.online}」です。
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {is24h
                  ? "オンラインでの申込は時間帯を問わず可能と公式に表示されていますが、審査・契約の処理が何時から何時まで行われるかは公式サイトでは確認できませんでした。"
                  : "即日入金を希望する場合は、同日の受付時間内に申込・審査・契約まで完了させることが前提になります。"}
              </p>
              {SUBPAGE_SLUGS.includes(slug) && (
                <p className="mt-3 text-sm leading-relaxed text-gray-800">
                  審査時間・必要書類・審査の対象は審査ページにまとめています：
                  <Link href={`/companies/${slug}/shinsa/`} className="text-blue-600 underline">{company.name}の審査時間・必要書類 →</Link>
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-gray-800">
                {cutoffDocumented
                  ? "即日扱いの締切時刻については、上の受付時間欄・注記に記載した公式表示をご確認ください。条件の詳細は、公式サイトにて直接ご確認ください。"
                  : `なお、即日扱いとなる申込の締切時刻は公式サイトでは確認できませんでした（${checkedAt}時点）。日程に余裕がない場合は、午前中など早い時間帯に申し込み、当日入金の可否を担当者に直接確認することをおすすめします。`}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-gray-800">
              入金スピード・即日扱いの締切時刻は公式サイトでは確認できませんでした（{checkedAt}時点）。公式サイトで直接ご確認ください。
            </p>
          )}
        </section>

        {/* 営業時間外の申し込みの扱い */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">営業時間外・土日祝の申し込みの扱い</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{weekendSentence}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">{offHoursAnswer}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-800">
            土日祝の受付・対応を希望する場合は、24時間365日受付を掲げる会社を含めて比較することをおすすめします。以下の比較表に、当サイトが公式サイトで確認した各社の受付時間を掲載しています。
          </p>
          <p className="mt-3 text-sm">
            <Link href="/articles/article-factoring-donichi/" className="text-blue-600 underline">ファクタリングの土日対応：土日祝に審査・入金できる会社と平日のみの会社 →</Link>
          </p>
        </section>

        {/* 他社との営業時間比較 */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">他社との営業時間の比較（公式サイトで確認）</h2>
          <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">会社名</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">営業時間・受付</th>
                  <th className="px-3 py-2.5 text-left font-bold text-gray-700">土曜</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="px-3 py-2.5 font-bold text-gray-900">{company.name}</td>
                  <td className="px-3 py-2.5 text-gray-800">{h.weekdays}</td>
                  <td className="px-3 py-2.5 text-gray-800">{h.saturday ?? "公式では確認できず"}</td>
                </tr>
                {compareRows.map((r) => (
                  <tr key={r.slug} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-2.5 font-medium text-gray-900">
                      <Link href={`/companies/${r.slug}/`} className="text-blue-600 hover:underline">{r.name}</Link>
                    </td>
                    <td className="px-3 py-2.5 text-gray-800">{r.hours}</td>
                    <td className="px-3 py-2.5 text-gray-800">{r.sat ?? "公式では確認できず"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-gray-500">
            ※各社の営業時間は当サイトが各社の公式サイトで確認した内容です（確認日は{compareDateRange}・会社により異なります）。「公式では確認できず」は、公式サイトに記載がなかった項目です。
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">{company.name}の営業時間に関するよくある質問</h2>
          <div className="mt-3 space-y-5">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-bold text-gray-900">Q. {f.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">A. {f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 親ページへの導線 */}
        <OtherHoursLinks currentSlug={slug} />

        <section className="mt-8 rounded-lg bg-gray-50 p-5">
          <p className="text-sm font-bold text-gray-800">関連ページ</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>・<Link href={`/companies/${slug}/`} className="text-blue-600 underline">{company.name}の口コミ・評判・会社概要</Link></li>
            {SUBPAGE_SLUGS.includes(slug) && (
              <>
                <li>・<Link href={`/companies/${slug}/shinsa/`} className="text-blue-600 underline">{company.name}の審査時間・必要書類</Link></li>
                <li>・<Link href={`/companies/${slug}/tesuryo/`} className="text-blue-600 underline">{company.name}の手数料</Link></li>
              </>
            )}
            <li>・<Link href="/fees/" className="text-blue-600 underline">ファクタリング{FEE_COMPANY_COUNT}社の手数料・最短入金の比較（公式サイトで確認）</Link></li>
            <li>・<Link href="/#comparison" className="text-blue-600 underline">ファクタリング会社の比較一覧</Link></li>
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link href={`/companies/${slug}/`} className="text-sm font-bold text-blue-600 hover:underline">
            ← {company.name}の詳細ページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
