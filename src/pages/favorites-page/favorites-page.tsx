import PageHelmet from '@components/page-helmet/page-helmet.js';
import OffersList from '@components/offers-list/offers-list.js';
import { useAppSelector } from '@hooks/index.js';
import { CITIES } from 'consts';
import CityTitle from '@components/city-title/city-title';
import Header from '@components/header/header';
import { getFavorites } from '@store/favorites-process/selectors';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);

  return (
    <div className="page">
      <PageHelmet />
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.slice()
                .reverse()
                .map(({name: cityName}) => {
                  const cityOffers = favoriteOffers.filter(
                    (offer) => offer.city.name === cityName
                  );
                  if (cityOffers.length === 0) {
                    return null;
                  }

                  return (
                    <li className="favorites__locations-items" key={cityName}>
                      <CityTitle cityName={cityName} />
                      <div className="favorites__places">
                        <OffersList
                          offers={cityOffers}
                          variant="favorites"
                        />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
