export function contactWhatsAppDisplay(): string {
  return process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY?.trim() || "+55 (11) 99999-9999";
}

export function contactWhatsAppUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL?.trim();
  if (!raw) return null;
  return raw.startsWith("http") ? raw : `https://wa.me/${raw.replace(/\D/g, "")}`;
}

export const CONTACT_EMAIL = "contato@paivatech.com.br";
