"use server";

import { cookies } from "next/headers";
import { getArticleSlugs } from "@/lib/articles";
import { SESSION_COOKIE_NAME, isSessionValueValid } from "@/lib/adminAuth";
import { slugify, isValidSlug } from "@/lib/slug";
import { buildArticleFileContent } from "@/lib/articleFrontmatter";
import { publishArticleToGitHub } from "@/lib/githubPublish";

export interface PublishState {
  error?: string;
  success?: boolean;
  url?: string;
}

function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function publishArticle(_prevState: PublishState, formData: FormData): Promise<PublishState> {
  // Server Actions are callable directly (not just via the page's redirect
  // guard), so auth is re-checked here regardless of what the New Post page
  // already verified — this is the check that actually matters.
  const session = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!(await isSessionValueValid(session))) {
    return { error: "Your session has expired — please log in again." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();

  if (!title || !description || !category || !body) {
    return { error: "Title, description, category, and body are all required." };
  }

  const slug = requestedSlug || slugify(title, "");
  if (!slug || !isValidSlug(slug)) {
    return { error: "The slug must contain only lowercase letters, numbers, and hyphens (e.g. \"my-article-title\")." };
  }

  // Checked against this deployment's current filesystem checkout, which may
  // be a commit or two behind GitHub's actual main branch (e.g. right after a
  // very recent publish, before the next deploy finishes). GitHub's own
  // Contents API rejects an actual collision with a 422, which
  // lib/githubPublish.ts turns into a clear error below — that's the
  // authoritative check; this one just catches the common case early.
  const existingSlugs = new Set(getArticleSlugs());
  if (existingSlugs.has(slug)) {
    return { error: `An article with the slug "${slug}" already exists — choose a different one.` };
  }

  const fileContent = buildArticleFileContent({
    title,
    description,
    category,
    updated: todayISODate(),
    body
  });

  const result = await publishArticleToGitHub(slug, title, fileContent);
  if (!result.ok) {
    return { error: result.error };
  }

  return { success: true, url: `/articles/${result.slug}` };
}
