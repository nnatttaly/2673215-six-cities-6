import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';
import { Offer, Offers, Review } from 'types';
import { fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction } from '../api-actions';

type OfferProcess = {
  currentOffer: Offer | null;
  requestedOfferId: string | null;
  nearbyOffers: Offers;
  reviews: Review[];
  isOfferDataLoading: boolean;
  isNearbyOffersLoading: boolean;
  isReviewsLoading: boolean;
  error: string | null;
};

const initialState: OfferProcess = {
  currentOffer: null,
  requestedOfferId: null,
  nearbyOffers: [],
  reviews: [],
  isOfferDataLoading: false,
  isNearbyOffersLoading: false,
  isReviewsLoading: false,
  error: null,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOfferData: (state) => {
      state.currentOffer = null;
      state.nearbyOffers = [];
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state, action) => {
        state.isOfferDataLoading = true;
        state.error = null;
        state.currentOffer = null;
        state.requestedOfferId = action.meta.arg;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.currentOffer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.isOfferDataLoading = false;
        state.error = action.error.message || 'Failed to load offer';
      });

    builder
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = false;
      });

    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
      });
  }
});

export const { clearOfferData } = offerProcess.actions;
