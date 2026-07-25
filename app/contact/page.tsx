import { CONTACT_EMAIL } from "@/lib/env";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/contact",
  title: "Contact",
  description: "How to reach the CareerKit AI editorial team."
});

export default function ContactPage() {
  return (
    <div className="page-container article-content">
      <Breadcrumbs items={[{ name: "Contact" }]} />
      <h1>Contact</h1>
      <p>
        For corrections, questions about a guide, privacy requests, or general inquiries, email us directly at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We read every message and aim to respond within a
        few business days.
      </p>
      <p>
        Please do not send sensitive personal information such as passwords, government ID numbers, or financial
        account details by email.
      </p>
    </div>
  );
}
