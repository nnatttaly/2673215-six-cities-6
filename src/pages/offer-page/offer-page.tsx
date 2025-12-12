import { useEffect, useMemo } from 'react';
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
  AuthorizationStatus,
} from 'consts';
import Header from '@components/header/header';
import { fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction } from '@store/api-actions';
import {
  getCurrentOffer,
  getNearbyOffers,
  getOfferDataLoadingStatus,
  getRequestedOfferId,
} from '@store/offer-process/selectors';
import Spinner from '@components/loading/spinner';
import { getReviews } from '@store/reviews-process/selectors';
import ReviewForm from '@components/review-form/review-form';
import { getAuthorizationStatus } from '@store/user-process/selectors';
import { clearOfferData } from '@store/offer-process/offer-process';
import { clearReviewsData } from '@store/reviews-process/reviews-process';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const requestedOfferId = useAppSelector(getRequestedOfferId);
  const isOfferLoading = useAppSelector(getOfferDataLoadingStatus);

  const nearbyOffersToShow = useMemo(
    () => nearbyOffers.slice(0, NEARBY_OFFERS_LIMIT),
    [nearbyOffers]
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }

    return () => {
      dispatch(clearOfferData());
      dispatch(clearReviewsData());
    };
  }, [dispatch, id]);

  if (requestedOfferId !== id || isOfferLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const {
    id: offerId, title, isPremium, price, rating, images, bedrooms, maxAdults,
    type, goods, host, description, isFavorite, city
  } = currentOffer;

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
                offerId={offerId}
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

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                {isAuth && <ReviewForm offerId={currentOffer.id}/>}
              </section>
            </div>
          </div>

          <Map city={city} offers={mapOffers} selectedOfferId={offerId} variant="offer" />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffersToShow} variant="near-places" />
          </section>
        </div>

      </main>
    </div>
  );
}

export default OfferPage;
