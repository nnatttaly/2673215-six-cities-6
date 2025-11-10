export const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
] as const;

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

export const MAX_RATING = 5 as const;
export const IMAGES_LIMIT = 6 as const;
export const MIN_COMMENT_LENGTH = 50 as const;
export const MAX_COMMENT_LENGTH = 300 as const;
export const REVIEWS_LIMIT = 10 as const;
export const NEARBY_OFFERS_LIMIT = 3;

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';
