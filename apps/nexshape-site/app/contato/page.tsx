import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { getProductInterestOptionsForContact } from "@/lib/contact/build-product-interest-options";
import { productInterestFromSearchParam } from "@/lib/contact/query-param";
import { PRODUCT_DEFINITIONS } from "@/lib/config/products";
import { getProductsDynamic } from "@/lib/db";
import { CONTACT_EMAIL } from "@/lib/site/contact";
import { getContactWhatsApp } from "@/lib/site/whatsapp";
import { isTurnstileEnabled, turnstileSiteKey } from "@/lib/security/turnstile";

export const metadata: Metadata = {
  title: "Contato · PaivaTech Solutions",
  description: "Fale com nossos especialistas e descubra como elevar o patamar do seu negócio com a PaivaTech.",
};

export const dynamic = "force-dynamic";

const STEPS = [
  {
    title: "Você envia seus dados",
    description: "Leva menos de dois minutos. Escolha o sistema de interesse e descreva seu cenário.",
  },
  {
    title: "Analisamos sua operação",
    description: "Nossa equipe revisa a demanda e identifica o melhor caminho dentro do ecossistema PaivaTech.",
  },
  {
    title: "Retornamos com clareza",
    description: "Em até 1 dia útil, você recebe um retorno objetivo — sem promessas genéricas.",
  },
] as const;

function MailIcon() {
  return (
    <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-6 w-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string }>;
}) {
  const sp = await searchParams;
  const [productOptions, products] = await Promise.all([
    getProductInterestOptionsForContact(),
    getProductsDynamic(),
  ]);
  const preset = productInterestFromSearchParam(sp.produto);
  const presetLabel = preset
    ? products.find((p) => p.apiValue === preset)?.title ??
      PRODUCT_DEFINITIONS.find((p) => p.apiValue === preset)?.title ??
      preset
    : null;
  const { url: whatsappUrl, display: whatsappDisplay } = await getContactWhatsApp();

  return (
    <div className="relative isolate pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/15 blur-[130px] rounded-full animate-blob" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[110px] rounded-full animate-blob animation-delay-2000" />
      </div>

      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start pt-10">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
              Fale com a PaivaTech
            </div>
            <h1 className="premium-gradient-text text-balance text-4xl font-black tracking-tight sm:text-6xl leading-[1.1]">
              Conte sua operação. <br /> <span className="text-white">A gente orienta o caminho.</span>
            </h1>
            <p className="text-lg leading-8 text-slate-400 max-w-xl">
              Quer conhecer um produto, tirar dúvidas ou avaliar implantação? Preencha o formulário e nossa equipe
              retorna com uma conversa objetiva sobre o que faz sentido para o seu negócio.
            </p>
            {presetLabel && (
              <p className="inline-flex items-center gap-2 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                <span className="font-black uppercase tracking-widest text-[10px] text-indigo-400">Interesse</span>
                {presetLabel}
              </p>
            )}
          </div>

          <div className="space-y-5">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Como funciona</h2>
            <ol className="space-y-4">
              {STEPS.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.05]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-sm font-black text-indigo-400">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">Outros canais</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-indigo-500/30 hover:bg-white/10 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-600/10 transition-transform group-hover:scale-110">
                  <MailIcon />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">E-mail</h4>
                  <p className="mt-1 text-sm font-medium text-slate-400 group-hover:text-indigo-300 transition-colors">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:border-emerald-500/30 hover:bg-white/10 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-600/10 transition-transform group-hover:scale-110">
                  <WhatsAppIcon />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">WhatsApp</h4>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500">
            Quer saber mais sobre a empresa antes?{" "}
            <Link href="/sobre" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Conheça a PaivaTech →
            </Link>
          </p>
        </div>

        <div className="relative lg:sticky lg:top-28">
          <div className="absolute inset-0 -z-10 bg-indigo-500/5 blur-3xl rounded-full" />
          <ContactForm
            key={preset ?? "none"}
            defaultProduct={preset}
            productOptions={productOptions}
            turnstileEnabled={isTurnstileEnabled()}
            turnstileSiteKey={turnstileSiteKey()}
          />
        </div>
      </div>
    </div>
  );
}
