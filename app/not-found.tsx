import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container article-content">
      <h1>Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <p>
        <Link href="/">Return home</Link> or browse <Link href="/articles">all guides</Link>.
      </p>
    </div>
  );
}
