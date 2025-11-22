import { City } from 'types';

export const CITIES: City[] = [
  {
    name: 'Paris',
    coordinates: {
      lat: 48.85661,
      lng: 2.351499,
    },
    zoom: 12,
  },
  {
    name: 'Cologne',
    coordinates: {
      lat: 50.938361,
      lng: 6.959974,
    },
    zoom: 12,
  },
  {
    name: 'Brussels',
    coordinates: {
      lat: 50.846557,
      lng: 4.351697,
    },
    zoom: 12,
  },
  {
    name: 'Amsterdam',
    coordinates: {
      lat: 52.37454,
      lng: 4.897976,
    },
    zoom: 12,
  },
  {
    name: 'Hamburg',
    coordinates: {
      lat: 53.550341,
      lng: 10.000654,
    },
    zoom: 12,
  },
  {
    name: 'Dusseldorf',
    coordinates: {
      lat: 51.225402,
      lng: 6.776314,
    },
    zoom: 12,
  },
] as const;
