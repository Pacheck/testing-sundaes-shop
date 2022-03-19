import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SummaryForm } from '../SummaryForm';

describe('testing button by checking/unchecking checkbox,', () => {
  test('testing if checkbox is unchecked', () => {
    render(<SummaryForm />);

    const input = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
    });
    const button = screen.getByRole('button', { name: 'Confirm order' });

    expect(input).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test('check the checkbox to enable button, then uncheck do disabled button', () => {
    render(<SummaryForm />);

    const input = screen.getByRole('checkbox', {
      name: 'I agree to Terms and Conditions',
    });
    const button = screen.getByRole('button', { name: 'Confirm order' });

    expect(input).not.toBeChecked();
    expect(button).toBeDisabled();

    userEvent.click(input);

    expect(input).toBeChecked();
    expect(button).toBeEnabled();

    userEvent.click(input);

    expect(input).not.toBeChecked();
    expect(button).toBeDisabled();
  });
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
