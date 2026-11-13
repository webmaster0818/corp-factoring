import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { factoringCompanies, type FactoringCompany } from "@/data/companies";
import { AREAS, AREA_SLUGS, AREA_CHECKED_AT, type AreaDef, type AreaSlug, type AreaCompanyEntry } from "@/data/areaOffices";
import { getConditionRows } from "@/data/conditions";
import { DEFAULT_OG_IMAGES } from "@/lib/og";

const SITE = "https://corp-factoring.com";
const TOTAL = factoringCompanies.length;
const collator = new Intl.Collator("ja");

type Row = AreaCompanyEntry & { company: FactoringCompany; isHead: boolean };

// 並び順：本社・所在地がこの地域にある会社 → 支社・支店・営業所などだけがある会社。同じ区分の中は会社名の読みの五十音順（評価による順位ではない）
function rowsOf(area: AreaDef): Row[] {
  return area.entries
    .map((e) => {
      const company = factoringCompanies.find((c) => c.slug === e.slug);
      if (!company) throw new Error(`areaOffices: unknown slug ${e.slug}`);
      return { ...e, company, isHead: e.offices.some((o) => o.group === "head") };
    })
    .sort((a, b) => (a.isHead === b.isHead ? collator.compare(a.company.nameKana, b.company.nameKana) : a.isHead ? -1 : 1));
}

// 住所から区（東京は区・市）を取り出し、拠点の数を数える
function wardCounts(area: AreaDef): [string, number][] {
  const m = new Map<string, number>();
  for (const e of area.entries)
    for (const o of e.offices) {
      const w = o.address.match(area.wardPattern)?.[1];
      if (w) m.set(w, (m.get(w) ?? 0) + 1);
    }
  return [...m.entries()].sort((a, b) => b[1] - a[1] || collator.compare(a[0], b[0]));
}

function summary(area: AreaDef) {
  const rows = rowsOf(area);
  const head = rows.filter((r) => r.isHead);
  const branch = rows.filter((r) => !r.isHead);
  const officeCount = area.entries.reduce((n, e) => n + e.offices.length, 0);
  return { rows, head, branch, officeCount, wards: wardCounts(area) };
}

function getArea(slug: string): AreaDef | undefined {
  return (AREA_SLUGS as string[]).includes(slug) ? AREAS[slug as AreaSlug] : undefined;
}

function titleOf(area: AreaDef, n: number) {
  return `${area.name}に拠点があるファクタリング会社${n}社｜本社・支店の所在地を公式で確認`;
}

function descriptionOf(area: AreaDef) {
  const s = summary(area);
  const names = s.rows.slice(0, 3).map((r) => r.company.name).join("・");
  const top = s.wards.slice(0, 2).map(([w, n]) => `${w}${n}か所`).join("・");
  return `当サイト掲載${TOTAL}社のうち、${area.scope}に本社・支社・支店・営業所などがあると公式サイトで確認できた${s.rows.length}社（本社・所在地${s.head.length}社、支社・営業所など${s.branch.length}社）を、公式表記の住所と出典つきで掲載。${names}など。拠点は${top}が多い（${AREA_CHECKED_AT}確認）。`;
}

export async function generateStaticParams() {
  return AREA_SLUGS.map((area) => ({ area }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "ページが見つかりません" };
  const n = area.entries.length;
  const title = titleOf(area, n);
  const description = descriptionOf(area);
  return {
    title,
    description,
    alternates: { canonical: `/area/${area.slug}/` },
    openGraph: { title: `${title}｜ファクタリング比較ナビ`, description, type: "article", images: DEFAULT_OG_IMAGES },
  };
}

function OfficeCard({ row }: { row: Row }) {
  const c = row.company;
  return (
    <li className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
        <Link href={`/companies/${c.slug}/`} className="text-lg font-bold text-blue-700 hover:underline">
          {c.name}
        </Link>
        <span className="text-xs text-gray-500">会社ページへ</span>
      </div>
      <dl className="space-y-3">
        {row.offices.map((o) => (
          <div key={o.label + o.address} className="text-sm">
            <dt className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                  o.group === "head" ? "bg-[#1B3A5C] text-white" : "bg-blue-50 text-blue-800 border border-blue-200"
                }`}
              >
                {o.group === "head" ? "本社・所在地" : "支社・支店・営業所など"}
              </span>
              <span className="font-semibold text-gray-800">{o.label}</span>
            </dt>
            <dd className="text-gray-900 break-words">{o.address}</dd>
            <dd className="text-xs text-gray-500 mt-1 break-all">
              出典：
              <a href={o.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
                {o.sourceUrl.replace(/^https?:\/\//, "").replace(/%e4%bc%9a%e7%a4%be%e6%a6%82%e8%a6%81\/$/i, "会社概要/")}
              </a>
              （{AREA_CHECKED_AT}確認）
            </dd>
          </div>
        ))}
      </dl>
      {row.note && <p className="text-xs text-gray-600 mt-3 leading-relaxed">※{row.note}</p>}
    </li>
  );
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const s = summary(area);
  const n = s.rows.length;
  const online = getConditionRows("article-online-factoring")?.rows.length ?? 0;
  const others = AREA_SLUGS.filter((a) => a !== area.slug).map((a) => AREAS[a]);
  const url = `${SITE}/area/${area.slug}/`;
  const multi = s.rows.filter((r) => r.offices.length > 1);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${SITE}/` },
      // 「地域」の一覧ページ（/area/）は作っていないため、構造化データは2階層にする（/#area のようなページ内リンクは公開前チェックで不合格になる）
      { "@type": "ListItem", position: 2, name: `${area.name}のファクタリング会社`, item: url },
    ],
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${area.scope}に拠点があるファクタリング会社`,
    numberOfItems: n,
    itemListElement: s.rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.company.name,
      url: `${SITE}/companies/${r.company.slug}/`,
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />

      <div className="bg-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
          <nav className="crumbs" aria-label="パンくず">
            <Link href="/" className="hover:text-gray-700 transition">ホーム</Link>
            {" > "}
            <Link href="/#area" className="hover:text-gray-700 transition">地域</Link>
            {" > "}
            <span className="text-gray-600">{area.name}</span>
          </nav>
        </div>
      </div>

      <section className="page-head pt-6 pb-10 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="page-label mb-3">地域別｜{area.scope}（{AREA_CHECKED_AT}に各社の公式サイトで確認）</p>
          <h1 className="text-[24px] sm:text-[30px] font-bold text-ink leading-[1.45] tracking-[0.01em] mb-4">
            {area.name}に拠点があるファクタリング会社{n}社
          </h1>
          <p className="text-gray-700 leading-relaxed mb-3">
            当サイトに掲載している{TOTAL}社のうち、{area.scope}に本社または支社・支店・営業所などがあると公式サイトで確認できたのは
            <strong>{n}社</strong>です。内訳は、本社（会社概要の所在地を含む）が{area.scope}にある会社が{s.head.length}社、
            支社・支店・営業所などだけがある会社が{s.branch.length}社です。拠点の数は合わせて{s.officeCount}か所です。
          </p>
          {s.wards.length > 0 && (
            <p className="text-gray-700 leading-relaxed">
              住所を区{area.slug === "tokyo" ? "・市" : ""}ごとに数えると、
              {s.wards.map(([w, c], i) => (
                <span key={w}>
                  {i > 0 && "、"}
                  {w}が{c}か所
                </span>
              ))}
              です。
            </p>
          )}
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <section className="mb-10 bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-3">掲載の基準と並び順</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>
              各社の公式サイトの会社概要・拠点一覧（ない会社は公式サイト内の運営会社の欄）を{AREA_CHECKED_AT}に開き、{area.scope}にある拠点だけを載せています。拠点の呼び方と住所は公式の表記のままです。
            </li>
            <li>
              並び順は「本社・所在地が{area.scope}にある会社」→「支社・支店・営業所などがある会社」の順で、同じ区分の中は会社名の五十音順です。評価や手数料による順位ではありません。
            </li>
            <li>
              公式サイトで確認できなかった会社は載せていません。ここに載っていない会社が{area.scope}に拠点を持っていないという意味ではありません。
            </li>
            <li>来店での相談を受け付けているか、どの地域を担当しているかは拠点ごとに異なる場合があります。訪問の前に各社へ問い合わせてください。</li>
          </ul>
        </section>

        {s.head.length > 0 && (
          <section className="mb-10">
            <h2 className="section-title section-title-sm mb-3">
              本社（会社概要の所在地）が{area.scope}にある会社（{s.head.length}社）
            </h2>
            <p className="text-sm text-gray-600 mb-4">会社概要で本社または所在地として書かれている住所が{area.scope}にある会社です。</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {s.head.map((r) => (
                <OfficeCard key={r.slug} row={r} />
              ))}
            </ul>
          </section>
        )}

        {s.branch.length > 0 && (
          <section className="mb-10">
            <h2 className="section-title section-title-sm mb-3">
              {area.scope}に支社・支店・営業所などがある会社（{s.branch.length}社）
            </h2>
            <p className="text-sm text-gray-600 mb-4">本社は{area.scope}の外にあり、{area.scope}には支社・支店・営業所などを置いている会社です。</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {s.branch.map((r) => (
                <OfficeCard key={r.slug} row={r} />
              ))}
            </ul>
          </section>
        )}

        {multi.length > 0 && (
          <section className="mb-10 bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{area.scope}に複数の拠点がある会社</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              {multi.map((r) => (
                <li key={r.slug}>
                  {r.company.name}：{r.offices.map((o) => o.label).join("・")}（{r.offices.length}か所）
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-10 bg-blue-50 rounded-lg border border-blue-100 p-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">近くに拠点がない場合</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            来店や面談をせずにオンラインで契約まで進められると公式サイトで確認できた会社は、当サイト掲載{TOTAL}社のうち{online}社です。
            <Link href="/articles/article-online-factoring/" className="text-blue-700 underline font-semibold ml-1">
              オンラインで完結できるファクタリング会社の一覧
            </Link>
            もあわせてご覧ください。
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">ほかの地域</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={`/area/${a.slug}/`}
                className="px-4 py-2 bg-white border border-blue-200 rounded-md text-blue-700 text-sm hover:bg-blue-50 transition"
              >
                {a.name}のファクタリング会社（{a.entries.length}社）
              </Link>
            ))}
            <Link href="/#ranking" className="px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-700 text-sm hover:bg-gray-50 transition">
              掲載{TOTAL}社の一覧
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
