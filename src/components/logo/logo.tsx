import { Link } from 'react-router-dom';
import { AppRoute, LOGO_SIZE } from 'consts';

function Logo() {
  return (
    <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={LOGO_SIZE.width}
        height={LOGO_SIZE.height}
      />
    </Link>
  );
}

export default Logo;
