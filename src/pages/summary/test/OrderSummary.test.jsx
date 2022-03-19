import { screen, render, fireEvent } from '@testing-library/react';
import OrderSummary from '../OrderSummary';

test('must contain a div', () => {
  render(<OrderSummary />);
  expect(screen.getByRole('checkbox', { name: 'uga' })).toBeInTheDocument();
});
