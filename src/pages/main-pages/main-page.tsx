import OffersList from '@components/offers-list/offers-list';
import { SORT_OPTIONS } from 'consts';
import { Offer } from 'types';
import PageHelmet from '@components/page-helmet/page-helmet.js';
import { useState } from 'react';
import Map from '@components/map/map.js';
import CitiesList from '@components/cities-list/cities-list';
import { useAppDispatch, useAppSelector } from '@hooks/index.js';
import { changeCity } from '@store/action';
import { getPluralWord } from '@utils/word-utils';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentCityOffers = useAppSelector((state) =>
    state.offers.filter((offer) => offer.city.name === currentCity.name)
  );

  const dispatch = useAppDispatch();

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleOfferHover = (offerId: string | null) => {
    const offer = offerId
      ? currentCityOffers.find((item) => item.id === offerId)
      : null;
    setSelectedOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <PageHelmet />
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {SORT_OPTIONS.map((option, index) => (
                    <li
                      key={option}
                      className={`places__option ${
                        index === 0 ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </form>

              <OffersList
                offers={currentCityOffers}
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
