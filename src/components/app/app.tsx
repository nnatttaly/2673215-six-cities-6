import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/index.ts';
import MainPage from '../../pages/main-pages/main-page.tsx';
import LoginPage from '../../pages/login-pages/login-pages.tsx';
import FavoritesPage from '../../pages/favorites-pages/favorites-page.tsx';
import OfferPage from '../../pages/offer-pages/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-pages/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import { Offer } from '../../types/index.js';

type AppScreenProps = {
  offers: Offer[];
};

function App({ offers }: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage offers={offers} />} />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage favoriteOffers={offers} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
