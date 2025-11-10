import { Review } from 'types';
import { REVIEWS_AVATAR_SIZE } from 'consts';
import Rating from '@components/rating/rating.js';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { user, rating, comment, date } = review;

  const formatDate = (dateValue: Date): string =>
    dateValue.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarPath}
            width={REVIEWS_AVATAR_SIZE.width}
            height={REVIEWS_AVATAR_SIZE.height}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating rating={rating} className="reviews" />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.toISOString()}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
