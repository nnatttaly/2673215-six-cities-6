import OfferCard from '@components/offer-card/offer-card';
import { Offers } from 'types';

type OffersListProps = {
  offers: Offers;
  variant: 'cities' | 'near-places' | 'favorites';
  setSelectedOfferId?: (offerId: string | null) => void;
};

function OffersList({
  offers,
  variant,
  setSelectedOfferId,
}: OffersListProps): JSX.Element {

  const listClass = {
    'cities': 'cities__places-list places__list tabs__content',
    'favorites': 'favorites__places',
    'near-places': 'near-places__list places__list',
  }[variant];

  return (
    <div className={listClass}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          variant={variant}
          setSelectedOfferId={setSelectedOfferId}
        />
      ))}
    </div>
  );
}

export default OffersList;
