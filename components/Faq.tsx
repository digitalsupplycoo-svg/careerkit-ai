import JsonLd from "@/components/JsonLd";
import { faqSchema, type FaqItem } from "@/lib/schema";

interface FaqProps {
  items: FaqItem[];
  heading?: string;
}

/** Renders visible Q&A and matching FAQPage JSON-LD from the same data, so they can't drift apart. */
export default function Faq({ items, heading = "Frequently asked questions" }: FaqProps) {
  return (
    <div>
      <h2>{heading}</h2>
      <div className="faq-list">
        {items.map((item) => (
          <div className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      <JsonLd data={faqSchema(items)} />
    </div>
  );
}
