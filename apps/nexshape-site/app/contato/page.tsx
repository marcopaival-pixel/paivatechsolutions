import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { productInterestFromSearchParam } from "@/lib/contact/query-param";
import { CONTACT_EMAIL, contactWhatsAppDisplay, contactWhatsAppUrl } from "@/lib/site/contact";

export const metadata: Metadata = {
  title: "Contato · PaivaTech Solutions",
  description: "Fale com nossos especialistas e descubra como elevar o patamar do seu negócio com a suite NexShape.",
};

export const dynamic = "force-dynamic";

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string }>;
}) {
  const sp = await searchParams;
  const preset = productInterestFromSearchParam(sp.produto);
  const whatsappUrl = contactWhatsAppUrl();
  const whatsappDisplay = contactWhatsAppDisplay();

  return (
    <div className="relative isolate pb-20 overflow-hidden">
      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[5%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/15 blur-[130px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[110px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 lg:items-start pt-10">
        <div className="space-y-10">
          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
            Consultoria Estratégica
          </div>
          <h1 className="premium-gradient-text text-balance text-5xl font-black tracking-tight sm:text-7xl leading-[1.1]">
            Vamos escalar <br/> <span className="text-white">seu negócio?</span>
          </h1>
          <p className="text-lg leading-8 text-slate-400 max-w-xl">
            Preencha os dados ao lado para que nossa equipe de especialistas analise seu cenário e retorne com uma proposta personalizada.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 pt-8">
            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 group transition-all hover:bg-white/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-2xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
                📧
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">E-mail</h4>
                <p className="text-slate-400 text-sm font-medium">{CONTACT_EMAIL}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 group transition-all hover:bg-white/10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600/10 text-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
                📱
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest">WhatsApp</h4>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 text-sm font-medium hover:text-emerald-400 transition-colors"
                  >
                    {whatsappDisplay}
                  </a>
                ) : (
                  <p className="text-slate-400 text-sm font-medium">{whatsappDisplay}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10" />
          <ContactForm key={preset ?? "none"} defaultProduct={preset} />
        </div>
      </div>
    </div>
  );
}
