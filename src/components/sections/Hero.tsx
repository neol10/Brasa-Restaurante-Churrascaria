import React, { useRef, useState, useEffect } from 'react';
import { MEDIA_PATHS, RESTAURANT_DATA } from '../../constants/restaurant';
import { MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferência por movimento reduzido do sistema do usuário
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Se o vídeo já estiver pronto no cache
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  const handleScrollDown = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const nextSection = document.getElementById('sobre');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="inicio"
      aria-label="Apresentação cinematográfica do Brasa Restaurante e Churrascaria"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1100px] flex items-center justify-center overflow-hidden bg-brasa-navy-deep select-none"
    >
      {/* 1. CAMADA DE VÍDEO CINEMATOGRÁFICO DE FUNDO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Pôster / Cor de base anti-tela-preta */}
        <div
          className={`absolute inset-0 bg-[#060B14] transition-opacity duration-1000 z-0 ${
            videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 45%, #18263f 0%, #060B14 75%)',
          }}
        />

        {!prefersReducedMotion ? (
          <video
            ref={videoRef}
            src={MEDIA_PATHS.heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onPlaying={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          />
        ) : (
          /* Fallback cinematográfico quando o usuário requisitar movimento reduzido */
          <div
            className="w-full h-full opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, #243555 0%, #060B14 85%)',
            }}
          />
        )}

        {/* 2. GRADIENTES CINEMATOGRÁFICOS DE CONTRASTE & COR */}
        {/* Vinheta radial escura para focar no centro e proteger os textos */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

        {/* Gradiente vertical nobre: protege o header no topo e a transição da base */}
        <div className="absolute inset-0 bg-gradient-to-b from-brasa-navy-deep/90 via-transparent to-brasa-navy-deep pointer-events-none" />

        {/* Filtro atmosférico sutil com calor de brasa na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-brasa-navy-deep via-brasa-navy-deep/60 to-transparent pointer-events-none" />
      </div>

      {/* 3. CONTEÚDO EDITORIAL PRINCIPAL */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center pt-16 sm:pt-12">
        {/* Tagline / Insígnia discreta */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brasa-gold/30 bg-brasa-navy-deep/60 backdrop-blur-md mb-6 sm:mb-8 animate-fade-in shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-brasa-ember animate-pulse" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#EAD17A] font-semibold">
            Palhoça — Santa Catarina
          </span>
        </div>

        {/* Headline Cinematográfica */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.08] sm:leading-[1.06] mb-5 sm:mb-6 max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
          O sabor que nasce <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822] font-semibold">
            da brasa.
          </span>
        </h1>

        {/* Texto Complementar */}
        <p className="font-sans text-neutral-200 text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl mb-9 sm:mb-11 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Tradição, sabor e uma experiência especial em Palhoça.
        </p>

        {/* CTAs de Ação com Hierarquia Clara */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          {/* CTA Principal: Como Chegar (Google Maps Oficial) */}
          <a
            href={RESTAURANT_DATA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs sm:text-sm uppercase tracking-[0.22em] font-bold text-brasa-navy-deep bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822] hover:brightness-110 active:scale-[0.98] rounded-md transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.35)]"
          >
            <MapPin className="w-4 h-4 text-brasa-navy-deep group-hover:scale-110 transition-transform duration-200" />
            <span>Como Chegar</span>
          </a>

          {/* CTA Secundário: Conheça o Brasa (Scroll Suave) */}
          <button
            type="button"
            onClick={handleScrollDown}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm uppercase tracking-[0.22em] font-medium text-neutral-200 hover:text-white bg-brasa-navy-surface/40 hover:bg-brasa-navy-surface/70 border border-brasa-gold/30 hover:border-brasa-gold/60 backdrop-blur-md rounded-md transition-all duration-300"
          >
            <span>Conheça o Brasa</span>
          </button>
        </div>
      </div>

      {/* 4. INDICADOR MINIMALISTA DE SCROLL */}
      <button
        type="button"
        onClick={handleScrollDown}
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-400 hover:text-brasa-gold transition-colors duration-300 group cursor-pointer focus:outline-none"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
          Descobrir
        </span>
        <div className="w-5 h-8 rounded-full border border-neutral-400/50 group-hover:border-brasa-gold/80 flex items-start justify-center p-1 transition-colors">
          <div className="w-1 h-2 rounded-full bg-brasa-gold animate-bounce" />
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brasa-gold -mt-1 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </section>
  );
};
