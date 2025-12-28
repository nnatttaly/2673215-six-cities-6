import { Link } from 'react-router-dom';
import { CITIES } from 'consts';
import { getRandomCity } from '@utils/random-utils';
import { useAppDispatch } from '@hooks/index';
import { changeCity } from '@store/data-process/data-process';

function RandomCityLink(): JSX.Element {
  const dispatch = useAppDispatch();
  const randomCity = getRandomCity(CITIES);

  const handleCityClick = () => {
    dispatch(changeCity(randomCity));
  };

  return (
    <div className="locations__item">
      <Link
        className="locations__item-link"
        to="/"
        onClick={handleCityClick}
      >
        <span>{randomCity.name}</span>
      </Link>
    </div>
  );
}

export default RandomCityLink;
