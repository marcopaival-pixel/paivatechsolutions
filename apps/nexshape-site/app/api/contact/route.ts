import { NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/contact/schema";
import { dispatchLead } from "@/lib/contact/dispatch";
import { enforceContactRateLimit } from "@/lib/security/contact-rate-limit";
import { pruneRateLimitBuckets, clientIpFromRequest } from "@/lib/security/rate-limit";
import { isTurnstileEnabled, verifyTurnstileToken } from "@/lib/security/turnstile";

import { DbStorageError, saveLead } from "@/lib/db";

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
    return NextResponse.json({ error: "honeypot" }, { status: 400 });
  }

  if (isTurnstileEnabled()) {
    const rawToken = rec["cfTurnstileToken"];
    const token = typeof rawToken === "string" ? rawToken.trim() : "";
    if (!token) {
      return NextResponse.json(
        { error: "captcha_required", message: "Confirme o CAPTCHA antes de enviar." },
        { status: 400 },
      );
    }
    const valid = await verifyTurnstileToken(token, clientIpFromRequest(req));
    if (!valid) {
      console.warn("[CONTACT_API] Turnstile verification failed", {
        host: req.headers.get("host"),
      });
      return NextResponse.json(
        {
          error: "captcha_failed",
          message:
            "Verificação de segurança falhou. Em localhost, adicione 127.0.0.1 e localhost no widget Turnstile ou remova as chaves do .env.local.",
        },
        { status: 400 },
      );
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
    await saveLead({
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      companyName: parsed.data.companyName,
      productInterest: parsed.data.productInterest,
      message: parsed.data.message,
      sourcePath: parsed.data.sourcePath,
      consentPolicyVersion: parsed.data.consentPolicyVersion,
    });
  } catch (e) {
    console.error("[CONTACT_API] Error saving lead:", e);
    if (e instanceof DbStorageError) {
      return NextResponse.json(
        {
          error: "storage_unavailable",
          message:
            e.code === "redis_required" || e.code === "redis_write_failed"
              ? "Armazenamento indisponível no servidor. A equipe técnica precisa configurar o Redis (Upstash) na Vercel."
              : "Não foi possível registrar o contato no servidor.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        error: "server_error",
        message: "Não foi possível registrar o contato.",
        ...(process.env.NODE_ENV === "development" && e instanceof Error
          ? { detail: e.message }
          : {}),
      },
      { status: 502 },
    );
  }

  try {
    await dispatchLead(parsed.data);
  } catch (e) {
    console.error("[CONTACT_API] Lead saved but dispatch failed:", e);
    // Lead já persistido — não falhar o envio por erro de webhook/CRM
  }

  return NextResponse.json({ ok: true });
}
