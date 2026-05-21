/** Valida URL do webhook CRM (mitiga SSRF se env for comprometido). */
export function assertCrmWebhookUrlAllowed(url: string): void {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("CRM_WEBHOOK_URL invalid");
  }

  if (process.env.NODE_ENV === "production" && parsed.protocol !== "https:") {
    throw new Error("CRM_WEBHOOK_URL must use HTTPS in production");
  }

  const allowedRaw = process.env.CRM_WEBHOOK_ALLOWED_HOSTS?.trim();
  if (!allowedRaw) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CRM_WEBHOOK_ALLOWED_HOSTS required in production");
    }
    return;
  }

  const allowed = allowedRaw
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);

  const host = parsed.hostname.toLowerCase();
  const ok = allowed.some((entry) => host === entry || host.endsWith(`.${entry}`));
  if (!ok) {
    throw new Error(`CRM webhook host not allowed: ${parsed.hostname}`);
  }
}
