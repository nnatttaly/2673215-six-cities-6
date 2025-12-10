import { getPluralWord } from '@utils/word-utils';
import { City, Offer, SortOption } from 'types';
import OffersList from '@components/offers-list/offers-list';
import SortOptions from '@components/sort-options/sort-options';
import Map from '@components/map/map.js';

type PlacesSectionProps = {
  currentCity: City;
  currentCityOffers: Offer[];
  sortedOffers: Offer[];
  selectedOffer: Offer | null;
  currentSort: SortOption;
  onOfferHover: (offerId: string | null) => void;
  onSortChange: (sortOption: SortOption) => void;
  onCardLeave: () => void;
};

function PlacesSection({
  currentCity,
  currentCityOffers,
  sortedOffers,
  selectedOffer,
  currentSort,
  onOfferHover,
  onSortChange,
  onCardLeave,
}: PlacesSectionProps): JSX.Element {

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {currentCityOffers.length}{' '}
          {getPluralWord(currentCityOffers.length, 'place', 'places')} to
          stay in {currentCity.name}
        </b>
        <SortOptions
          currentSort={currentSort}
          onSortChange={onSortChange}
        />

        <OffersList
          offers={sortedOffers}
          layoutType="cities"
          onCardHover={onOfferHover}
          onCardLeave={onCardLeave}
        />
      </section>
      <div className="cities__right-section">
        {currentCity && (
          <Map
            city={currentCity}
            offers={currentCityOffers}
            selectedOffer={selectedOffer}
            className="cities"
          />
        )}
      </div>
    </div>
  );
}

export default PlacesSection;

