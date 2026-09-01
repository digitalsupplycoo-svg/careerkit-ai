import { redirect } from "next/navigation";

// Bare /admin has no page of its own — send it straight to the one admin
// screen that exists. Middleware still enforces the session check on this
// path before it ever reaches this redirect.
export default function AdminIndexPage() {
  redirect("/admin/new-post");
}
