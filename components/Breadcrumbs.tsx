import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

interface BreadcrumbsProps {
  /** Trail after Home, e.g. [{ name: "Guides", path: "/articles" }, { name: article.title }]. */
  items: BreadcrumbItem[];
}

/** Visible breadcrumb nav plus matching BreadcrumbList JSON-LD. Home is prepended automatically. */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={`${item.name}-${index}`}>
                {isLast || !item.path ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
                {!isLast && <span aria-hidden="true"> / </span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
