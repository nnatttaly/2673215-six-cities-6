import { HousingType } from './housing-types.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';
import { City } from './city.type.js';

export type Offer = {
  id: string;
  previewImage: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: HousingType;
  isFavorite: boolean;
  rating: number;
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  host: User;
  goods: string[];
  city: City;
  commentCount: number;
  location: Location;
};

export type Offers = Offer[];
