import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'articles');

export interface Article {
  slug: string;
  title: string;
  keyword: string;
  content: string;
}

function extractTitle(markdown: string): string {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : '記事';
}

function extractKeyword(markdown: string): string {
  const match = markdown.match(/\*\*対策KW:\*\*\s*(.+)$/m);
  return match ? match[1].trim() : '';
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

  const processedContent = await remark()
    .use(html)
    .process(contentMarkdown);

  return {
    slug,
    title,
    keyword,
    content: processedContent.toString(),
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
