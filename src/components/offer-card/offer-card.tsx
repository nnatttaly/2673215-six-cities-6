import { Link } from 'react-router-dom';
import { Offer } from '../../types/index.js';
import { MAX_RATING } from '../../consts/index.js';
import { OfferCardImageSizes, BOOKMARK_ICON_SIZE } from '../../consts/index.js';

type OfferCardProps = {
  offer: Offer;
  onCardHover: (offerId: string | null) => void;
  onCardLeave: () => void;
  isFavoriteLayout?: boolean;
};

function OfferCard({
  offer,
  onCardHover,
  onCardLeave,
  isFavoriteLayout = false,
}: OfferCardProps): JSX.Element {
  const {
    id,
    previewImage,
    isPremium,
    price,
    title,
    housingType,
    isFavorite,
    rating,
  } = offer;

  const cardContext = isFavoriteLayout ? 'favorites' : 'cities';
  const {imageWidth, imageHeight} = isFavoriteLayout
    ? OfferCardImageSizes.COMPACT
    : OfferCardImageSizes.NORMAL;
  const ratingWidth = `${(rating / MAX_RATING) * 100}%`;

  return (
    <article
      className={`${cardContext}__card place-card`}
      onMouseEnter={() => onCardHover(id)}
      onMouseLeave={onCardLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${cardContext}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          isFavoriteLayout ? 'favorites__card-info ' : ''
        }place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text"> &#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={BOOKMARK_ICON_SIZE.width}
              height={BOOKMARK_ICON_SIZE.height}
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In' : 'To'} bookmarks
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{housingType}</p>
      </div>
    </article>
  );
}

export default OfferCard;
