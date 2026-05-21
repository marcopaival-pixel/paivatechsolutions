import { NextResponse } from "next/server";
import { guardAdminApiRequest } from "@/lib/admin/guard-admin-api";
import { getSiteSettings, saveSiteSettings } from "@/lib/db";

export const runtime = "nodejs";
import {
  buildWhatsAppUrl,
  formatWhatsAppDisplay,
  sanitizeWhatsAppDisplayInput,
  sanitizeWhatsAppPhoneInput,
} from "@/lib/site/whatsapp-utils";

export async function GET(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const settings = await getSiteSettings();
    const digits = settings.whatsappPhone ?? "";
    return NextResponse.json({
      settings,
      preview: {
        url: digits ? buildWhatsAppUrl(digits) : null,
        display:
          settings.whatsappDisplay ||
          (digits ? formatWhatsAppDisplay(digits) : null),
      },
    });
  } catch (e) {
    console.error("[CONTACT_SETTINGS_GET]", e);
    return NextResponse.json(
      { error: "server_error", message: "Erro ao carregar configurações de contato." },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const body = await req.json();
    const phone = sanitizeWhatsAppPhoneInput(body.whatsappPhone);
    const display = sanitizeWhatsAppDisplayInput(body.whatsappDisplay);

    if (body.whatsappPhone && !phone) {
      return NextResponse.json(
        {
          error: "invalid_phone",
          message: "Informe um telefone válido com DDI (mín. 10 dígitos, ex.: 5511999999999).",
        },
        { status: 422 },
      );
    }

    const settings = await saveSiteSettings({
      whatsappPhone: phone,
      whatsappDisplay: display,
    });

    const digits = settings.whatsappPhone ?? "";
    return NextResponse.json({
      ok: true,
      settings,
      preview: {
        url: digits ? buildWhatsAppUrl(digits) : null,
        display:
          settings.whatsappDisplay ||
          (digits ? formatWhatsAppDisplay(digits) : null),
      },
    });
  } catch (e) {
    console.error("[CONTACT_SETTINGS_PUT]", e);
    return NextResponse.json(
      { error: "server_error", message: "Erro ao salvar configurações de contato." },
      { status: 500 },
    );
  }
}
