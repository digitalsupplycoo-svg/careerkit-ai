import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description: "How and where CareerKit AI plans to display advertising, and how it is labeled."
};

export default function AdvertisingDisclosurePage() {
  return (
    <div className="page-container article-content">
      <h1>Advertising Disclosure</h1>
      <p>
        CareerKit AI intends to display contextual display advertising served through Google AdSense once the
        site has been reviewed and approved for that program. This page explains how that advertising works.
      </p>

      <h2>Labeling</h2>
      <p>
        Any advertising unit on this site is clearly labeled &quot;Advertisement&quot; and is visually
        distinguishable from our editorial content, navigation, and tools.
      </p>

      <h2>Where ads do not appear</h2>
      <p>
        We do not place ads on our Privacy Policy, Terms, Disclaimer, Contact, error pages, empty tool states, the
        Job Application Tracker (which shows your private local data), or any page that does not yet have
        substantial original content.
      </p>

      <h2>No influence over content</h2>
      <p>
        Advertisers do not review, approve, or influence the content of our guides. We do not accept payment to
        write about a specific product or service within a guide.
      </p>

      <h2>Your ad choices</h2>
      <p>
        You can manage ad personalization through Google&apos;s advertising settings, and, where applicable, a
        certified consent management platform on this site. See our <a href="/privacy">Privacy Policy</a> for
        details.
      </p>
    </div>
  );
}
