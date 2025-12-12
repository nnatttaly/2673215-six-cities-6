import { AppRoute, FOOTER_LOGO_SIZE } from 'consts';
import { Link } from 'react-router-dom';

function Footer(): JSX.Element {
  return (
    <footer className="footer container">
      <Link to={AppRoute.Main} className="footer__logo-link" >
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={FOOTER_LOGO_SIZE.width}
          height={FOOTER_LOGO_SIZE.height}
        />
      </Link>
    </footer>
  );
}

export default Footer;
