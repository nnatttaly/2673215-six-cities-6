import { City } from 'types';

export function getRandomCity(cities: City[]): City {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}
