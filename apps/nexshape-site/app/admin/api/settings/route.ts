import { NextResponse } from "next/server";
import { guardAdminApiRequest } from "@/lib/admin/guard-admin-api";
import { getSiteSettings, saveSiteSettings } from "@/lib/db";

export async function GET(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (e) {
    console.error("[SETTINGS_API_GET]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao carregar configurações." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const body = await req.json();
    const { portalCentralHost, whatsappPhone, whatsappDisplay } = body;

    const currentSettings = await getSiteSettings();

    const newSettings = await saveSiteSettings({
      ...currentSettings,
      portalCentralHost: typeof portalCentralHost === "string" ? portalCentralHost.trim() : currentSettings.portalCentralHost,
      whatsappPhone: typeof whatsappPhone === "string" ? whatsappPhone.trim() : currentSettings.whatsappPhone,
      whatsappDisplay: typeof whatsappDisplay === "string" ? whatsappDisplay.trim() : currentSettings.whatsappDisplay,
    });

    return NextResponse.json({ ok: true, settings: newSettings });
  } catch (e) {
    console.error("[SETTINGS_API_PUT]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao atualizar configurações." }, { status: 500 });
  }
}
