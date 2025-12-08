type CityTitleProps = {
  cityName: string;
};

function CityTitle({ cityName }: CityTitleProps): JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
  );
}

export default CityTitle;
