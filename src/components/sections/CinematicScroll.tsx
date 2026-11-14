import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Evita refresh a cada mudança da barra de endereço no mobile
ScrollTrigger.config({ ignoreMobileResize: true });

/* ------------------------------------------------------------------ */
/* Configuração das sequências de frames (geradas com FFmpeg, WebP)    */
/* ------------------------------------------------------------------ */
interface FrameSet {
  dir: string;
  total: number;
  ahead: number; // frames mantidos à frente do índice atual
  behind: number; // frames mantidos atrás
  concurrency: number;
  maxDpr: number;
  scrollScreens: number; // altura do scroll, em viewports
}

const DESKTOP_SET: FrameSet = {
  dir: '/media/scroll-frames/desktop',
  total: 240,
  ahead: 48,
  behind: 16,
  concurrency: 6,
  maxDpr: 1.5,
  scrollScreens: 5,
};

const MOBILE_SET: FrameSet = {
  dir: '/media/scroll-frames/mobile',
  total: 160,
  ahead: 30,
  behind: 10,
  concurrency: 4,
  maxDpr: 1.25,
  scrollScreens: 4,
};

const frameUrl = (set: FrameSet, index: number) =>
  `${set.dir}/frame-${String(index + 1).padStart(4, '0')}.webp`;

const pickSet = (): FrameSet =>
  window.matchMedia('(max-width: 767px)').matches ? MOBILE_SET : DESKTOP_SET;

const MOMENTS = [
  { kicker: 'A Origem do Fogo', a: 'É na brasa que', b: 'tudo começa.' },
  { kicker: 'O Ponto Perfeito', a: 'O cuidado está em', b: 'cada detalhe.' },
  { kicker: 'Palhoça — SC', a: 'Uma experiência para', b: 'saborear.' },
] as const;

const Moment: React.FC<{
  m: (typeof MOMENTS)[number];
  innerRef?: React.Ref<HTMLDivElement>;
  className?: string;
}> = ({ m, innerRef, className = '' }) => (
  <div
    ref={innerRef}
    className={`flex flex-col items-center text-center ${className}`}
  >
    <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#EAD17A] font-semibold mb-2 sm:mb-3">
      {m.kicker}
    </span>
    <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
      {m.a} <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822]">
        {m.b}
      </span>
    </h2>
  </div>
);

export const CinematicScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  // Conjunto escolhido uma única vez por montagem (desktop x mobile)
  const [set] = useState<FrameSet>(() =>
    typeof window !== 'undefined' ? pickSet() : DESKTOP_SET
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    const { total } = set;
    let disposed = false;

    // Cache: null = não carregado; HTMLImageElement com complete = pronto
    const images: (HTMLImageElement | null)[] = new Array(total).fill(null);
    const ready: boolean[] = new Array(total).fill(false);
    const loading: boolean[] = new Array(total).fill(false);
    const failed: boolean[] = new Array(total).fill(false);
    let inFlight = 0;

    let targetIndex = 0; // índice mais recente pedido pelo scroll
    let drawnIndex = -1; // último frame efetivamente desenhado
    let rafId: number | null = null;

    /* ------------------------- desenho em canvas ------------------- */
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, set.maxDpr);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        return true;
      }
      return false;
    };

    const drawImageCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return false;
      const scale = Math.max(cw / iw, ch / ih); // equivalente a object-fit: cover
      const sw = cw / scale;
      const sh = ch / scale;
      const focusX = 0.5;
      const sx = (iw - sw) * focusX;
      const sy = (ih - sh) * 0.5;
      ctx2d.imageSmoothingQuality = 'high';
      // Sem clearRect: o frame novo cobre 100% do canvas
      ctx2d.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
      return true;
    };

    const nearestReady = (i: number) => {
      for (let d = 0; d < total; d++) {
        if (i - d >= 0 && ready[i - d]) return i - d;
        if (i + d < total && ready[i + d]) return i + d;
      }
      return -1;
    };

    const render = () => {
      rafId = null;
      if (disposed) return;
      // Frame pedido, ou o mais próximo já decodificado (nunca congela nem limpa)
      const idx = ready[targetIndex] ? targetIndex : nearestReady(targetIndex);
      if (idx < 0) return;
      if (idx === drawnIndex) return;
      const img = images[idx];
      if (img && drawImageCover(img)) drawnIndex = idx;
    };

    const scheduleRender = () => {
      if (rafId === null) rafId = requestAnimationFrame(render);
    };

    /* ------------------------- carregamento ------------------------ */
    const wanted = (): number[] => {
      const list: number[] = [targetIndex];
      for (let k = 1; k <= set.ahead; k++) {
        if (targetIndex + k < total) list.push(targetIndex + k);
        if (k <= set.behind && targetIndex - k >= 0) list.push(targetIndex - k);
      }
      for (let i = 0; i < total; i++) list.push(i); // restante, em segundo plano
      return list;
    };

    const load = (i: number) => {
      loading[i] = true;
      inFlight++;
      const img = new Image();
      img.decoding = 'async';
      const done = (ok: boolean) => {
        inFlight--;
        loading[i] = false;
        if (disposed) return;
        if (ok) {
          images[i] = img;
          ready[i] = true;
        } else {
          failed[i] = true;
        }
        if (i === targetIndex || drawnIndex < 0) scheduleRender();
        pump();
      };
      img.onload = () => {
        // decode() garante que o bitmap está pronto antes de desenhar
        if (img.decode) img.decode().then(() => done(true), () => done(true));
        else done(true);
      };
      img.onerror = () => done(false);
      img.src = frameUrl(set, i);
    };

    function pump() {
      if (disposed) return;
      for (const i of wanted()) {
        if (inFlight >= set.concurrency) break;
        if (!ready[i] && !loading[i] && !failed[i]) load(i);
      }
    }

    /* ----------------------------- resize -------------------------- */
    const onResize = () => {
      if (sizeCanvas()) {
        drawnIndex = -1; // força redesenho após redimensionar
        scheduleRender();
      }
    };
    sizeCanvas();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    /* ----------------- GSAP: pin + scrub + textos ------------------ */
    const progress = { p: 0 };
    const gctx = gsap.context(() => {
      const els = textRefs.map((r) => r.current);
      gsap.set(els, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * set.scrollScreens)}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progresso 0→1 mapeado para o índice do frame
      tl.to(
        progress,
        {
          p: 1,
          duration: 1,
          onUpdate: () => {
            const idx = Math.round(progress.p * (total - 1));
            if (idx !== targetIndex) {
              targetIndex = idx;
              pump();
              scheduleRender();
            }
          },
        },
        0
      );

      const fadeIn = { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out' };
      const fadeOut = { opacity: 0, y: -16, duration: 0.06, ease: 'power2.in' };
      tl.to(els[0], fadeIn, 0.04).to(els[0], fadeOut, 0.26);
      tl.to(els[1], fadeIn, 0.36).to(els[1], fadeOut, 0.60);
      tl.to(els[2], fadeIn, 0.70); // último momento permanece até o fim
    }, section);

    // Primeiro frame (prioridade máxima) e início do carregamento progressivo
    pump();

    return () => {
      disposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      gctx.revert();
      for (let i = 0; i < total; i++) images[i] = null;
    };
  }, [reducedMotion, set]);

  const posterUrl = frameUrl(set, 0);
  const staticUrl = frameUrl(set, Math.floor(set.total / 2));

  /* ----------------- Versão estática (prefers-reduced-motion) ------ */
  if (reducedMotion) {
    return (
      <section
        id="experiencia"
        aria-label="Experiência cinematográfica do preparo da carne na brasa"
        className="relative w-full min-h-[100svh] overflow-hidden bg-brasa-navy-deep"
      >
        <img
          src={staticUrl}
          alt="Picanha fatiada sobre tábua de madeira, ao lado de brasas"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brasa-navy-deep via-brasa-navy-deep/30 to-brasa-navy-deep" />
        <div className="relative z-10 min-h-[100svh] flex flex-col items-center justify-end gap-8 px-6 py-24">
          {MOMENTS.map((m) => (
            <Moment key={m.kicker} m={m} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      aria-label="Experiência cinematográfica do preparo da carne na brasa"
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-brasa-navy-deep select-none"
    >
      {/* Frame inicial estático: sempre presente, nunca deixa a seção vazia */}
      <img
        src={posterUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Sequência cinematográfica do preparo da picanha na brasa"
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradientes de legibilidade (sem cobrir a carne) */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brasa-navy-deep/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-brasa-navy-deep via-brasa-navy-deep/60 to-transparent pointer-events-none" />

      {/* Textos no terço inferior */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[34%] px-6 sm:px-8 pointer-events-none">
        {MOMENTS.map((m, i) => (
          <Moment
            key={m.kicker}
            m={m}
            innerRef={textRefs[i]}
            className="absolute inset-x-6 sm:inset-x-8 bottom-14 sm:bottom-16 transform-gpu"
          />
        ))}
      </div>
    </section>
  );
};

