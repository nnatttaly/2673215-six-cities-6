import { CITIES } from 'consts';
import { City } from 'types';
import CityItem from '@components/city-item/city-item';

type CitiesListProps = {
  currentCity: City;
  onCityChange: (city: City) => void;
};

function CitiesList({
  currentCity,
  onCityChange,
}: CitiesListProps): JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <CityItem
              key={city.name}
              city={city}
              isActive={city.name === currentCity.name}
              onClick={onCityChange}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
