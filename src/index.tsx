import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockOffers } from './mocks/offers.js';
import { mockReviews } from './mocks/reviews.js';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App offers={mockOffers} reviews={mockReviews} />
    </Provider>
  </React.StrictMode>
);
