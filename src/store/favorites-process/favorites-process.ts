import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from 'consts';
import { Offers } from 'types';
import { fetchFavoritesAction, changeFavoriteStatusAction } from '../api-actions';

type FavoritesProcess = {
  favorites: Offers;
  isFavoritesLoading: boolean;
};

const initialState: FavoritesProcess = {
  favorites: [],
  isFavoritesLoading: false,
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })

      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.favorites.findIndex((o) => o.id === updatedOffer.id);

        if (updatedOffer.isFavorite) {
          if (index === -1) {
            state.favorites.push(updatedOffer);
          } else {
            state.favorites[index] = updatedOffer;
          }
        } else if (index !== -1) {
          state.favorites.splice(index, 1);
        }
      });
  }
});

export default favoritesProcess.reducer;

