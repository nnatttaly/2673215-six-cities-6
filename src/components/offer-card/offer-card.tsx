import { generatePath, Link } from 'react-router-dom';
import { Offer } from 'types';
import Rating from '@components/rating/rating.js';
import { OFFER_CARD_IMAGE_SIZE, AppRoute } from 'consts';
import BookmarkButton from '@components/bookmark-button/bookmark-button';

type OfferCardProps = {
  offer: Offer;
  variant: 'cities' | 'near-places' | 'favorites';
  setSelectedOfferId?: (offerId: string | null) => void;
};

function OfferCard({
  offer,
  variant,
  setSelectedOfferId,
}: OfferCardProps): JSX.Element {
  const {
    id,
    previewImage,
    isPremium,
    price,
    title,
    type,
    isFavorite,
    rating,
  } = offer;

  const { width, height } = OFFER_CARD_IMAGE_SIZE[variant];
  const infoClassName = `${variant === 'favorites' ? 'favorites__card-info ' : ''}place-card__info`;

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={setSelectedOfferId ? () => setSelectedOfferId(id) : undefined}
      onMouseLeave={setSelectedOfferId ? () => setSelectedOfferId(null) : undefined}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${variant}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.Offer, {id})}>
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
        className={infoClassName}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text"> &#47;&nbsp;night</span>
          </div>
          <BookmarkButton
            offerId={id}
            isFavorite={isFavorite}
            variant="place-card"
          />
        </div>
        <Rating rating={rating} variant="place-card" />
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
