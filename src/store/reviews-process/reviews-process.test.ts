import { reviewsProcess, clearReviewsData } from './reviews-process';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { makeFakeReview, makeFakeReviews } from '@utils/mocks';

describe('Редьюсер: reviewsProcess', () => {
  const reducer = reviewsProcess.reducer;
  const mockReviews = makeFakeReviews(3);
  const newReview = makeFakeReview();

  const initialState = {
    reviews: [],
    isReviewsLoading: false,
    isReviewPosting: false,
  };

  const stateWithReviews = {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: false,
  };

  const stateWithLoading = {
    reviews: [],
    isReviewsLoading: true,
    isReviewPosting: false,
  };

  const stateWithPosting = {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: true,
  };

  describe('Базовые тесты', () => {
    it('должен возвращать начальное состояние при пустом действии', () => {
      const result = reducer(stateWithReviews, { type: '' });
      expect(result).toEqual(stateWithReviews);
    });

    it('должен возвращать дефолтное начальное состояние при пустом действии', () => {
      const result = reducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('Синхронный action: clearReviewsData', () => {
    it('должен очищать reviews', () => {
      const result = reducer(stateWithReviews, clearReviewsData());
      expect(result.reviews).toEqual([]);
    });

    it('не должен влиять на флаги загрузки', () => {
      const state = { reviews: mockReviews, isReviewsLoading: true, isReviewPosting: true };
      const result = reducer(state, clearReviewsData());
      expect(result.reviews).toEqual([]);
      expect(result.isReviewsLoading).toBe(true);
      expect(result.isReviewPosting).toBe(true);
    });
  });

  describe('fetchReviewsAction', () => {
    it('должен устанавливать isReviewsLoading в true при начале загрузки', () => {
      const result = reducer(initialState, fetchReviewsAction.pending);
      expect(result.isReviewsLoading).toBe(true);
    });

    it('должен устанавливать reviews и isReviewsLoading в false при успешной загрузке', () => {
      const result = reducer(stateWithLoading, fetchReviewsAction.fulfilled(mockReviews, '', 'test-id'));
      expect(result.isReviewsLoading).toBe(false);
      expect(result.reviews).toEqual(mockReviews);
    });

    it('должен очищать reviews при ошибке загрузки', () => {
      const state = { reviews: mockReviews, isReviewsLoading: true, isReviewPosting: false };
      const result = reducer(state, fetchReviewsAction.rejected);
      expect(result.isReviewsLoading).toBe(false);
      expect(result.reviews).toEqual([]);
    });
  });

  describe('postReviewAction', () => {
    it('должен устанавливать isReviewPosting в true при начале отправки', () => {
      const result = reducer(initialState, postReviewAction.pending);
      expect(result.isReviewPosting).toBe(true);
    });

    it('должен добавлять новый отзыв в начало при успешной отправке', () => {
      const result = reducer(stateWithReviews, postReviewAction.fulfilled(newReview, '', { offerId: 'test-id', comment: 'test', rating: 5 }));
      expect(result.isReviewPosting).toBe(false);
      expect(result.reviews).toHaveLength(4);
      expect(result.reviews[0]).toEqual(newReview);
    });

    it('должен устанавливать isReviewPosting в false при ошибке отправки', () => {
      const result = reducer(stateWithPosting, postReviewAction.rejected);
      expect(result.isReviewPosting).toBe(false);
      expect(result.reviews).toEqual(mockReviews);
    });
  });

  describe('Взаимодействие флагов загрузки', () => {
    it('должен независимо управлять isReviewsLoading и isReviewPosting', () => {
      let state = reducer(undefined, { type: '' });

      state = reducer(state, fetchReviewsAction.pending);
      expect(state.isReviewsLoading).toBe(true);
      expect(state.isReviewPosting).toBe(false);

      state = reducer(state, postReviewAction.pending);
      expect(state.isReviewsLoading).toBe(true);
      expect(state.isReviewPosting).toBe(true);

      state = reducer(state, fetchReviewsAction.fulfilled(mockReviews, '', 'test-id'));
      expect(state.isReviewsLoading).toBe(false);
      expect(state.isReviewPosting).toBe(true);

      state = reducer(state, postReviewAction.fulfilled(newReview, '', { offerId: 'test-id', comment: 'test', rating: 5 }));
      expect(state.isReviewsLoading).toBe(false);
      expect(state.isReviewPosting).toBe(false);
    });
  });
});
