import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from 'consts';
import PrivateRoute from './private-route';
import { withHistory, withStore } from '@utils/mock-component';

describe('Компонент: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('должен отображать компонент для защищенного маршрута, когда пользователь авторизован', () => {
    const expectedText = 'содержимое защищенного маршрута';
    const notExpectedText = 'содержимое страницы входа';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{expectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: null
        }
      }
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Favorites);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('должен перенаправлять на страницу входа, когда пользователь не авторизован', () => {
    const expectedText = 'содержимое страницы входа';
    const notExpectedText = 'содержимое защищенного маршрута';

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      {
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null
        }
      }
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    mockHistory.push(AppRoute.Favorites);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
