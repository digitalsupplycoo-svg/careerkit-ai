import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, isSessionValueValid } from "@/lib/adminAuth";

// Gates every /admin/* route except the login page itself behind a valid,
// signed session cookie. Runs on the Edge runtime by default (Next.js
// middleware), which is why lib/adminAuth.ts is built on Web Crypto rather
// than Node's `crypto` module — both are needed here and in Server Actions.
export const config = {
  matcher: ["/admin/:path*"]
};

export async function middleware(request: NextRequest) {
  // The login page (and the server action it posts to, same URL) must stay
  // reachable without a session — otherwise nobody could ever log in.
  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const valid = await isSessionValueValid(cookie);

  if (!valid) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
