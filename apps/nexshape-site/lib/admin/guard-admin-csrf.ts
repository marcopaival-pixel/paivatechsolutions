import { NextResponse } from "next/server";

import { verifyAdminCsrf } from "./csrf";

export function rejectAdminCsrf(req: Request): NextResponse | null {
  if (verifyAdminCsrf(req)) return null;

  return NextResponse.json(
    { error: "csrf_invalid", message: "Token de segurança inválido. Atualize a página e tente novamente." },
    { status: 403 },
  );
}
