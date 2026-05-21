import type { ProductAppAccessMode, ProductCustomization } from "@/lib/db";

const ABSOLUTE_URL = /^https?:\/\//i;

function trimHost(value: string | undefined): string {
  return (value ?? "").trim().replace(/\/+$/, "");
}

export function getAppDomainProduction(): string {
  return process.env.NEXT_PUBLIC_APP_DOMAIN_PRODUCTION?.trim() || "paivatech.com.br";
}

export function getAppDomainDevelopment(): string {
  return process.env.NEXT_PUBLIC_APP_DOMAIN_DEVELOPMENT?.trim() || "localhost:8000";
}

/** Override global (ex.: testes locais) — production | development */
export function getForcedAppAccessMode(): ProductAppAccessMode | null {
  const raw = process.env.NEXT_PUBLIC_FORCE_APP_ACCESS_MODE?.trim().toLowerCase();
  if (raw === "production" || raw === "development") return raw;
  return null;
}

export function resolveActiveAppAccessMode(
  product: Pick<ProductCustomization, "appAccessMode">,
): ProductAppAccessMode {
  return getForcedAppAccessMode() ?? product.appAccessMode ?? "production";
}

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".localhost");
}

function hostAllowed(hostname: string): boolean {
  const extra = process.env.APP_REDIRECT_ALLOWED_HOSTS?.trim();
  const allowed = new Set([
    "paivatech.com.br",
    "nexshape.com.br",
    "zyncora.com.br",
    ...getAppDomainProduction().split(",").map((h) => h.trim()),
    ...getAppDomainDevelopment().split(",").map((h) => h.trim().split(":")[0]),
    ...(extra ? extra.split(",").map((h) => h.trim()) : []),
  ]);

  if (isLocalHost(hostname)) return process.env.NODE_ENV !== "production";

  for (const base of allowed) {
    if (!base) continue;
    if (hostname === base || hostname.endsWith(`.${base}`)) return true;
  }
  return false;
}

function validateResolvedUrl(url: string, mode: ProductAppAccessMode): string | null {
  try {
    const parsed = new URL(url);
    if (!hostAllowed(parsed.hostname)) return null;
    if (mode === "production" && process.env.NODE_ENV === "production" && parsed.protocol !== "https:") {
      if (!isLocalHost(parsed.hostname)) return null;
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

/** Converte subdomínio ou URL parcial em URL absoluta. */
export function buildAppUrlFromHostInput(
  input: string | undefined,
  mode: ProductAppAccessMode,
): string | null {
  const raw = trimHost(input);
  if (!raw) return null;

  if (ABSOLUTE_URL.test(raw)) {
    return validateResolvedUrl(raw, mode);
  }

  if (mode === "production") {
    const domain = getAppDomainProduction();
    if (raw.includes(".") && !raw.includes("/")) {
      return validateResolvedUrl(`https://${raw}`, mode);
    }
    return validateResolvedUrl(`https://${raw}.${domain}`, mode);
  }

  // development
  if (raw.includes("localhost") || raw.includes(":") || /^\d+\.\d+\.\d+\.\d+/.test(raw)) {
    const withScheme = raw.startsWith("http") ? raw : `http://${raw}`;
    return validateResolvedUrl(withScheme, mode);
  }

  const devDomain = getAppDomainDevelopment();
  if (devDomain.includes("localhost") || devDomain.includes(":")) {
    return validateResolvedUrl(`http://${devDomain}`, mode);
  }

  if (raw.includes(".") && !raw.includes("/")) {
    return validateResolvedUrl(`http://${raw}`, mode);
  }
  return validateResolvedUrl(`http://${raw}.${devDomain}`, mode);
}

/** URL ativa do sistema para o produto (null = botão oculto). */
export function resolveProductAppUrl(
  product: Pick<
    ProductCustomization,
    "appHostProduction" | "appHostDevelopment" | "appAccessMode"
  >,
): string | null {
  const mode = resolveActiveAppAccessMode(product);
  const host =
    mode === "development" ? product.appHostDevelopment : product.appHostProduction;
  return buildAppUrlFromHostInput(host, mode);
}

export function previewProductAppUrls(product: Pick<
  ProductCustomization,
  "appHostProduction" | "appHostDevelopment" | "appAccessMode"
>): { production: string | null; development: string | null; active: string | null; activeMode: ProductAppAccessMode } {
  const activeMode = resolveActiveAppAccessMode(product);
  const production = buildAppUrlFromHostInput(product.appHostProduction, "production");
  const development = buildAppUrlFromHostInput(product.appHostDevelopment, "development");
  const active = activeMode === "development" ? development : production;
  return { production, development, active, activeMode };
}
