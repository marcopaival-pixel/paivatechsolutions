import { NextResponse } from "next/server";
import { adminLogin, isAdminPanelMisconfigured } from "@/lib/admin/auth";
import { generateCsrfToken } from "@/lib/admin/csrf";
import { setAdminCsrfCookie } from "@/lib/admin/csrf-cookies";
import { enforceAdminLoginRateLimit } from "@/lib/security/admin-rate-limit";
import { pruneRateLimitBuckets } from "@/lib/security/rate-limit";

export async function POST(req: Request) {
  pruneRateLimitBuckets();

  const rateLimited = await enforceAdminLoginRateLimit(req);
  if (rateLimited) return rateLimited;

  if (isAdminPanelMisconfigured()) {
    return NextResponse.json(
      {
        error: "misconfigured",
        message: "Painel admin não configurado (ADMIN_PASSWORD e SESSION_SECRET em produção).",
      },
      { status: 503 },
    );
  }

  try {
    let body: { password?: string };
    try {
      body = (await req.json()) as { password?: string };
    } catch {
      return NextResponse.json({ error: "invalid_json", message: "JSON inválido." }, { status: 400 });
    }
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "missing_password", message: "Senha obrigatória." }, { status: 400 });
    }

    const success = await adminLogin(password);
    if (success) {
      const csrfToken = generateCsrfToken();
      await setAdminCsrfCookie(csrfToken);
      return NextResponse.json({ ok: true, csrfToken });
    }

    return NextResponse.json({ error: "invalid_password", message: "Senha incorreta." }, { status: 401 });
  } catch (e) {
    console.error("[LOGIN_API]", e);
    return NextResponse.json({ error: "server_error", message: "Erro no servidor." }, { status: 500 });
  }
}
