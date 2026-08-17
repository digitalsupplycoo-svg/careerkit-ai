# CareerKit AI

A Next.js 14 (App Router, TypeScript) site: 22 original career/job-search guides plus three
free, entirely client-side tools (resume checklist generator, salary range estimator, resume
keyword matcher) and a private local-only job application tracker. Built with AdSense
policy-readiness in mind — see `ADSENSE-LAUNCH-CHECKLIST.md` before applying for AdSense.

## Requirements

- Node.js 18+ (built and tested on Node 22)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
# edit .env.local — the existing public AdSense ID is already the code fallback
```

## Local development

```bash
npm run dev
# open http://localhost:3000
```

## Tests

```bash
npm test
```

## Lint

```bash
npm run lint
```

## AdSense technical readiness audit

```bash
npm run audit:adsense
```

This is a technical checklist only — see `ADSENSE-LAUNCH-CHECKLIST.md` for the full picture,
including items that require your own judgment and can't be checked by a script.

## Production build

```bash
npm run build
npm start        # serves the production build locally on :3000, to sanity-check before deploying
```

## Deploying

This is a standard Next.js app (App Router, no special server requirements beyond what Next.js
itself needs — it uses one dynamic route handler for `/ads.txt` and `/robots.txt`/`/sitemap.xml`
generation, so it needs a Node.js server runtime, not a pure static host).

**Vercel (simplest path, same company that makes Next.js):**
```bash
npm install -g vercel
vercel login
vercel          # first deploy, follow the prompts
vercel --prod   # subsequent production deploys
```
Then in the Vercel dashboard, set the environment variables from `.env.example` under
Project Settings → Environment Variables (`NEXT_PUBLIC_SITE_URL` should be your real domain).

**Any other Node host (Render, Railway, Fly.io, a VPS, etc.):**
```bash
npm install
npm run build
npm start        # or: NODE_ENV=production node_modules/.bin/next start -p $PORT
```
Set the same environment variables from `.env.example` in that host's environment configuration
before starting the app.

After deploying, follow `ADSENSE-LAUNCH-CHECKLIST.md` section 4 for the AdSense-specific steps
(setting the real publisher ID, verifying `/ads.txt`, configuring the certified consent tool,
and submitting for review).
