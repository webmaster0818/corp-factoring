import React from "react";
import Link from "next/link";
import { getSubPageIntro } from "@/data/subPageIntro";

// 子ページの「回答」の下に出す、運営会社と会社ページへの導線（data/subPageIntro.ts に登録した組だけ表示）
export function SubPageIntroBox({ slug, kind }: { slug: string; kind: "eigyo-jikan" | "tesuryo" | "shinsa" }) {
  const intro = getSubPageIntro(slug, kind);
  if (!intro) return null;
  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-sm leading-relaxed text-gray-800">{intro.text}</p>
      <p className="mt-2 text-xs leading-relaxed text-gray-500">
        出典：
        {intro.sources.map((s, i) => (
          <React.Fragment key={s.url}>
            {i > 0 && "／"}
            <a href={s.url} target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 underline">{s.label}</a>
          </React.Fragment>
        ))}
      </p>
      <p className="mt-2 text-sm">
        <Link href={`/companies/${slug}/`} className="text-blue-600 underline">{intro.linkLabel} →</Link>
      </p>
    </div>
  );
}
