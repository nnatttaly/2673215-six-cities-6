import OffersList from '@components/offers-list/offers-list';
import { Offer, SortOption } from 'types';
import PageHelmet from '@components/page-helmet/page-helmet.js';
import { useState } from 'react';
import Map from '@components/map/map.js';
import CitiesList from '@components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '@hooks/index.js';
import { changeCity } from '@store/action';
import { getPluralWord } from '@utils/word-utils';
import { sortOffers } from '@utils/sort-utils';
import SortOptions from '@components/sort-options/sort-options';
import { DEFAULT_SORT_OPTION } from 'consts';
import Header from '@components/header/header';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentCityOffers = useAppSelector((state) =>
    state.offers.filter((offer) => offer.city.name === currentCity.name)
  );

  const dispatch = useAppDispatch();

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentSort, setCurrentSort] =
    useState<SortOption>(DEFAULT_SORT_OPTION);
  const sortedOffers = sortOffers(currentCityOffers, currentSort);

  const handleOfferHover = (offerId: string | null) => {
    const offer = offerId
      ? currentCityOffers.find((item) => item.id === offerId)
      : null;
    setSelectedOffer(offer || null);
  };

  const handleSortChange = (sortOption: SortOption) => {
    setCurrentSort(sortOption);
  };

  return (
    <div className="page page--gray page--main">
      <PageHelmet />
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          currentCity={currentCity}
          onCityChange={(city) => dispatch(changeCity(city))}
        />
        <div className="cities">
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
                onSortChange={handleSortChange}
              />

              <OffersList
                offers={sortedOffers}
                layoutType="cities"
                onCardHover={handleOfferHover}
                onCardLeave={() => setSelectedOffer(null)}
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
        </div>
      </main>
    </div>
  );
}

export default MainPage;
