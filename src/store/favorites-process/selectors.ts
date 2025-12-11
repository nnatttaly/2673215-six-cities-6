import { NameSpace } from 'consts';
import { Offers, State } from 'types';

export const getFavorites = (state: State): Offers =>
  state[NameSpace.Favorites].favorites;
export const getFavoritesCount = (state: State): number =>
  state[NameSpace.Favorites].favorites.length;
export const getFavoritesLoadingStatus = (state: State): boolean =>
  state[NameSpace.Favorites].isFavoritesLoading;
