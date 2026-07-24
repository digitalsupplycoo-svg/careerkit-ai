import { adsTxtPublisherId } from "@/lib/env";

// Serves /ads.txt as plain text, HTTP 200, no auth required.
// Never invents a publisher ID: emits nothing but a comment until a real one is set.
export async function GET() {
  const pubId = adsTxtPublisherId();

  const body = pubId
    ? `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`
    : `# No AdSense publisher ID configured yet.
# Once you have a real ID from AdSense, set NEXT_PUBLIC_ADSENSE_CLIENT
# (format: ca-pub-XXXXXXXXXXXXXXXX) and this file will automatically
# serve: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
