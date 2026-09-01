/**
 * Internal, self-imposed floor — NOT a published Google/AdSense word-count
 * requirement (Google publishes no such number). Articles below this length
 * never carry an ad slot (see app/articles/[slug]/page.tsx). Kept as a single
 * shared constant so the live article page and the admin New Post form's
 * live word-count warning can never drift apart.
 */
export const MIN_WORDS_INTERNAL_SAFEGUARD = 350;
