import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/env";

const POLICY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/editorial-policy", label: "Editorial Policy" },
  { href: "/advertising-disclosure", label: "Advertising Disclosure" },
  { href: "/contact", label: "Contact" }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav aria-label="Policy links">
          <ul>
            {POLICY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <button type="button" className="privacy-choices-link" data-role="reopen-cmp">
                Privacy Choices
              </button>
            </li>
          </ul>
        </nav>
        <p className="footer-contact">
          Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} CareerKit AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
