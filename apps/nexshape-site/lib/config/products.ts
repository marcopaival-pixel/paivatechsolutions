/** 
 * Source of truth for NexShape product suite.
 * Aligned with Fabrica OpenAPI enums and marketing slugs.
 */

export const PRODUCT_DEFINITIONS = [
  {
    slug: "fitness",
    apiValue: "Fitness",
    navLabel: "NexShape Saúde & Performance",
    title: "NexShape Saúde & Performance",
    short: "Sistema completo para gestão de treinos, avaliações físicas, bioimpedância, dietas e acompanhamento da evolução corporal dos alunos.",
  },
  {
    slug: "dental",
    apiValue: "OralByte",
    navLabel: "OralByte",
    title: "OralByte",
    short: "Organize recepção, agenda e administrativo da sua clínica odontológica com foco em produtividade.",
  },
  {
    slug: "chat",
    apiValue: "Chat",
    navLabel: "Zyncora Chatbox",
    title: "Zyncora · IA Conversacional",
    short: "Central de atendimento inteligente com IA generativa, RAG, integração oficial WhatsApp e CRM completo.",
  },
  {
    slug: "credit",
    apiValue: "Credit",
    navLabel: "ConsultaTech",
    title: "ConsultaTech",
    short: "Plataforma de consultas cadastrais de CPF/CNPJ, histórico veicular e suporte a decisões de crédito com carteira digital de saldo, PIX automático, auditoria de dados e integração de API.",
  },
  {
    slug: "kanban",
    apiValue: "Kanban",
    navLabel: "KanbaPaiva",
    title: "KanbaPaiva · Gestão Ágil",
    short: "Plataforma de gestão de tarefas e fluxos de trabalho inspirada no método Kanban, com dashboards de atividade e colaboração em tempo real.",
  },
  {
    slug: "commerce",
    apiValue: "Commerce",
    navLabel: "PaivaTech Commerce",
    title: "PaivaTech Commerce",
    short: "Sistema completo de gestão comercial e de vendas multi-tenant para restaurantes, cafeterias e comércio em geral, com PDV frente de caixa, KDS e comandas eletrônicas.",
  },
  {
    slug: "marketing",
    apiValue: "Marketing",
    navLabel: "PaivaGrowth AI",
    title: "PaivaGrowth AI",
    short: "Plataforma completa de automação de marketing com CRM de vendas, chatbot IA generativa (RAG) e fluxos automatizados de atendimento.",
  },
] as const;

export const PRODUCT_SLUGS = PRODUCT_DEFINITIONS.map((p) => p.slug);
export const PRODUCT_API_VALUES = PRODUCT_DEFINITIONS.map((p) => p.apiValue);

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];
export type ProductApiValue = (typeof PRODUCT_API_VALUES)[number];

export function isProductSlug(s: string): s is ProductSlug {
  return (PRODUCT_SLUGS as readonly string[]).includes(s);
}

export function getProductBySlug(slug: string) {
  return PRODUCT_DEFINITIONS.find((p) => p.slug === slug);
}
