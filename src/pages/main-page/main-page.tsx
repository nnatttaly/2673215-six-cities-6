import { City, SortOption } from 'types';
import PageHelmet from '@components/page-helmet/page-helmet.js';
import { useMemo, useState } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '@hooks/index.js';
import { sortOffers } from '@utils/sort-utils';
import { DEFAULT_SORT_OPTION } from 'consts';
import Header from '@components/header/header';
import { getCity, getOffersByCity, getOffersLoadingStatus } from '@store/data-process/selectors';
import PlacesSection from '@components/places-section/places-section';
import EmptyPlacesSection from '@components/empty-places-section/empty-places-section';
import { changeCity } from '@store/data-process/data-process';
import Spinner from '@components/loading/spinner';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const currentCityOffers = useAppSelector(getOffersByCity);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const hasNoOffers = currentCityOffers.length === 0;

  const dispatch = useAppDispatch();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>(DEFAULT_SORT_OPTION);

  const sortedOffers = useMemo(
    () => sortOffers(currentCityOffers, currentSort),
    [currentCityOffers, currentSort]
  );

  const handleCityChange = (city: City) => {
    if (city.name === currentCity.name) {
      return;
    }
    dispatch(changeCity(city));
    setSelectedOfferId(null);
    setCurrentSort(DEFAULT_SORT_OPTION);
  };
  const mainClassName = `page__main page__main--index ${hasNoOffers ? 'page__main--index-empty' : ''}`;

  return (
    <div className="page page--gray page--main">
      <PageHelmet />
      <Header />

      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          currentCity={currentCity}
          onCityChange={handleCityChange}
        />
        <div className="cities">
          {isOffersLoading && <Spinner />}
          {!isOffersLoading && hasNoOffers && <EmptyPlacesSection currentCity={currentCity} />}
          {!isOffersLoading && !hasNoOffers && (
            <PlacesSection
              currentCity={currentCity}
              offers={sortedOffers}
              selectedOfferId={selectedOfferId}
              setSelectedOfferId={setSelectedOfferId}
              currentSort={currentSort}
              onSortChange={setCurrentSort}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
