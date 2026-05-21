/** Funções puras — seguras para Client Components (sem fs/db). */

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatWhatsAppDisplay(digits: string): string {
  const d = digitsOnly(digits);
  if (d.length < 12 || !d.startsWith("55")) {
    return d.length > 0 ? `+${d}` : "";
  }
  const local = d.slice(2);
  if (local.length === 11) {
    return `+55 (${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`;
  }
  if (local.length === 10) {
    return `+55 (${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`;
  }
  return `+${d}`;
}

export function buildWhatsAppUrl(digits: string): string {
  return `https://wa.me/${digitsOnly(digits)}`;
}

export function sanitizeWhatsAppPhoneInput(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const digits = digitsOnly(value.trim());
  if (digits.length < 10 || digits.length > 15) return undefined;
  return digits;
}

export function sanitizeWhatsAppDisplayInput(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, 40) : undefined;
}
