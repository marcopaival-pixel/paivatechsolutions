import { NextResponse } from "next/server";
import { guardAdminApiRequest } from "@/lib/admin/guard-admin-api";
import { getProductsDynamic, saveProductsDynamic, type ProductAppAccessMode } from "@/lib/db";
import { buildAppUrlFromHostInput } from "@/lib/products/resolve-app-url";

function sanitizeHostField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseAccessMode(value: unknown): ProductAppAccessMode | undefined {
  if (value === "production" || value === "development") return value;
  return undefined;
}

function validateHostField(
  host: string | undefined,
  mode: ProductAppAccessMode,
): string | null {
  if (!host) return null;
  const url = buildAppUrlFromHostInput(host, mode);
  if (!url) return `Host inválido ou não permitido (${mode}): ${host}`;
  return null;
}

export async function GET(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const products = await getProductsDynamic();
    return NextResponse.json({ products });
  } catch (e) {
    console.error("[PRODUCTS_API_GET]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao carregar produtos." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const body = await req.json();
    const {
      slug,
      title,
      short,
      badge,
      navLabel,
      appHostProduction,
      appHostDevelopment,
      appAccessMode,
    } = body;

    if (!slug) {
      return NextResponse.json({ error: "missing_slug", message: "Slug do produto é obrigatório." }, { status: 400 });
    }

    const prodHostProduction = sanitizeHostField(appHostProduction);
    const prodHostDevelopment = sanitizeHostField(appHostDevelopment);
    const mode = parseAccessMode(appAccessMode) ?? "production";

    const prodErr = validateHostField(prodHostProduction, "production");
    if (prodErr) {
      return NextResponse.json({ error: "invalid_host", message: prodErr }, { status: 422 });
    }
    const devErr = validateHostField(prodHostDevelopment, "development");
    if (devErr) {
      return NextResponse.json({ error: "invalid_host", message: devErr }, { status: 422 });
    }

    if ((prodHostProduction || prodHostDevelopment) && !parseAccessMode(appAccessMode)) {
      return NextResponse.json(
        { error: "missing_mode", message: "Selecione o modo ativo (Produção ou Desenvolvimento)." },
        { status: 422 },
      );
    }

    const products = await getProductsDynamic();
    const prodIndex = products.findIndex((p) => p.slug === slug);

    if (prodIndex === -1) {
      return NextResponse.json({ error: "product_not_found", message: "Produto não encontrado." }, { status: 404 });
    }

    products[prodIndex] = {
      ...products[prodIndex],
      title: typeof title === "string" ? title.trim() : products[prodIndex].title,
      short: typeof short === "string" ? short.trim() : products[prodIndex].short,
      navLabel: typeof navLabel === "string" ? navLabel.trim() : products[prodIndex].navLabel,
      badge: typeof badge === "string" ? badge.trim() || undefined : products[prodIndex].badge,
      appHostProduction: prodHostProduction,
      appHostDevelopment: prodHostDevelopment,
      appAccessMode: prodHostProduction || prodHostDevelopment ? mode : undefined,
    };

    await saveProductsDynamic(products);
    return NextResponse.json({ ok: true, product: products[prodIndex] });
  } catch (e) {
    console.error("[PRODUCTS_API_PUT]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao atualizar produto." }, { status: 500 });
  }
}
