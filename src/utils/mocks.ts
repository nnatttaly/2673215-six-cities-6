import { CITIES } from 'consts';
import { name, internet, image, datatype, lorem, random, address, date } from 'faker';
import { UserData, Offer, Offers, housingTypes, Location, User, Review, City } from 'types';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from 'types';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeUser = (): User => ({
  name: name.findName(),
  email: internet.email(),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
});

export const makeFakeUserData = (): UserData => ({
  ...makeFakeUser(),
  token: datatype.uuid(),
});

const makeFakeLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number({ min: 1, max: 20 }),
});

export const makeFakeRating = (): number =>
  Math.floor(Math.random() * 41) / 10 + 1;

export const makeFakeCity = (): City =>
  random.arrayElement(CITIES);

export const makeFakeOffer = (): Offer => ({
  id: datatype.uuid(),
  title: lorem.sentence(),
  type: random.arrayElement(housingTypes),
  price: datatype.number({ min: 100, max: 100000 }),
  previewImage: image.imageUrl(),
  isPremium: datatype.boolean(),
  isFavorite: datatype.boolean(),
  description: lorem.paragraph(),
  bedrooms: datatype.number({ min: 1, max: 8 }),
  maxAdults: datatype.number({ min: 1, max: 10 }),
  images: Array.from({ length: 6 }, () => image.imageUrl()),
  rating: makeFakeRating(),
  goods: Array.from({ length: datatype.number({ min: 1, max: 7 }) }, () => lorem.word()),
  commentCount: datatype.number({ min: 0, max: 100 }),
  host: makeFakeUser(),
  city: makeFakeCity(),
  location: makeFakeLocation()

});

export const makeFakeOffers = (count: number): Offers =>
  Array.from({ length: count }, makeFakeOffer);

export const makeFakeReview = (): Review => ({
  id: datatype.uuid(),
  date: date.recent().toISOString(),
  user: makeFakeUser(),
  comment: lorem.paragraph(),
  rating: makeFakeRating(),
});

export const makeFakeReviews = (count: number): Review[] =>
  Array.from({ length: count }, makeFakeReview);
