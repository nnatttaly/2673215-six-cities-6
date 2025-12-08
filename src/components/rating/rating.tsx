import { MAX_RATING } from 'consts';

type RatingProps = {
  rating: number;
  className: string;
  showValue?: boolean;
};

function Rating({
  rating,
  className,
  showValue = false,
}: RatingProps): JSX.Element {
  const ratingWidth = `${(Math.round(rating) / MAX_RATING) * 100}%`;

  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span style={{ width: ratingWidth }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && (
        <span className={`${className}__rating-value rating__value`}>
          {rating}
        </span>
      )}
    </div>
  );
}

export default Rating;
