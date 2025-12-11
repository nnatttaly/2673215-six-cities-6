import Rating from '@components/rating/rating.js';
import { capitalizeFirstLetter, getPluralWord } from '@utils/word-utils';
import BookmarkButton from '@components/bookmark-button/bookmark-button';

type OfferHeaderProps = {
  offerId: string;
  title: string;
  isPremium: boolean;
  price: number;
  rating: number;
  isFavorite: boolean;
  type: string;
  bedrooms: number;
  maxAdults: number;
};

function OfferHeader({
  offerId,
  title,
  isPremium,
  price,
  rating,
  isFavorite,
  type,
  bedrooms,
  maxAdults,
}: OfferHeaderProps): JSX.Element {

  return (
    <>
      {isPremium && (
        <div className="offer__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="offer__name-wrapper">
        <h1 className="offer__name">{title}</h1>
        <BookmarkButton
          offerId={offerId}
          isFavorite={isFavorite}
          variant="offer"
        />
      </div>

      <Rating rating={rating} variant="offer" showValue />

      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {capitalizeFirstLetter(type)}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} {getPluralWord(bedrooms, 'Bedroom', 'Bedrooms')}
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} {getPluralWord(maxAdults, 'adult', 'adults')}
        </li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">€{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>
    </>
  );
}

export default OfferHeader;
