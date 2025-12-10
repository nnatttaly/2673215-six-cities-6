import Rating from '@components/rating/rating.js';
import { capitalizeFirstLetter, getPluralWord } from '@utils/word-utils';
import { OFFER_BOOKMARK_ICON_SIZE } from 'consts';

type OfferHeaderProps = {
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
        <button
          className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`}
          type="button"
        >
          <svg className="offer__bookmark-icon" width={OFFER_BOOKMARK_ICON_SIZE.width} height={OFFER_BOOKMARK_ICON_SIZE.height}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">
            {isFavorite ? 'In' : 'To'} bookmarks
          </span>
        </button>
      </div>

      <Rating rating={rating} className="offer" showValue />

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
