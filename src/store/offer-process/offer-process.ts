import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';
import { Offer, Offers } from 'types';
import { fetchOfferAction, fetchNearbyOffersAction, changeFavoriteStatusAction } from '../api-actions';

type OfferProcess = {
  currentOffer: Offer | null;
  requestedOfferId: string | null;
  nearbyOffers: Offers;
  isOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
};

const initialState: OfferProcess = {
  currentOffer: null,
  requestedOfferId: null,
  nearbyOffers: [],
  isOfferLoading: false,
  isNearbyOffersLoading: false,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    clearOfferData: (state) => {
      state.currentOffer = null;
      state.requestedOfferId = null;
      state.nearbyOffers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state, action) => {
        state.isOfferLoading = true;
        state.requestedOfferId = action.meta.arg;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.currentOffer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.currentOffer = null;
      })

      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isNearbyOffersLoading = false;
        state.nearbyOffers = [];
      })

      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.currentOffer?.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }

        state.nearbyOffers = state.nearbyOffers.map((offer) => {
          if (offer.id === updatedOffer.id) {
            return { ...offer, isFavorite: updatedOffer.isFavorite };
          }
          return offer;
        });
      });
  }
});

export const { clearOfferData } = offerProcess.actions;
