import { Review } from 'types';

export const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      email: 'Max.conner@gmail.com',
      avatarPath: 'img/avatar-max.jpg',
      isPro: true,
    },
    rating: 4.5,
    date: new Date('2019-02-24'),
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  },
  {
    id: '2',
    user: {
      name: 'Max',
      email: 'Max.conner@gmail.com',
      avatarPath: 'img/avatar-max.jpg',
      isPro: true,
    },
    rating: 2.3,
    date: new Date('2019-04-24'),
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  },
  {
    id: '3',
    user: {
      name: 'Max',
      email: 'Max.conner@gmail.com',
      avatarPath: 'img/avatar-max.jpg',
      isPro: true,
    },
    rating: 5,
    date: new Date('2019-01-30'),
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
  },
];
