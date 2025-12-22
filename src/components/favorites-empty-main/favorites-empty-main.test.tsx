import { render, screen } from '@testing-library/react';
import FavoritesEmptyMain from './favorites-empty-main';

describe('Component: FavoritesEmptyMain', () => {
  it('должен отображать сообщение о пустом избранном', () => {
    render(<FavoritesEmptyMain />);

    expect(screen.getByText(/Nothing yet saved\./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips\./i)).toBeInTheDocument();
  });

  it('должен содержать подсказку для скринридеров', () => {
    render(<FavoritesEmptyMain />);

    const heading = screen.getByRole('heading', { name: /Favorites \(empty\)/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('visually-hidden');
  });
});
