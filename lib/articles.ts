import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm'; // Markdown の表を <table> に（無いと表が | 区切りの文字のまま出ていた）
import { getLastmod, getFirstCommitDate } from './pageDates';

// 「**…「売却」**という点」のように、閉じの ** の直前が約物・直後が文字だと Markdown の強調にならず ** がそのまま出る。
// 変換前に、1行の中の ** を左から順に組にして目印の文字（私用領域 U+E000/U+E001）に置き換え、HTML にしたあとで <strong> に戻す（コードブロック内は対象外）
const BOLD_OPEN = '\uE000';
const BOLD_CLOSE = '\uE001';
function markBold(md: string): string {
  let inCode = false;
  return md.split('\n').map((line) => {
    if (/^\s*```/.test(line)) { inCode = !inCode; return line; }
    if (inCode) return line;
    return line.replace(/\*\*([^*\n]+?)\*\*/g, `${BOLD_OPEN}$1${BOLD_CLOSE}`);
  }).join('\n');
}
function restoreBold(htmlStr: string): string {
  return htmlStr.split(BOLD_OPEN).join('<strong>').split(BOLD_CLOSE).join('</strong>');
}

// 記事内の SVG 図に width/height を付ける（レイアウトのずれ防止）。値は SVG ファイル自身の width/height 属性から読む
function addSvgSize(htmlStr: string): string {
  return htmlStr.replace(/<img src="(\/images\/[^"]+\.svg)"([^>]*?)>/g, (m, src: string, rest: string) => {
    if (/\swidth=/.test(rest)) return m;
    try {
      const svg = fs.readFileSync(path.join(process.cwd(), 'public', src), 'utf8').slice(0, 600);
      const w = svg.match(/<svg[^>]*\swidth="(\d+(?:\.\d+)?)"/);
      const h = svg.match(/<svg[^>]*\sheight="(\d+(?:\.\d+)?)"/);
      if (!w || !h) return m;
      return `<img src="${src}"${rest} width="${w[1]}" height="${h[1]}">`;
    } catch {
      return m;
    }
  });
}

const articlesDirectory = path.join(process.cwd(), 'articles');

export interface Article {
  slug: string;
  title: string;
  keyword: string;
  description?: string;
  content: string;
  datePublished: string;
  dateModified: string;
  faqs: { question: string; answer: string }[];
}

function extractFaqs(markdown: string): { question: string; answer: string }[] {
  // Find the FAQ section (## よくある質問 ...) and parse Q/A pairs
  const faqSectionMatch = markdown.match(/##\s*よくある質問[\s\S]*?$/);
  if (!faqSectionMatch) return [];
  const section = faqSectionMatch[0];
  const faqs: { question: string; answer: string }[] = [];
  const lines = section.split('\n');
  let currentQ: string | null = null;
  let currentA: string[] = [];
  for (const [i, line] of lines.entries()) {
    // FAQ 見出しの次の h2（## まとめ 等）や区切り線で終了（以前は記事末尾まで最後の回答に連結されていた）
    if (i > 0 && (/^##\s/.test(line) || /^---\s*$/.test(line))) break;
    const qm = line.match(/^\*\*Q:\s*(.+?)\*\*/);
    const am = line.match(/^A:\s*(.+)$/);
    if (qm) {
      if (currentQ) faqs.push({ question: currentQ, answer: currentA.join(' ').trim() });
      currentQ = qm[1].trim();
      currentA = [];
    } else if (am && currentQ) {
      currentA.push(am[1].trim());
    } else if (currentQ && line.trim() && !line.startsWith('#') && !line.startsWith('**Q:')) {
      currentA.push(line.trim());
    }
  }
  if (currentQ) faqs.push({ question: currentQ, answer: currentA.join(' ').trim() });
  return faqs.filter(f => f.question && f.answer);
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : '記事';
}

function extractKeyword(markdown: string): string {
  const match = markdown.match(/\*\*対策KW:\*\*\s*(.+)$/m);
  return match ? match[1].trim() : '';
}

// 任意: 記事冒頭メタに「**メタdescription:** ...」があれば meta description に使う
function extractDescription(markdown: string): string | undefined {
  const match = markdown.match(/\*\*メタdescription:\*\*\s*(.+)$/m);
  return match ? match[1].trim() : undefined;
}

function extractContent(markdown: string): string {
  // Remove the metadata section (everything before the first ---)
  const parts = markdown.split(/\n---\n/);
  if (parts.length > 1) {
    // Return everything after the first ---
    return parts.slice(1).join('\n---\n').trim();
  }
  return markdown;
}

export function getAllArticleSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const title = extractTitle(fileContents);
  const keyword = extractKeyword(fileContents);
  const contentMarkdown = extractContent(fileContents);
  const faqs = extractFaqs(fileContents);

  const processedContent = await remark()
    .use(gfm, { singleTilde: false }) // 「1~12%」のような範囲表記が取り消し線にならないように
    .use(html)
    .process(markBold(contentMarkdown));

  return {
    slug,
    title,
    keyword,
    description: extractDescription(fileContents),
    content: restoreBold(addSvgSize(processedContent.toString())),
    datePublished: getFirstCommitDate(`articles/${slug}.md`) ?? '',
    dateModified: getLastmod(`/articles/${slug}/`) ?? '',
    faqs,
  };
}

export function getAllArticles(): { slug: string; title: string; keyword: string }[] {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return {
      slug,
      title: extractTitle(fileContents),
      keyword: extractKeyword(fileContents),
    };
  });
}
