import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import Header from './header';
import {AuthorizationStatus, AppRoute} from 'consts';
import {getAuthorizationStatus, getUserData} from '@store/user-process/selectors.ts';
import {logoutAction} from '@store/api-actions';
import {withHistory} from '@utils/mock-component';
import {State} from 'types';

const selectorMock = vi.fn(<TSelected,>(selector: (state: State) => TSelected) =>
  selector({} as State)
);
type DispatchFn = (action: unknown) => unknown;

export const dispatchMock = vi.fn<
  Parameters<DispatchFn>,
  ReturnType<DispatchFn>
>((action) => action);

vi.mock('../../hooks', () => ({
  useAppSelector: <TSelected,>(selector: (state: State) => TSelected) =>
    selectorMock(selector),
}));

vi.mock('../../hooks', () => ({
  useAppSelector: <TSelected,>(selector: (state: State) => TSelected) =>
    selectorMock(selector),
  useAppDispatch: () => dispatchMock,
}));

vi.mock('../../store/api-actions', () => ({
  logoutAction: vi.fn(),
}));

describe('Компонент: Header', () => {
  beforeEach(() => {
    dispatchMock.mockReset();
    selectorMock.mockReset();
    vi.mocked(logoutAction).mockReset();
  });

  it('должен отображать информацию пользователя и обрабатывать выход', async () => {
    const user = userEvent.setup();
    const logoutActionResult = {type: 'logout'};

    selectorMock.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return AuthorizationStatus.Auth;
      }
      if (selector === getUserData) {
        return {email: 'test@test.com'};
      }
      return undefined;
    });

    vi.mocked(logoutAction).mockReturnValue(logoutActionResult as never);

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /test@test.com/i})).toHaveAttribute('href', AppRoute.Favorites);

    await user.click(screen.getByText(/sign out/i));

    expect(dispatchMock).toHaveBeenCalledWith(logoutActionResult);
  });

  it('должен отображать ссылку "Войти" когда пользователь не авторизован', () => {
    selectorMock.mockImplementation((selector) => {
      if (selector === getAuthorizationStatus) {
        return AuthorizationStatus.NoAuth;
      }
      if (selector === getUserData) {
        return null;
      }
      return undefined;
    });

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByRole('link', {name: /sign in/i})).toHaveAttribute('href', AppRoute.Login);
  });
});
