import "server-only";

import { cookies } from "next/headers";

import { CSRF_COOKIE_NAME } from "./csrf";

export async function setAdminCsrfCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAdminCsrfCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CSRF_COOKIE_NAME);
}
