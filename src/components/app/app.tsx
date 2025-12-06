import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'consts';
import MainPage from '@pages/main-page/main-page';
import LoginPage from '@pages/login-page/login-page';
import FavoritesPage from '@pages/favorites-page/favorites-page';
import OfferPage from '@pages/offer-page/offer-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import PrivateRoute from '@components/private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Offers, Review } from 'types';
import { useAppSelector } from '../../hooks';
import Spinner from '@components/loading/spinner';

type AppScreenProps = {
  offers: Offers;
  reviews: Review[];
};

function App({ offers, reviews }: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage
                offer={offers[0]}
                reviews={reviews}
                nearbyOffers={offers.slice(1)}
              />
            } // ToDo: брать id предложения из пути
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
