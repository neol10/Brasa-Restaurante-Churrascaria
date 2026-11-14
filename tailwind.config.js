/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brasa: {
          navy: {
            DEFAULT: '#0B1528',
            deep: '#060B14',
            light: '#13223E',
            surface: '#0F1C33',
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#EAD17A',
            dark: '#AA8822',
            muted: '#C5A059',
          },
          charcoal: {
            DEFAULT: '#141416',
            pure: '#0B0B0C',
            surface: '#1A1B1E',
            border: '#2A2B30',
          },
          ember: {
            DEFAULT: '#D35400',
            glow: '#E67E22',
            fire: '#C0392B',
            flame: '#F39C12',
          },
        },
      },
      fontFamily: {
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at center, rgba(6, 11, 20, 0.4) 0%, rgba(6, 11, 20, 0.95) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #EAD17A 0%, #D4AF37 50%, #AA8822 100%)',
        'ember-gradient': 'linear-gradient(135deg, #F39C12 0%, #E67E22 50%, #C0392B 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'ember-glow': '0 0 35px rgba(230, 126, 34, 0.25)',
      },
    },
  },
  plugins: [],
}
