import { favoritesProcess } from './favorites-process';
import { fetchFavoritesAction, changeFavoriteStatusAction } from '../api-actions';
import { makeFakeOffer, makeFakeOffers } from '@utils/mocks';

describe('Редьюсер: favoritesProcess', () => {
  const reducer = favoritesProcess.reducer;
  const mockOffers = makeFakeOffers(3);
  const mockOffer = makeFakeOffer();

  const initialState = {
    favorites: [],
    isFavoritesLoading: false,
  };

  describe('Базовые тесты', () => {
    it('должен возвращать дефолтное начальное состояние', () => {
      expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('должен устанавливать loading при начале загрузки', () => {
      const result = reducer(initialState, fetchFavoritesAction.pending);
      expect(result.isFavoritesLoading).toBe(true);
    });

    it('должен устанавливать favorites и снимать loading при успешной загрузке', () => {
      const result = reducer(
        { ...initialState, isFavoritesLoading: true },
        fetchFavoritesAction.fulfilled(mockOffers, '', undefined)
      );

      expect(result.isFavoritesLoading).toBe(false);
      expect(result.favorites).toEqual(mockOffers);
    });

    it('должен снимать loading при ошибке', () => {
      const result = reducer(
        { ...initialState, isFavoritesLoading: true },
        fetchFavoritesAction.rejected
      );

      expect(result.isFavoritesLoading).toBe(false);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('должен добавлять оффер в favorites при isFavorite: true', () => {
      const favoriteOffer = { ...mockOffer, isFavorite: true };
      const result = reducer(
        initialState,
        changeFavoriteStatusAction.fulfilled(favoriteOffer, '', {
          offerId: favoriteOffer.id,
          status: 1
        })
      );

      expect(result.favorites).toHaveLength(1);
      expect(result.favorites[0]).toEqual(favoriteOffer);
    });

    it('должен обновлять существующий оффер в favorites', () => {
      const existingState = { ...initialState, favorites: mockOffers };
      const updatedOffer = { ...mockOffers[0], isFavorite: true, title: 'Updated' };

      const result = reducer(
        existingState,
        changeFavoriteStatusAction.fulfilled(updatedOffer, '', {
          offerId: updatedOffer.id,
          status: 1
        })
      );

      const updated = result.favorites.find((o) => o.id === updatedOffer.id);
      expect(updated?.title).toBe('Updated');
      expect(result.favorites).toHaveLength(3);
    });

    it('должен удалять оффер из favorites при isFavorite: false', () => {
      const existingState = { ...initialState, favorites: mockOffers };
      const offerToRemove = { ...mockOffers[1], isFavorite: false };

      const result = reducer(
        existingState,
        changeFavoriteStatusAction.fulfilled(offerToRemove, '', {
          offerId: offerToRemove.id,
          status: 0
        })
      );

      expect(result.favorites).toHaveLength(2);
      expect(result.favorites.find((o) => o.id === offerToRemove.id)).toBeUndefined();
    });

    it('не должен добавлять оффер при isFavorite: false', () => {
      const nonFavorite = { ...mockOffer, isFavorite: false };
      const result = reducer(
        initialState,
        changeFavoriteStatusAction.fulfilled(nonFavorite, '', {
          offerId: nonFavorite.id,
          status: 0
        })
      );

      expect(result.favorites).toHaveLength(0);
    });
  });

  describe('Интеграционный тест', () => {
    it('должен корректно обрабатывать последовательность действий', () => {
      let state = reducer(undefined, { type: '' });

      state = reducer(state, fetchFavoritesAction.fulfilled(mockOffers, '', undefined));
      expect(state.favorites).toHaveLength(3);

      const newFavorite = { ...makeFakeOffer(), isFavorite: true };
      state = reducer(state, changeFavoriteStatusAction.fulfilled(newFavorite, '', {
        offerId: newFavorite.id,
        status: 1
      }));
      expect(state.favorites).toHaveLength(4);

      const offerToRemove = { ...mockOffers[0], isFavorite: false };
      state = reducer(state, changeFavoriteStatusAction.fulfilled(offerToRemove, '', {
        offerId: offerToRemove.id,
        status: 0
      }));
      expect(state.favorites).toHaveLength(3);
    });
  });
});
