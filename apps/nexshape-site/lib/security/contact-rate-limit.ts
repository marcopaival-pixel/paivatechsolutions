import { NextResponse } from "next/server";
import { checkMemoryRateLimit, clientIpFromRequest } from "./rate-limit";

export async function enforceContactRateLimit(req: Request): Promise<NextResponse | null> {
  const ip = clientIpFromRequest(req);
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (upstashUrl && upstashToken) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url: upstashUrl, token: upstashToken });
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "nexshape:contact",
    });
    const { success, reset } = await ratelimit.limit(ip);
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return NextResponse.json(
        { error: "rate_limit_exceeded" },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
    return null;
  }

  const { allowed, retryAfterSec } = checkMemoryRateLimit(`contact:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      { error: "rate_limit_exceeded" },
      {
        status: 429,
        headers: retryAfterSec ? { "Retry-After": String(retryAfterSec) } : undefined,
      },
    );
  }
  return null;
}
