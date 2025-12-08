import { NameSpace } from 'consts';
import { Offers, City, State } from 'types';

export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersDataLoading;
