import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../../consts/routes.ts';
import MainPage from '../../pages/main-pages/main-page.tsx';
import LoginPage from '../../pages/login-pages/login-pages.tsx';
import FavoritesPage from '../../pages/favorites-pages/favorites-page.tsx';
import OfferPage from '../../pages/offer-pages/offer-page.tsx';
import NotFoundPage from '../../pages/not-found-pages/not-found-page.tsx';

type AppScreenProps = {
  offerCardsCount: number;
}

function App({ offerCardsCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offerCardsCount={offerCardsCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
