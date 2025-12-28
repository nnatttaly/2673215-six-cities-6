import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import CitiesList from './cities-list';
import { CITIES } from 'consts';
import { withHistory } from '@utils/mock-component';

describe('Компонент: CitiesList', () => {
  it('должен подсвечивать активный город и уведомлять об изменении', async () => {
    const user = userEvent.setup();
    const onCityChange = vi.fn();

    const currentCity = CITIES[0];
    const nextCity = CITIES[1];

    const preparedComponent = withHistory(
      <CitiesList currentCity={currentCity} onCityChange={onCityChange} />,
    );

    render(preparedComponent);

    expect(screen.getByText(currentCity.name).closest('a')).toHaveClass('tabs__item--active');

    await user.click(screen.getByText(nextCity.name));

    expect(onCityChange).toHaveBeenCalledWith(nextCity);
    expect(onCityChange).toHaveBeenCalledTimes(1);
  });

  it('должен отображать все города из константы CITIES', () => {
    const onCityChange = vi.fn();
    const currentCity = CITIES[0];

    const preparedComponent = withHistory(
      <CitiesList currentCity={currentCity} onCityChange={onCityChange} />,
    );

    render(preparedComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });
});
