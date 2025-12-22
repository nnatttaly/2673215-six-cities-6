import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '@components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from 'types';
import { createAPI } from '@services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from './mocks';
import { Provider } from 'react-redux';
import { APIRoute } from 'consts/api-routes';
import { AuthorizationStatus, NameSpace } from 'consts/consts';
import { datatype, internet } from 'faker';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

function setupDefaultMocks(mockAxiosAdapter: MockAdapter, initialState: Partial<State>) {
  const isAuth = initialState[NameSpace.User]?.authorizationStatus === AuthorizationStatus.Auth;

  mockAxiosAdapter.onGet(APIRoute.Login).reply(200,
    isAuth
      ? { email: internet.email(), token: datatype.uuid() }
      : null
  );

  mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);

  if (isAuth) {
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);
  }
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  setupDefaultMocks(mockAxiosAdapter, initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

