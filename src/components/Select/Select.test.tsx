import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Select, SelectItem } from './Select';

describe('Select component', () => {
  test('renders with label and no value', () => {
    render(
      <Select label="Choose option">
        <SelectItem value="one" label="Option 1" />
        <SelectItem value="two" label="Option 2" />
      </Select>,
    );

    expect(screen.getByText('Choose option')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  test('opens and closes dropdown on click', () => {
    render(
      <Select label="Menu">
        <SelectItem value="a" label="A" />
      </Select>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('calls onChange when item is selected', () => {
    const handleChange = jest.fn();
    render(
      <Select label="Select something" onChange={handleChange}>
        <SelectItem value="x" label="X" />
        <SelectItem value="y" label="Y" />
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Y'));

    expect(handleChange).toHaveBeenCalledWith('y');
  });

  test('disables interaction when disabled prop is true', () => {
    const handleChange = jest.fn();
    render(
      <Select label="Disabled" disabled onChange={handleChange}>
        <SelectItem value="1" label="One" />
      </Select>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('applies selected class to the active item', () => {
    render(
      <Select label="Test" value="1">
        <SelectItem value="1" label="One" />
        <SelectItem value="2" label="Two" />
      </Select>,
    );

    const listbox = screen.getByRole('listbox');
    const selectedItem = within(listbox).getByText('One').closest('li');

    expect(selectedItem).toHaveClass('select-item--selected');
  });

  test('selects item with keyboard', () => {
    const handleChange = jest.fn();
    render(
      <Select label="Keys" onChange={handleChange}>
        <SelectItem value="a" label="A" />
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));
    const item = screen.getByText('A').closest('li');

    fireEvent.keyDown(item!, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith('a');
  });
});
