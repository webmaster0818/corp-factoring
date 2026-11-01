import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

// 会社の審査ページ（/companies/<slug>/shinsa/）の節「審査に落ちる主な理由と次の手」（P4-1・2026年11月2日照合）。
// 本文は shinsa-ochita/<slug>.md。各ファイル末尾の「## 照合用の根拠」は照合用の内部メモで、公開しない。
const dir = path.join(process.cwd(), 'shinsa-ochita');
const HEADING = '## 審査に落ちる主な理由と次の手';
const EVIDENCE = '## 照合用の根拠';

export const SHINSA_OCHITA_TITLE = '審査に落ちる主な理由と次の手';
export const SHINSA_OCHITA_ANCHOR = 'ochita';

export function hasShinsaOchita(slug: string): boolean {
  return fs.existsSync(path.join(dir, `${slug}.md`));
}

export async function getShinsaOchitaHtml(slug: string): Promise<string | null> {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { content } = matter(fs.readFileSync(file, 'utf8'));
  // 照合用の根拠より前だけを使い、節の見出し（ページ側で h2 として出す）を外す
  const body = content.split(EVIDENCE)[0].replace(HEADING, '').trim();
  if (!body) return null;
  const out = await remark().use(gfm, { singleTilde: false }).use(html).process(body);
  return out.toString();
}
