import { store } from '../store/index';
import { AuthorizationStatus } from 'consts';
import { UserData } from './user-data';
import { City } from './city.type';
import { Offers } from './offer.type';
import { NameSpace } from '../consts';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = {
  [NameSpace.Data]: {
    city: City;
    offers: Offers;
    isOffersDataLoading: boolean;
  };
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus;
    userData: UserData | null;
  };
  [NameSpace.App]: {
    error: string | null;
  };
};

export type AppDispatch = typeof store.dispatch;
