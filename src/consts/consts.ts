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

export const MAX_RATING = 5;
