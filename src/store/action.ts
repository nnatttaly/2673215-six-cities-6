import { createAction } from '@reduxjs/toolkit';
import { City, Offers, UserData } from 'types';
import {AuthorizationStatus} from 'consts';

export const changeCity = createAction<City>('city/changeCity');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const loadOffers = createAction<Offers>('offers/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserData = createAction<UserData | null>('user/setUserData');

export const setError = createAction<string | null>('game/setError');
