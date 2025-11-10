import { User } from './user.type.js';

export type Review = {
  id: string;
  user: User;
  rating: number;
  date: Date;
  comment: string;
};
