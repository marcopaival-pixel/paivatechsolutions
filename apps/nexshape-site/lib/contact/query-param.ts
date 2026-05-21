import type { ProductInterest } from "./schema";

/** Maps `?produto=` short codes used in UX to OpenAPI enum (English product names). */
const MAP: Record<string, ProductInterest> = {
  f: "Fitness",
  fitness: "Fitness",
  dental: "OralByte",
  d: "OralByte",
  oralbyte: "OralByte",
  ob: "OralByte",
  chat: "Chat",
  c: "Chat",
  zyncora: "Chat",
  kanban: "Kanban",
  kb: "Kanban",
  commerce: "Commerce",
  co: "Commerce",
  credit: "Credit",
  cr: "Credit",
  consultatech: "Credit",
  marketing: "Marketing",
  paivagrowth: "Marketing",
  pg: "Marketing",
  geral: "Outros",
  g: "Outros",
  outros: "Outros",
  outro: "Outros",
  o: "Outros",
};

export function productInterestFromSearchParam(raw: string | undefined): ProductInterest | undefined {
  if (raw === undefined || raw === "") return undefined;
  const k = raw.toLowerCase().trim();
  return MAP[k];
}
