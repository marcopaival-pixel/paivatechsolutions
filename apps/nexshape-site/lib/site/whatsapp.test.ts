import { describe, expect, it } from "vitest";

import {
  buildWhatsAppUrl,
  formatWhatsAppDisplay,
  sanitizeWhatsAppDisplayInput,
  sanitizeWhatsAppPhoneInput,
} from "./whatsapp-utils";

describe("whatsapp", () => {
  it("sanitizes valid phone digits", () => {
    expect(sanitizeWhatsAppPhoneInput("5511987654321")).toBe("5511987654321");
    expect(sanitizeWhatsAppPhoneInput("+55 (11) 98765-4321")).toBe("5511987654321");
  });

  it("rejects too short phone", () => {
    expect(sanitizeWhatsAppPhoneInput("123")).toBeUndefined();
  });

  it("builds wa.me url", () => {
    expect(buildWhatsAppUrl("5511987654321")).toBe("https://wa.me/5511987654321");
  });

  it("formats brazil display", () => {
    expect(formatWhatsAppDisplay("5511987654321")).toBe("+55 (11) 98765-4321");
  });

  it("sanitizes display text", () => {
    expect(sanitizeWhatsAppDisplayInput("  +55 (11) 99999-9999  ")).toBe("+55 (11) 99999-9999");
  });
});
