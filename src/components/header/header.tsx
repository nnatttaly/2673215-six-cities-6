import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { AppRoute, LOGO_SIZE, AuthorizationStatus } from 'consts';
import { logoutAction } from '@store/api-actions';
import { getAuthorizationStatus, getUserData } from '@store/user-process/selectors';

type HeaderProps = {
  showNavigation?: boolean;
};

function Header({ showNavigation = true }: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={LOGO_SIZE.width}
                height={LOGO_SIZE.height}
              />
            </Link>
          </div>

          {showNavigation && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={isAuth ? AppRoute.Favorites : AppRoute.Login}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>

                    {(isAuth && userData) ? (
                      <>
                        <span className="header__user-name user__name">
                          {userData.email}
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>

                {isAuth && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Main}
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )}

              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
