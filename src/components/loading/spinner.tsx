import './spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-container" aria-label="Загрузка">
      <div className="spinner">
        <div className="spinner__circle"></div>
      </div>
    </div>
  );
}
