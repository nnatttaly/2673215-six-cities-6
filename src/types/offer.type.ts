import { HousingType } from './housing-types.js';
import { User } from './user.type.js';
import { Coordinates } from './coordinates.type.js';
import { CityName } from './city-names.js';

export type Offer = {
  id: string;
  previewImage: string;
  isPremium: boolean;
  price: number;
  title: string;
  housingType: HousingType;
  isFavorite: boolean;
  rating: number;
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  host: User;
  amenities: string[];
  city: CityName;
  commentCount: number;
  coordinates: Coordinates;
};
