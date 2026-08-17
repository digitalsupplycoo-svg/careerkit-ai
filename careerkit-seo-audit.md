# ROLE

Act as a senior Technical SEO Engineer, Next.js Engineer, Content SEO Strategist, GEO/AEO specialist, Core Web Vitals engineer, Google AdSense publisher optimization specialist, and GitHub/Vercel deployment engineer.

You are working on:

[https://www.careerkit.online/](https://www.careerkit.online/)

The project is stored in GitHub and deployed through Vercel.

The repository contains a full SEO audit named:

`careerkit-seo-audit.md`

READ THE ENTIRE AUDIT BEFORE MODIFYING ANYTHING.

Then inspect the actual repository and verify every finding against the current implementation.

Do NOT blindly implement the audit.

The current codebase is the implementation source of truth.

The audit is the list of SEO findings that must be verified.

If something is already fixed, leave it alone and report it as already resolved.

If something requires human/business information, external research, Google account access, AdSense dashboard access, Search Console, or another external service, do NOT fabricate anything. Mark it clearly as a manual action.

---

# PRIMARY BUSINESS OBJECTIVE

CareerKit is a free career-information and browser-based career-tools website.

Its primary long-term monetization model is:

**Google AdSense**

This business model is NON-NEGOTIABLE.

Optimize the website simultaneously for:

1. Google organic search traffic
2. Google AdSense approval/readiness
3. Long-term AdSense monetization
4. High-quality career content
5. Excellent user experience
6. Core Web Vitals
7. E-E-A-T
8. GEO / AI search / answer-engine visibility
9. Discoverability and usage of CareerKit's free tools
10. Sustainable organic growth

Do NOT optimize one objective by destroying another.

---

# ABSOLUTE ADSENSE RULE

DO NOT remove Google AdSense.

DO NOT remove or intentionally disable:

* Google AdSense publisher code
* AdSense verification
* ads.txt
* Google ad scripts solely because they affect Lighthouse
* advertising disclosure
* consent infrastructure
* required ad containers
* publisher configuration
* code required for current or future AdSense approval

The audit indicates that AdSense approval is currently pending.

Therefore:

**Optimize the AdSense implementation without destroying monetization readiness.**

If AdSense contributes to poor performance:

* investigate script loading
* optimize sequencing
* prevent ad/disclosure components from becoming LCP where possible
* preserve layout space to prevent CLS
* lazy-load below-the-fold placements where supported and safe
* avoid unnecessarily blocking critical rendering
* preserve Google-supported behavior
* preserve consent/privacy behavior

DO NOT use AdSense hacks.

DO NOT:

* hide ads
* disguise ads
* encourage accidental clicks
* place deceptive buttons near ads
* manipulate ad viewability
* artificially refresh ads
* modify Google's ad code in unsupported ways
* create fake ad impressions
* create layouts designed to generate accidental clicks

If a performance optimization conflicts with Google's supported AdSense implementation, preserve the supported implementation and document the performance tradeoff.

---

# PHASE 0 — GITHUB + VERCEL SAFETY

Before modifying anything:

1. Inspect the Git repository.

Determine:

* current branch
* default branch
* remote repository
* package manager
* Next.js version
* App Router vs Pages Router
* Vercel configuration
* CI/CD workflows
* environment-variable usage
* metadata architecture
* article rendering architecture
* content source
* tool architecture
* sitemap implementation
* robots.txt implementation
* structured-data components
* AdSense integration
* consent implementation
* analytics implementation
* security-header configuration
* image handling
* internal-link architecture

2. Fetch/pull the latest repository state if repository access allows it.

3. DO NOT work directly on the production/default branch if avoidable.

Create a dedicated branch:

`seo/careerkit-full-audit-fixes`

4. DO NOT:

* merge into main/master
* force push
* rewrite Git history
* delete production branches
* expose secrets
* commit `.env` files
* expose API keys
* expose AdSense secrets/configuration not intended for the client
* expose Vercel environment variables
* change DNS
* change the production domain
* disconnect GitHub from Vercel
* deploy/promote to Vercel Production

unless I explicitly authorize it.

5. Read:

`careerkit-seo-audit.md`

completely.

6. Run baseline checks BEFORE modifications using the repository's existing package manager.

Where available, run:

* lint
* typecheck
* tests
* production build

Record pre-existing failures separately.

Do not attribute existing failures to your changes.

7. Create a concise implementation plan.

8. THEN IMPLEMENT THE FIXES.

Do not stop after analysis or planning.

---

# PHASE 1 — CRITICAL SEO FIXES

## 1. FIX THE HOMEPAGE HTML TITLE

The audit reports that the homepage has no real `<title>` element.

This is the highest-priority SEO bug.

Inspect the actual Next.js metadata implementation.

Fix it using the correct metadata API for the installed Next.js architecture.

Add an accurate homepage title representing CareerKit and its search intent.

Do not keyword-stuff.

Preserve valid existing:

* Open Graph metadata
* Twitter metadata
* canonical
* description
* robots directives

After implementation, verify the FINAL SERVER-RENDERED HTML contains exactly one appropriate:

`<title>`

Do not consider this fixed merely because `og:title` or `twitter:title` exists.

---

## 2. FIX JOB TRACKER ROBOTS/NOINDEX CONFLICT

Inspect:

`/tools/job-tracker`

The audit reports that it currently combines:

`robots.txt Disallow`

with:

`meta noindex`

This creates conflicting crawl/indexing behavior because crawlers may be prevented from seeing the noindex directive.

Verify the finding.

If still present:

KEEP the appropriate:

`noindex`

directive.

REMOVE the specific robots.txt Disallow rule that prevents crawlers from observing the noindex.

Do NOT automatically make the page indexable.

Verify:

* robots.txt
* page robots metadata
* sitemap inclusion/exclusion
* canonical
* final server-rendered HTML

The intended state should be logically consistent.

---

## 3. FIX ARTICLE SEMANTIC HTML

The audit reports that article body HTML is fragmented across multiple sibling:

`<div class="article-content">`

elements without a proper semantic `<article>` wrapper.

This may cause content extraction systems to capture only part of an article.

Inspect the real article template.

Refactor the article structure into clean semantic HTML.

Prefer a structure similar to:

`<main>`
→ `<article>`
→ article header
→ H1
→ metadata/byline
→ sections
→ H2/H3
→ paragraphs/lists/tables/figures
→ relevant references

Do NOT:

* duplicate content
* change article URLs unnecessarily
* hide content from users
* create crawler-only content
* break CSS
* break Article schema
* break breadcrumbs
* break mobile rendering

The same primary content should be available to users, search engines, and AI extraction systems.

Verify the final server-rendered HTML.

---

# PHASE 2 — INTERNAL LINKING

Internal linking is one of the highest-ROI opportunities in the audit.

## 4. JOB APPLICATION TRACKER

The Job Application Tracker reportedly has zero contextual links from the article library.

Identify at least 5 genuinely relevant existing articles.

Add natural contextual links to:

`/tools/job-tracker`

Use descriptive anchors.

Do NOT spam exact-match anchors.

Do NOT insert links into irrelevant articles merely to increase link counts.

Because the Job Tracker may remain noindex, these links primarily support:

* users
* engagement
* tool discovery
* navigation
* conversion into tool usage

Do not change indexability without justification.

---

## 5. RESUME KEYWORD MATCHER

Add a contextual link from the article about beating Applicant Tracking Systems to:

`/tools/resume-keyword-matcher`

Also inspect other ATS/resume articles and add links only where the tool genuinely helps the reader.

---

## 6. SALARY ESTIMATOR

Add appropriate contextual links from relevant Salary & Offers articles to:

`/tools/salary-estimator`

Repair the broken reciprocal linking pattern identified by the audit.

---

## 7. UNDER-LINKED ARTICLES

The audit reports that 9 of 22 articles have fewer than the desired number of inbound contextual links.

It specifically identifies:

`how-to-write-a-cover-letter-that-gets-read`

and:

`understanding-at-will-employment-basics`

as effectively orphaned from contextual linking.

Find genuinely relevant existing pages and create natural contextual internal links to these articles.

Do NOT use arbitrary footer/sitewide links solely to manipulate counts.

---

## 8. CONTENT HUBS

The audit identifies five semantic clusters:

* Resume Writing & ATS
* Interview Preparation
* Salary & Offers
* Job Search Strategy & Branding
* Career Transitions & Applications

Inspect `/articles` and the current information architecture.

Strengthen topical organization where useful.

Consider useful content-hub functionality if supported by existing content.

DO NOT create:

* thin category pages
* doorway pages
* dozens of empty SEO routes
* keyword-generated pages with no unique value

Every new indexable page must have a genuine user purpose.

---

# PHASE 3 — CONTENT QUALITY + E-E-A-T

The audit says CareerKit's writing quality itself is generally good.

Do NOT unnecessarily rewrite good content.

The primary weaknesses are:

* limited article depth
* limited external sourcing
* no named individual authorship
* weak Experience/Expertise/Authority signals

---

## 9. ARTICLE DEPTH

The audit reports sampled articles around approximately 542–707 words.

Do NOT mechanically force every article to exactly 1,500 words.

Do NOT generate filler to hit arbitrary word counts.

Instead inspect search intent and existing article coverage.

Where important subtopics are genuinely missing, expand with useful material such as:

* practical explanations
* examples
* step-by-step processes
* checklists
* comparison tables
* realistic scripts
* decision frameworks
* definitions
* common mistakes
* FAQs
* next steps
* links to relevant CareerKit tools

Do not fabricate facts.

Do not fabricate statistics.

Do not fabricate personal experience.

Do not create repetitive AI-style padding.

Quality and intent satisfaction matter more than raw word count.

---

## 10. PRIMARY-SOURCE CITATIONS

The audit found zero outbound citations in sampled articles.

For factual claims that benefit from authoritative support, add citations to primary/high-authority sources when those URLs can be reliably verified.

Prefer sources such as:

* U.S. Department of Labor
* Bureau of Labor Statistics
* EEOC
* IRS where relevant
* official government sources
* official state labor agencies
* primary institutional documentation

DO NOT:

* invent citations
* invent studies
* invent statistics
* create fake URLs
* cite a source that does not support the statement

If external verification is unavailable, create a manual research TODO rather than fabricating evidence.

Avoid citation spam.

---

## 11. AUTHORSHIP

The audit reports articles currently use:

`CareerKit AI Editorial Team`

Do NOT invent a human author.

Do NOT fabricate:

* author names
* degrees
* HR credentials
* recruiting experience
* certifications
* employment history
* professional affiliations

Preserve transparent authorship unless genuine human author data already exists.

Strengthen truthful E-E-A-T signals through:

* editorial policy
* methodology
* update dates
* sourcing transparency
* corrections policy
* tool methodology
* limitation disclosures

If named human authors/reviewers would materially improve the site, list that as:

`OWNER ACTION`

Do not invent the person.

---

# PHASE 4 — VISUAL CONTENT

The audit found essentially zero in-content images/charts/visuals.

Do NOT solve this with meaningless stock photography.

Identify articles where visuals genuinely improve understanding.

Prefer:

* salary comparison charts
* resume diagrams
* ATS workflow diagrams
* interview preparation checklists
* job-search workflows
* offer-comparison tables
* resume-format examples
* worksheets
* screenshots of CareerKit's own tools
* original diagrams
* useful data visualizations

If useful visuals can be generated from verified existing data/content, implement the required structure.

If design assets need to be created separately, create a clear asset-production TODO list and appropriate placeholders only when placeholders do not degrade production UX.

For implemented images:

* use meaningful alt text
* explicit dimensions
* responsive sizing
* Next.js Image where appropriate
* optimized formats
* lazy loading below the fold
* no CLS
* descriptive filenames

Do not keyword-stuff alt text.

---

# PHASE 5 — CORE WEB VITALS + PERFORMANCE

The audit reports:

* Homepage LCP poor
* Article LCP poor
* Tool template performs relatively well
* TTFB excellent
* CLS = 0
* AdSense/DoubleClick represents a significant portion of JS payload

Preserve what is already working.

---

## 12. HOMEPAGE LCP

The audit indicates the homepage LCP element may be ad/consent-disclosure text rather than the primary hero.

Investigate the actual cause.

Inspect:

* hydration gating
* consent initialization
* client components
* fonts
* script loading
* AdSense initialization
* component boundaries
* above-the-fold rendering
* critical CSS

Make meaningful homepage content render quickly.

Do NOT:

* hide required disclosures
* break consent
* fake Lighthouse results
* remove AdSense
* remove legally/privacy-required functionality

---

## 13. ADSENSE PERFORMANCE

KEEP ADSENSE.

Optimize around it.

Inspect whether Next.js-supported script loading strategies can improve initial rendering without violating Google's supported implementation.

Do not alter Google's script internals.

Do not break consent.

For below-the-fold ad placements, avoid unnecessarily blocking first render where technically appropriate.

Reserve appropriate layout space for ad units where possible to minimize CLS.

Do not make advertisements the dominant above-the-fold experience.

---

## 14. RESOURCE HINTS

Inspect actual network usage first.

If useful and not already implemented, add appropriate resource hints/preconnects for the highest-impact origins actually used by the site, potentially including verified Google advertising origins such as:

`https://pagead2.googlesyndication.com`

Do not blindly add many preconnects.

Only add hints supported by real network behavior.

---

# PHASE 6 — TECHNICAL SEO + SECURITY

## 15. SECURITY HEADERS

The audit reports missing headers including:

* X-Content-Type-Options
* Content-Security-Policy
* X-Frame-Options
* Referrer-Policy
* Permissions-Policy

Inspect current Next.js/Vercel configuration.

Implement safe headers where appropriate.

CRITICAL:

Do NOT introduce a CSP that breaks:

* Google AdSense
* Google consent
* Google Analytics
* Vercel
* Next.js
* CareerKit tools
* required fonts
* images
* scripts
* external resources

If a correct production CSP cannot be confidently determined, do NOT guess.

Implement the clearly safe headers first.

For CSP, use an appropriate staged/report-only strategy or provide a documented follow-up plan if necessary.

Monetization must not be destroyed by an over-restrictive CSP.

---

## 16. CORS

The audit reports:

`Access-Control-Allow-Origin: *`

may be applied globally.

Find where it originates.

Determine whether HTML documents actually require wildcard CORS.

Tighten the configuration if safe.

Do NOT break:

* APIs
* CareerKit tools
* OG images
* static assets
* legitimate external integrations

---

## 17. SITEMAP LASTMOD

Inspect sitemap generation.

The audit reports multiple unrelated static/tool/policy pages sharing an identical `lastmod`, possibly because build/deploy time is being used instead of actual content modification time.

Use genuine modification timestamps only when reliable data exists.

Do NOT fabricate page-specific dates.

If no trustworthy modification timestamp exists, omitting `lastmod` is preferable to fake precision.

Preserve all valid sitemap URLs.

---

## 18. INDEXNOW

Evaluate whether IndexNow is appropriate for Bing-compatible freshness.

Do not claim this affects Google rankings.

If implementation requires credentials, deployment configuration, or external account access, document it as a manual action.

Do not expose secrets.

---

# PHASE 7 — STRUCTURED DATA

The existing schema implementation is already strong.

DO NOT rewrite valid schema unnecessarily.

Preserve valid existing:

* Organization
* WebSite
* SearchAction
* Article
* BreadcrumbList
* FAQPage
* SoftwareApplication
* Offer

Do not create duplicate JSON-LD.

Do not fabricate ratings.

Do not fabricate reviews.

---

## 19. ARTICLES INDEX

Evaluate whether `/articles` accurately qualifies for useful `CollectionPage` structured data.

Only add it if semantically correct.

---

## 20. CONTACTPOINT

Only add ContactPoint data if genuine contact information already exists.

Do NOT invent:

* phone numbers
* support departments
* addresses
* availability
* contact methods

---

## 21. TOOL SCREENSHOTS

SoftwareApplication schema may benefit from screenshot data.

Only add screenshot properties after genuine publicly accessible tool screenshots exist.

Do not fabricate URLs.

---

## 22. ORGANIZATION LOGO

Inspect existing brand assets.

The audit indicates publisher/Organization schema may currently reference a 1200×630 OG asset rather than a dedicated square logo.

If a genuine suitable square CareerKit logo exists, use it.

If not, list creation of a dedicated logo asset as an owner/design action.

Do not fabricate a brand asset in code.

---

## 23. FAQ SCHEMA

Existing FAQPage schema is reportedly valid.

KEEP valid existing FAQ schema when it accurately matches visible page content.

Do NOT mass-add FAQPage schema to articles solely for SERP manipulation.

Useful visible FAQs can still be added editorially where appropriate.

---

# PHASE 8 — GEO / AI SEARCH OPTIMIZATION

## 24. LLMS.TXT

The audit reports:

`/llms.txt`

returns 404.

Create a clean `/llms.txt` only if appropriate and easy to maintain.

It should be a concise factual guide to important public CareerKit resources.

Potential sections:

* CareerKit identity
* core free tools
* article library
* editorial policy
* methodology
* important public resources
* contact information that is already public

Do not keyword-stuff.

Do not expose private information.

Do not claim llms.txt is a Google ranking factor.

---

## 25. PASSAGE CITABILITY

Improve article formatting for human readability and machine extraction.

Where natural, use:

* descriptive/question-oriented headings
* concise direct answers
* supporting explanations
* examples
* authoritative citations

Do not convert every heading into a question.

Do not make content robotic.

Do not write for AI crawlers at the expense of humans.

---

## 26. CAREERKIT TOOLS AS PRIMARY ASSETS

CareerKit's free tools are strategic assets.

Strengthen their explanatory content where needed:

* what the tool does
* how it works
* what inputs it uses
* methodology
* limitations
* privacy behavior
* interpretation of results
* relevant supporting articles

Preserve honest existing limitations.

For example:

Do NOT pretend the Salary Estimator uses a proprietary real-time salary database if it does not.

Transparency is a strength of this website.

---

# PHASE 9 — ADSENSE APPROVAL READINESS

AdSense approval is pending.

Audit the website specifically for publisher-quality signals.

Do NOT attempt to game approval.

Verify accessibility and quality of:

* About
* Contact
* Privacy Policy
* Disclaimer
* Editorial Policy
* Advertising Disclosure
* Terms where applicable

Preserve strong existing trust pages.

Check for:

* broken policy links
* accidental noindex
* placeholder pages
* thin pages
* navigation problems
* footer accessibility
* mobile usability
* intrusive ad placement
* content-to-ad balance
* misleading buttons
* deceptive layouts

Do NOT fabricate legal or business information.

Do NOT claim that any change guarantees AdSense approval.

---

# PHASE 10 — ADSENSE MONETIZATION UX

CareerKit needs to monetize traffic without destroying SEO or user experience.

For article templates:

* keep the main answer easy to reach
* maintain readable typography
* preserve whitespace
* prevent ad-induced CLS
* maintain clear heading hierarchy
* preserve internal links
* preserve tool CTAs
* keep ads visually distinguishable from content
* avoid excessive above-the-fold ad pressure

Do not optimize solely for ad impressions.

Optimize for sustainable:

SEO → reader satisfaction → engagement → page depth → AdSense monetization.

---

# PHASE 11 — VERCEL REQUIREMENTS

The website is deployed through Vercel.

Preserve compatibility with:

* Next.js SSR/SSG
* Server Components
* Client Components
* Vercel caching
* redirects
* headers
* metadata
* robots.txt
* sitemap
* Image Optimization
* environment variables
* analytics
* AdSense

Do not change production environment variables.

Do not expose Vercel secrets.

---

# VERCEL PREVIEW DEPLOYMENT

If GitHub/Vercel automatically generates a Preview Deployment for the SEO branch, that is acceptable.

Use Preview for validation if available.

DO NOT promote Preview to Production.

DO NOT manually deploy Production.

If a Preview URL is available, validate:

* homepage title
* metadata
* canonical
* robots
* sitemap
* article semantic markup
* structured data
* internal links
* tools
* mobile rendering
* consent
* AdSense integration
* performance
* broken routes

IMPORTANT:

Ensure Preview deployments retain appropriate indexing protections.

Do not accidentally create an indexable duplicate of the production site.

---

# PHASE 12 — VALIDATION

After implementing all safe fixes, run every available validation step.

Use the repository's package manager.

At minimum attempt:

* lint
* typecheck
* tests
* production build

The final Next.js production build MUST succeed before considering the code-level work complete.

Then verify:

1. Homepage contains exactly one correct `<title>`.
2. Homepage canonical remains correct.
3. Job Tracker robots/noindex behavior is logically correct.
4. Job Tracker remains noindex if that remains the intended strategy.
5. Sitemap remains valid.
6. All sitemap URLs resolve appropriately.
7. Article pages contain semantic `<article>` markup.
8. Article content remains fully visible.
9. Structured data remains valid.
10. No duplicate JSON-LD was introduced.
11. Internal links resolve.
12. No broken routes were introduced.
13. CareerKit tools still function.
14. AdSense integration remains present.
15. ads.txt remains intact if it existed.
16. Advertising Disclosure remains accessible.
17. Consent functionality remains intact.
18. CLS remains protected.
19. Mobile UX remains functional.
20. Desktop UX remains functional.
21. Production build succeeds.
22. No secrets were added to Git.
23. No environment variables were exposed.

---

# PHASE 13 — RECHECK THE ORIGINAL AUDIT

After implementation, re-open:

`careerkit-seo-audit.md`

Review EVERY finding one by one.

Create a final remediation table:

| Audit Finding | Verified Before Change? | Action Taken | Status | Files Changed | Validation | Remaining Work |

Use only these statuses:

* FIXED
* PARTIALLY FIXED
* ALREADY CORRECT
* MANUAL ACTION REQUIRED
* NOT IMPLEMENTED — WITH REASON

Do not claim something is fixed unless it was actually verified.

---

# GITHUB COMPLETION WORKFLOW

After all code changes:

1. Review the complete Git diff.

2. Ensure no:

* credentials
* API keys
* `.env` files
* private data
* Vercel secrets
* AdSense-sensitive account information
* unrelated files

were accidentally added.

3. Keep the work on:

`seo/careerkit-full-audit-fixes`

4. Create clean logical commits with descriptive messages.

5. Push ONLY this SEO branch if GitHub write access is available.

6. DO NOT merge it.

7. DO NOT force push the production branch.

8. If GitHub PR creation is available, prepare/open a Pull Request from:

`seo/careerkit-full-audit-fixes`

into the default branch.

The PR should summarize:

* critical SEO fixes
* technical SEO changes
* content/E-E-A-T improvements
* internal-linking improvements
* GEO changes
* Core Web Vitals changes
* AdSense-related optimizations
* schema changes
* files changed
* validation results
* remaining manual actions
* deployment risks

Do NOT merge the PR.

---

# FINAL OUTPUT

At completion provide:

## 1. Executive Summary

Explain what was fixed and the expected impact.

## 2. Critical SEO Fixes Completed

## 3. Technical SEO Fixes

## 4. Content / E-E-A-T Improvements

## 5. Internal Linking Improvements

Show which articles now link to which tools/pages.

## 6. GEO / AI Search Improvements

## 7. Core Web Vitals / Performance Improvements

## 8. Google AdSense

Explicitly confirm:

* whether AdSense remains installed
* whether publisher/verification code remains
* whether ads.txt remains
* whether consent remains
* what performance optimizations were made
* whether any AdSense-related manual actions remain
* anything I should verify before approval

## 9. Structured Data

List changed and preserved schema.

## 10. Files Changed

List EVERY changed file and briefly explain why.

## 11. Validation Results

Report:

* lint
* typecheck
* tests
* production build
* metadata verification
* robots verification
* sitemap verification
* structured-data verification

Do not hide failures.

## 12. Manual Owner Actions

Separate them into:

### Content requiring human input

### Human author/reviewer information

### Original images/screenshots

### Google AdSense account/dashboard actions

### Google Search Console

### External citations requiring research

### Branding/design assets

### Vercel configuration

### Other external services

## 13. Remaining SEO Opportunities

Prioritize remaining work:

P0 — Critical

P1 — High impact

P2 — Medium

P3 — Long-term

## 14. GitHub / Vercel Status

Report:

* branch name
* commits created
* push status
* PR URL if created
* Vercel Preview URL if generated
* Preview validation status
* Production deployment status

Production deployment status MUST remain:

`NOT DEPLOYED — awaiting owner approval`

unless I explicitly authorize production deployment.

---

# ABSOLUTE FINAL RULE

Do NOT merge into the production/default branch.

Do NOT deploy or promote to Vercel Production.

Do NOT remove or disable Google AdSense.

Do NOT remove ads.txt.

Do NOT break consent/privacy infrastructure.

Do NOT fabricate authors, credentials, statistics, citations, reviews, salary data, business information, or expertise.

Do NOT create thin AI-generated filler merely to increase word count.

Do NOT sacrifice user experience for ad impressions.

Do NOT claim AdSense approval is guaranteed.

The task is complete when:

1. The audit has been fully reviewed.
2. Every finding has been verified.
3. All safe code-level fixes have been implemented.
4. AdSense readiness has been preserved.
5. Tests/build pass or failures are transparently documented.
6. Changes are committed to the dedicated GitHub branch.
7. A Vercel Preview is validated if available.
8. The final remediation report is delivered.

Then STOP and wait for my explicit approval before any Production deployment.

START NOW:

First read `careerkit-seo-audit.md` completely, inspect the repository and current branch, establish the baseline, create/use `seo/careerkit-full-audit-fixes`, present a concise implementation plan, and then proceed with the implementation without stopping after the plan.
