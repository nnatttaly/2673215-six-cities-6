import { Offer, Offers, SortOption } from 'types';

export const getSortComparator = (
  sortOption: SortOption
): ((a: Offer, b: Offer) => number) => {
  const comparators = {
    Popular: () => 0,
    'Price: low to high': (a: Offer, b: Offer) => a.price - b.price,
    'Price: high to low': (a: Offer, b: Offer) => b.price - a.price,
    'Top rated first': (a: Offer, b: Offer) => b.rating - a.rating,
  };

  return comparators[sortOption];
};

export const sortOffers = (
  offers: Offers,
  sortOption: SortOption
): Offers => [...offers].sort(getSortComparator(sortOption));
