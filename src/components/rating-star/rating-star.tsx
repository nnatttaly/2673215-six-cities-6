import { FORM_STAR_IMAGE_SIZE } from 'consts';

type RatingStarProps = {
  value: number;
  title: string;
  isChecked: boolean;
  onChange: (value: number) => void;
  disabled?: boolean;
};

function RatingStar({
  value,
  title,
  isChecked,
  onChange,
  disabled = false,
}: RatingStarProps): JSX.Element {

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={isChecked}
        disabled={disabled}
        onChange={() => !disabled && onChange(value)}
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg
          className="form__star-image"
          width={FORM_STAR_IMAGE_SIZE.width}
          height={FORM_STAR_IMAGE_SIZE.height}
        >
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingStar;
