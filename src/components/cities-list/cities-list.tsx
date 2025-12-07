import { CITIES } from 'consts';
import { useCallback } from 'react';
import { City } from 'types';

type CitiesListProps = {
  currentCity: City;
  onCityChange: (city: City) => void;
};

function CitiesList({
  currentCity,
  onCityChange,
}: CitiesListProps): JSX.Element {

  const handleCityClick = useCallback((city: City) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    onCityChange(city);
  }, [onCityChange]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city.name === currentCity.name ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={handleCityClick(city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
