import Link from "next/link";
import { getCompanyBySlug } from "@/data/companies";
import { HOURS_LINK_SLUGS } from "@/data/hoursPages";

// 営業時間子ページ同士の相互導線（公式一次確認済みの他社の営業時間ページ）
export function OtherHoursLinks({ currentSlug }: { currentSlug: string }) {
  const items = HOURS_LINK_SLUGS.filter((s) => s !== currentSlug)
    .map((s) => ({ slug: s, company: getCompanyBySlug(s) }))
    .filter((x) => x.company);
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-gray-900">他社の営業時間・受付時間</h2>
      <p className="mt-2 text-sm text-gray-600">公式サイトで営業時間を一次確認した他社のページです。</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
        {items.map(({ slug, company }) => (
          <li key={slug}>
            ・<Link href={`/companies/${slug}/eigyo-jikan/`} className="text-blue-600 underline">{company!.name}の営業時間</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
