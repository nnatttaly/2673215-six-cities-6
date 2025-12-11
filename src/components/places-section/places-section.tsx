import { getPluralWord } from '@utils/word-utils';
import { City, Offers, SortOption } from 'types';
import OffersList from '@components/offers-list/offers-list';
import SortOptions from '@components/sort-options/sort-options';
import Map from '@components/map/map.js';

type PlacesSectionProps = {
  currentCity: City;
  offers: Offers;
  selectedOfferId: string | null;
  setSelectedOfferId: (offerId: string | null) => void;
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
};

function PlacesSection({
  currentCity,
  offers,
  selectedOfferId,
  setSelectedOfferId,
  currentSort,
  onSortChange,
}: PlacesSectionProps): JSX.Element {

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length}{' '}
          {getPluralWord(offers.length, 'place', 'places')} to
          stay in {currentCity.name}
        </b>
        <SortOptions
          currentSort={currentSort}
          onSortChange={onSortChange}
        />

        <OffersList
          offers={offers}
          variant="cities"
          setSelectedOfferId={setSelectedOfferId}
        />
      </section>
      <div className="cities__right-section">
        {currentCity && (
          <Map
            city={currentCity}
            offers={offers}
            selectedOfferId={selectedOfferId}
            variant="cities"
          />
        )}
      </div>
    </div>
  );
}

export default PlacesSection;

