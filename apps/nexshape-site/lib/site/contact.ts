import { getContactWhatsApp } from "./whatsapp";

export const CONTACT_EMAIL = "contato@paivatech.com.br";

/** @deprecated Prefira `getContactWhatsApp()` (lê painel admin). */
export async function contactWhatsAppDisplay(): Promise<string> {
  const { display } = await getContactWhatsApp();
  return display;
}

/** @deprecated Prefira `getContactWhatsApp()` (lê painel admin). */
export async function contactWhatsAppUrl(): Promise<string> {
  const { url } = await getContactWhatsApp();
  return url;
}

/** Link wa.me para botões de contato (painel admin → env → padrão). */
export async function contactWhatsAppUrlOrFallback(): Promise<string> {
  const { url } = await getContactWhatsApp();
  return url;
}
