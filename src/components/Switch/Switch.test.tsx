import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from './Switch';

describe('Switch Component', () => {
  it('renders correctly with default props', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('displays label when provided', () => {
    render(<Switch label="Test Switch" />);
    expect(screen.getByText('Test Switch')).toBeInTheDocument();
  });

  it('toggles checked state when clicked', () => {
    render(<Switch />);
    const switchElement = screen.getByRole('switch');

    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('does not toggle when disabled', () => {
    const handleChange = jest.fn();
    render(<Switch disabled onChange={handleChange} />);
    const switchElement = screen.getByRole('switch');

    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
    expect(handleChange).not.toHaveBeenCalled();
    expect(switchElement).toBeDisabled();
  });

  it('works as controlled component', () => {
    const { rerender } = render(<Switch checked={false} onChange={jest.fn()} />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).not.toBeChecked();

    rerender(<Switch checked={true} onChange={jest.fn()} />);
    expect(switchElement).toBeChecked();
  });

  it.each(['primary', 'secondary', 'success'])('applies correct class for %s color', (color) => {
    render(<Switch color={color as any} />);
    const labelElement = screen.getByRole('switch').closest('label');
    expect(labelElement).toHaveClass(`switch--${color}`);
  });

  it.each(['small', 'medium'])('applies correct class for %s size', (size) => {
    render(<Switch size={size as any} />);
    const labelElement = screen.getByRole('switch').closest('label');
    expect(labelElement).toHaveClass(`switch--${size}`);
  });

  it('passes other props to input element', () => {
    render(<Switch data-testid="custom-switch" />);
    expect(screen.getByTestId('custom-switch')).toBeInTheDocument();
  });

  it('has proper aria attributes', () => {
    render(<Switch label="Accessible Switch" checked />);
    const switchElement = screen.getByRole('switch');

    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveAttribute('aria-labelledby');
    expect(switchElement).not.toHaveAttribute('aria-disabled');
  });
});
