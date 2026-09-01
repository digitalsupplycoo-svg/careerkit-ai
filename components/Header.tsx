"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFeaturedTool } from "@/lib/tools";

const NAV_LINKS = [
  { href: "/articles", label: "Guides" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" }
];

const SCROLL_SHRINK_THRESHOLD = 24;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const featuredTool = getFeaturedTool();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_SHRINK_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="site-header-inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          CareerKit AI
        </Link>

        <div className="site-header-actions">
          {/* Always visible, even on mobile before the nav is expanded — the
              primary tool CTA should never hide behind the hamburger menu. */}
          <Link href={featuredTool.path} className="btn-primary header-cta">
            Try it free
          </Link>

          <nav aria-label="Main navigation" className="site-nav" data-open={open}>
            <button
              type="button"
              className="mobile-menu-toggle"
              aria-controls="primary-nav"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
            <ul id="primary-nav">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
