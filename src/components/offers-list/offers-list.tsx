import OfferCard from '../offer-card/offer-card';
import { Offer, LayoutType } from 'types';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  layoutType: LayoutType;
  onCardHover?: (offerId: string | null) => void;
  onCardLeave?: () => void;
};

function OffersList({
  offers,
  layoutType,
  onCardHover,
  onCardLeave,
}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<string | null>(null);
  const listClass = {
    cities: 'cities__places-list places__list tabs__content',
    favorites: 'favorites__places',
    'near-places': 'near-places__list places__list',
  }[layoutType];

  const handleCardHover = (offerId: string | null) => {
    setActiveOfferId(offerId);
    onCardHover?.(offerId);
  };

  const handleCardLeave = () => {
    setActiveOfferId(null);
    onCardLeave?.();
  };

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          layoutType={layoutType}
        />
      ))}
    </div>
  );
}

export default OffersList;
