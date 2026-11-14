import { RESTAURANT_DATA } from '../../constants/restaurant';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brasa-navy-deep border-t border-brasa-navy-light/40 py-12 px-6 text-center text-sm text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-editorial text-brasa-gold tracking-wider text-base uppercase font-semibold">
            {RESTAURANT_DATA.name}
          </span>
          <span className="text-xs text-neutral-400 mt-1">
            {RESTAURANT_DATA.address.full}
          </span>
        </div>
        
        <div className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Brasa Restaurante e Churrascaria. Todos os direitos reservados.
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <a
            href={RESTAURANT_DATA.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-w-full text-xs text-brasa-gold hover:text-brasa-gold-light transition-colors break-all text-center tracking-normal font-sans font-medium"
          >
            {RESTAURANT_DATA.social.instagramHandle}
          </a>
        </div>
      </div>
    </footer>
  );
};
