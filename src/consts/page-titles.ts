import { AppRoute } from './app-routes.js';

export const PAGE_TITLES: Record<AppRoute, string> = {
  [AppRoute.Main]: 'Главная',
  [AppRoute.Login]: 'Авторизация',
  [AppRoute.Favorites]: 'Избранное',
  [AppRoute.Offer]: 'Предложение',
  [AppRoute.NotFound]: 'Страница не найдена',
} as const;
