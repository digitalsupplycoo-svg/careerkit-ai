import { describe, expect, it } from "vitest";
import { getAllArticles, getArticleBySlug, getArticleSlugs } from "@/lib/articles";

describe("article content library", () => {
  it("has at least 20 articles", () => {
    expect(getArticleSlugs().length).toBeGreaterThanOrEqual(20);
  });

  it("every article has complete, non-empty required frontmatter", () => {
    for (const meta of getAllArticles()) {
      expect(meta.title).toBeTruthy();
      expect(meta.description).toBeTruthy();
      expect(meta.category).toBeTruthy();
      expect(meta.updated).toBeTruthy();
      expect(meta.slug).toBeTruthy();
    }
  });

  it("returns null for a slug that doesn't exist, instead of throwing", () => {
    expect(getArticleBySlug("this-article-does-not-exist")).toBeNull();
  });

  it("computes a plausible word count and reading time for a real article", () => {
    const slug = getArticleSlugs()[0];
    const article = getArticleBySlug(slug);
    expect(article).not.toBeNull();
    expect(article!.wordCount).toBeGreaterThan(50);
    expect(article!.readingTime).toMatch(/\d+ min read/);
  });

  it("renders markdown content to non-empty HTML", () => {
    const slug = getArticleSlugs()[0];
    const article = getArticleBySlug(slug);
    expect(article!.html).toContain("<p>");
  });

  it("has no duplicate slugs", () => {
    const slugs = getArticleSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
