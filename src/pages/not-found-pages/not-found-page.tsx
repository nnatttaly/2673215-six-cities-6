import PageHelmet from '@components/page-helmet/page-helmet.js';
import { Link } from 'react-router-dom';
import { AppRoute } from 'consts';

function NotFoundPage(): JSX.Element {
  return (
    <div>
      <PageHelmet />
      <div>
        <h1>404 Not Found</h1>
        <p>Кажется, кто-то съел эту страницу</p>
        <Link to={AppRoute.Main}>Вернуться на главную</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
