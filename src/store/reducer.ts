import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setOffersDataLoadingStatus, setError } from './action.js';
import { City, Offers } from 'types';
import { DEFAULT_CITY } from 'consts';

type State = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
  error: string | null;
};

const initialState: State = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersDataLoading: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
