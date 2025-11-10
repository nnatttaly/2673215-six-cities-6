import { Link } from 'react-router-dom';
import { Offer, LayoutType } from 'types';
import Rating from '@components/rating/rating.js';
import { OFFER_CARD_IMAGE_SIZE, PLACE_CARD_BOOKMARK_ICON_SIZE } from 'consts';

type OfferCardProps = {
  offer: Offer;
  onCardHover: (offerId: string | null) => void;
  onCardLeave: () => void;
  layoutType: LayoutType;
};

function OfferCard({
  offer,
  onCardHover,
  onCardLeave,
  layoutType,
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

  const { width, height } = OFFER_CARD_IMAGE_SIZE[layoutType];

  return (
    <article
      className={`${layoutType}__card place-card`}
      onMouseEnter={() => onCardHover(id)}
      onMouseLeave={onCardLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${layoutType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={width}
            height={height}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          layoutType === 'favorites' ? 'favorites__card-info ' : ''
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
              width={PLACE_CARD_BOOKMARK_ICON_SIZE.width}
              height={PLACE_CARD_BOOKMARK_ICON_SIZE.height}
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In' : 'To'} bookmarks
            </span>
          </button>
        </div>
        <Rating rating={rating} className="place-card" />
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{housingType}</p>
      </div>
    </article>
  );
}

export default OfferCard;
