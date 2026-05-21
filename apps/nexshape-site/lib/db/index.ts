import fs from "fs/promises";
import os from "os";
import path from "path";

export class DbStorageError extends Error {
  readonly code: "redis_write_failed" | "file_write_failed" | "redis_required";

  constructor(code: DbStorageError["code"], message: string) {
    super(message);
    this.name = "DbStorageError";
    this.code = code;
  }
}

function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

/** Em serverless o cwd é somente leitura; usar /tmp. Localmente: db.json no projeto. */
function localDbPath(): string {
  if (isVercelRuntime()) {
    return path.join(os.tmpdir(), "nexshape-site-db.json");
  }
  return path.join(process.cwd(), "db.json");
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  productInterest: string;
  message: string;
  status: "novo" | "atendimento" | "convertido" | "perdido";
  createdAt: string;
  sourcePath?: string;
  consentPolicyVersion?: string;
}

export type ProductAppAccessMode = "production" | "development";

export interface ProductCustomization {
  slug: string;
  apiValue: string;
  navLabel: string;
  title: string;
  short: string;
  badge?: string;
  /** Subdomínio ou URL completa do app em produção (ex.: `fitness` ou `https://fitness.paivatech.com.br`) */
  appHostProduction?: string;
  /** Host de desenvolvimento (ex.: `localhost:8000`) */
  appHostDevelopment?: string;
  /** Qual URL o site usa nos botões "Acessar sistema" */
  appAccessMode?: ProductAppAccessMode;
}

export interface SiteSettings {
  /** Apenas dígitos, com DDI (ex.: 5511999999999) */
  whatsappPhone?: string;
  /** Texto exibido no site (ex.: +55 (11) 99999-9999) */
  whatsappDisplay?: string;
}

// Default product definitions (mirrored from lib/config/products.ts)
const DEFAULT_PRODUCTS: ProductCustomization[] = [
  {
    slug: "fitness",
    apiValue: "Fitness",
    navLabel: "NexShape Saúde & Performance",
    title: "NexShape Saúde & Performance",
    short: "Sistema completo para gestão de treinos, avaliações físicas, bioimpedância, dietas e acompanhamento da evolução corporal dos alunos.",
    badge: "Premium",
  },
  {
    slug: "dental",
    apiValue: "OralByte",
    navLabel: "OralByte",
    title: "OralByte",
    short: "Organize recepção, agenda e administrativo da sua clínica odontológica com foco em produtividade.",
    badge: "Novo",
  },
  {
    slug: "chat",
    apiValue: "Chat",
    navLabel: "Zyncora Chatbox",
    title: "Zyncora · IA Conversacional",
    short: "Central de atendimento inteligente com IA generativa, RAG, integração oficial WhatsApp e CRM completo.",
    badge: "IA",
  },
  {
    slug: "credit",
    apiValue: "Credit",
    navLabel: "ConsultaTech",
    title: "ConsultaTech",
    short: "Plataforma de consultas cadastrais de CPF/CNPJ, histórico veicular e suporte a decisões de crédito com carteira digital de saldo, PIX automático, auditoria de dados e integração de API.",
    badge: "Novidade",
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
    badge: "IA",
  },
];

interface DbSchema {
  leads: Lead[];
  products: ProductCustomization[];
  siteSettings?: SiteSettings;
}

function normalizeSiteSettings(raw: unknown): SiteSettings {
  if (!raw || typeof raw !== "object") return {};
  const s = raw as SiteSettings;
  return {
    whatsappPhone:
      typeof s.whatsappPhone === "string" && s.whatsappPhone.trim()
        ? s.whatsappPhone.trim()
        : undefined,
    whatsappDisplay:
      typeof s.whatsappDisplay === "string" && s.whatsappDisplay.trim()
        ? s.whatsappDisplay.trim()
        : undefined,
  };
}

async function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token) {
    try {
      const { Redis } = await import("@upstash/redis");
      return new Redis({ url, token });
    } catch (e) {
      console.error("[DB] Failed to load Upstash Redis client", e);
    }
  }
  return null;
}

async function readData(): Promise<DbSchema> {
  const redis = await getRedisClient();

  if (redis) {
    try {
      const leadsStr = await redis.get<string>("admin:leads");
      const productsStr = await redis.get<string>("admin:products");
      const siteSettingsStr = await redis.get<string>("admin:site-settings");

      const leads = leadsStr ? (typeof leadsStr === "string" ? JSON.parse(leadsStr) : leadsStr) : [];
      const products = productsStr
        ? typeof productsStr === "string"
          ? JSON.parse(productsStr)
          : productsStr
        : [];
      const siteSettingsParsed = siteSettingsStr
        ? typeof siteSettingsStr === "string"
          ? JSON.parse(siteSettingsStr)
          : siteSettingsStr
        : {};

      return {
        leads: Array.isArray(leads) ? leads : [],
        products: Array.isArray(products) && products.length > 0 ? products : DEFAULT_PRODUCTS,
        siteSettings: normalizeSiteSettings(siteSettingsParsed),
      };
    } catch (e) {
      console.error("[DB] Redis read error, falling back to local file", e);
    }
  }

  try {
    const raw = await fs.readFile(localDbPath(), "utf-8");
    const parsed = JSON.parse(raw) as DbSchema & { tenants?: unknown };
    return {
      leads: Array.isArray(parsed.leads) ? parsed.leads : [],
      products:
        Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : DEFAULT_PRODUCTS,
      siteSettings: normalizeSiteSettings(parsed.siteSettings),
    };
  } catch (e) {
    const err = e as { code?: string };
    if (err?.code === "ENOENT") {
      return { leads: [], products: DEFAULT_PRODUCTS, siteSettings: {} };
    }
    console.error("[DB] File read error, returning empty dataset", e);
    return { leads: [], products: DEFAULT_PRODUCTS, siteSettings: {} };
  }
}

async function writeLocalFile(schema: DbSchema): Promise<void> {
  const filePath = localDbPath();
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(schema, null, 2), "utf-8");
}

async function writeData(schema: DbSchema): Promise<void> {
  const redis = await getRedisClient();
  const onVercel = isVercelRuntime();

  if (redis) {
    try {
      await redis.set("admin:leads", JSON.stringify(schema.leads));
      await redis.set("admin:products", JSON.stringify(schema.products));
      await redis.set("admin:site-settings", JSON.stringify(schema.siteSettings ?? {}));
      return;
    } catch (e) {
      console.error("[DB] Redis write error", e);
      if (onVercel) {
        try {
          await writeLocalFile(schema);
          console.warn("[DB] Redis indisponível — lead salvo em arquivo temporário (configure Upstash).");
          return;
        } catch (fileErr) {
          console.error("[DB] File fallback after Redis failed", fileErr);
          throw new DbStorageError(
            "redis_write_failed",
            "Falha ao gravar no Redis. Verifique UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN na Vercel.",
          );
        }
      }
    }
  }

  try {
    await writeLocalFile(schema);
  } catch (e) {
    console.error("[DB] File write error", { path: localDbPath(), e });
    if (onVercel) {
      throw new DbStorageError(
        "redis_required",
        "Em produção na Vercel configure Upstash Redis (UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN).",
      );
    }
    throw new DbStorageError("file_write_failed", "Não foi possível gravar db.json no disco.");
  }
}

/** Diagnóstico leve para /api/health (não expõe segredos). */
export async function getStorageStatus(): Promise<{
  mode: "redis" | "file" | "unavailable";
  detail: string;
}> {
  const redis = await getRedisClient();
  if (redis) {
    try {
      await redis.ping();
      return { mode: "redis", detail: "upstash_ok" };
    } catch {
      return { mode: "unavailable", detail: "upstash_ping_failed" };
    }
  }
  try {
    const filePath = localDbPath();
    await fs.access(path.dirname(filePath)).catch(async () => {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
    });
    return {
      mode: "file",
      detail: isVercelRuntime() ? "tmp_ephemeral" : filePath,
    };
  } catch {
    return { mode: "unavailable", detail: "file_path_not_writable" };
  }
}

export async function getLeads(): Promise<Lead[]> {
  const data = await readData();
  return data.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveLead(
  input: Omit<Lead, "id" | "createdAt" | "status">
): Promise<Lead> {
  const data = await readData();
  const newLead: Lead = {
    ...input,
    id: Math.random().toString(36).substring(2, 11) + Date.now().toString(36),
    status: "novo",
    createdAt: new Date().toISOString(),
  };

  data.leads.push(newLead);
  await writeData(data);
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<void> {
  const data = await readData();
  const lead = data.leads.find((l) => l.id === id);
  if (!lead) throw new Error("Lead not found");
  lead.status = status;
  await writeData(data);
}

export async function deleteLead(id: string): Promise<void> {
  const data = await readData();
  data.leads = data.leads.filter((l) => l.id !== id);
  await writeData(data);
}

export async function getProductsDynamic(): Promise<ProductCustomization[]> {
  const data = await readData();
  const customizedMap = new Map(data.products.map((p) => [p.slug, p]));

  return DEFAULT_PRODUCTS.map((def) => {
    const custom = customizedMap.get(def.slug);
    return custom ? { ...def, ...custom } : def;
  });
}

export async function saveProductsDynamic(products: ProductCustomization[]): Promise<void> {
  const data = await readData();
  data.products = products;
  await writeData(data);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await readData();
  return normalizeSiteSettings(data.siteSettings);
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const data = await readData();
  data.siteSettings = normalizeSiteSettings(settings);
  await writeData(data);
  return data.siteSettings;
}

