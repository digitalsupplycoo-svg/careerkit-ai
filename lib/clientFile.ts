// Small browser-only helpers shared by the generator tools (cover letter,
// headline optimizer, etc.) so each component doesn't reimplement the same
// download/copy boilerplate. Nothing here talks to a server.

import { slugify } from "@/lib/slug";

/** Triggers a browser download of `content` as a plain-text file named `filename`. */
export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies `text` to the clipboard, preferring the modern async Clipboard API
 * and falling back to a hidden-textarea `execCommand` for browsers/contexts
 * (e.g. non-HTTPS, older Safari) where `navigator.clipboard` isn't available.
 * Returns whether the copy is believed to have succeeded.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy path below
    }
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    return succeeded;
  } catch {
    return false;
  }
}

/** Turns a free-text label into a safe-ish filename fragment (lowercase, hyphenated). */
export function slugifyForFilename(label: string): string {
  return slugify(label, "download");
}
