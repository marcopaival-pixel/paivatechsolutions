"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TurnstileField } from "@/components/TurnstileField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
  buildContactApiBody,
} from "@/lib/contact/form-schema";
import { productInterestEnum, type ProductInterest } from "@/lib/contact/schema";
import { PRODUCT_DEFINITIONS } from "@/lib/config/products";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

const PRODUCT_OPTIONS = productInterestEnum.options;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

interface ContactFormProps {
  defaultProduct?: ProductInterest;
}

export function ContactForm({ defaultProduct }: ContactFormProps) {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const captchaRequired = Boolean(TURNSTILE_SITE_KEY);
  const {
    register,
    handleSubmit,
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
      website: "",
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

      if (res.status === 400 && data.error === "captcha_failed") {
        setTurnstileToken(null);
        setError("root.server", { message: "Verificação de segurança falhou. Tente novamente." });
        return;
      }

      if (res.status === 422 && Array.isArray(data.issues)) {
        const issues = data.issues as Array<{ path?: string; messagePt?: string }>;
        for (const issue of issues) {
          const path = issue.path;
          if (!path) continue;

          // Map API field 'consentAccepted' to form field 'consentPolicy'
          if (path === "consentAccepted") {
            setError("consentPolicy", { message: issue.messagePt || "Aceite a política de privacidade." });
            continue;
          }

          // Safe cast and check if path exists in form values
          const fieldName = path as keyof ContactFormValues;
          setError(fieldName, { message: issue.messagePt || "Campo inválido." });
        }
        return;
      }

      setError("root.server", { message: "Não foi possível enviar. Tente novamente em instantes." });
    } catch {
      setError("root.server", { message: "Erro de rede. Tente novamente." });
    }
  }

  return (
    <div className="glass-card overflow-hidden rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 sm:p-14">
      <form className="relative space-y-10" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden tabIndex={-1}>
          <label htmlFor="trap-website">Website</label>
          <input id="trap-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
              className="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 text-slate-900 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-white"
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
              Solução de interesse <span className="text-indigo-600">*</span>
            </label>
            <select
              id="productInterest"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              {...register("productInterest")}
              aria-invalid={errors.productInterest ? true : undefined}
              aria-describedby={errors.productInterest ? "prod-err" : undefined}
            >
              <option value="" disabled>
                Selecione uma vertical
              </option>
              {PRODUCT_OPTIONS.map((opt) => {
                const label =
                  PRODUCT_DEFINITIONS.find((p) => p.apiValue === opt)?.title ||
                  (opt === "Geral" ? "Geral / outro" : opt);
                return (
                  <option key={opt} value={opt}>
                    {label}
                  </option>
                );
              })}
            </select>
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
            placeholder="Descreva seu desafio operacional..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 ring-indigo-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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

        {TURNSTILE_SITE_KEY && (
          <TurnstileField
            siteKey={TURNSTILE_SITE_KEY}
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
              Enviar solicitação
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
