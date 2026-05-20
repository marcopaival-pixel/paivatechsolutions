import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso · PaivaTech Solutions",
  description: "Diretrizes e termos de uso do ecossistema institucional PaivaTech Solutions / NexShape.",
};

export default function TermosPage() {
  return (
    <div className="relative isolate pb-20 overflow-hidden">
      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] bg-purple-600/5 blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 pt-10">
          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-indigo-400 ring-1 ring-inset ring-indigo-400/20">
            Governança Digital
          </div>
          <h1 className="premium-gradient-text text-balance text-5xl font-black tracking-tight sm:text-7xl leading-[1.1]">
            Termos de <br/> <span className="text-white">Uso do Site</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Este documento estabelece as diretrizes para navegação no portal institucional da PaivaTech Solutions e o uso dos materiais informativos aqui disponibilizados.
          </p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Site institucional — Versão 1.2 · Projeto Piloto</p>
        </header>

        <article className="glass-card rounded-[2.5rem] p-10 sm:p-16 border border-white/10 shadow-2xl shadow-black/20 space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">1</span>
              Aceite das Condições
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Ao navegar neste portal, você concorda integralmente com estes termos na medida aplicável ao uso informativo e ao envio de formulários de contato. Contratos específicos de licenciamento de software (SaaS) ou prestação de serviços substituem disposições conflitantes quando existirem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">2</span>
              Conteúdo e Roadmap
            </h2>
            <p className="text-slate-400 leading-relaxed">
              As descrições dos produtos (NexShape Saúde & Performance, OralByte, Zyncora, Credit) têm caráter meramente informativo e podem sofrer alterações sem aviso prévio, conforme o roadmap técnico e requisitos de mercado. Os materiais visuais e mockups não constituem garantia de interface final ou disponibilidade de módulos específicos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">3</span>
              Uso Responsável (Credit & IA)
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Mensagens relacionadas a análises de crédito ou interações com IAs integradas não configuram decisão final ou aconselhamento. O uso das ferramentas deve observar rigorosamente a legislação vigente e as boas práticas de mercado. A PaivaTech Solutions reserva-se o direito de recusar atendimentos incompatíveis com suas políticas de governança.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">4</span>
              Propriedade Intelectual
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Todo o conteúdo visual, marcas, logos e interfaces apresentadas são de propriedade da PaivaTech Solutions ou licenciados para tal. A reprodução total ou parcial, sem autorização expressa, é proibida e passível de medidas legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 text-sm">5</span>
              Limitação de Responsabilidade
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Isentamo-nos de danos decorrentes de indisponibilidade temporária do portal ou uso indevido de informações técnicas simplificadas. Questões jurídicas específicas serão tratadas conforme a jurisdição da sede da empresa e contratos vigentes.
            </p>
          </section>

          <footer className="pt-10 border-t border-white/5">
            <p className="text-sm text-slate-500 font-medium">
              Possui dúvidas? Entre em contato através do nosso{" "}
              <Link href="/contato" className="text-indigo-400 font-bold hover:text-white transition-colors underline decoration-indigo-400/30 underline-offset-4">
                Canal de Atendimento
              </Link>
              {" ou consulte nossa "}
              <Link href="/privacidade" className="text-indigo-400 font-bold hover:text-white transition-colors underline decoration-indigo-400/30 underline-offset-4">
                Política de Privacidade
              </Link>.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
