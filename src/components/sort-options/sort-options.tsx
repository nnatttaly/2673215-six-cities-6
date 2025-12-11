import { useState } from 'react';
import { SORT_OPTIONS, SortOption } from 'types';
import { SORTING_ARROW_SIZE } from 'consts';

type SortOptionsProps = {
  currentSort: SortOption;
  onSortChange: (sortOption: SortOption) => void;
};

function SortOptions({
  currentSort,
  onSortChange,
}: SortOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleSortClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortClick}
      >
        {currentSort}
        <svg
          className="places__sorting-arrow"
          width={SORTING_ARROW_SIZE.width}
          height={SORTING_ARROW_SIZE.height}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom${
          isOpen ? ' places__options--opened' : ''
        }`}
      >
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === currentSort ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOptions;
