import { PRODUCT_DEFINITIONS } from "@/lib/config/products";

/** Assunto fora dos sistemas listados — triagem fica a critério da equipe/IA. */
export const OTHER_PRODUCT_INTEREST = "Outros" as const;

export type ProductInterestOption = {
  value: string;
  label: string;
  hint?: string;
};

export const PRODUCT_INTEREST_OPTIONS: ProductInterestOption[] = [
  ...PRODUCT_DEFINITIONS.map((product) => ({
    value: product.apiValue,
    label: product.title,
  })),
  {
    value: OTHER_PRODUCT_INTEREST,
    label: "Outros",
    hint: "Parceria, dúvida geral ou assunto fora dos sistemas acima",
  },
] as const;
