import { normalizeLeadForOutbound, type ContactRequest } from "./schema";
import { redactEmail, redactPhone } from "@/lib/security/redact";

/**
 * Dispatches validated lead downstream.
 * Env: LEAD_DISPATCH_MODE = noop_preview | webhook (default noop_preview).
 */
export async function dispatchLead(data: ContactRequest): Promise<void> {
  const mode = (process.env.LEAD_DISPATCH_MODE ?? "noop_preview").trim();

  const payload = normalizeLeadForOutbound(data);

  if (mode === "noop_preview") {
    console.info("[contact] noop_preview dispatch", {
      email: redactEmail(payload.email),
      phone: redactPhone(payload.phone),
      productInterest: payload.productInterest,
    });
    return;
  }

  if (mode === "webhook") {
    const url = process.env.CRM_WEBHOOK_URL?.trim();
    if (!url) {
      throw new Error("CRM_WEBHOOK_URL missing for webhook mode");
    }
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const key = process.env.CRM_API_KEY?.trim();
    if (key) headers.Authorization = `Bearer ${key}`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      redirect: "manual",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) {
      const bodyPreview = (await res.text().catch(() => "")).slice(0, 200);
      console.error("[contact] CRM webhook failed", {
        status: res.status,
        productInterest: payload.productInterest,
        bodyPreview: bodyPreview || undefined,
      });
      throw new Error(`CRM ${res.status}`);
    }
    console.info("[contact] webhook dispatch ok", {
      productInterest: payload.productInterest,
      email: redactEmail(payload.email),
    });
    return;
  }

  console.warn("[contact] unknown LEAD_DISPATCH_MODE", mode);
  throw new Error("Invalid LEAD_DISPATCH_MODE");
}
