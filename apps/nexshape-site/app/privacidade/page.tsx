import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY_POLICY_VERSION } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade · PaivaTech Solutions",
  description: "Entenda como protegemos e tratamos seus dados pessoais no ecossistema PaivaTech.",
};

export default function PrivacidadePage() {
  return (
    <div className="relative isolate pb-20 overflow-hidden">
      {/* Background decoration with animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-blob"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/10 blur-[130px] rounded-full animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-6 pt-10">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-blue-400 ring-1 ring-inset ring-blue-400/20">
            Segurança & Privacidade
          </div>
          <h1 className="premium-gradient-text text-balance text-5xl font-black tracking-tight sm:text-7xl leading-[1.1]">
            Compromisso com <br/> <span className="text-white">Seus Dados</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Sua privacidade é prioridade técnica. Entenda como tratamos suas informações com transparência, segurança e
            conformidade com a LGPD.
          </p>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Versão {PRIVACY_POLICY_VERSION} · Em conformidade com a LGPD</p>
        </header>

        <article className="glass-card rounded-[2.5rem] p-10 sm:p-16 border border-white/10 shadow-2xl shadow-black/20 space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">1</span>
              Controlador de Dados
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Esta política aplica-se ao portal institucional da PaivaTech Solutions e às interações de contato da PaivaTech. Atuamos como controladores das informações que você compartilha voluntariamente conosco para fins de suporte e consultoria comercial.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">2</span>
              Dados Coletados
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Coletamos apenas o essencial para o atendimento: nome, e-mail profissional, telefone corporativo, empresa
              e sistema de interesse. Essas informações são utilizadas exclusivamente para qualificar sua demanda e
              oferecer a solução adequada ao seu cenário.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">3</span>
              Finalidade do Tratamento
            </h2>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Viabilizar o contato comercial solicitado e responder a dúvidas técnicas.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Personalizar sua experiência no ecossistema de produtos PaivaTech.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Garantir a segurança contra acessos indevidos e automações maliciosas.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">4</span>
              Base Legal (LGPD)
            </h2>
            <p className="text-slate-400 leading-relaxed">
              O tratamento de seus dados é fundamentado na execução de procedimentos preliminares a pedido do titular (Art. 7º, V da LGPD) e no nosso legítimo interesse em prover soluções de alta performance para o mercado B2B.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-sm">5</span>
              Seus Direitos
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Você detém o controle soberano sobre seus dados. A qualquer momento, é possível solicitar a confirmação da existência de tratamento, o acesso aos dados, a correção de informações incompletas ou a exclusão definitiva de nossa base.
            </p>
          </section>

          <footer className="pt-10 border-t border-white/5">
            <p className="text-sm text-slate-500 font-medium">
              Dúvidas sobre sua segurança? Fale com nossa equipe técnica através do{" "}
              <Link href="/contato" className="text-blue-400 font-bold hover:text-white transition-colors underline decoration-blue-400/30 underline-offset-4">
                Formulário de Contato
              </Link>.
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
