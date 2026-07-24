"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/articles", label: "Guides" },
  { href: "/tools/resume-checklist-generator", label: "Resume Checklist" },
  { href: "/tools/salary-estimator", label: "Salary Estimator" },
  { href: "/tools/resume-keyword-matcher", label: "Keyword Matcher" },
  { href: "/tools/job-tracker", label: "Job Tracker" },
  { href: "/about", label: "About" }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          CareerKit AI
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
    </header>
  );
}
