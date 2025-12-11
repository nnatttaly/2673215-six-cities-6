import { Review } from 'types';
import { REVIEWS_AVATAR_SIZE } from 'consts';
import Rating from '@components/rating/rating.js';
import { formatReviewDate, getISODateString } from '@utils/date-utils';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { user, rating, comment, date } = review;

  const formattedDate = formatReviewDate(date);
  const dateTimeString = getISODateString(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={REVIEWS_AVATAR_SIZE.width}
            height={REVIEWS_AVATAR_SIZE.height}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating rating={rating} variant="reviews" />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={dateTimeString}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
