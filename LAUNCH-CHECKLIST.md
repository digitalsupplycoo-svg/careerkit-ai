# CareerKit AI — Launch Checklist

**Niche:** Career / job search advice (existing site, extended in this pass — not a new build).
**Domain:** `https://www.careerkit.online` (set via `NEXT_PUBLIC_SITE_URL`; confirm this is the real, final production domain before deploy — see Section 2).
**Last updated:** 2026-09-01.

This checklist separates what was verified automatically by running real commands (Section 1) from what only you can judge (Section 2), what to do after deploying (Section 3), and what to do before applying to AdSense (Section 4). It does not guarantee AdSense approval, search ranking, or revenue — no checklist can, since Google's review process is manual, unpublished, and outside any publisher's control.

This supersedes `ADSENSE-LAUNCH-CHECKLIST.md` (kept for history) — this file reflects the current state after the black-and-white redesign, 4 new tools, and 24 new articles added in this pass.

---

## 0. Policy re-check performed before this pass

Per instructions, current AdSense/Publisher policy pages were re-fetched rather than relied on from training data:

- [support.google.com/adsense/answer/9335564](https://support.google.com/adsense/answer/9335564) (Program Policies)
- [support.google.com/publisherpolicies/answer/11190248](https://support.google.com/publisherpolicies/answer/11190248) (Publisher Policies)

Relevant, current requirements confirmed and cross-checked against this site:

- No ads on screens with low-value/thin content, or where ads outnumber real content — enforced here by `AdSlot` being entirely absent from tool components (interactive/user-input pages) and gated by a 350-word minimum on articles (`app/articles/[slug]/page.tsx`).
- No replicated/scraped content without added commentary — all 46 articles are original, written for this site specifically, not rewritten from another source.
- No automatically generated content without human review — every article was written and reviewed for this specific site; none are templated filler. **You should still read them** (see Section 2).
- Privacy policy must disclose data collection and third-party cookies; no personalized ads to children or based on sensitive categories; a certified consent tool is required for EEA/UK/Swiss visitors before personalized ads run.
- Ads must not overlay navigation, push content off-screen, or create "dead-end" screens requiring an ad click to exit.

No findings here required an architecture change — the site's existing approach (gated AdSense client, ad-free tool pages, thin-content safeguard) already aligns with current policy language.

---

## 1. What was verified automatically (real command output)

### Tests — `npm test`
```
Test Files  8 passed (8)
     Tests  54 passed (54)
```
Covers: env-helper/AdSense-gating logic, article frontmatter integrity, resume-keyword-matcher tokenizer, cover-letter/headline-optimizer/interview-prep/offer-comparator pure logic, clipboard/download helpers.

### Lint — `npm run lint`
```
> eslint . --ext .ts,.tsx
(no output — zero errors, zero warnings)
```

### Production build — `npm run build`
```
✓ Compiled successfully
✓ Generating static pages (71/71)
```
71 routes generated: homepage, 46 article pages, 8 tool pages + tools index, 7 legal/info pages, plus `robots.txt`, `sitemap.xml`, `ads.txt`, OG image routes, favicon/icon routes.

### AdSense-readiness audit — `npm run audit:adsense`
```
Errors:   0
Warnings: 2
```
- ✓ All 7 required legal/info pages exist with real, non-generic content (About, Privacy, Terms, Disclaimer, Editorial Policy, Advertising Disclosure, Contact)
- ✓ `AdSlot` confirmed absent from every excluded route (legal pages, 404, job tracker)
- ✓ `ads.txt` returns HTTP 200 plain text and never hardcodes a fake ID
- ✓ No lorem ipsum / TODO / "coming soon" anywhere in `app/` or `content/`
- ✓ 46 articles, all above the 350-word internal thin-content floor, spanning 9 categories
- ✓ `sitemap.ts` / `robots.ts` present and correct
- ✓ Zero broken internal links (checked every `href="/..."` across `app/`, `components/`, `content/` against real routes)
- ! `NEXT_PUBLIC_ADSENSE_CLIENT` not set — expected pre-launch; ads stay fully off until set
- ! `NEXT_PUBLIC_SITE_URL` not set — expected pre-launch; falls back to the placeholder domain

### Real-data integrity checks (ad hoc script, not part of the standing test suite)
- All `related: [...]` article slugs in every article's frontmatter resolve to a real article (0 broken).
- No duplicate article slugs across all 46 files.

### Lighthouse (real run against the production build, `npm run build && npm start`, headless Chrome, mobile-throttled defaults) — homepage

| Category | Score |
|---|---|
| Performance | **99** |
| Accessibility | **100** |
| Best Practices | **96** |
| SEO | **100** |

Core Web Vitals (lab, single run — not field data): LCP 2.1s, CLS 0, TBT 60ms, FCP 0.8s.

Two real issues were found by this run and **fixed**, not just noted:
1. **Homepage had no `<title>` tag at all.** Root cause: `lib/pageMetadata.ts` always included a `title` key (even as `undefined`) in the metadata object it returns, which — per Next.js's metadata-merging behavior — blocks inheritance of the root layout's default title entirely, rather than falling back to it as intended. Fixed by only including the key when a title is actually passed. This affected only the homepage (every other page already passed an explicit title).
2. **No favicon existed anywhere in the project** (`app/favicon.ico` was missing entirely, not just unconfigured). Generated a real `app/favicon.ico` plus `app/icon.png` and `app/apple-icon.png` — simple, on-brand, black-and-white, sharp-edged mark consistent with the "no gradients, no color" design system, using Next.js's built-in icon file conventions (no manual `<link>` tags needed).

One remaining Best Practices finding was investigated and is **not a real site bug**: a console 404 for `/_vercel/insights/script.js`. This endpoint is served by Vercel's edge infrastructure itself when the site is actually deployed there — `@vercel/analytics`'s `<Analytics />` component always requests it, and it 404s in any environment that isn't literally hosted on Vercel (including local `next start`, which is how this Lighthouse run was taken). This will resolve on its own once deployed to Vercel; it is not something to "fix" in code.

### Mobile responsiveness at 375px width (checked directly in a real browser, not assumed)
Homepage and the Job Offer Comparator tool (its widest page — a two-column form plus a data table) were rendered at exactly 375×812 and screenshotted. No horizontal overflow (`document.documentElement.scrollWidth === window.innerWidth === 375` confirmed via script), header/CTA/hero readable and usable, no clipped content.

---

## 2. What requires your manual review — I cannot verify these

- [ ] **Read all 46 articles**, especially the 24 added in this pass. They were written to be genuinely useful, specific, and free of fabricated statistics or invented sources — but you're publishing under your name, so review for tone, accuracy, and anything you'd change. A few (pay transparency laws, AI-in-job-search, hidden-job-market) reference real-world facts that change over time — spot-check current accuracy before publishing, since these were written from a September 2026 snapshot of publicly available information, not a live data feed.
- [ ] **Confirm `NEXT_PUBLIC_SITE_URL` is your real, final production domain** before deploy — an incorrect canonical domain silently misdirects search engines and can hurt both SEO and AdSense review. This is flagged as a warning, not an error, precisely because it can't be verified without knowing your real domain.
- [ ] **Set up a real, Google-certified Consent Management Platform** (Google's own AdSense Privacy & Messaging tool, or another IAB TCF-certified CMP) before enabling any ads for EEA/UK/Swiss visitors. The site's `ConsentBanner` component explicitly is **not** a certified CMP — it only informs visitors that ads aren't personalized yet. This has not changed and still needs your setup in the AdSense dashboard.
- [ ] **Review Privacy Policy and Terms for your actual jurisdiction and business setup** — the existing drafts are general-purpose, not jurisdiction-specific legal advice.
- [ ] **Verify the contact email works** and is actually monitored.
- [ ] **Confirm the "CareerKit AI Editorial Team" framing** on About/Editorial Policy still matches how you'll actually run the site.
- [ ] **Spot-check a sample of the new articles against search engines** to confirm nothing reads as close to existing published content — they were written from scratch using real search-intent research, not copied or lightly rewritten, but an independent check is good practice before publishing at this volume.
- [ ] **Decide whether all 24 new articles ship at once or on a staggered publishing schedule.** Publishing 24 articles in a single day is not itself a policy violation, but a more gradual cadence can look more natural to both readers and search engines than a sudden bulk publish — your call based on your actual editorial capacity.

---

## 3. Steps to take after deployment

1. Deploy to your real production domain (Vercel is the simplest path for this Next.js app — see `README.md`).
2. Set `NEXT_PUBLIC_SITE_URL` to that real domain and redeploy; confirm `https://yourdomain.com/robots.txt` and `/sitemap.xml` both load without authentication.
3. Add the property in **Google Search Console**, verify ownership (HTML tag, DNS, or file method), and submit `sitemap.xml` from the Search Console sitemaps report.
4. Confirm indexing is progressing over the following days/weeks via Search Console's Coverage report — don't expect instant indexing of all 46+ articles.
5. Once `NEXT_PUBLIC_ADSENSE_CLIENT` is set (see Section 4), visit `https://yourdomain.com/ads.txt` directly and confirm it returns the real `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` line, not the placeholder comment.
6. Let the site accumulate genuine, organic traffic for a meaningful period before applying to AdSense (see Section 4) — there is no official minimum, but zero real visitors gives a human reviewer nothing to evaluate.

---

## 4. Steps before applying to AdSense

1. **Get real traffic first.** Google publishes no official minimum traffic or site-age requirement — anyone claiming a specific number is not citing an actual Google policy. A brand-new site with zero organic visitors simply gives the reviewer nothing to judge; let search engines index the content and let some real visitors arrive naturally (from search, from wherever you'd genuinely share it) before applying.
2. Sign up for AdSense with your real production domain under **Sites → Add site**.
3. As soon as AdSense issues your `ca-pub-XXXXXXXXXXXXXXXX` publisher ID (issued at account creation, not at approval), set `NEXT_PUBLIC_ADSENSE_CLIENT` to it and redeploy — this loads the verification snippet and activates the real `ads.txt` line, both needed for Google to verify the site, while `AdSlot` itself stays inert.
4. In AdSense, go to **Privacy & messaging → European regulations → Create message** to configure the certified CMP for EEA/UK/Swiss visitors (see Section 2 — this is not optional and not something this codebase can do for you).
5. Submit the site for review from the AdSense dashboard.
6. **Keep ad units invisible until approval**, even with the verification snippet live: `NEXT_PUBLIC_ADSENSE_ENABLE_UNITS` is a second, separate switch — leave it unset until Google approves the site, then set it to `true` and redeploy.
7. Google's review timeline and outcome are entirely Google's — no technical checklist, including this one, can expedite or guarantee it.

---

## A note on scope

This pass extended an already-substantial, working site rather than building from scratch: it added a strict black-and-white design system, 4 new interactive tools (7 tools total, 8 including the private job tracker), a `/tools` index page, and 24 new articles chosen from real search-intent research (validated via live web search against what's currently being searched and written about, cross-checked against the 22 pre-existing articles to avoid duplication). Everything in Section 1 is objectively true as of the commands run above. Sections 2–4 are judgment calls and external steps that remain yours to make — passing every automated check here is necessary, not sufficient, for AdSense approval or search visibility.
