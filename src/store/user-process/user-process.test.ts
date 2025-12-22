import { AuthorizationStatus } from 'consts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';
import { makeFakeUserData } from '@utils/mocks';

describe('Редьюсер: userProcess', () => {
  const reducer = userProcess.reducer;
  const mockUserData = makeFakeUserData();

  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null
  };

  const stateWithAuth = {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: mockUserData
  };

  const stateWithNoAuth = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null
  };

  it('должен возвращать начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };

    const result = reducer(stateWithAuth, emptyAction);

    expect(result).toEqual(stateWithAuth);
  });

  it('должен возвращать дефолтное начальное состояние при пустом действии', () => {
    const emptyAction = { type: '' };

    const result = reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен устанавливать статус "Auth" и userData при успешной проверке авторизации', () => {
    const result = reducer(stateWithNoAuth, {
      type: checkAuthAction.fulfilled.type,
      payload: mockUserData
    });

    expect(result).toEqual(stateWithAuth);
  });

  it('должен устанавливать статус "NoAuth" и очищать userData при неудачной проверке авторизации', () => {
    const result = reducer(stateWithAuth, checkAuthAction.rejected);

    expect(result).toEqual(stateWithNoAuth);
  });

  it('должен устанавливать статус "Auth" и userData при успешном входе', () => {
    const result = reducer(stateWithNoAuth, {
      type: loginAction.fulfilled.type,
      payload: mockUserData
    });

    expect(result).toEqual(stateWithAuth);
  });

  it('должен устанавливать статус "NoAuth" и очищать userData при неудачном входе', () => {
    const result = reducer(stateWithAuth, loginAction.rejected);

    expect(result).toEqual(stateWithNoAuth);
  });

  it('должен устанавливать статус "NoAuth" и очищать userData при успешном выходе', () => {
    const result = reducer(stateWithAuth, logoutAction.fulfilled);

    expect(result).toEqual(stateWithNoAuth);
  });
});
