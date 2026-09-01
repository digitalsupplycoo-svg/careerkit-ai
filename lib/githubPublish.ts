// Publishes a new article file to GitHub via the REST Contents API
// (PUT /repos/{owner}/{repo}/contents/{path}), authenticated with a
// server-side-only token. This module is only ever called from the
// "use server" publish action (app/admin/new-post/actions.ts) — it uses
// Buffer, so it must run in the Node.js runtime, never Edge.
//
// Security notes:
// - GITHUB_TOKEN is read from process.env and used only in the Authorization
//   header of the outgoing fetch — it is never included in any returned
//   error message, logged value, or thrown Error.
// - On any failure, only a short, generic, safe-to-display message is
//   returned to the caller. The raw fetch error / response body is never
//   forwarded verbatim (the one exception is GitHub's own `message` field on
//   a JSON error body, which is public API documentation text, not a secret).

export type PublishResult = { ok: true; slug: string } | { ok: false; error: string };

export async function publishArticleToGitHub(
  slug: string,
  title: string,
  fileContent: string
): Promise<PublishResult> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return {
      ok: false,
      error: "GitHub publishing isn't configured on the server — set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO."
    };
  }

  const path = `content/articles/${slug}.md`;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `Add article: ${title}`,
        content: Buffer.from(fileContent, "utf8").toString("base64"),
        branch: "main"
      })
    });
  } catch {
    // Network-level failure (DNS, timeout, offline). Never include the raw
    // error object — it could theoretically stringify request internals.
    return { ok: false, error: "Network error while contacting GitHub. Check your connection and try again." };
  }

  if (response.ok) {
    return { ok: true, slug };
  }

  let githubMessage = "";
  try {
    const body = (await response.json()) as { message?: unknown };
    if (typeof body?.message === "string") githubMessage = body.message;
  } catch {
    // Non-JSON or empty error body — fall back to a status-based message below.
  }

  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      error:
        "GitHub authentication failed — check that GITHUB_TOKEN is set, hasn't expired, and has \"Contents: Read and write\" access to this repository."
    };
  }
  if (response.status === 404) {
    return { ok: false, error: "GitHub repository not found — check GITHUB_OWNER and GITHUB_REPO." };
  }
  if (response.status === 422) {
    // The Contents API returns 422 when PUT-without-`sha` targets a path
    // that already exists — the most common real cause here is a slug
    // collision that slipped past the local filesystem check (e.g. a very
    // recent prior publish this deployment hasn't picked up yet).
    return {
      ok: false,
      error: `A file already exists at content/articles/${slug}.md on the main branch — choose a different slug.`
    };
  }

  return {
    ok: false,
    error: `GitHub API error (status ${response.status})${githubMessage ? `: ${githubMessage}` : "."}`
  };
}
