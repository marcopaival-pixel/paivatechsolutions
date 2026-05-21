import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from "@/lib/admin/csrf";

export function getAdminCsrfTokenFromDocument(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CSRF_COOKIE_NAME}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function adminRequestInit(init?: RequestInit): RequestInit {
  const method = (init?.method ?? "GET").toUpperCase();
  const headers = new Headers(init?.headers);

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const csrf = getAdminCsrfTokenFromDocument();
    if (csrf) headers.set(CSRF_HEADER_NAME, csrf);
  }

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return {
    ...init,
    credentials: "same-origin",
    headers,
  };
}

export async function adminFetch(url: string, init?: RequestInit): Promise<Response> {
  return fetch(url, adminRequestInit(init));
}
