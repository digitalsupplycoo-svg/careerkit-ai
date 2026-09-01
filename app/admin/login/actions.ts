"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, createSessionValue, verifyPassword } from "@/lib/adminAuth";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { error: "Admin login isn't configured on the server yet (ADMIN_PASSWORD is not set)." };
  }

  // Keyed by client IP where available; falls back to a single shared bucket
  // if the platform doesn't forward one (still better than no limit at all).
  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = checkRateLimit(`login:${ip}`);
  if (!rateLimit.allowed) {
    const minutes = Math.max(1, Math.ceil((rateLimit.retryAfterSeconds ?? 60) / 60));
    return { error: `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` };
  }

  const entered = String(formData.get("password") ?? "");
  const valid = await verifyPassword(entered, adminPassword);
  if (!valid) {
    return { error: "Incorrect password." };
  }

  resetRateLimit(`login:${ip}`);

  const sessionValue = await createSessionValue();
  cookies().set(SESSION_COOKIE_NAME, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS
  });

  redirect("/admin/new-post");
}

export async function logoutAction(): Promise<void> {
  cookies().set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0
  });
  redirect("/admin/login");
}
