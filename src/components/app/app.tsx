import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'consts';
import MainPage from '@pages/main-page/main-page';
import LoginPage from '@pages/login-page/login-page';
import FavoritesPage from '@pages/favorites-page/favorites-page';
import OfferPage from '@pages/offer-page/offer-page';
import NotFoundPage from '@pages/not-found-page/not-found-page';
import PrivateRoute from '@components/private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Spinner from '@components/loading/spinner';
import {
  getAuthCheckedStatus,
  getAuthorizationStatus
} from '@store/user-process/selectors';
import { getOffersLoadingStatus } from '@store/data-process/selectors';
import { getFavoritesLoadingStatus } from '@store/favorites-process/selectors';
import { useEffect } from 'react';
import {
  fetchOffersAction,
  fetchFavoritesAction
} from '@store/api-actions';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isFavoritesLoading = useAppSelector(getFavoritesLoadingStatus);

  useEffect(() => {
    if (!isAuthChecked) {
      return;
    }

    const loadData = async () => {

      const promises = [dispatch(fetchOffersAction()).unwrap()];

      if (isAuth) {
        promises.push(dispatch(fetchFavoritesAction()).unwrap());
      }

      await Promise.all(promises);

    };

    loadData();
  }, [dispatch, isAuth, isAuthChecked]);


  if (!isAuthChecked || isOffersLoading || (isAuth && isFavoritesLoading)) {
    return <Spinner />;
  }

  return (
    <HelmetProvider>
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
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
