import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_PATHS, RESTAURANT_DATA } from '../../constants/restaurant';
import { MapPin, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const BrasaExperienceGallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const blockARef = useRef<HTMLDivElement>(null);
  const blockBRef = useRef<HTMLDivElement>(null);
  const blockCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animação de entrada do Header da Seção
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animação do Bloco A (Ambiente & Clientes)
      if (blockARef.current) {
        gsap.from(blockARef.current, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: blockARef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animação dos Cards Gastronômicos (Bloco B)
      if (blockBRef.current) {
        const cards = blockBRef.current.querySelectorAll('.gallery-card');
        gsap.from(cards, {
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: blockBRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animação do Bloco C (Fachada e CTA)
      if (blockCRef.current) {
        gsap.from(blockCRef.current, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: blockCRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gastronomia"
      ref={containerRef}
      aria-label="A Experiência Gastronômica do Brasa Restaurante e Churrascaria"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 bg-brasa-navy-deep text-neutral-100 overflow-hidden border-t border-brasa-gold/15"
    >
      {/* Luz ambiente de fundo suave */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brasa-navy-surface/30 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brasa-ember/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20 sm:gap-28">
        
        {/* 3. ABERTURA DA SEÇÃO */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brasa-gold/30 bg-brasa-navy-surface/60 backdrop-blur-md mb-5 shadow-[0_0_15px_rgba(212,175,55,0.12)]">
            <Sparkles className="w-3.5 h-3.5 text-brasa-gold" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#EAD17A] font-semibold">
              A EXPERIÊNCIA BRASA
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Mais que um churrasco. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822]">
              Uma experiência.
            </span>
          </h2>

          <p className="font-sans text-neutral-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
            Sabores que surpreendem, momentos que aproximam e uma mesa sempre pronta para receber você.
          </p>
        </div>

        {/* 4. BLOCO A — EXPERIÊNCIA REAL (estabelecimento 2.jpg) */}
        <div ref={blockARef} className="w-full max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-brasa-gold/25 bg-brasa-navy-surface shadow-[0_12px_40px_rgba(0,0,0,0.6)] group">
            <div className="w-full flex items-center justify-center bg-black/40">
              <img
                src={MEDIA_PATHS.galeria.estabelecimento2}
                alt="Ambiente acolhedor e clientes no Brasa Restaurante e Churrascaria"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </div>
            {/* Vinheta suave nos cantos para harmonia visual */}
            <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* 4. BLOCO B — GASTRONOMIA (Grid Editorial Assimétrico) */}
        <div ref={blockBRef} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-brasa-navy-light/60 pb-5">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brasa-gold font-semibold">
                Nossos Pratos & Sabores
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-1">
                A Arte de Servir com Excelência
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
              Uma seleção refinada de pratos quentes, cortes nobres na brasa, buffet diversificado e sobremesas artesanais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Item 1: Camarão na Moranga (Destaque Gastronômico Principal - 7 colunas) */}
            <div className="gallery-card md:col-span-7 relative rounded-xl overflow-hidden border border-brasa-gold/20 bg-brasa-navy-surface shadow-lg group">
              <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-black/30">
                <img
                  src={MEDIA_PATHS.galeria.camarao}
                  alt="Camarão na moranga servido no Brasa Restaurante"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brasa-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
            </div>

            {/* Item 2: Preparações de Carne Nobre (5 colunas) */}
            <div className="gallery-card md:col-span-5 relative rounded-xl overflow-hidden border border-brasa-gold/20 bg-brasa-navy-surface shadow-lg group">
              <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center bg-black/30">
                <img
                  src={MEDIA_PATHS.galeria.carne}
                  alt="Preparações de carnes e cortes especiais no Brasa Restaurante"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brasa-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
            </div>

            {/* Item 3: Pastéis e Petiscos (4 colunas) */}
            <div className="gallery-card md:col-span-4 relative rounded-xl overflow-hidden border border-brasa-gold/20 bg-brasa-navy-surface shadow-lg group">
              <div className="w-full h-full min-h-[320px] sm:min-h-[360px] flex items-center justify-center bg-black/30">
                <img
                  src={MEDIA_PATHS.galeria.pastel}
                  alt="Pastéis dourados e crocantes artesanais do Brasa"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brasa-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
            </div>

            {/* Item 4: Frios, Frutas e Acompanhamentos (4 colunas) */}
            <div className="gallery-card md:col-span-4 relative rounded-xl overflow-hidden border border-brasa-gold/20 bg-brasa-navy-surface shadow-lg group">
              <div className="w-full h-full min-h-[320px] sm:min-h-[360px] flex items-center justify-center bg-black/30">
                <img
                  src={MEDIA_PATHS.galeria.fruta}
                  alt="Mesa de frutas, frios e acompanhamentos frescos"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brasa-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
            </div>

            {/* Item 5: Sobremesa / Doce (4 colunas) */}
            <div className="gallery-card md:col-span-4 relative rounded-xl overflow-hidden border border-brasa-gold/20 bg-brasa-navy-surface shadow-lg group">
              <div className="w-full h-full min-h-[320px] sm:min-h-[360px] flex items-center justify-center bg-black/30">
                <img
                  src={MEDIA_PATHS.galeria.doce}
                  alt="Sobremesas artesanais servidas no buffet do Brasa"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brasa-navy-deep/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4. BLOCO C — IDENTIDADE E LOCALIZAÇÃO (estabelecimento.jpg com mascote e fachada real) */}
        <div
          ref={blockCRef}
          className="rounded-2xl border border-brasa-gold/30 bg-gradient-to-br from-brasa-navy-surface/80 via-brasa-navy-surface/40 to-brasa-navy-deep/90 backdrop-blur-md p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.7)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Fotografia da Fachada Real com Mascote */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-xl overflow-hidden border border-brasa-gold/25 bg-black/40 shadow-xl max-w-sm w-full group">
                <img
                  src={MEDIA_PATHS.galeria.estabelecimento}
                  alt="Fachada oficial e mascote do Brasa Restaurante e Churrascaria em Palhoça"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain object-center transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-brasa-gold/20 rounded-xl pointer-events-none" />
              </div>
            </div>

            {/* Conteúdo Institucional de Conexão com o Visitante */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#EAD17A] font-semibold">
                Visite Nossa Casa em Palhoça
              </span>

              <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Seu próximo bom momento <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822]">
                  começa aqui.
                </span>
              </h3>

              <p className="font-sans text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Espaço amplo, estacionamento facilitado e uma equipe dedicada a oferecer o melhor atendimento para você, seus amigos e sua família.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
                <a
                  href={RESTAURANT_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-bold text-brasa-navy-deep bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822] hover:brightness-110 active:scale-[0.98] rounded-md transition-all duration-300 shadow-gold-glow"
                >
                  <MapPin className="w-4 h-4 text-brasa-navy-deep" />
                  <span>COMO CHEGAR</span>
                </a>

                <span className="text-xs text-neutral-400">
                  {RESTAURANT_DATA.address.street}, {RESTAURANT_DATA.address.neighborhood}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
