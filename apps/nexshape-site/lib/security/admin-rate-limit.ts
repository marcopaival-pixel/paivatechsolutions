import { NextResponse } from "next/server";
import { checkMemoryRateLimit, clientIpFromRequest } from "./rate-limit";

export async function enforceAdminLoginRateLimit(req: Request): Promise<NextResponse | null> {
  const ip = clientIpFromRequest(req);
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: upstashUrl, token: upstashToken });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "nexshape:admin-login",
    });
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return NextResponse.json(
        { error: "rate_limit_exceeded", message: "Muitas tentativas. Aguarde e tente novamente." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
    return null;
  }

  const { allowed, retryAfterSec } = checkMemoryRateLimit(`admin-login:${ip}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "rate_limit_exceeded", message: "Muitas tentativas. Aguarde e tente novamente." },
      {
        status: 429,
        headers: retryAfterSec ? { "Retry-After": String(retryAfterSec) } : undefined,
      },
    );
  }
  return null;
}

/** Limite para APIs admin autenticadas (mutações e leitura intensiva). */
export async function enforceAdminApiRateLimit(req: Request): Promise<NextResponse | null> {
  const ip = clientIpFromRequest(req);
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: upstashUrl, token: upstashToken });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      prefix: "nexshape:admin-api",
    });
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return NextResponse.json(
        { error: "rate_limit_exceeded", message: "Muitas requisições. Aguarde e tente novamente." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
    return null;
  }

  const { allowed, retryAfterSec } = checkMemoryRateLimit(`admin-api:${ip}`, 60, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "rate_limit_exceeded", message: "Muitas requisições. Aguarde e tente novamente." },
      {
        status: 429,
        headers: retryAfterSec ? { "Retry-After": String(retryAfterSec) } : undefined,
      },
    );
  }
  return null;
}
