import { getProductsDynamic } from "@/lib/db";
import {
  OTHER_PRODUCT_INTEREST,
  type ProductInterestOption,
} from "./product-interest-options";

export async function getProductInterestOptionsForContact(): Promise<ProductInterestOption[]> {
  const products = await getProductsDynamic();
  return [
    ...products.map((p) => ({
      value: p.apiValue,
      label: p.title,
    })),
    {
      value: OTHER_PRODUCT_INTEREST,
      label: "Outros",
      hint: "Parceria, dúvida geral ou assunto fora dos sistemas acima",
    },
  ];
}
