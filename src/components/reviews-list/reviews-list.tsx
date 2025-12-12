import ReviewItem from '@components/review-item/review-item';
import { REVIEWS_LIMIT } from 'consts';
import { useMemo } from 'react';
import { Review } from 'types';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {

  const sortedAndLimitedReviews = useMemo(() =>
    [...reviews]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, REVIEWS_LIMIT),
  [reviews]
  );

  return (
    <ul className="reviews__list">
      {sortedAndLimitedReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
