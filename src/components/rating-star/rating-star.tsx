import { FORM_STAR_IMAGE_SIZE } from 'consts';

type RatingStarProps = {
  value: number;
  title: string;
  isChecked: boolean;
  onChange: (value: number) => void;
};

function RatingStar({
  value,
  title,
  isChecked,
  onChange,
}: RatingStarProps): JSX.Element {

  const handleChange = () => {
    onChange(value);
  };

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={value}
        id={`${value}-stars`}
        type="radio"
        checked={isChecked}
        onChange={handleChange}
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
