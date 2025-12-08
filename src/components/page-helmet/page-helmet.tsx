import { Helmet } from 'react-helmet-async';
import { useLocation, matchPath } from 'react-router-dom';
import { AppRoute, PAGE_TITLES } from 'consts';
import { useMemo } from 'react';

function PageHelmet(): JSX.Element {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const matchedRoute = Object.values(AppRoute).find((route) =>
      matchPath(route, location.pathname)
    );

    if (matchedRoute && matchedRoute in PAGE_TITLES) {
      return PAGE_TITLES[matchedRoute];
    }

    return 'Неизвестная страница';
  }, [location.pathname]);

  return (
    <Helmet>
      <title>{`Шесть городов. ${pageTitle}`}</title>
    </Helmet>
  );
}

export default PageHelmet;
