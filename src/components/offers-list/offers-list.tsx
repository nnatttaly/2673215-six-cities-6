import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/index.js';
import { useState } from 'react';
import { LayoutType } from '../../types/index.js';

type OffersListProps = {
  offers: Offer[];
  layoutType?: LayoutType;
};

function OffersList({
  offers,
  layoutType = 'cities',
}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);
  const listClass = {
    'cities': 'cities__places-list places__list tabs__content',
    'favorites': 'favorites__places',
    'near-places': 'near-places__list places__list',
  }[layoutType];

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardHover={(offerId) => setActiveOfferId(offerId)}
          onCardLeave={() => setActiveOfferId(null)}
          layoutType={layoutType}
        />
      ))}
    </div>
  );
}

export default OffersList;
