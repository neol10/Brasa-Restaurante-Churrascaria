import React, { useState, useEffect } from 'react';
import { MEDIA_PATHS, RESTAURANT_DATA } from '../../constants/restaurant';
import { Menu, X, MapPin } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface HeaderProps {
  onNavigate?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa transição de opacidade após 40px de rolagem
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile com tecla ESC ou resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Início', href: '#inicio', id: 'inicio' },
    { label: 'O Brasa', href: '#sobre', id: 'sobre' },
    { label: 'Gastronomia', href: '#gastronomia', id: 'gastronomia' },
    { label: 'Horários', href: '#horarios', id: 'horarios' },
    { label: 'Localização', href: '#localizacao', id: 'localizacao' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brasa-navy-deep/95 backdrop-blur-md border-b border-brasa-gold/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-brasa-navy-deep/80 via-brasa-navy-deep/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo e Identidade Oficial */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, 'inicio')}
            className="group flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brasa-gold/70 rounded-lg p-1"
            aria-label="Brasa Restaurante e Churrascaria - Ir para o início"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-brasa-gold/40 group-hover:border-brasa-gold transition-colors duration-300 shadow-[0_0_12px_rgba(212,175,55,0.2)] flex-shrink-0 bg-brasa-navy-deep">
              <img
                src={MEDIA_PATHS.logo}
                alt="Logotipo Brasa Restaurante e Churrascaria"
                width={48}
                height={48}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F4E1A4] via-brasa-gold to-[#AA8822] uppercase leading-none">
                Brasa
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-sans font-medium mt-1 leading-none group-hover:text-neutral-300 transition-colors">
                Restaurante & Churrascaria
              </span>
            </div>
          </a>

          {/* Navegação Desktop */}
          <nav
            role="navigation"
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-8 text-[13px] font-medium tracking-[0.18em] uppercase text-neutral-300"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative py-1 hover:text-brasa-gold transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-brasa-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Ações Direitas (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={RESTAURANT_DATA.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial do Brasa Restaurante"
              className="p-2 text-neutral-300 hover:text-brasa-gold border border-brasa-navy-light/60 hover:border-brasa-gold/40 rounded-full transition-all duration-300 hover:bg-brasa-gold/10"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <a
              href={RESTAURANT_DATA.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-brasa-navy-deep bg-gradient-to-r from-[#EAD17A] via-brasa-gold to-[#AA8822] hover:brightness-110 active:scale-[0.98] rounded transition-all duration-200 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Como Chegar</span>
            </a>
          </div>

          {/* Botão Menu Hambúrguer (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-neutral-200 hover:text-brasa-gold rounded-lg border border-brasa-navy-light/60 hover:border-brasa-gold/40 bg-brasa-navy-surface/40 backdrop-blur-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brasa-gold"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Painel do Menu Mobile com Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Backdrop escurecido */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Gaveta do Menu */}
        <div
          className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-brasa-navy-deep/98 border-l border-brasa-gold/20 pt-24 px-6 pb-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brasa-gold/80 font-semibold border-b border-brasa-navy-light/60 pb-2">
              Navegação
            </span>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="font-editorial text-xl tracking-wider text-neutral-200 hover:text-brasa-gold transition-colors py-1.5 flex items-center justify-between border-b border-brasa-navy-light/30"
                >
                  <span>{item.label}</span>
                  <span className="text-brasa-gold/50 text-xs">→</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-brasa-navy-light/60">
            <a
              href={RESTAURANT_DATA.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 text-xs uppercase tracking-[0.2em] font-bold text-brasa-navy-deep bg-gradient-to-r from-[#EAD17A] via-brasa-gold to-[#AA8822] rounded shadow-gold-glow"
            >
              <MapPin className="w-4 h-4" />
              <span>Como Chegar</span>
            </a>

            <a
              href={RESTAURANT_DATA.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-3 text-xs uppercase tracking-normal font-medium text-neutral-200 hover:text-brasa-gold border border-brasa-navy-light/80 rounded hover:border-brasa-gold/40 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-brasa-gold flex-shrink-0" />
              <span className="truncate max-w-[240px] text-center">{RESTAURANT_DATA.social.instagramHandle}</span>
            </a>

            <p className="text-[11px] text-neutral-400 text-center mt-2 leading-relaxed">
              {RESTAURANT_DATA.address.full}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
