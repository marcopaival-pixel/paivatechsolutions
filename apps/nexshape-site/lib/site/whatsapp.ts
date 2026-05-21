import "server-only";

import { getSiteSettings, type SiteSettings } from "@/lib/db";
import {
  buildWhatsAppUrl,
  digitsOnly,
  formatWhatsAppDisplay,
} from "@/lib/site/whatsapp-utils";

export interface ContactWhatsApp {
  url: string;
  display: string;
}

function digitsFromEnvUrl(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL?.trim();
  if (!raw) return "";
  if (raw.startsWith("http")) {
    try {
      const u = new URL(raw);
      if (u.hostname === "wa.me" || u.hostname === "api.whatsapp.com") {
        return digitsOnly(u.pathname);
      }
    } catch {
      return "";
    }
  }
  return digitsOnly(raw);
}

function resolveDigits(settings: SiteSettings): string {
  const fromAdmin = settings.whatsappPhone ? digitsOnly(settings.whatsappPhone) : "";
  if (fromAdmin.length >= 10) return fromAdmin;

  const fromEnvUrl = digitsFromEnvUrl();
  if (fromEnvUrl.length >= 10) return fromEnvUrl;

  const fromEnvDisplay = digitsOnly(
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY?.trim() || "",
  );
  if (fromEnvDisplay.length >= 10) return fromEnvDisplay;

  return "5511999999999";
}

/** Configuração efetiva: painel admin → variáveis de ambiente → padrão. */
export async function getContactWhatsApp(): Promise<ContactWhatsApp> {
  const settings = await getSiteSettings();
  const phoneDigits = resolveDigits(settings);
  const display =
    settings.whatsappDisplay?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY?.trim() ||
    formatWhatsAppDisplay(phoneDigits);

  return {
    url: buildWhatsAppUrl(phoneDigits),
    display,
  };
}
