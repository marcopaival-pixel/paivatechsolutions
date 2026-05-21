export const CSRF_COOKIE_NAME = "paivatech_admin_csrf";
export const CSRF_HEADER_NAME = "x-admin-csrf";

export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

export function readCsrfFromRequest(req: Request): string | null {
  const header = req.headers.get(CSRF_HEADER_NAME)?.trim();
  if (header) return header;

  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === CSRF_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }
  return null;
}

/** Valida token CSRF em mutações admin (double-submit: header deve igualar cookie). */
export function verifyAdminCsrf(req: Request): boolean {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return true;
  }

  const header = req.headers.get(CSRF_HEADER_NAME)?.trim();
  if (!header || header.length < 16) return false;

  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookieMatch = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`),
  );
  const cookieToken = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;

  return cookieToken === header;
}
