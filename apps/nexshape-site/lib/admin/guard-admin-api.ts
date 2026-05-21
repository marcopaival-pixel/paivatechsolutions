import type { NextResponse } from "next/server";
import { rejectAdminCsrf } from "@/lib/admin/guard-admin-csrf";
import { enforceAdminApiRateLimit } from "@/lib/security/admin-rate-limit";
import { pruneRateLimitBuckets } from "@/lib/security/rate-limit";

export async function guardAdminApiRequest(req: Request): Promise<NextResponse | null> {
  const csrfRejected = rejectAdminCsrf(req);
  if (csrfRejected) return csrfRejected;

  pruneRateLimitBuckets();
  return enforceAdminApiRateLimit(req);
}
