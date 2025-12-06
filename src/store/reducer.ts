import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, requireAuthorization, setUserData, setOffersDataLoadingStatus, setError } from './action.js';
import { City, Offers, UserData } from 'types';
import { DEFAULT_CITY, AuthorizationStatus } from 'consts';

type InitalState = {
  city: City;
  offers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
  error: string | null;
};

const initialState: InitalState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      if (action.payload === AuthorizationStatus.NoAuth) {
        state.userData = null;
      }
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
