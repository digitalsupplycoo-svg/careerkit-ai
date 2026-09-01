// Builds a complete content/articles/<slug>.md file's contents from the
// admin New Post form's fields, in exactly the shape lib/articles.ts (via
// gray-matter) expects — same field names, same double-quoted-scalar YAML
// style already used by every hand-written file in content/articles/.

export interface NewArticleInput {
  title: string;
  description: string;
  category: string;
  /** YYYY-MM-DD */
  updated: string;
  body: string;
}

function yamlDoubleQuoted(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * `related` and `relatedTool` aren't exposed as fields in the New Post form
 * (the brief's field list is title/description/category/body only), so they
 * default to empty here. Both are already optional and safely defaulted in
 * lib/articles.ts (`related` -> `[]`, `relatedTool` -> `""`) — an article
 * published this way just won't show a "Related guides" block until someone
 * edits the file by hand to add them later.
 */
export function buildArticleFileContent(input: NewArticleInput): string {
  const frontmatter = [
    "---",
    `title: ${yamlDoubleQuoted(input.title)}`,
    `description: ${yamlDoubleQuoted(input.description)}`,
    `category: ${yamlDoubleQuoted(input.category)}`,
    `updated: ${yamlDoubleQuoted(input.updated)}`,
    "related: []",
    `relatedTool: ""`,
    "---",
    ""
  ].join("\n");

  return `${frontmatter}${input.body.trim()}\n`;
}
