"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TurnstileField } from "@/components/TurnstileField";
import { ProductInterestSelect } from "@/components/ProductInterestSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
  buildContactApiBody,
} from "@/lib/contact/form-schema";
import type { ProductInterest } from "@/lib/contact/schema";
import type { ProductInterestOption } from "@/lib/contact/product-interest-options";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40";

interface ContactFormProps {
  defaultProduct?: ProductInterest;
  productOptions: ProductInterestOption[];
  /** Alinhado com `isTurnstileEnabled()` no servidor (ambas as chaves Turnstile). */
  turnstileEnabled?: boolean;
  turnstileSiteKey?: string;
}

export function ContactForm({
  defaultProduct,
  productOptions,
  turnstileEnabled = false,
  turnstileSiteKey,
}: ContactFormProps) {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const captchaRequired = turnstileEnabled && Boolean(turnstileSiteKey);
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      productInterest: defaultProduct,
      message: "",
      botCheck: "",
      consentPolicy: false,
      sourcePath: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    if (captchaRequired && !turnstileToken) {
      setError("root.server", { message: "Confirme o desafio de segurança antes de enviar." });
      return;
    }

    const body = buildContactApiBody(values, PRIVACY_POLICY_VERSION, turnstileToken ?? undefined);
    if (typeof window !== "undefined") {
      (body as Record<string, unknown>).sourcePath = window.location.pathname + window.location.search;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;

      if (res.ok && data.ok === true) {
        router.push("/contato/enviado");
        return;
      }

      if (res.status === 429) {
        setError("root.server", { message: "Muitas tentativas. Aguarde um minuto e tente novamente." });
        return;
      }

      if (res.status === 400 && data.error === "captcha_required") {
        setError("root.server", {
          message:
            typeof data.message === "string"
              ? data.message
              : "Confirme o desafio de segurança (CAPTCHA) antes de enviar.",
        });
        return;
      }

      if (res.status === 400 && data.error === "captcha_failed") {
        setTurnstileToken(null);
        setError("root.server", {
          message:
            typeof data.message === "string"
              ? data.message
              : "Verificação de segurança falhou. Tente novamente.",
        });
        return;
      }

      if (res.status === 400 && data.error === "invalid_json") {
        setError("root.server", { message: "Não foi possível ler os dados do formulário. Recarregue a página e tente de novo." });
        return;
      }

      if (res.status === 400 && data.error === "honeypot") {
        setError("root.server", {
          message: "Envio bloqueado por segurança. Desative preenchimento automático nesta página e tente novamente.",
        });
        return;
      }

      if (res.status === 503 && data.error === "storage_unavailable") {
        setError("root.server", {
          message:
            typeof data.message === "string"
              ? data.message
              : "Serviço temporariamente indisponível. Tente mais tarde ou use o WhatsApp.",
        });
        return;
      }

      if (res.status === 502 || data.error === "server_error") {
        setError("root.server", {
          message:
            typeof data.message === "string"
              ? data.message
              : "Não foi possível registrar o contato. Tente novamente em instantes.",
        });
        return;
      }

      if (res.status === 422 && Array.isArray(data.issues)) {
        const issues = data.issues as Array<{ path?: string; messagePt?: string; message?: string }>;
        let hasFieldError = false;
        for (const issue of issues) {
          const path = issue.path?.trim();
          const msg = issue.messagePt || issue.message || "Campo inválido.";

          if (!path) {
            setError("root.server", { message: msg });
            hasFieldError = true;
            continue;
          }

          if (path === "consentAccepted") {
            setError("consentPolicy", { message: msg || "Aceite a política de privacidade." });
            hasFieldError = true;
            continue;
          }

          const fieldName = path as keyof ContactFormValues;
          setError(fieldName, { message: msg });
          hasFieldError = true;
        }
        if (!hasFieldError) {
          setError("root.server", { message: "Verifique os campos e tente novamente." });
        }
        return;
      }

      setError("root.server", {
        message:
          typeof data.message === "string"
            ? data.message
            : "Não foi possível enviar. Tente novamente em instantes.",
      });
    } catch {
      setError("root.server", { message: "Erro de rede. Tente novamente." });
    }
  }

  return (
    <div className="glass-card rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 sm:p-10">
      <div className="mb-8 space-y-2 border-b border-white/5 pb-8">
        <h2 className="text-2xl font-black tracking-tight text-white">Solicitar contato</h2>
        <p className="text-sm leading-relaxed text-slate-400">
          Campos com <span className="text-indigo-400">*</span> são obrigatórios. Seus dados são tratados conforme a{" "}
          <Link href="/privacidade" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>

      <form className="relative space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden>
          <label htmlFor="contact-bot-check">Deixe em branco</label>
          <input
            id="contact-bot-check"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            readOnly
            {...register("botCheck")}
            onFocus={(e) => e.currentTarget.blur()}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Nome completo <span className="text-indigo-600">*</span>
            </label>
            <input
              id="fullName"
              autoComplete="name"
              placeholder="Ex: João Silva"
              className={inputClassName}
              {...register("fullName")}
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? "fullName-err" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-err" className="text-xs font-medium text-red-500" role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              E-mail profissional <span className="text-indigo-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="joao@empresa.com"
              className={inputClassName}
              {...register("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-err" : undefined}
            />
            {errors.email && (
              <p id="email-err" className="text-xs font-medium text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Telefone <span className="text-indigo-600">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(99) 99999-9999"
              className={inputClassName}
              {...register("phone", {
                onChange: (e) => {
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 11) v = v.slice(0, 11);
                  if (v.length > 10) {
                    v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
                  } else if (v.length > 5) {
                    v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
                  } else if (v.length > 2) {
                    v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
                  } else if (v.length > 0) {
                    v = v.replace(/^(\d*)/, "($1");
                  }
                  e.target.value = v;
                },
              })}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-err" : undefined}
            />
            {errors.phone && (
              <p id="phone-err" className="text-xs font-medium text-red-500" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Empresa <span className="text-indigo-600">*</span>
            </label>
            <input
              id="companyName"
              autoComplete="organization"
              placeholder="Nome da sua empresa"
              className={inputClassName}
              {...register("companyName")}
              aria-invalid={errors.companyName ? true : undefined}
              aria-describedby={errors.companyName ? "companyName-err" : undefined}
            />
            {errors.companyName && (
              <p id="companyName-err" className="text-xs font-medium text-red-500" role="alert">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label htmlFor="productInterest" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Sistema de interesse <span className="text-indigo-600">*</span>
            </label>
            <Controller
              name="productInterest"
              control={control}
              render={({ field }) => (
                <ProductInterestSelect
                  id="productInterest"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  invalid={Boolean(errors.productInterest)}
                  describedBy={errors.productInterest ? "prod-err prod-hint" : "prod-hint"}
                  options={productOptions}
                />
              )}
            />
            <p id="prod-hint" className="text-xs text-slate-500">
              Todos os produtos PaivaTech estão listados. Se o assunto não for um sistema específico, escolha{" "}
              <strong className="text-slate-400">Outros</strong>.
            </p>
            {errors.productInterest && (
              <p id="prod-err" className="text-xs font-medium text-red-500" role="alert">
                {errors.productInterest.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Como podemos ajudar? <span className="text-indigo-600">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Ex.: volume de atendimentos, equipe atual, integrações necessárias..."
            className={`${inputClassName} min-h-[120px] resize-y`}
            {...register("message")}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-err" : undefined}
          />
          {errors.message && (
            <p id="message-err" className="text-xs font-medium text-red-500" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-3">
          <input id="consentPolicy" type="checkbox" {...register("consentPolicy")} className="mt-1 h-4 w-4 rounded border-slate-300 accent-indigo-600" />
          <label htmlFor="consentPolicy" className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Li e aceito a{" "}
            <Link href="/privacidade" className="font-semibold text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400">
              Política de Privacidade
            </Link>{" "}
            e autorizo o contato para fins comerciais.
          </label>
        </div>
        {errors.consentPolicy && (
          <p className="text-xs font-medium text-red-500" role="alert">
            {errors.consentPolicy.message}
          </p>
        )}

        {captchaRequired && turnstileSiteKey && (
          <TurnstileField
            siteKey={turnstileSiteKey}
            onToken={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken(null)}
            onError={() => setTurnstileToken(null)}
          />
        )}

        {errors.root?.server && (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400" role="alert">
            {errors.root.server.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] disabled:opacity-50 active:scale-[0.98] shadow-2xl shadow-indigo-500/20"
        >
          {isSubmitting ? (
            "Enviando solicitação..."
          ) : (
            <>
              Enviar mensagem
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
