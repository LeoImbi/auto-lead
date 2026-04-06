import { useState, useEffect, useRef } from "react";

const NeonCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animId = useRef<number>(0);

  const waves = useRef<{ x: number; y: number; r: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", onMove);

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button")) {
        waves.current.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      }
    };
    document.addEventListener("mouseover", onEnter);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = () => {
      if (!canvas || !ctx) return;

      spotlightPos.current.x = lerp(spotlightPos.current.x, targetPos.current.x, 0.08);
      spotlightPos.current.y = lerp(spotlightPos.current.y, targetPos.current.y, 0.08);

      const { x, y } = spotlightPos.current;
      const pulse = 1 + 0.06 * Math.sin((Date.now() / 1800) * Math.PI * 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // brilho central branco/roxo
      const core = ctx.createRadialGradient(x, y, 0, x, y, 80 * pulse);
      core.addColorStop(0, "rgba(200, 180, 255, 0.25)");
      core.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, 80 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // anel neon roxo
      const glow = ctx.createRadialGradient(x, y, 80 * pulse, x, y, 280 * pulse);
      glow.addColorStop(0, "rgba(139, 92, 246, 0.22)");
      glow.addColorStop(0.5, "rgba(109, 40, 217, 0.1)");
      glow.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 280 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // ondas de explosão no hover de botões
      waves.current = waves.current.filter((w) => w.life > 0);
      for (const w of waves.current) {
        w.r += 6;
        w.life -= 0.04;
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 92, 246, ${w.life * 0.8})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 180, 255, ${w.life * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
};

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
  { num: "1", title: "Você nos conta como funciona seu negócio", desc: "Nos diga como você atende, o que vende e como quer ser representado pela IA." },
  { num: "2", title: "A gente configura tudo para você", desc: "Nossa equipe conecta seus canais e personaliza a IA com base no seu negócio." },
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
  { valor: "100%", label: "configurado por nós" },
  { valor: "70%", label: "menos custo" },
  { valor: "24/7", label: "ativo" },
  { valor: "< 1 dia", label: "para configurar" },
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/5542998726850?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%20da%20Auto%20Lead." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background px-10 py-4 rounded-xl font-bold text-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Falar com especialista
        </a>
        <a href="https://www.instagram.com/aiautolead" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white px-10 py-4 rounded-xl font-bold text-lg transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
      </div>
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
    <NeonCursor />
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
