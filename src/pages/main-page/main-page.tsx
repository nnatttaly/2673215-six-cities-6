import { Offer, SortOption } from 'types';
import PageHelmet from '@components/page-helmet/page-helmet.js';
import { useMemo, useState } from 'react';
import CitiesList from '@components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '@hooks/index.js';
import { changeCity } from '@store/action';
import { sortOffers } from '@utils/sort-utils';
import { DEFAULT_SORT_OPTION } from 'consts';
import Header from '@components/header/header';
import { getCity, getOffers } from '@store/data-process/selectors';
import PlacesSection from '@components/places-section/places-section';
import EmptyPlacesSection from '@components/empty-places-section/empty-places-section';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);

  const currentCityOffers = useMemo(() => {
    const cityName = currentCity.name;
    return allOffers.filter((offer) => offer.city.name === cityName);
  }, [allOffers, currentCity]);

  const hasNoOffers = currentCityOffers.length === 0;

  const dispatch = useAppDispatch();

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentSort, setCurrentSort] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const sortedOffers = useMemo(
    () => sortOffers(currentCityOffers, currentSort),
    [currentCityOffers, currentSort]
  );

  const handleOfferHover = (offerId: string | null) => {
    const offer = offerId
      ? currentCityOffers.find((item) => item.id === offerId)
      : null;
    setSelectedOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <PageHelmet />
      <Header />

      <main className={`page__main page__main--index ${hasNoOffers ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          currentCity={currentCity}
          onCityChange={(city) => dispatch(changeCity(city))}
        />
        <div className="cities">
          {
            hasNoOffers ?
              <EmptyPlacesSection currentCity={currentCity}/> :
              <PlacesSection
                currentCity={currentCity}
                currentCityOffers={currentCityOffers}
                sortedOffers={sortedOffers}
                selectedOffer={selectedOffer}
                currentSort={currentSort}
                onOfferHover={handleOfferHover}
                onSortChange={(sortOption) => setCurrentSort(sortOption)}
                onCardLeave={() => setSelectedOffer(null)}
              />
          }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
