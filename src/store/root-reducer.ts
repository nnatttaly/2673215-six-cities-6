import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';
import { appProcess } from './app-process/app-process';
import { offerProcess } from './offer-process/offer-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
});
