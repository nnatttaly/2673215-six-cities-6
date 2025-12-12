import { NameSpace } from 'consts';
import { Offer, Offers, State } from 'types';

export const getCurrentOffer = (state: State): Offer | null =>
  state[NameSpace.Offer].currentOffer;
export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.Offer].nearbyOffers;
export const getOfferDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offer].isOfferLoading;
export const getNearbyOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offer].isNearbyOffersLoading;
export const getRequestedOfferId = (state: State): string | null =>
  state[NameSpace.Offer].requestedOfferId;
