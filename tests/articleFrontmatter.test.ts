import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { buildArticleFileContent } from "@/lib/articleFrontmatter";

const BASE_INPUT = {
  title: "How to Ask for a Raise",
  description: "A practical guide to asking for a raise with evidence, not ultimatums.",
  category: "Salary & Offers",
  updated: "2026-09-15",
  body: "This is the article body.\n\n## A heading\n\nMore text here."
};

describe("buildArticleFileContent", () => {
  it("produces frontmatter that gray-matter (the site's real parser) parses back correctly", () => {
    const file = buildArticleFileContent(BASE_INPUT);
    const { data, content } = matter(file);

    expect(data.title).toBe(BASE_INPUT.title);
    expect(data.description).toBe(BASE_INPUT.description);
    expect(data.category).toBe(BASE_INPUT.category);
    expect(data.updated).toBe(BASE_INPUT.updated);
    expect(Array.isArray(data.related)).toBe(true);
    expect(data.related).toHaveLength(0);
    expect(data.relatedTool).toBe("");
    expect(content.trim()).toBe(BASE_INPUT.body.trim());
  });

  it("safely escapes double quotes in title/description/category", () => {
    const file = buildArticleFileContent({
      ...BASE_INPUT,
      title: 'The "Right" Way to Negotiate',
      description: 'A guide with "quoted" terms.',
      category: 'Weird "Category"'
    });
    const { data } = matter(file);
    expect(data.title).toBe('The "Right" Way to Negotiate');
    expect(data.description).toBe('A guide with "quoted" terms.');
    expect(data.category).toBe('Weird "Category"');
  });

  it("safely escapes backslashes", () => {
    const file = buildArticleFileContent({ ...BASE_INPUT, title: "C:\\Users\\example path" });
    const { data } = matter(file);
    expect(data.title).toBe("C:\\Users\\example path");
  });

  it("trims trailing whitespace from the body but keeps a single trailing newline", () => {
    const file = buildArticleFileContent({ ...BASE_INPUT, body: "Body with trailing space.   \n\n\n" });
    expect(file.endsWith("Body with trailing space.\n")).toBe(true);
  });

  it("matches the real field set used by lib/articles.ts's ArticleMeta", () => {
    const file = buildArticleFileContent(BASE_INPUT);
    const { data } = matter(file);
    // Same keys getArticleBySlug() reads: title, description, category, updated, related, relatedTool.
    expect(Object.keys(data).sort()).toEqual(
      ["category", "description", "related", "relatedTool", "title", "updated"].sort()
    );
  });
});
