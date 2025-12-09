import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import OffersList from '@components/offers-list/offers-list.js';
import PageHelmet from '@components/page-helmet/page-helmet.js';
import ReviewsList from '@components/reviews-list/reviews-list';
import OfferGallery from '@components/offer-gallery/offer-gallery';
import OfferHeader from '@components/offer-header/offer-header';
import OfferGoods from '@components/offer-goods/offer-goods';
import OfferHost from '@components/offer-host/offer-host';
import Map from '@components/map/map.js';
import {
  NEARBY_OFFERS_LIMIT,
  AppRoute,
} from 'consts';
import Header from '@components/header/header';
import { fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction } from '@store/api-actions';
import { clearOfferData } from '@store/offer-process/offer-process';
import {
  getCurrentOffer,
  getNearbyOffers,
  getReviews,
  getOfferDataLoadingStatus,
  getOfferError,
  getNearbyOffersLoadingStatus,
  getReviewsLoadingStatus,
  getRequestedOfferId,
} from '@store/offer-process/selectors';
import Spinner from '@components/loading/spinner';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(getCurrentOffer);
  const requestedOfferId = useAppSelector(getRequestedOfferId);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);

  const isOfferLoading = useAppSelector(getOfferDataLoadingStatus);
  const isNearbyLoading = useAppSelector(getNearbyOffersLoadingStatus);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const error = useAppSelector(getOfferError);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }

    return () => {
      dispatch(clearOfferData());
    };
  }, [dispatch, id]);


  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (requestedOfferId !== id || isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer || error) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isNearbyLoading || isReviewsLoading) {
    return <Spinner />;
  }


  const {
    title, isPremium, price, rating, images, bedrooms, maxAdults,
    type, goods, host, description, isFavorite, city
  } = currentOffer;

  const nearbyOffersToShow = nearbyOffers.slice(0, NEARBY_OFFERS_LIMIT);
  const mapOffers = [currentOffer, ...nearbyOffersToShow];

  return (
    <div className="page">
      <PageHelmet />
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">

          <OfferGallery images={images} />

          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferHeader
                title={title}
                isPremium={isPremium}
                price={price}
                rating={rating}
                isFavorite={isFavorite}
                type={type}
                bedrooms={bedrooms}
                maxAdults={maxAdults}
              />

              <OfferGoods goods={goods} />

              <OfferHost host={host} description={description} />

              <ReviewsList reviews={reviews} />
            </div>
          </div>

          <Map city={city} offers={mapOffers} selectedOffer={currentOffer} className="offer" />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffersToShow} layoutType="near-places" />
          </section>
        </div>

      </main>
    </div>
  );
}

export default OfferPage;
