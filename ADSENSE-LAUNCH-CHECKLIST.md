# CareerKit AI — AdSense Pre-Submission Checklist

This checklist separates what's been technically verified from what still needs your
judgment. It is not a guarantee of AdSense approval — Google's manual review considers
things (traffic quality, overall site trust, judgment calls on content value) that no
script can check. **No specific word count, traffic level, or site age is a published
Google requirement** — where a number appears below, it's our own internal safeguard or
a practical signal, not a Google rule, and is labeled as such.

---

## 1. Technical items verified automatically

Confirmed by `npm run build`, `npm run lint`, `npm test`, and `npm run audit:adsense`
(all passing as of this build):

- [x] `npm run build` completes with zero errors — 43 routes generated, including all 22 article pages.
- [x] `npm run lint` passes with zero errors or warnings.
- [x] `npm test` passes (20 tests: AdSense env-helper logic, article content integrity, keyword-matcher logic).
- [x] `npm run audit:adsense` passes with 0 errors and 0 warnings.
- [x] Required pages exist: About, Privacy Policy, Terms, Disclaimer, Editorial Policy, Advertising Disclosure, Contact, 404.
- [x] `AdSlot` never renders on excluded routes (Privacy, Terms, Disclaimer, Contact, 404, Editorial Policy, Advertising Disclosure, Job Tracker).
- [x] `/ads.txt` returns HTTP 200 plain text and derives its seller entry from the same existing public publisher ID used by the verification script.
- [x] Exactly one supported async Google ad script loads with the existing public publisher ID; visible units remain separately disabled until approval.
- [x] No lorem ipsum, "TODO", "FIXME", or "coming soon" placeholder text anywhere in `app/` or `content/`.
- [x] No fake testimonials, fake traffic counters, or guaranteed-approval language anywhere in the codebase (checked manually).
- [x] `app/sitemap.ts` and `app/robots.ts` both exist; the Job Tracker is excluded from the sitemap, crawlable, and marked `noindex, follow` so crawlers can observe the directive.
- [x] All internal `/`-prefixed links across pages, components, and articles resolve to a real route — no broken links.
- [x] All new routes (`/tools/resume-keyword-matcher`) are registered in the sitemap and in the header navigation.
- [x] Mobile: viewport meta tag confirmed present in build output; header includes a working (client-side, stateful) mobile menu toggle; layout uses a responsive auto-fill grid and a 640px breakpoint for navigation.
- [x] 22 original articles across 9 categories, each with complete title/description/category frontmatter, no duplicates.
- [x] Every monetized page (articles, tool pages) carries substantial original explanatory content beyond the interactive element itself — not just the tool or user-generated output.

`npm run audit:adsense` currently reports no warnings. The publisher code and production site URL both have
truthful code fallbacks; Vercel environment variables may override them when needed.

**Known accepted risk:** `npm audit` still reports one Next.js advisory range that only fully
resolves on a Next.js 16 upgrade, which is a breaking change out of scope for this build.
Nothing in the current code path (static pages, no custom server, no Server Actions in use)
exercises the specific vulnerable surfaces, but this is worth revisiting before or shortly
after launch. Run `npm audit` yourself to see current status, since advisories change.

---

## 2. Items that require your manual review

These cannot be verified by a script — they need a human judgment call from you:

- [ ] **Read all 22 articles end to end.** They were written to be genuinely useful and free of
      fabricated stats/quotes, but you're the one putting your name behind them — review for
      tone, accuracy, and anything you'd want changed before publishing.
- [ ] **Confirm the "CareerKit AI Editorial Team" framing is accurate for how you'll actually run
      the site** (About and Editorial Policy pages reference this) — edit that copy if the real
      setup is different (e.g., a solo operator).
- [ ] **Decide on and configure a real, Google-certified Consent Management Platform** (Google's
      own AdSense Privacy & Messaging tool, or another IAB TCF–certified CMP) before enabling any
      ads for EEA/UK/Swiss visitors. The current `ConsentBanner` component is explicitly *not* a
      certified CMP — it only informs visitors that ads aren't personalized yet.
- [ ] **Review the Privacy Policy and Terms for your actual jurisdiction** and business setup;
      the drafts here are general-purpose, not jurisdiction-specific legal advice.
- [ ] **Verify the contact email works** and that someone actually monitors it.
- [ ] **Verify Vercel values** for `NEXT_PUBLIC_ADSENSE_VERIFICATION`, `NEXT_PUBLIC_SITE_URL`, and
      `NEXT_PUBLIC_CONTACT_EMAIL`; override `NEXT_PUBLIC_ADSENSE_CLIENT` only if the publisher ID changes.
- [ ] **Confirm you're comfortable with the AdSlot placements** (below the hero, end of qualifying
      articles, end of tool pages) before enabling ads for real.

---

## 3. Content quality and originality checks

- [ ] Spot-check a handful of articles against a search engine to confirm nothing reads as
      close to an existing published piece — they were written from scratch, but an independent
      check before publishing is good practice.
- [ ] Confirm the topics and depth match what you'd want a visitor to actually find useful,
      not just what fills a quota — 22 articles is a starting library, not a ceiling.
- [ ] If you add more content later, keep following the pattern already in place: specific,
      example-driven, no invented statistics/quotes/credentials, each with a clear point of view
      rather than generic filler.
- [ ] Consider adding a real author or reviewer name if that's accurate for your setup — generic
      "Editorial Team" attribution is fine, but a named, credible voice can help both readers and
      Google's assessment of trustworthiness.
- [ ] Periodically revisit and update older articles (the `updated` date in frontmatter should
      reflect genuine, substantive edits — not be bumped without a real update).

---

## 4. Steps before applying to Google AdSense

1. Deploy the site to a real production domain (see Section 5 below).
2. Set `NEXT_PUBLIC_SITE_URL` to that real domain and redeploy.
3. Let the site accumulate some genuine, organic visits and get indexed by search engines —
   not because Google publishes a required traffic or age threshold (it doesn't), but because a
   site with zero real visitors gives a reviewer nothing to evaluate.
4. Go to AdSense → sign up with your real production domain.
5. In AdSense, go to **Sites → Add site**, and verify ownership using the method AdSense gives
   you — the AdSense code snippet (via `NEXT_PUBLIC_ADSENSE_VERIFICATION` / the site's `<head>`)
   or the verification meta tag. **`ads.txt` is not a site-ownership verification method** —
   it's a separate mechanism for declaring authorized ad inventory sellers, and Google checks
   it independently once ads are actually running.
6. Your `ca-pub-XXXXXXXXXXXXXXXX` publisher ID is normally issued as soon as you create the
   AdSense account — you don't need to wait for site approval to get it:
   - Confirm the existing public publisher ID matches the account under review. Override
     `NEXT_PUBLIC_ADSENSE_CLIENT` only if Google issued a different ID.
   - Set `NEXT_PUBLIC_ADSENSE_VERIFICATION` if AdSense gave you a separate verification string.
   - Redeploy. `/ads.txt` will automatically start serving the correct entry from the same ID —
     verify by visiting `https://yourdomain.com/ads.txt` directly in a browser and confirming it returns
     `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
7. In AdSense, go to **Privacy & messaging → European regulations → Create message** to set up
   the certified CMP for EEA/UK/Swiss visitors. Also configure the relevant US state privacy
   messages under the same Privacy & messaging section.
8. Confirm the site is publicly crawlable: visit `https://yourdomain.com/robots.txt` and
   `https://yourdomain.com/sitemap.xml` directly and confirm both load without authentication.
9. Submit the site for AdSense review from the AdSense dashboard.
10. **Keep visible ad units off until approval, even though the verification snippet is live.**
    Publisher configuration and ad-unit visibility are deliberately separate:
    - The existing public publisher ID (or its `NEXT_PUBLIC_ADSENSE_CLIENT` override) loads the
      verification script and powers `/ads.txt`, but `AdSlot` stays inert from this alone.
    - `NEXT_PUBLIC_ADSENSE_ENABLE_UNITS` is what actually turns on visible ad boxes — leave it
      unset (or `false`) until Google has approved the site, then set it to `true` and redeploy.
11. Google's review timeline and outcome are entirely up to Google — there is no way to expedite
    it, and no combination of technical checks guarantees approval.

---

## A note on what "readiness" does and doesn't mean

Everything in Section 1 is objectively true right now, verified by running the actual scripts in
this repository. Sections 2–4 are judgment calls and external steps that are yours to make.
Passing every automated check is necessary but not sufficient for approval — Google's own,
unpublished, human review process is the actual gate, and it can't be fully anticipated by any
checklist, including this one.
