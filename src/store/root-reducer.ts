import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';
import { appProcess } from './app-process/app-process';
import { offerProcess } from './offer-process/offer-process';
import { favoritesProcess } from './favorites-process/favorites-process';
import { reviewsProcess } from './reviews-process/reviews-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Reviews]: reviewsProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
});
