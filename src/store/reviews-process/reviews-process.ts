import { createSlice } from '@reduxjs/toolkit';
import { fetchReviewsAction, postReviewAction } from '../api-actions.ts';
import { NameSpace } from 'consts';
import { Review } from 'types';

type ReviewsProcess = {
  reviews: Review[];
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
};

const initialState: ReviewsProcess = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearReviewsData: (state) => {
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviews = [];
        state.isReviewsLoading = false;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
        state.isReviewPosting = false;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
      });
  },
});

export const { clearReviewsData } = reviewsProcess.actions;
