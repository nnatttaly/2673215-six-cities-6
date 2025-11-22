import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockOffers } from './mocks/offers.js';
import { mockReviews } from './mocks/reviews.js';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={mockOffers} reviews={mockReviews} />
    </Provider>
  </React.StrictMode>
);
