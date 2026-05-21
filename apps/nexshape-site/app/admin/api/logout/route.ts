import { NextResponse } from "next/server";
import { adminLogout } from "@/lib/admin/auth";
import { clearAdminCsrfCookie } from "@/lib/admin/csrf-cookies";
import { guardAdminApiRequest } from "@/lib/admin/guard-admin-api";

export async function POST(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  await adminLogout();
  await clearAdminCsrfCookie();
  return NextResponse.json({ ok: true });
}
