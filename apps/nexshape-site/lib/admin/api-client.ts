import { adminRequestInit } from "./admin-fetch";

type ApiErrorBody = { message?: string; error?: string };

export async function adminFetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, adminRequestInit(init));
    const text = await res.text();
    let data: T | ApiErrorBody | null = null;

    if (text) {
      try {
        data = JSON.parse(text) as T;
      } catch {
        return {
          ok: false,
          error:
            res.status === 404
              ? "Rota não encontrada. Verifique se o site nexshape-site está rodando (porta do terminal npm run dev)."
              : `Resposta inválida do servidor (HTTP ${res.status}).`,
        };
      }
    }

    if (!res.ok) {
      const body = data as ApiErrorBody | null;
      const message =
        body?.message ||
        (res.status === 401
          ? "Sessão expirada. Faça login novamente em /admin/login."
          : `Erro ao processar solicitação (HTTP ${res.status}).`);
      return { ok: false, error: message };
    }

    return { ok: true, data: data as T };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro de rede";
    return {
      ok: false,
      error: `Não foi possível conectar ao servidor (${message}). Confira se npm run dev está ativo.`,
    };
  }
}
