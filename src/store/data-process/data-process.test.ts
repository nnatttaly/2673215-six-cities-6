import { dataProcess, changeCity } from './data-process';
import {
  fetchOffersAction,
  changeFavoriteStatusAction,
  logoutAction
} from '../api-actions';
import { makeFakeCity, makeFakeOffers } from '@utils/mocks';
import { DEFAULT_CITY } from 'consts';

describe('Редьюсер: dataProcess', () => {
  const reducer = dataProcess.reducer;
  const mockOffers = makeFakeOffers(3);
  const updatedOffer = { ...mockOffers[1], isFavorite: !mockOffers[1].isFavorite };
  const newCity = makeFakeCity();

  const initialState = {
    city: DEFAULT_CITY,
    offers: [],
    isOffersLoading: false,
  };

  const stateWithOffers = {
    city: DEFAULT_CITY,
    offers: mockOffers,
    isOffersLoading: false,
  };

  describe('Базовые тесты', () => {
    it('должен возвращать начальное состояние при пустом действии', () => {
      const result = reducer(stateWithOffers, { type: '' });
      expect(result).toEqual(stateWithOffers);
    });

    it('должен возвращать дефолтное начальное состояние при пустом действии', () => {
      const result = reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('Синхронный action: changeCity', () => {
    it('должен изменять город', () => {
      const result = reducer(initialState, changeCity(newCity));
      expect(result.city).toEqual(newCity);
    });

    it('не должен влиять на offers и флаги загрузки', () => {
      const result = reducer(stateWithOffers, changeCity(newCity));
      expect(result.city).toEqual(newCity);
      expect(result.offers).toEqual(mockOffers);
      expect(result.isOffersLoading).toBe(false);
    });
  });

  describe('fetchOffersAction', () => {
    it('должен устанавливать isOffersLoading в true при начале загрузки', () => {
      const result = reducer(initialState, fetchOffersAction.pending);
      expect(result.isOffersLoading).toBe(true);
    });

    it('должен устанавливать offers и снимать loading при успешной загрузке', () => {
      const result = reducer(
        { ...initialState, isOffersLoading: true },
        fetchOffersAction.fulfilled(mockOffers, '', undefined)
      );
      expect(result.isOffersLoading).toBe(false);
      expect(result.offers).toEqual(mockOffers);
    });

    it('должен снимать loading при ошибке загрузки', () => {
      const result = reducer(
        { ...initialState, isOffersLoading: true },
        fetchOffersAction.rejected
      );
      expect(result.isOffersLoading).toBe(false);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('должен обновлять isFavorite у offer если id совпадает', () => {
      const result = reducer(
        stateWithOffers,
        changeFavoriteStatusAction.fulfilled(updatedOffer, '', {
          offerId: updatedOffer.id,
          status: updatedOffer.isFavorite ? 1 : 0
        })
      );
      expect(result.offers[1].isFavorite).toBe(updatedOffer.isFavorite);
    });

    it('не должен обновлять offer если id не совпадает', () => {
      const differentOffer = { ...updatedOffer, id: 'different-id' };
      const result = reducer(
        stateWithOffers,
        changeFavoriteStatusAction.fulfilled(differentOffer, '', {
          offerId: differentOffer.id,
          status: differentOffer.isFavorite ? 1 : 0
        })
      );
      expect(result.offers[1].isFavorite).toBe(mockOffers[1].isFavorite);
    });
  });

  describe('logoutAction', () => {
    it('должен сбрасывать город на DEFAULT_CITY при logout', () => {
      const state = { city: newCity, offers: mockOffers, isOffersLoading: false };
      const result = reducer(state, logoutAction.fulfilled);
      expect(result.city).toEqual(DEFAULT_CITY);
    });
  });
});
