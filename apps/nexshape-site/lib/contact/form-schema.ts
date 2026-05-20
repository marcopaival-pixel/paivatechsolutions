import { z } from "zod";
import { contactRequestBaseSchema, refineContactPhoneBrazil } from "./schema";

/** Form + resolver: campo “Li a política” vira `consentAccepted` no POST. */
export const contactFormSchema = contactRequestBaseSchema
  .omit({ consentAccepted: true })
  .extend({
    consentPolicy: z.boolean().refine((val) => val === true, {
      message: "É necessário aceitar a política de privacidade.",
    }),
    /** Resolver + RHF: input explícito (evita opcional pelo `.default` do schema da API). */
    website: z.string(),
  })
  .superRefine((data, ctx) => refineContactPhoneBrazil(data, ctx));

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function buildContactApiBody(
  values: ContactFormValues,
  consentPolicyVersion: string,
  cfTurnstileToken?: string,
): unknown {
  return {
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    companyName: values.companyName,
    productInterest: values.productInterest,
    message: values.message,
    website: values.website,
    ...(values.sourcePath?.trim() ? { sourcePath: values.sourcePath.trim() } : {}),
    ...(cfTurnstileToken ? { cfTurnstileToken } : {}),
    consentAccepted: true as const,
    consentPolicyVersion,
  };
}
