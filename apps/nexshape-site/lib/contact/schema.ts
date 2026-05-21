import { z } from "zod";

import { PRODUCT_API_VALUES } from "../config/products";
import { OTHER_PRODUCT_INTEREST } from "./product-interest-options";

export const productInterestEnum = z.enum([
  ...PRODUCT_API_VALUES,
  OTHER_PRODUCT_INTEREST,
] as unknown as [string, ...string[]]);
export type ProductInterest = z.infer<typeof productInterestEnum>;

/** Base do JSON POST /api/contact (Zod v4: sem refine — permite `.omit()` no formulário). */
export const contactRequestBaseSchema = z
  .object({
    fullName: z.string().trim().min(2, "Nome muito curto.").max(200),
    email: z.string().trim().email("E-mail inválido.").max(320),
    phone: z.string().trim().max(32),
    companyName: z.string().trim().min(2, "Informe o nome da empresa.").max(200),
    productInterest: productInterestEnum,
    message: z.string().trim().min(10, "Mensagem muito curta (mínimo 10 caracteres).").max(8000),
    consentAccepted: z.literal(true),
    consentPolicyVersion: z.string().max(64).optional(),
    /** Honeypot: deve permanecer vazio (campo oculto no markup). */
    website: z.string().default(""),
    sourcePath: z.string().max(512).optional(),
    /** Cloudflare Turnstile — validado na rota quando CAPTCHA está ativo. */
    cfTurnstileToken: z.string().optional(),
  })
  .strict();

export function refineContactPhoneBrazil(data: { phone: string }, ctx: z.RefinementCtx): void {
  const digits = data.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Informe um telefone válido (Brasil).",
    });
  }
}

/** Public JSON body POST /api/contact — aligned com OpenAPI Fabrica. */
export const contactRequestSchema = contactRequestBaseSchema.superRefine((data, ctx) =>
  refineContactPhoneBrazil(data, ctx),
);

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export function normalizeLeadForOutbound(data: ContactRequest) {
  return {
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    companyName: data.companyName.trim(),
    productInterest: data.productInterest,
    message: data.message.trim(),
    consentAcceptedAt: new Date().toISOString(),
    consentPolicyVersion: data.consentPolicyVersion ?? null,
    sourcePath: data.sourcePath ?? null,
    locale: "pt-BR" as const,
  };
}
