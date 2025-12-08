import { City } from 'types';

type CityItemProps = {
  city: City;
  isActive: boolean;
  onClick: (city: City) => void;
};

function CityItem({ city, isActive, onClick }: CityItemProps): JSX.Element {
  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onClick(city);
  };

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${
          isActive ? 'tabs__item--active' : ''
        }`}
        href="#"
        onClick={handleClick}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default CityItem;
