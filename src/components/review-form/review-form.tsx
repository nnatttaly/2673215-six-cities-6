import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { postReviewAction } from '@store/api-actions';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, RATINGS } from 'consts';
import RatingStar from '@components/rating-star/rating-star';
import { getReviewPostingStatus } from '@store/reviews-process/selectors';

type ReviewForm = {
  offerId: string;
};

function ReviewForm({offerId}: ReviewForm): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getReviewPostingStatus);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });


  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!offerId || isPosting) {
      return;
    }

    dispatch(postReviewAction({
      offerId,
      comment: reviewData.comment.trim(),
      rating: reviewData.rating,
    }))
      .unwrap()
      .then(() => setReviewData({rating: 0, comment: ''}));

  };

  const reviewLength = reviewData.comment.trim().length;
  const isSubmitDisabled =
    isPosting ||
    reviewData.rating === 0 ||
    reviewLength < MIN_COMMENT_LENGTH ||
    reviewLength > MAX_COMMENT_LENGTH;

  const handleRatingChange = (value: number) => {
    setReviewData((prev) => ({ ...prev, rating: value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({ ...prev, comment: e.target.value }));
  };

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
            disabled={isPosting}
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
        disabled={isPosting}
        maxLength={MAX_COMMENT_LENGTH}
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
