import { SITE_URL, CONTACT_EMAIL } from "@/lib/env";
import { TOOLS } from "@/lib/tools";

export const dynamic = "force-static";

export async function GET() {
  const tools = TOOLS.map((tool) => `- ${tool.name}: ${SITE_URL}${tool.path}`).join("\n");
  const body = `# CareerKit AI

> CareerKit AI publishes practical career guides and free browser-based tools for job seekers.

## Free tools

${tools}

## Public resources

- Career guide library: ${SITE_URL}/articles
- About CareerKit AI: ${SITE_URL}/about
- Editorial policy and corrections: ${SITE_URL}/editorial-policy
- Tool and content limitations: ${SITE_URL}/disclaimer
- Privacy policy: ${SITE_URL}/privacy
- Advertising disclosure: ${SITE_URL}/advertising-disclosure
- Contact: ${CONTACT_EMAIL}

The tools run in the visitor's browser. Their methodology and limitations are explained on each tool page.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
