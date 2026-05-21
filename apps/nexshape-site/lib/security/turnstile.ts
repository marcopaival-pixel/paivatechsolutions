export function isTurnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
  );
}

export function turnstileSiteKey(): string | undefined {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;
}

/**
 * @deprecated Use `isTurnstileEnabled()` no servidor e passe `turnstileEnabled` ao ContactForm.
 * Só a site key no cliente não garante validação na API.
 */
export function hasTurnstileSiteKey(): boolean {
  return isTurnstileEnabled();
}

type TurnstileVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

/** Validates Cloudflare Turnstile token server-side. */
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) return false;
  const data = (await res.json()) as TurnstileVerifyResponse;
  return data.success === true;
}
