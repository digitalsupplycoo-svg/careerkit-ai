#!/usr/bin/env node
/**
 * npm run audit:adsense
 *
 * A TECHNICAL readiness assistant, not a substitute for Google's own review.
 * It checks things a script can actually verify: required pages exist, ad
 * components stay off excluded routes, ads.txt is well-formed if configured,
 * no placeholder/lorem-ipsum text remains, pages have titles/descriptions,
 * content volume and depth look substantial, and internal links resolve.
 *
 * It CANNOT verify: whether your content is genuinely original and useful
 * to a human reader, whether the site will pass Google's manual review, or
 * whether your traffic is organic and policy-compliant. Those require human
 * judgment — see LAUNCH-CHECKLIST.md.
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const errors = [];
const warnings = [];

function ok(label) {
  console.log(`  \u2713 ${label}`);
}
function fail(label) {
  errors.push(label);
  console.log(`  \u2717 ${label}`);
}
function warn(label) {
  warnings.push(label);
  console.log(`  ! ${label}`);
}

function readIfExists(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
}

// Load env from .env.local if present, falling back to .env.example for
// documentation-only checks (never treated as a real configured value).
function loadEnv() {
  const env = { ...process.env };
  const localPath = path.join(ROOT, ".env.local");
  const raw = readIfExists(localPath);
  if (raw) {
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2];
    }
  }
  return env;
}

console.log("\nAdSense readiness audit\n========================\n");

const env = loadEnv();

// 1. Required public pages exist
console.log("1. Required public pages");
const REQUIRED_PAGES = {
  "About": "app/about/page.tsx",
  "Privacy Policy": "app/privacy/page.tsx",
  "Terms": "app/terms/page.tsx",
  "Disclaimer": "app/disclaimer/page.tsx",
  "Editorial Policy": "app/editorial-policy/page.tsx",
  "Advertising Disclosure": "app/advertising-disclosure/page.tsx",
  "Contact": "app/contact/page.tsx",
  "Homepage": "app/page.tsx",
  "404 page": "app/not-found.tsx"
};
for (const [label, rel] of Object.entries(REQUIRED_PAGES)) {
  fs.existsSync(path.join(ROOT, rel)) ? ok(`${label} exists (${rel})`) : fail(`${label} missing (${rel})`);
}

// 2. AdSense client ID format, if configured
console.log("\n2. AdSense client configuration");
const client = env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
const enableUnits = env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS === "true";
if (!client) {
  warn("NEXT_PUBLIC_ADSENSE_CLIENT is not set — verification script and ad units both stay off.");
} else if (/^ca-pub-\d{10,}$/.test(client)) {
  ok(`NEXT_PUBLIC_ADSENSE_CLIENT is a validly formatted publisher ID (${client})`);
} else {
  fail(`NEXT_PUBLIC_ADSENSE_CLIENT is set but not in the expected "ca-pub-<digits>" format: "${client}"`);
}
if (client && !enableUnits) {
  ok("NEXT_PUBLIC_ADSENSE_ENABLE_UNITS is not \"true\" — verification snippet can be live while ad units stay hidden (expected during the AdSense review period).");
} else if (client && enableUnits) {
  warn("NEXT_PUBLIC_ADSENSE_ENABLE_UNITS is \"true\" — ad units will render. Only set this after the site is actually approved.");
}

// 3. ads.txt route exists and derives from real config, never invents an ID
console.log("\n3. ads.txt");
const adsTxtRoute = readIfExists(path.join(ROOT, "app/ads.txt/route.ts"));
if (!adsTxtRoute) {
  fail("app/ads.txt/route.ts is missing");
} else {
  ok("app/ads.txt/route.ts exists");
  // Look for a fake ID actually being used as a value (e.g. inside a template
  // literal returned to the client), not just mentioned in an explanatory
  // comment describing the expected format. Comments describing the format
  // (like "pub-XXXXXXXXXXXXXXXX" used to illustrate what the real output will
  // look like) are expected documentation, not a hardcoded fake ID.
  const codeOnly = adsTxtRoute
    .split("\n")
    .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
    .join("\n");
  if (/pub-ACCOUNT_ID|["'`]pub-0{6,}["'`]|ca-pub-0{10,}/i.test(codeOnly)) {
    fail("ads.txt route appears to hardcode a placeholder/fake publisher ID as a real value");
  } else {
    ok("ads.txt route does not hardcode a placeholder/fake publisher ID as a real value");
  }
  if (!/adsTxtPublisherId|hasValidAdsenseClient/.test(adsTxtRoute)) {
    warn("ads.txt route doesn't appear to reference lib/env helpers — double-check it can't emit a fake ID");
  }
}

// 4. AdSlot must never appear on excluded routes
console.log("\n4. Ad placement on excluded routes");
const EXCLUDED_ROUTES = [
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/disclaimer/page.tsx",
  "app/contact/page.tsx",
  "app/not-found.tsx",
  "app/editorial-policy/page.tsx",
  "app/advertising-disclosure/page.tsx",
  "app/tools/job-tracker/page.tsx",
  "app/admin/login/page.tsx",
  "app/admin/new-post/page.tsx"
];
for (const rel of EXCLUDED_ROUTES) {
  const content = readIfExists(path.join(ROOT, rel));
  if (content === null) continue; // already flagged as missing above if required
  if (/<AdSlot|from ["']@\/components\/AdSlot["']/.test(content)) {
    fail(`${rel} references AdSlot but is an excluded route (thin/private content, no ad inventory)`);
  } else {
    ok(`${rel} has no AdSlot`);
  }
}

// 5. Placeholder / filler text
console.log("\n5. Placeholder and filler content");
const PLACEHOLDER_PATTERNS = [/lorem ipsum/i, /\bTODO\b/, /\bFIXME\b/, /coming soon/i, /placeholder text/i];
function walk(dir, exts, cb) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, cb);
    else if (exts.some((e) => entry.name.endsWith(e))) cb(full);
  }
}
let placeholderHits = 0;
walk(path.join(ROOT, "app"), [".tsx", ".ts"], (file) => {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(content)) {
      fail(`Placeholder text (${pattern}) found in ${path.relative(ROOT, file)}`);
      placeholderHits++;
    }
  }
});
walk(path.join(ROOT, "content"), [".md"], (file) => {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(content)) {
      fail(`Placeholder text (${pattern}) found in ${path.relative(ROOT, file)}`);
      placeholderHits++;
    }
  }
});
if (placeholderHits === 0) ok("No lorem-ipsum/TODO/coming-soon placeholder text found");

// 6. Article volume and depth
console.log("\n6. Article content volume and depth");
const articlesDir = path.join(ROOT, "content", "articles");
const articleFiles = fs.existsSync(articlesDir) ? fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md")) : [];
const MIN_ARTICLES = 20;
// This number is our own internal safeguard against showing ads on very thin
// pages. It is not a published Google/AdSense word-count requirement — Google
// does not publish one. Genuine usefulness and depth matter more than hitting
// any specific count; this just catches accidentally-thin or unfinished pages.
const MIN_WORDS_SAFEGUARD = 350;
if (articleFiles.length >= MIN_ARTICLES) {
  ok(`${articleFiles.length} articles found (minimum recommended: ${MIN_ARTICLES})`);
} else {
  fail(`Only ${articleFiles.length} articles found — fewer than the recommended minimum of ${MIN_ARTICLES}`);
}

const thinArticles = [];
const categories = new Set();
for (const file of articleFiles) {
  const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const bodyMatch = raw.split(/^---\s*$/m);
  const frontmatter = bodyMatch[1] || "";
  const body = bodyMatch.slice(2).join("---");
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount < MIN_WORDS_SAFEGUARD) thinArticles.push(`${file} (${wordCount} words)`);
  const catMatch = frontmatter.match(/category:\s*"([^"]+)"/);
  if (catMatch) categories.add(catMatch[1]);
  if (!/title:\s*"/.test(frontmatter)) fail(`${file} is missing a title in frontmatter`);
  if (!/description:\s*"/.test(frontmatter)) fail(`${file} is missing a description in frontmatter`);
}
if (thinArticles.length === 0) {
  ok(`No articles fall below our internal ${MIN_WORDS_SAFEGUARD}-word thin-content safeguard (not a Google-published minimum — just our own floor)`);
} else {
  warn(`${thinArticles.length} article(s) below our internal ${MIN_WORDS_SAFEGUARD}-word safeguard; ads stay disabled on these by design: ${thinArticles.join(", ")}`);
}
ok(`Articles span ${categories.size} categories: ${[...categories].join(", ")}`);

// 7. Sitemap and robots
console.log("\n7. Crawlability");
fs.existsSync(path.join(ROOT, "app/sitemap.ts")) ? ok("app/sitemap.ts exists") : fail("app/sitemap.ts missing");
fs.existsSync(path.join(ROOT, "app/robots.ts")) ? ok("app/robots.ts exists") : fail("app/robots.ts missing");

// 8. Site URL configuration
console.log("\n8. Production URL configuration");
const siteUrl = env.NEXT_PUBLIC_SITE_URL || "";
if (!siteUrl) {
  warn("NEXT_PUBLIC_SITE_URL is not set — metadataBase/sitemap will fall back to the placeholder example domain");
} else if (siteUrl.includes(".example")) {
  warn(`NEXT_PUBLIC_SITE_URL is still the placeholder domain (${siteUrl}) — set your real production domain before launch`);
} else if (!/^https:\/\//.test(siteUrl)) {
  fail(`NEXT_PUBLIC_SITE_URL should use https:// (found: ${siteUrl})`);
} else {
  ok(`NEXT_PUBLIC_SITE_URL is set to ${siteUrl}`);
}

// 9. Internal link check across articles and static pages
console.log("\n9. Internal links");
const knownRoutes = new Set([
  "/", "/about", "/articles", "/privacy", "/terms", "/disclaimer",
  "/editorial-policy", "/advertising-disclosure", "/contact", "/tools",
  "/tools/resume-checklist-generator", "/tools/salary-estimator",
  "/tools/resume-keyword-matcher", "/tools/job-tracker",
  "/tools/cover-letter", "/tools/headline-optimizer",
  "/tools/interview-prep", "/tools/offer-comparator"
]);
const articleSlugs = new Set(articleFiles.map((f) => f.replace(/\.md$/, "")));
for (const slug of articleSlugs) knownRoutes.add(`/articles/${slug}`);

let brokenLinks = 0;
function checkLinksIn(file, content) {
  const hrefRegex = /href=["'](\/[a-zA-Z0-9\-_/]*)["']/g;
  let m;
  while ((m = hrefRegex.exec(content))) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (!knownRoutes.has(href)) {
      fail(`Broken internal link "${href}" in ${path.relative(ROOT, file)}`);
      brokenLinks++;
    }
  }
}
walk(path.join(ROOT, "app"), [".tsx"], (file) => checkLinksIn(file, fs.readFileSync(file, "utf8")));
walk(path.join(ROOT, "components"), [".tsx"], (file) => checkLinksIn(file, fs.readFileSync(file, "utf8")));
for (const file of articleFiles) {
  checkLinksIn(path.join(articlesDir, file), fs.readFileSync(path.join(articlesDir, file), "utf8"));
}
if (brokenLinks === 0) ok("No broken internal links found among /-prefixed hrefs");

// Summary
console.log("\n========================");
console.log(`Errors:   ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log("\nThis script checks technical readiness only. It does not and cannot replace");
console.log("Google's manual review of content quality, originality, and traffic. See");
console.log("LAUNCH-CHECKLIST.md for the items that require human judgment.\n");

if (errors.length > 0) {
  process.exit(1);
}
