import { offerProcess, clearOfferData } from './offer-process';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  changeFavoriteStatusAction
} from '../api-actions';
import { makeFakeOffer, makeFakeOffers } from '@utils/mocks';

describe('Редьюсер: offerProcess', () => {
  const reducer = offerProcess.reducer;
  const mockOffer = makeFakeOffer();
  const mockOffers = makeFakeOffers(3);
  const mockUpdatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };

  const initialState = {
    currentOffer: null,
    requestedOfferId: null,
    nearbyOffers: [],
    isOfferLoading: false,
    isNearbyOffersLoading: false,
  };

  const stateWithData = {
    currentOffer: mockOffer,
    requestedOfferId: mockOffer.id,
    nearbyOffers: mockOffers,
    isOfferLoading: false,
    isNearbyOffersLoading: false,
  };

  describe('Базовые тесты', () => {
    it('должен возвращать начальное состояние при пустом действии', () => {
      const result = reducer(stateWithData, { type: '' });
      expect(result).toEqual(stateWithData);
    });

    it('должен возвращать дефолтное начальное состояние при пустом действии', () => {
      const result = reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('Синхронный action: clearOfferData', () => {
    it('должен очищать данные оффера', () => {
      const result = reducer(stateWithData, clearOfferData());
      expect(result.currentOffer).toBeNull();
      expect(result.nearbyOffers).toEqual([]);
      expect(result.requestedOfferId).toBeNull();
    });
  });

  describe('fetchOfferAction', () => {
    it('должен устанавливать loading и requestedOfferId при начале загрузки', () => {
      const result = reducer(initialState, fetchOfferAction.pending('', mockOffer.id));
      expect(result.isOfferLoading).toBe(true);
      expect(result.requestedOfferId).toBe(mockOffer.id);
    });

    it('должен устанавливать currentOffer при успешной загрузке', () => {
      const result = reducer(
        { ...initialState, isOfferLoading: true },
        fetchOfferAction.fulfilled(mockOffer, '', mockOffer.id)
      );
      expect(result.isOfferLoading).toBe(false);
      expect(result.currentOffer).toEqual(mockOffer);
    });

    it('должен снимать loading и очищать currentOffer при ошибке', () => {
      const result = reducer(
        { ...initialState, isOfferLoading: true, currentOffer: mockOffer },
        fetchOfferAction.rejected
      );
      expect(result.isOfferLoading).toBe(false);
      expect(result.currentOffer).toBeNull();
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('должен устанавливать nearbyOffers при успешной загрузке', () => {
      const result = reducer(
        { ...initialState, isNearbyOffersLoading: true },
        fetchNearbyOffersAction.fulfilled(mockOffers, '', mockOffer.id)
      );
      expect(result.isNearbyOffersLoading).toBe(false);
      expect(result.nearbyOffers).toEqual(mockOffers);
    });

    it('должен снимать loading и очищать nearbyOffers при ошибке', () => {
      const result = reducer(
        { ...initialState, isNearbyOffersLoading: true, nearbyOffers: mockOffers },
        fetchNearbyOffersAction.rejected
      );
      expect(result.isNearbyOffersLoading).toBe(false);
      expect(result.nearbyOffers).toEqual([]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('должен обновлять isFavorite у currentOffer если id совпадает', () => {
      const result = reducer(
        { ...initialState, currentOffer: mockOffer },
        changeFavoriteStatusAction.fulfilled(mockUpdatedOffer, '', {
          offerId: mockOffer.id,
          status: mockUpdatedOffer.isFavorite ? 1 : 0
        })
      );
      expect(result.currentOffer?.isFavorite).toBe(mockUpdatedOffer.isFavorite);
    });

    it('должен обновлять isFavorite в nearbyOffers если id совпадает', () => {
      const updatedOffer = { ...mockOffers[1], isFavorite: !mockOffers[1].isFavorite };
      const result = reducer(
        { ...initialState, nearbyOffers: mockOffers },
        changeFavoriteStatusAction.fulfilled(updatedOffer, '', {
          offerId: updatedOffer.id,
          status: updatedOffer.isFavorite ? 1 : 0
        })
      );
      expect(result.nearbyOffers[1].isFavorite).toBe(updatedOffer.isFavorite);
    });

    it('не должен обновлять данные если id не совпадает', () => {
      const differentOffer = { ...mockOffer, id: 'different-id' };
      const result = reducer(
        stateWithData,
        changeFavoriteStatusAction.fulfilled(differentOffer, '', {
          offerId: differentOffer.id,
          status: differentOffer.isFavorite ? 1 : 0
        })
      );
      expect(result.currentOffer?.isFavorite).toBe(mockOffer.isFavorite);
    });
  });

  describe('Интеграционные тесты', () => {
    it('должен корректно обрабатывать последовательность загрузки и обновления', () => {
      let state = reducer(undefined, { type: '' });

      state = reducer(state, fetchOfferAction.pending('', mockOffer.id));
      expect(state.isOfferLoading).toBe(true);

      state = reducer(state, fetchOfferAction.fulfilled(mockOffer, '', mockOffer.id));
      expect(state.currentOffer).toEqual(mockOffer);

      state = reducer(state, fetchNearbyOffersAction.fulfilled(mockOffers, '', mockOffer.id));
      expect(state.nearbyOffers).toEqual(mockOffers);

      state = reducer(
        state,
        changeFavoriteStatusAction.fulfilled(mockUpdatedOffer, '', {
          offerId: mockOffer.id,
          status: mockUpdatedOffer.isFavorite ? 1 : 0
        })
      );
      expect(state.currentOffer?.isFavorite).toBe(mockUpdatedOffer.isFavorite);
    });
  });
});
