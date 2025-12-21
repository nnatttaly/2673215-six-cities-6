import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container" aria-label="Загрузка">
      <div className="spinner">
        <div className="spinner__circle"></div>
      </div>
    </div>
  );
}

export default Spinner;
