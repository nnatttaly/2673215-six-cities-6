import { Helmet } from 'react-helmet-async';
import { useLocation, matchPath } from 'react-router-dom';
import { AppRoute, PAGE_TITLES } from 'consts';

function PageHelmet(): JSX.Element {
  const location = useLocation();

  const getPageTitle = () => {
    const matchedRoute = Object.values(AppRoute).find((route) =>
      matchPath(route, location.pathname)
    );

    if (matchedRoute && matchedRoute in PAGE_TITLES) {
      return PAGE_TITLES[matchedRoute];
    }

    return 'Неизвестная страница';
  };

  return (
    <Helmet>
      <title>{`Шесть городов. ${getPageTitle()}`}</title>
    </Helmet>
  );
}

export default PageHelmet;
