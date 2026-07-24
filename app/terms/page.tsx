import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/env";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of CareerKit AI's guides and tools."
};

export default function TermsPage() {
  return (
    <div className="page-container article-content">
      <h1>Terms of Service</h1>
      <p>Last updated: 2026-07-24</p>

      <h2>Using this site</h2>
      <p>
        CareerKit AI provides free educational content and self-service tools related to job searching and career
        development. By using this site you agree to use it only for lawful purposes and not to misuse, scrape at
        scale, or attempt to disrupt the service.
      </p>

      <h2>No professional advice</h2>
      <p>
        Content and tools on this site are educational and general in nature. They are not financial, tax, legal,
        or employment advice, and do not guarantee any job search or negotiation outcome. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for more detail.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Guides published on CareerKit AI are original content owned by CareerKit AI unless otherwise noted. You
        may link to our pages and quote brief excerpts with attribution; you may not republish full guides
        without permission.
      </p>

      <h2>Third-party links and advertising</h2>
      <p>
        Some pages may link to third-party sites or, once approved, display advertising served by Google. We are
        not responsible for the content or practices of third-party sites.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted by
        law, CareerKit AI is not liable for decisions made based on content or tools on this site.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes means you accept the
        revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </div>
  );
}
