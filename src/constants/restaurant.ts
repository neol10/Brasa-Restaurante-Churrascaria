import type { RestaurantInfo } from '../types';

export const RESTAURANT_DATA: RestaurantInfo = {
  name: 'Brasa Restaurante e Churrascaria',
  tagline: 'A nobreza do fogo e da tradição em Palhoça',
  address: {
    street: 'Rua Cruz e Souza, 400',
    neighborhood: 'Jardim Eldorado',
    city: 'Palhoça',
    state: 'SC',
    full: 'Rua Cruz e Souza, 400, Jardim Eldorado, Palhoça — SC',
  },
  social: {
    instagram: 'https://instagram.com/brasarestaurantechurrascaria',
    instagramHandle: '@brasarestaurantechurrascaria',
  },
  mapsUrl: 'https://maps.google.com/?q=Rua+Cruz+e+Souza,+400,+Jardim+Eldorado,+Palhoça+-+SC',
  schedules: [
    {
      days: 'Segunda a Sexta',
      hours: '11h às 14h',
      period: 'lunch',
    },
    {
      days: 'Sábados, Domingos e Feriados',
      hours: '11h às 14h30',
      period: 'lunch',
    },
  ],
};

export const MEDIA_PATHS = {
  heroVideo: '/media/hero.mp4',
  scrollVideo: '/media/video-scroll.mp4',
  logo: '/media/logo.jpg',
  galeria: {
    estabelecimento2: '/media/galeria/estabelecimento 2.webp',
    estabelecimento: '/media/galeria/estabelecimento.webp',
    camarao: '/media/galeria/camarao.webp',
    pastel: '/media/galeria/pastel.webp',
    doce: '/media/galeria/doce.webp',
    fruta: '/media/galeria/fruta.webp',
    carne: '/media/galeria/carne.webp',
    eNaBrasa: '/media/galeria/é na brasa.webp',
  },
} as const;
