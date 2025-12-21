import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOffers, makeFakeReview, makeFakeReviews, makeFakeUserData } from '@utils/mocks';
import { State } from 'types';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  postReviewAction,
  changeFavoriteStatusAction,
  fetchFavoritesAction
} from './api-actions';
import { APIRoute } from 'consts';
import * as tokenStorage from '@services/token';

describe('Асинхронные операции', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { offers: [] } });
  });

  describe('checkAuthAction', () => {
    it('должен диспатчить "checkAuthAction.pending" и "checkAuthAction.fulfilled" при успешной проверке авторизации', async () => {
      const fakeUserData = makeFakeUserData();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, fakeUserData);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('должен диспатчить "checkAuthAction.pending" и "checkAuthAction.rejected" при ошибке сервера 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('должен диспатчить "fetchOffersAction.pending" и "fetchOffersAction.fulfilled" при успешной загрузке предложений', async () => {
      const mockOffers = makeFakeOffers(3);
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('должен диспатчить "fetchOffersAction.pending" и "fetchOffersAction.rejected" при ошибке сервера 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('должен диспатчить "loginAction.pending" и "loginAction.fulfilled" при успешной авторизации', async () => {
      const fakeAuthData = { email: 'test@test.com', password: '123456' };
      const fakeUserData = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeUserData);

      await store.dispatch(loginAction(fakeAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('должен вызывать "saveToken" один раз с полученным токеном', async () => {
      const fakeAuthData = { email: 'test@test.com', password: '123456' };
      const fakeUserData = makeFakeUserData();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeUserData);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeAuthData));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeUserData.token);
    });

    it('должен диспатчить "loginAction.pending" и "loginAction.rejected" при ошибке сервера 400', async () => {
      const fakeAuthData = { email: 'test@test.com', password: '123456' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeAuthData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('должен диспатчить "logoutAction.pending" и "logoutAction.fulfilled" при успешном выходе', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('должен вызывать "dropToken" один раз при выходе', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOfferAction', () => {
    it('должен диспатчить "fetchOfferAction.pending" и "fetchOfferAction.fulfilled" при успешной загрузке предложения', async () => {
      const offerId = 'test-offer-id';
      const mockOffer = makeFakeOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('должен диспатчить "fetchOfferAction.pending" и "fetchOfferAction.rejected" при ошибке сервера 400', async () => {
      const offerId = 'test-offer-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(400);

      await store.dispatch(fetchOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('должен диспатчить "fetchNearbyOffersAction.pending" и "fetchNearbyOffersAction.fulfilled" при успешной загрузке соседних предложений', async () => {
      const offerId = 'test-offer-id';
      const mockNearbyOffers = makeFakeOffers(3);
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('должен диспатчить "fetchReviewsAction.pending" и "fetchReviewsAction.fulfilled" при успешной загрузке отзывов', async () => {
      const offerId = 'test-offer-id';
      const mockReviews = makeFakeReviews(3);
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    it('должен диспатчить "postReviewAction.pending" и "postReviewAction.fulfilled" при успешной отправке отзыва', async () => {
      const reviewData = { offerId: 'test-offer-id', comment: 'Отлично!', rating: 5 };
      const mockReview = makeFakeReview();
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${reviewData.offerId}`).reply(200, mockReview);

      await store.dispatch(postReviewAction(reviewData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type,
      ]);
    });

    it('должен диспатчить "postReviewAction.pending" и "postReviewAction.rejected" при ошибке сервера 400', async () => {
      const reviewData = { offerId: 'test-offer-id', comment: 'Плохо!', rating: 1 };
      mockAxiosAdapter.onPost(`${APIRoute.Reviews}/${reviewData.offerId}`).reply(400);

      await store.dispatch(postReviewAction(reviewData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('должен диспатчить "changeFavoriteStatusAction.pending" и "changeFavoriteStatusAction.fulfilled" при успешном изменении статуса избранного', async () => {
      const favoriteData = { offerId: 'test-offer-id', status: 1 };
      const mockUpdatedOffer = makeFakeOffer();
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${favoriteData.offerId}/${favoriteData.status}`).reply(200, mockUpdatedOffer);

      await store.dispatch(changeFavoriteStatusAction(favoriteData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('должен диспатчить "fetchFavoritesAction.pending" и "fetchFavoritesAction.fulfilled" при успешной загрузке избранного', async () => {
      const mockFavorites = makeFakeOffers(2);
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
    });
  });
});
