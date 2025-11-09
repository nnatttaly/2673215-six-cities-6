import { CityName } from './city-names.js';
import { Coordinates } from './coordinates.type.js';

export type City = {
  name: CityName;
  coordinates: Coordinates;
  zoom: number;
};
