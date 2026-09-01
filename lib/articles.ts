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
  /** Slugs of 2+ related articles, for internal linking. */
  related: string[];
  /** Slug of the most relevant tool, for internal linking. */
  relatedTool: string;
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
    related: Array.isArray(data.related) ? data.related : [],
    relatedTool: data.relatedTool ?? "",
    readingTime,
    wordCount,
    html: marked.parse(content) as string
  };
}

/** Unique, sorted list of every category currently used across content/articles/ — powers the admin New Post form's category dropdown. */
export function getAllCategories(): string[] {
  const categories = new Set(getAllArticles().map((a) => a.category));
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== null)
    .map(({ slug, title, description, category, readingTime, updated, related, relatedTool }) => ({
      slug,
      title,
      description,
      category,
      readingTime,
      updated,
      related,
      relatedTool
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
