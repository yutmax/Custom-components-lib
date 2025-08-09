import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox, { CheckboxProps } from './Checkbox';

describe('Checkbox component', () => {
  const renderCheckbox = (props?: Partial<CheckboxProps>) => {
    return render(<Checkbox label="Test Label" {...props} />);
  };

  test('renders with label and correct default classes', () => {
    renderCheckbox();
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();

    const checkboxWrapper = label.closest('label');
    expect(checkboxWrapper).toHaveClass('checkbox');
    expect(checkboxWrapper).toHaveClass('checkbox--primary');
    expect(checkboxWrapper).toHaveClass('checkbox--medium');
  });

  test('applies size and color classes correctly', () => {
    renderCheckbox({ size: 'large', color: 'success' });
    const checkboxWrapper = screen.getByText('Test Label').closest('label');
    expect(checkboxWrapper).toHaveClass('checkbox--large');
    expect(checkboxWrapper).toHaveClass('checkbox--success');
  });

  test('changes state when clicked if not disabled', () => {
    const handleChange = jest.fn();
    renderCheckbox({ onChange: handleChange });

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);

    fireEvent.click(input);
    expect(input.checked).toBe(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('does not change state when disabled', () => {
    const handleChange = jest.fn();
    renderCheckbox({ disabled: true, onChange: handleChange });

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).toBeDisabled();

    fireEvent.click(input);
    expect(input.checked).toBe(false);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('supports controlled checked state', () => {
    const handleChange = jest.fn();
    const { rerender } = renderCheckbox({ checked: false, onChange: handleChange });

    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);

    rerender(<Checkbox label="Test Label" checked={true} onChange={handleChange} />);
    expect(input.checked).toBe(true);
  });

  test('supports defaultChecked', () => {
    renderCheckbox({ defaultChecked: true });
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });
});
