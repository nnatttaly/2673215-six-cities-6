import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, CITIES, DEFAULT_CITY, NameSpace } from 'consts';
import App from './app';
import { withHistory, withStore } from '@utils/mock-component';
import { makeFakeStore, makeFakeUserData, makeFakeOffers, makeFakeOffer, makeFakeReviews } from '@utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('должен рендерить "MainPage" при переходе на "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByRole('link', { name: /Sign in/i })).toBeInTheDocument();
    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
    expect(screen.getByText(/places? to stay/i)).toBeInTheDocument();
  });

  it('должен рендерить "LoginPage" при переходе на "/login" для неавторизованного пользователя', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('должен перенаправлять на "/" при попытке перейти на "/login" для авторизованного пользователя', () => {
    const fakeUserData = makeFakeUserData();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: fakeUserData
        },
      })
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByRole('link', { name: /Sign out/i })).toBeInTheDocument();
    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
    expect(screen.getByText(/places? to stay/i)).toBeInTheDocument();
  });

  it('должен рендерить "FavoritesPage" при переходе на "/favorites" для авторизованного пользователя', () => {
    const fakeUserData = makeFakeUserData();
    const fakeFavorites = makeFakeOffers(2);

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: fakeUserData
        },
        [NameSpace.Favorites]: {
          favorites: fakeFavorites,
          isFavoritesLoading: false
        }
      })
    );
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    if (fakeFavorites.length > 0) {
      expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    } else {
      expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    }
  });

  it('должен перенаправлять на "/login" при попытке перейти на "/favorites" для неавторизованного пользователя', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
  });

  it('должен рендерить "OfferPage" при переходе на "/offer/:id"', () => {
    const fakeOffer = makeFakeOffer();
    const fakeNearbyOffers = makeFakeOffers(3);
    const fakeReviews = makeFakeReviews(3);
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Offer]: {
          currentOffer: fakeOffer,
          requestedOfferId: fakeOffer.id,
          nearbyOffers: fakeNearbyOffers,
          isOfferLoading: false,
          isNearbyOffersLoading: false
        },
        [NameSpace.Reviews]: {
          reviews: fakeReviews,
          isReviewsLoading: false,
          isReviewPosting: false
        },
      })
    );
    mockHistory.push(AppRoute.Offer.replace(':id', fakeOffer.id));

    render(withStoreComponent);

    expect(screen.queryByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.queryByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.queryByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('должен рендерить "NotFoundPage" при переходе на несуществующий маршрут', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вернуться на главную/i })).toBeInTheDocument();
  });

  it('должен показывать спиннер загрузки при проверке авторизации', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Unknown,
          userData: null
        }
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Загрузка/i)).toBeInTheDocument();
  });

  it('должен показывать спиннер загрузки при загрузке предложений', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.Data]: {
          offers: [],
          city: DEFAULT_CITY,
          isOffersLoading: true
        }
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Загрузка/i)).toBeInTheDocument();
  });

  it('должен показывать спиннер загрузки при загрузке избранного для авторизованного пользователя', () => {
    const fakeUserData = makeFakeUserData();

    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: fakeUserData
        },
        [NameSpace.Favorites]: {
          favorites: [],
          isFavoritesLoading: true
        },
      })
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Загрузка/i)).toBeInTheDocument();
  });
});
