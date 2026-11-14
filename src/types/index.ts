export interface ScheduleInfo {
  days: string;
  hours: string;
  period: 'lunch';
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    full: string;
  };
  social: {
    instagram: string;
    instagramHandle: string;
  };
  mapsUrl: string;
  schedules: ScheduleInfo[];
}
