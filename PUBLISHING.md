# Publishing an article — day-to-day guide

This covers the `/admin/new-post` page: how to log in, write a post, and publish it without touching git or markdown files by hand. For the site's broader launch/AdSense checklist, see `LAUNCH-CHECKLIST.md`.

---

## 1. First-time setup (one time only)

Before this page works at all, four environment variables need real values wherever the site is hosted (e.g. Vercel → Project Settings → Environment Variables). `.env.example` documents each one — never commit real values to git.

1. **`ADMIN_PASSWORD`** — pick a long, unique password. It's not just compared on login; it's also the signing key for your session cookie, so treat it like any other secret.
2. **`GITHUB_OWNER`** — your GitHub username.
3. **`GITHUB_REPO`** — `careerkit-ai`.
4. **`GITHUB_TOKEN`** — a GitHub **fine-grained personal access token**, created specifically for this:
   - GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
   - **Repository access: "Only select repositories"** → choose this one repo only. Do **not** choose "All repositories."
   - **Permissions → Repository permissions → Contents: Read and write.** Leave every other permission at "No access."
   - Set an expiration (GitHub will let you pick up to a year, or a custom date) — see rotation notes below for what to do when it expires.
   - Copy the token immediately; GitHub only shows it once.

   **Why the scoping matters:** this token is a real secret with write access to your repository. A fine-grained token scoped to one repo and one permission means that if it ever leaks (committed by accident, exposed in a log, etc.), the damage is contained to "someone can write files to this one repo's `content/` folder" — not "someone has access to your entire GitHub account." A classic PAT or an org-wide fine-grained token would turn a leak into a much bigger incident. Don't reuse this token for anything else.

After setting all four, redeploy so the running app picks them up.

---

## 2. Writing and publishing a post

1. Go to `https://yourdomain.com/admin/login` and enter `ADMIN_PASSWORD`.
2. You're redirected to `/admin/new-post`. Fill in:
   - **Title** — the auto-generated slug updates as you type, until you edit the slug field yourself (after that, it stops following the title).
   - **URL slug** — shown live as `/articles/<slug>`. You'll see a warning if it's not in the right shape (lowercase/numbers/hyphens only) or if it collides with an existing article.
   - **Description** — becomes the page's meta description.
   - **Category** — pick an existing one, or choose "+ Add new category…" to type a new one.
   - **Body** — Markdown. The word count updates live; under 350 words, you'll see a note that the article won't carry an ad slot until it's longer (matches the site's existing thin-content safeguard) — you can still publish anyway if you choose to.
   - **Preview** — toggles between the editable textarea and the article rendered through the site's real Markdown pipeline (the same `marked.parse()` call the live article page uses), so what you see is what will actually render.
3. Click **Publish**. This commits a new file to `content/articles/<slug>.md` directly on your repo's `main` branch via the GitHub API — there's no draft state and no review step in between.
4. On success, you'll see a link to the new article's URL. **It is not live yet at that moment** — your host's auto-deploy (e.g. Vercel watching the repo) needs to pick up the new commit and finish a build first, typically a minute or two. If you click the link immediately and get a 404, that's expected; try again shortly.
5. On failure, the exact problem is shown (wrong/expired token, repo not found, a slug that already exists on GitHub, or a network error) — nothing fails silently.

**Logging out:** click "Log out" on the New Post page any time; your session also expires on its own after 7 days.

---

## 3. Known limitations (by design, not bugs)

- **No draft/edit/delete UI.** This tool only creates new files. To edit or remove a published article, do it the normal way (edit the `.md` file directly and commit/push, or use GitHub's own web editor).
- **The slug-collision check can be a commit or two stale.** It checks the current deployment's filesystem, which may lag slightly behind GitHub's actual `main` branch right after a very recent publish. If that happens, GitHub itself will reject the commit with a clear "file already exists" error instead of silently overwriting anything.
- **Login rate-limiting is per-server-instance, in-memory.** It resets on a server restart and isn't shared across multiple concurrent instances/regions. This is an intentional, documented trade-off for a single-admin site — see `lib/rateLimit.ts`. Five failed attempts in 15 minutes locks that IP out for the rest of the window.
- **`related` articles and `relatedTool` aren't set by this form.** New posts publish with empty values for both (no "Related guides" block will show) until you edit the file by hand later to add them.

---

## 4. Rotating the GitHub token

Do this immediately if you ever suspect the token leaked (accidentally committed, pasted somewhere public, etc.), and periodically anyway as good hygiene:

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens.
2. Find the token used for this project and click **Delete** (or let it expire — deleting is immediate and safer if you suspect a leak).
3. Generate a **new** fine-grained token with the exact same scoping as above (this one repo only, Contents: Read and write only).
4. Update `GITHUB_TOKEN` in your host's environment variables to the new value and redeploy.
5. Confirm it works by publishing a small test post.

If you ever suspect `ADMIN_PASSWORD` leaked instead: change it the same way (update the env var, redeploy). Every existing session cookie is signed with the old password and becomes invalid the moment the new one is deployed, so this also immediately logs out anyone (including you) who was already signed in — you'll need to log in again with the new password.
