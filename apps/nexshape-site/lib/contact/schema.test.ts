import { describe, expect, it } from "vitest";
import { contactRequestSchema } from "./schema";

const validPayload = {
  fullName: "Maria Silva",
  email: "maria@empresa.com.br",
  phone: "(11) 98765-4321",
  companyName: "Empresa Exemplo LTDA",
  productInterest: "Fitness",
  message: "Gostaria de uma demonstração do sistema.",
  consentAccepted: true as const,
  website: "",
};

describe("contactRequestSchema", () => {
  it("accepts valid payload", () => {
    const result = contactRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects honeypot filled", () => {
    const result = contactRequestSchema.safeParse({ ...validPayload, website: "spam" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid phone", () => {
    const result = contactRequestSchema.safeParse({ ...validPayload, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects missing consent", () => {
    const result = contactRequestSchema.safeParse({ ...validPayload, consentAccepted: false });
    expect(result.success).toBe(false);
  });
});
