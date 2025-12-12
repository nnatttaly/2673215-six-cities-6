import { MAX_RATING } from 'consts';

type RatingProps = {
  rating: number;
  variant: 'place-card' | 'offer' | 'reviews';
  showValue?: boolean;
};

function Rating({
  rating,
  variant,
  showValue = false,
}: RatingProps): JSX.Element {
  const ratingWidth = `${(Math.round(rating) / MAX_RATING) * 100}%`;

  return (
    <div className={`${variant}__rating rating`}>
      <div className={`${variant}__stars rating__stars`}>
        <span style={{ width: ratingWidth }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className={`${variant}__rating-value rating__value`}>
          {rating}
        </span>
      )}
    </div>
  );
}

export default Rating;
