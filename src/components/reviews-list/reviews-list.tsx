import { useMemo } from 'react';
import ReviewItem from '@components/review-item/review-item';
import ReviewForm from '@components/review-form/review-form';
import { REVIEWS_LIMIT } from 'consts';
import { Review } from 'types/index';

type ReviewsListProps = {
  reviews: Review[] | null | undefined;
};

function ReviewsList({ reviews: rawReviews = []}: ReviewsListProps): JSX.Element {
  const reviews = useMemo(() => Array.isArray(rawReviews) ? rawReviews : [], [rawReviews]);

  const sortedAndLimitedReviews = useMemo(() => [...reviews]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, REVIEWS_LIMIT), [reviews]);

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
