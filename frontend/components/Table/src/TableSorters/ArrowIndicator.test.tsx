
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArrowIndicator from './ArrowIndicator';

test('renders ArrowIndicator and handles clicks', () => {
  const onHandleAscOrder = jest.fn();
  const onHandleDescOrder = jest.fn();

  render(
    <ArrowIndicator onHandleAscOrder={onHandleAscOrder} onHandleDescOrder={onHandleDescOrder} />
  );

  const ascIcon = screen.getByLabelText('Sort ascending');
  const descIcon = screen.getByLabelText('Sort descending');

  userEvent.click(ascIcon);
  expect(onHandleAscOrder).toHaveBeenCalled();

  userEvent.click(descIcon);
  expect(onHandleDescOrder).toHaveBeenCalled();
});
