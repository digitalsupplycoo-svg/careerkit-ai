import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getAllCategories, getArticleSlugs } from "@/lib/articles";
import { SESSION_COOKIE_NAME, isSessionValueValid } from "@/lib/adminAuth";
import NewPostForm from "@/components/admin/NewPostForm";
import LogoutButton from "./LogoutButton";

export default async function NewPostPage() {
  // Middleware already guards this route, but a Server Component that reads
  // and writes real content should never rely solely on middleware — this is
  // the "server-side check on the admin routes" the brief also asks for,
  // kept here as defense in depth.
  const session = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!(await isSessionValueValid(session))) {
    redirect("/admin/login");
  }

  const categories = getAllCategories();
  const existingSlugs = getArticleSlugs();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-2)" }}>
        <h1>New Post</h1>
        <LogoutButton />
      </div>
      <p className="meta-text">
        Publishing commits a new file directly to the <code>main</code> branch of the site&apos;s GitHub repo. It
        goes live once your host&apos;s auto-deploy picks up that commit — usually within a minute or two, not
        instantly.
      </p>
      <NewPostForm categories={categories} existingSlugs={existingSlugs} />
    </div>
  );
}
