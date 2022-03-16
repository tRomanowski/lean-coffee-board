import { render, screen } from '@testing-library/react';
import EntryForm from './EntryForm';
import userEvent from '@testing-library/user-event';

describe('EntryForm', () => {
  it('blabla', () => {
    const callback = jest.fn();
    render(<EntryForm onSubmit={callback} />);

    const form = screen.getByRole('form', { name: 'Create new entry' });
    expect(form).toBeInTheDocument();

    const input = screen.getByLabelText('Entry Text');

    userEvent.type(input, 'Lorem ipsum dolor sit.{enter}');

    expect(form).toContainElement(input);

    expect(callback).toHaveBeenCalledWith('Lorem ipsum dolor sit.');
  });
});
