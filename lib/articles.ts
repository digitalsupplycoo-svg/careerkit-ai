import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  updated: string;
}

export interface Article extends ArticleMeta {
  html: string;
  wordCount: number;
}

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category,
    updated: data.updated,
    readingTime,
    wordCount,
    html: marked.parse(content) as string
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null)
    .map(({ slug, title, description, category, readingTime, updated }) => ({
      slug,
      title,
      description,
      category,
      readingTime,
      updated
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
