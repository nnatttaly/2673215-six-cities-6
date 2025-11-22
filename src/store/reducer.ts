import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffers } from './action.js';
import { City, Offer } from 'types';

type State = {
  city: City;
  offers: Offer[];
};

const initialState: State = {
  city: {
    name: 'Paris',
    coordinates: {
      lat: 48.85661,
      lng: 2.351499,
    },
    zoom: 13,
  },
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
