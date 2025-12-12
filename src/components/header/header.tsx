import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { AppRoute, AuthorizationStatus } from 'consts';
import { logoutAction } from '@store/api-actions';
import { getAuthorizationStatus, getUserData } from '@store/user-process/selectors';
import { getFavoritesCount } from '@store/favorites-process/selectors';
import Logo from '@components/logo/logo';

type HeaderProps = {
  showNavigation?: boolean;
};

function Header({ showNavigation = true }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const userData = useAppSelector(getUserData);
  const favoritesCount = useAppSelector(getFavoritesCount);

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
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
                        <span className="header__favorite-count">{favoritesCount}</span>
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
