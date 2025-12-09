import { Review } from 'types';
import ReviewItem from '@components/review-item/review-item.js';
import ReviewForm from '@components/review-form/review-form.js';
import { REVIEWS_LIMIT } from 'consts';
import { useMemo } from 'react';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedAndLimitedReviews = useMemo(() => {
    const reviewsCopy = [...reviews];

    return reviewsCopy
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, REVIEWS_LIMIT);
  }, [reviews]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedAndLimitedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
      <ReviewForm />
    </section>
  );
}

export default ReviewsList;
