import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts/index.ts';

function NotFoundPage(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>Шесть городов. Страница не найдена</title>
      </Helmet>
      <div>
        <h1>404 Not Found</h1>
        <p>
          Кажется, кто-то съел эту страницу
        </p>
        <Link to={AppRoute.Main}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );

}

export default NotFoundPage;
