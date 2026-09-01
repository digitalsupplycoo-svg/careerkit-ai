import type { Metadata } from "next";

// Deliberately NOT using lib/pageMetadata.ts's buildMetadata() helper here —
// that helper builds canonical/OpenGraph/Twitter tags meant for real public
// content. Admin pages are internal tooling: noindex, no canonical, no social
// preview, and (per the brief) never any ad content anywhere under /admin.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="page-container">{children}</div>;
}
