import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/index.js';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  isFavoriteLayout?: boolean;
};

function OffersList({
  offers,
  isFavoriteLayout = false,
}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);
  const listClass = isFavoriteLayout
    ? 'favorites__places'
    : 'cities__places-list places__list tabs__content';

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardHover={(offerId) => setActiveOfferId(offerId)}
          onCardLeave={() => setActiveOfferId(null)}
          isFavoriteLayout={isFavoriteLayout}
        />
      ))}
    </div>
  );
}

export default OffersList;
