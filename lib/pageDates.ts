import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 表示用の更新日・構造化データの日付の出どころ。
//  - 更新日：public/sitemap.xml の lastmod（本文を変えたときに更新する運用の値）。
//    以前はファイルの更新時刻（チェックアウトのたびに変わる）と、表示の固定文字列「2026年4月」を使っていた。
//  - 公開日：git でそのファイルが最初に追加されたコミットの日付。取れない場合は出さない。

let lastmodMap: Map<string, string> | null = null;

function loadLastmod(): Map<string, string> {
  if (lastmodMap) return lastmodMap;
  lastmodMap = new Map();
  const xml = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
  for (const m of xml.matchAll(/<loc>https:\/\/corp-factoring\.com([^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    lastmodMap.set(m[1], m[2].trim());
  }
  return lastmodMap;
}

// "/articles/foo/" → "2026-10-23"
export function getLastmod(pathname: string): string | undefined {
  return loadLastmod().get(pathname);
}

// "2026-10-23" → "2026年10月23日"
export function toJaDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[1]}年${Number(m[2])}月${Number(m[3])}日` : iso;
}

export function getFirstCommitDate(relPath: string): string | undefined {
  try {
    const out = execSync(`git log --diff-filter=A --follow --format=%as -- "${relPath}"`, {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
      .split('\n')
      .filter(Boolean);
    return out.length ? out[out.length - 1] : undefined;
  } catch {
    return undefined;
  }
}
