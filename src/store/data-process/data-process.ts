import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, DEFAULT_CITY } from 'consts';
import { Offers, City } from 'types';
import { fetchOffersAction } from '../api-actions';
import { changeCity } from '../action';

type DataProcess = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
};

const initialState: DataProcess = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersDataLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(changeCity, (state, action: PayloadAction<City>) => {
        state.city = action.payload;
      });
  }
});
