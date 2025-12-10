import { NameSpace } from 'consts';
import { Offer, Offers, Review, State } from 'types';

export const getCurrentOffer = (state: State): Offer | null =>
  state[NameSpace.Offer].currentOffer;
export const getRequestedOfferId = (state: State): string | null =>
  state[NameSpace.Offer].requestedOfferId;
export const getNearbyOffers = (state: State): Offers =>
  state[NameSpace.Offer].nearbyOffers;
export const getReviews = (state: State): Review[] =>
  state[NameSpace.Offer].reviews;
export const getOfferDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offer].isOfferDataLoading;
export const getNearbyOffersLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offer].isNearbyOffersLoading;
export const getReviewsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Offer].isReviewsLoading;
export const getIsReviewPosting = (state: State): boolean =>
  state[NameSpace.Offer].isReviewPosting;
export const getReviewPostingError = (state: State): string | null =>
  state[NameSpace.Offer].reviewPostingError;
export const getOfferError = (state: State): string | null =>
  state[NameSpace.Offer].error;
