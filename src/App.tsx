import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { CinematicScroll } from './components/sections/CinematicScroll';
import { BrasaExperienceGallery } from './components/sections/BrasaExperienceGallery';
import { RESTAURANT_DATA } from './constants/restaurant';
import { MapPin, Clock } from 'lucide-react';

export function App() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brasa-navy-deep text-neutral-100 flex flex-col selection:bg-brasa-gold selection:text-brasa-navy-deep">
      {/* Header com glassmorphism e transparência adaptativa */}
      <Header onNavigate={handleScrollTo} />

      <main className="flex-1">
        {/* 1. Hero Cinematográfico (Dobra 1) */}
        <Hero onExploreClick={() => handleScrollTo('experiencia')} />

        {/* 2. Experiência de Scroll Cinematográfico com Vídeo da Picanha (Dobra 2) */}
        <CinematicScroll />

        {/* 3. Galeria Gastronômica Cinematográfica (Etapa 4) */}
        <BrasaExperienceGallery />

        {/* 4. Apresentação Institucional (O Brasa & Horários/Localização) */}
        <section
          id="sobre"
          className="relative py-24 sm:py-32 px-6 bg-gradient-to-b from-brasa-navy-deep via-brasa-navy to-brasa-navy-deep border-t border-brasa-gold/10"
        >
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-brasa-gold font-semibold mb-3">
              O Restaurante
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-white mb-6">
              A Excelência do Churrasco em Palhoça
            </h2>
            <p className="font-sans text-neutral-300 text-base sm:text-lg max-w-2xl mb-12 font-light leading-relaxed">
              Ambiente planejado para proporcionar momentos inesquecíveis, cortes nobres preparados na brasa e o autêntico sabor da tradição.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl text-left">
              <div
                id="horarios"
                className="p-6 rounded-xl bg-brasa-navy-surface/60 border border-brasa-gold/20 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-2.5 text-brasa-gold text-sm font-semibold uppercase tracking-wider mb-4">
                  <Clock className="w-4 h-4 text-brasa-gold" />
                  <span>Horários de Atendimento</span>
                </div>
                {RESTAURANT_DATA.schedules.map((sch, i) => (
                  <div key={i} className="text-sm text-neutral-200 mb-2.5 last:mb-0 flex justify-between items-center">
                    <span className="text-neutral-400">{sch.days}</span>
                    <strong className="text-white font-medium">{sch.hours}</strong>
                  </div>
                ))}
              </div>

              <div
                id="localizacao"
                className="p-6 rounded-xl bg-brasa-navy-surface/60 border border-brasa-gold/20 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-2.5 text-brasa-gold text-sm font-semibold uppercase tracking-wider mb-4">
                  <MapPin className="w-4 h-4 text-brasa-gold" />
                  <span>Nosso Endereço</span>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed mb-4">
                  {RESTAURANT_DATA.address.street}, {RESTAURANT_DATA.address.neighborhood}<br />
                  {RESTAURANT_DATA.address.city} — {RESTAURANT_DATA.address.state}
                </p>
                <a
                  href={RESTAURANT_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brasa-gold hover:text-brasa-gold-light uppercase tracking-wider font-semibold transition-colors"
                >
                  Abrir no Google Maps →
                </a>
              </div>
            </div>

            {/* Âncoras auxiliares de navegação */}
          </div>
        </section>
      </main>

      {/* Footer com dados oficiais */}
      <Footer />
    </div>
  );
}

export default App;
