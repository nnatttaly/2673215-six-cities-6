import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import {
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  RATINGS,
} from '../../consts';
import RatingStar from '@components/rating-star/rating-star';

function ReviewForm(): JSX.Element {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });

  const handleRatingChange = useCallback((value: number) => {
    setReviewData((prev) => ({ ...prev, rating: value }));
  }, []);

  const handleCommentChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({ ...prev, comment: evt.target.value }));
  }, []);

  const isSubmitDisabled = useMemo(() =>
    reviewData.rating === 0 ||
    reviewData.comment.length < MIN_COMMENT_LENGTH ||
    reviewData.comment.length > MAX_COMMENT_LENGTH,
  [reviewData.rating, reviewData.comment]
  );

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setReviewData({ rating: 0, comment: '' });
  }, []);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <RatingStar
            key={value}
            value={value}
            title={title}
            isChecked={reviewData.rating === value}
            onChange={handleRatingChange}
          />
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
