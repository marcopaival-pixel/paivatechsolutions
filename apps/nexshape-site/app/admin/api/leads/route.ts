import { NextResponse } from "next/server";
import { guardAdminApiRequest } from "@/lib/admin/guard-admin-api";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/db";

export async function GET(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const leads = await getLeads();
    return NextResponse.json({ leads });
  } catch (e) {
    console.error("[LEADS_API_GET]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao carregar leads." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "missing_fields", message: "ID e Status são obrigatórios." }, { status: 400 });
    }

    if (!["novo", "atendimento", "convertido", "perdido"].includes(status)) {
      return NextResponse.json({ error: "invalid_status", message: "Status inválido." }, { status: 400 });
    }

    await updateLeadStatus(id, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[LEADS_API_PUT]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao atualizar status." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const rateLimited = await guardAdminApiRequest(req);
  if (rateLimited) return rateLimited;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      // Fallback to body
      try {
        const body = await req.json();
        if (body.id) {
          await deleteLead(body.id);
          return NextResponse.json({ ok: true });
        }
      } catch {}
      return NextResponse.json({ error: "missing_id", message: "ID do lead é obrigatório." }, { status: 400 });
    }

    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[LEADS_API_DELETE]", e);
    return NextResponse.json({ error: "server_error", message: "Erro ao excluir lead." }, { status: 500 });
  }
}
