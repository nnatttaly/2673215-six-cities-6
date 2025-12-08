import { SortOption } from 'types';
import { CITIES } from './cities';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

export const DEFAULT_SORT_OPTION: SortOption = 'Popular';
export const DEFAULT_CITY = CITIES[0];

export const MAX_RATING = 5 as const;
export const IMAGES_LIMIT = 6 as const;
export const MIN_COMMENT_LENGTH = 50 as const;
export const MAX_COMMENT_LENGTH = 300 as const;
export const REVIEWS_LIMIT = 10 as const;
export const NEARBY_OFFERS_LIMIT = 3;

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const TIMEOUT_SHOW_ERROR = 2000;

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const NameSpace = {
  Data: 'DATA',
  User: 'USER',
  App: 'APP',
} as const;
