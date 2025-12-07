import OfferCard from '../offer-card/offer-card';
import { Offers, LayoutType } from 'types';
import { useCallback, useMemo } from 'react';

type OffersListProps = {
  offers: Offers;
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

  const handleCardHover = useCallback((offerId: string | null) => {
    onCardHover?.(offerId);
  }, [onCardHover]);

  const handleCardLeave = useCallback(() => {
    onCardLeave?.();
  }, [onCardLeave]);

  const listClass = useMemo(() =>
    ({
      cities: 'cities__places-list places__list tabs__content',
      favorites: 'favorites__places',
      'near-places': 'near-places__list places__list',
    }[layoutType]),
  [layoutType]
  );

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
