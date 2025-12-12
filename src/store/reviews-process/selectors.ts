import { NameSpace } from 'consts';
import { Review, State } from 'types';

export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getReviewPostingStatus = (state: State): boolean => state[NameSpace.Reviews].isReviewPosting;
export const getReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Reviews].isReviewsLoading;
