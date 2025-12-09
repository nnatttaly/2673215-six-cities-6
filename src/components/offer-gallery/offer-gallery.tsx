import { IMAGES_LIMIT } from 'consts';

type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, IMAGES_LIMIT).map((image, index) => (
          <div key={image} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={image}
              alt={`Photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
