import { createAction } from '@reduxjs/toolkit';
import { City, Offers } from 'types';

export const changeCity = createAction<City>('city/changeCity');

export const loadOffers = createAction<Offers>('offers/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setError = createAction<string | null>('game/setError');
