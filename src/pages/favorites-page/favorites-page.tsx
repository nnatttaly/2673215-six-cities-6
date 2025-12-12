import PageHelmet from '@components/page-helmet/page-helmet.js';
import OffersList from '@components/offers-list/offers-list.js';
import { useAppSelector } from '@hooks/index.js';
import { CITIES } from 'consts';
import CityTitle from '@components/city-title/city-title';
import Header from '@components/header/header';
import { getFavorites } from '@store/favorites-process/selectors';
import Footer from '@components/footer/footer';
import FavoritesEmptyMain from '@components/favorites-empty-main/favorites-empty-main';
import { useMemo } from 'react';
import { Offers } from 'types';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);
  const offersByCity = useMemo(() => {
    const grouped: Record<string, Offers> = {};

    favoriteOffers.forEach((offer) => {
      const cityName = offer.city.name;
      if (!grouped[cityName]) {
        grouped[cityName] = [];
      }
      grouped[cityName].push(offer);
    });

    return grouped;
  }, [favoriteOffers]);

  const citiesWithOffers = useMemo(() => CITIES
    .filter((city) => offersByCity[city.name]?.length > 0), [offersByCity]);

  return (
    <div className="page">
      <PageHelmet />
      <Header />

      {
        favoriteOffers.length === 0 ?
          <FavoritesEmptyMain /> :
          (
            <main className="page__main page__main--favorites">
              <div className="page__favorites-container container">
                <section className="favorites">
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {citiesWithOffers.map(({ name: cityName }) => (
                      <li className="favorites__locations-items" key={cityName}>
                        <CityTitle cityName={cityName} />
                        <div className="favorites__places">
                          <OffersList
                            offers={offersByCity[cityName]}
                            variant="favorites"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </main>
          )
      }

      <Footer />
    </div>
  );
}

export default FavoritesPage;
