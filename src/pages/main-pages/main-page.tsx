import OfferCard from '../../components/offer-card/offer-card';

type MainPageProps = {
  offerCardsCount: number;
}

function MainPage({ offerCardsCount }: MainPageProps): JSX.Element {
  const offersData = [
    {
      id: 1,
      isPremium: true,
      imageSrc: 'markup/img/apartment-01.jpg',
      price: 120,
      isBookmark: false,
      rating: 4,
      title: 'Beautiful & luxurious apartment at great location',
      type: 'Apartment'
    },
    {
      id: 2,
      isPremium: false,
      imageSrc: 'markup/img/room.jpg',
      price: 80,
      isBookmark: true,
      rating: 4,
      title: 'Wood and stone place',
      type: 'Room'
    },
    {
      id: 3,
      isPremium: false,
      imageSrc: 'markup/img/apartment-02.jpg',
      price: 132,
      isBookmark: false,
      rating: 4,
      title: 'Canal View Prinsengracht',
      type: 'Apartment'
    },
    {
      id: 4,
      isPremium: true,
      imageSrc: 'markup/img/apartment-03.jpg',
      price: 180,
      isBookmark: false,
      rating: 5,
      title: 'Nice, cozy, warm big bed apartment',
      type: 'Apartment'
    },
    {
      id: 5,
      isPremium: false,
      imageSrc: 'markup/img/room.jpg',
      price: 80,
      isBookmark: true,
      rating: 4,
      title: 'Wood and stone place',
      type: 'Room'
    }
  ];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41}/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {
                [
                  'Paris',
                  'Cologne',
                  'Brussels',
                  'Amsterdam',
                  'Hamburg',
                  'Dusseldorf'
                ].map((city) => (
                  <li className="locations__item" key={city}>
                    <a
                      className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item--active' : ''
                      }`}
                      href={city === 'Amsterdam' ? undefined : '#'}
                    >
                      <span>{city}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offerCardsCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  {
                    [
                      'Popular',
                      'Price: low to high',
                      'Price: high to low',
                      'Top rated first'

                    ].map((option, index) => (
                      <li
                        key={option}
                        className={`places__option ${index === 0 ? 'places__option--active' : ''}`}
                        tabIndex={0}
                      >
                        {option}
                      </li>
                    ))
                  }
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {
                  offersData.map((offerCard) => (
                    <OfferCard
                      key={offerCard.id}
                      isPremium={offerCard.isPremium}
                      imageSrc={offerCard.imageSrc}
                      price={offerCard.price}
                      isBookmark={offerCard.isBookmark}
                      rating={offerCard.rating}
                      title={offerCard.title}
                      type={offerCard.type}
                    />
                  ))
                }
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
