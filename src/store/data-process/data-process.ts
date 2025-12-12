import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY } from 'consts';
import { Offers, City } from 'types';
import { fetchOffersAction, changeFavoriteStatusAction, logoutAction } from '../api-actions';

type DataProcess = {
  city: City;
  offers: Offers;
  isOffersLoading: boolean;
};

const initialState: DataProcess = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    resetCity: (state) => {
      state.city = DEFAULT_CITY;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const offer = state.offers.find((o) => o.id === updatedOffer.id);
        if (offer) {
          offer.isFavorite = updatedOffer.isFavorite;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.city = DEFAULT_CITY;
      });
  }
});

export const { changeCity } = dataProcess.actions;
