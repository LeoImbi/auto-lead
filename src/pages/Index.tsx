import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#hero" className="text-xl font-bold text-foreground flex items-center gap-1">⚡ Auto Lead</a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#solucoes" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Soluções</a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Como funciona</a>
          <a href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Resultados</a>
          <a href="#cta" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-colors">Começar agora</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-4 flex flex-col gap-3">
          <a href="#solucoes" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Soluções</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Como funciona</a>
          <a href="#resultados" onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors text-sm">Resultados</a>
          <a href="#cta" onClick={() => setMenuOpen(false)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-colors text-center">Começar agora</a>
        </div>
      )}
    </nav>
  );
};

const WhatsAppCard = () => {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTyping((t) => !t), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-2xl p-4 shadow-2xl w-full max-w-xs border border-border">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-sm">🤖</div>
        <div>
          <p className="text-foreground text-sm font-semibold">Auto Lead IA</p>
          <p className="text-green-400 text-xs">online</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%]">
          <p className="text-foreground text-xs">Olá! Gostaria de saber sobre os planos 😊</p>
        </div>
        <div className="bg-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] ml-auto">
          <p className="text-foreground text-xs">Claro! Temos 3 planos a partir de R$97/mês. Qual seu volume de atendimentos? 🚀</p>
        </div>
        <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 max-w-[70%]">
          <p className="text-foreground text-xs">Cerca de 200 por mês</p>
        </div>
        <div className="bg-primary/20 rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] ml-auto">
          {typing ? (
            <div className="flex gap-1 items-center py-1 px-1">
              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <p className="text-foreground text-xs">Perfeito! O plano Pro é ideal. Quer que eu envie um link para testar grátis? ✅</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section id="hero" className="min-h-screen flex items-center pt-16 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Automatize seu atendimento e{" "}
            <span className="text-primary">nunca perca um lead</span>
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
            IA no WhatsApp, Instagram, DMs e chat — 24/7, sem contratar ninguém
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#cta" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors text-center">Começar agora</a>
            <a href="#como-funciona" className="border-2 border-foreground/30 hover:border-foreground/60 text-foreground px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors text-center">Ver como funciona</a>
          </div>
        </div>
        <div className="flex-shrink-0">
          <WhatsAppCard />
        </div>
      </div>
    </div>
  </section>
);

const steps = [
  { num: "1", title: "Conecte WhatsApp, Instagram e seu site", desc: "Integre todos os seus canais de atendimento em um só lugar." },
  { num: "2", title: "Configure a IA em minutos, sem código", desc: "Setup simples e intuitivo. Nenhum programador necessário." },
  { num: "3", title: "Receba leads qualificados 24 horas por dia", desc: "A IA trabalha enquanto você descansa. Leads quentes na sua mão." },
];

const ComoFunciona = () => (
  <section id="como-funciona" className="py-20 sm:py-28 bg-section-alt">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">Como funciona</h2>
      <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">Três passos simples para transformar seu atendimento</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((s) => (
          <div key={s.num} className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors group">
            <span className="text-5xl font-extrabold text-primary mb-4 block group-hover:scale-110 transition-transform inline-block">{s.num}</span>
            <h3 className="text-foreground font-semibold text-lg mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const diferenciais = [
  { icon: "⚡", title: "IA com GPT", desc: "Respostas humanizadas e inteligentes que encantam seus clientes." },
  { icon: "🔌", title: "Sem código", desc: "Integre em minutos, sem precisar de um programador." },
  { icon: "🕐", title: "24/7", desc: "Nunca perca um cliente fora do horário comercial." },
  { icon: "💰", title: "Menos custo", desc: "Até 70% de economia no atendimento ao cliente." },
];

const Diferenciais = () => (
  <section id="solucoes" className="py-20 sm:py-28 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">Por que a Auto Lead?</h2>
      <p className="text-muted-foreground text-center mb-14 max-w-2xl mx-auto">Diferenciais que fazem a diferença no seu negócio</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {diferenciais.map((d) => (
          <div key={d.title} className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors">
            <span className="text-4xl mb-4 block">{d.icon}</span>
            <h3 className="text-foreground font-semibold text-lg mb-2">{d.title}</h3>
            <p className="text-muted-foreground text-sm">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const metricas = [
  { valor: "+10.000", label: "atendimentos" },
  { valor: "70%", label: "menos custo" },
  { valor: "24/7", label: "ativo" },
  { valor: "5 min", label: "para configurar" },
];

const Numeros = () => (
  <section id="resultados" className="py-16 sm:py-24 bg-section-alt">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metricas.map((m) => (
          <div key={m.label} className="text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mb-2">{m.valor}</p>
            <p className="text-muted-foreground text-sm sm:text-base">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTAFinal = () => (
  <section id="cta" className="py-20 sm:py-28 bg-gradient-to-br from-primary/30 via-section-alt to-background">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Pronto para automatizar seu atendimento?</h2>
      <p className="text-muted-foreground text-lg mb-10">Sem contratos longos. Comece hoje.</p>
      <a href="https://wa.me/5542998726850?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%20da%20Auto%20Lead." target="_blank" rel="noopener noreferrer" className="inline-block bg-foreground hover:bg-foreground/90 text-background px-10 py-4 rounded-xl font-bold text-lg transition-colors">Falar com especialista</a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-background border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-foreground font-bold text-lg">⚡ Auto Lead</p>
          <p className="text-muted-foreground text-sm">Automação inteligente de atendimento com IA</p>
        </div>
        <div className="flex gap-6">
          <a href="#solucoes" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Soluções</a>
          <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Como funciona</a>
          <a href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Resultados</a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">© 2025 Auto Lead. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <Hero />
    <ComoFunciona />
    <Diferenciais />
    <Numeros />
    <CTAFinal />
    <Footer />
  </div>
);

export default Index;
