import { NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/contact/schema";
import { dispatchLead } from "@/lib/contact/dispatch";
import { enforceContactRateLimit } from "@/lib/security/contact-rate-limit";
import { pruneRateLimitBuckets, clientIpFromRequest } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";

export const runtime = "nodejs";

function issuesFromZod(err: unknown): { path: string; code: string; messagePt?: string }[] {
  const e = err as { issues?: Array<{ path: (string | number)[]; code: string; message?: string }> };
  const issues = Array.isArray(e?.issues) ? e.issues : [];
  return issues.map((i) => ({
    path: i.path.join("."),
    code: String(i.code),
    messagePt: i.message || undefined,
  }));
}

export async function POST(req: Request) {
  pruneRateLimitBuckets();

  const rateLimited = await enforceContactRateLimit(req);
  if (rateLimited) return rateLimited;

  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 15000) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const rec = body as Record<string, unknown>;
  const rawWebsite = rec["website"];
  const websiteStr =
    typeof rawWebsite === "string"
      ? rawWebsite
      : rawWebsite === undefined || rawWebsite === null
        ? ""
        : String(rawWebsite);

  if (websiteStr.length > 0) {
    return NextResponse.json({ error: "server_error" }, { status: 400 });
  }

  if (isTurnstileEnabled()) {
    const rawToken = rec["cfTurnstileToken"];
    const token = typeof rawToken === "string" ? rawToken.trim() : "";
    if (!token) {
      return NextResponse.json({ error: "captcha_required" }, { status: 400 });
    }
    const valid = await verifyTurnstileToken(token, clientIpFromRequest(req));
    if (!valid) {
      return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
    }
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "validation_failed",
        issues: issuesFromZod(parsed.error),
      },
      { status: 422 },
    );
  }

  try {
    await dispatchLead(parsed.data);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
