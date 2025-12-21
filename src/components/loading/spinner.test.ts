import { render, screen } from '@testing-library/react';
import Spinner from './spinner';
import React from 'react';

describe('Component: Spinner', () => {
  it('должен корректно отрисовываться', () => {
    render(React.createElement(Spinner));

    const spinner = screen.getByLabelText('Загрузка');
    expect(spinner).toBeInTheDocument();
  });
});
