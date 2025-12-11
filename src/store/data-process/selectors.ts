import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';
import { Offers, City, State } from 'types';

export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersLoading;

export const getOffersByCity = createSelector(
  [getOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);
