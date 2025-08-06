import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('TextField Component', () => {
  // Basic Rending Test
  it('renders correctly with default props', () => {
    render(<TextField />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  // label test
  it('displays label when provided', () => {
    const labelText = 'Test Label';
    render(<TextField label={labelText} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  // Test with Placeholder
  it('displays placeholder when provided', () => {
    const placeholderText = 'Enter text here';
    render(<TextField placeholder={placeholderText} />);
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  // Focus test/bluer and label
  it('handles focus/blur and label state correctly', () => {
    const labelText = 'Test Label';
    render(<TextField label={labelText} />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText(labelText);

    // Check the initial state
    expect(label).not.toHaveClass('text-field__label--shrink');

    // Focus
    fireEvent.focus(input);
    expect(label).toHaveClass('text-field__label--shrink');

    // Remove the focus
    fireEvent.blur(input);
    expect(label).not.toHaveClass('text-field__label--shrink');

    // Enter the text
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.blur(input);
    expect(label).toHaveClass('text-field__label--shrink');
  });

  // Test errors
  it('displays error message when error is string', () => {
    const errorMessage = 'Invalid input';
    render(<TextField error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  // Boolean Test errors
  it('applies error class when error is boolean', () => {
    render(<TextField error={true} />);
    const wrapper = screen.getByRole('textbox').closest('.text-field');
    expect(wrapper).toHaveClass('_error');
  });

  // Test change in value
  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<TextField onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test Ref
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Test of custom styles
  it('applies custom styles correctly', () => {
    const customBg = '#f0f0f0';
    render(<TextField background={customBg} />);
    const wrapper = screen.getByRole('textbox').closest('.text-field');
    expect(wrapper).toHaveStyle(`--text-field-bg: ${customBg}`);
  });

  // Test of different sizes
  it.each(['small', 'medium', 'large'])('renders %s size correctly', (size) => {
    render(<TextField inputSize={size as any} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(`text-field__input--${size}`);
  });

  // Test Fullwidth
  it('applies fullWidth class when fullWidth is true', () => {
    render(<TextField fullWidth />);
    const wrapper = screen.getByRole('textbox').closest('.text-field');
    expect(wrapper).toHaveClass('text-field--full-width');
  });
});
