// Shared slug logic — used by the client-side download-filename helper
// (lib/clientFile.ts) and by the admin New Post form/action, so slug rules
// stay identical everywhere a slug is generated or validated.

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Lowercases, strips anything that isn't a-z/0-9, and hyphenates the rest. */
export function slugify(input: string, fallback = "untitled"): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

/** True only for a slug already in the exact lowercase-hyphenated shape `slugify` produces. */
export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}
