import React, { forwardRef, useMemo, useState } from 'react';
import './TextField.scss';

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  inputSize?: 'small' | 'medium';
  fullWidth?: boolean;
  error?: boolean | string;
  background?: string;
  textColor?: string;
  labelColor?: string;
  focusColor?: string;
  borderColor?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      inputSize = 'medium',
      fullWidth = false,
      error = false,
      className = '',
      background,
      textColor,
      labelColor,
      focusColor,
      borderColor,
      id,
      onFocus,
      onBlur,
      value,
      defaultValue,
      style,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!(value || defaultValue));

    const inputId = useMemo(
      () => id || `textfield-${Math.random().toString(36).substr(2, 9)}`,
      [id],
    );

    const handleFocuse = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlure = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    const wrapperClasses = [
      'text-field',
      isFocused ? '_focus' : '',
      error ? '_error' : '',
      fullWidth ? 'text-field--full-width' : '',
    ]
      .join(' ')
      .trim();

    const labelClasses = [
      'text-field__label',
      isFocused || hasValue ? 'text-field__label--shrink' : '',
    ]
      .join(' ')
      .trim();

    const inputClasses = [
      'text-field__input',
      `text-field__input--${inputSize}`,
      label ? '' : 'text-field__input--placeholder-visible',
      className,
    ]
      .join(' ')
      .trim();

    const customStyles = {
      '--text-field-bg': background,
      '--text-field-text': textColor,
      '--text-field-label': labelColor,
      '--text-field-focus': focusColor,
      '--text-field-border': borderColor,
      '--text-field-border-hover': borderColor,
      ...style,
    };

    return (
      <div className="text-field-container">
        <div className={wrapperClasses} style={customStyles}>
          {label && (
            <label htmlFor={inputId} className={labelClasses}>
              {label}
            </label>
          )}
          <input
            onChange={handleChange}
            onFocus={handleFocuse}
            onBlur={handleBlure}
            id={inputId}
            className={inputClasses}
            ref={ref}
            {...props}
          />
        </div>
        {typeof error === 'string' && <p className="text-field__error-message">{error}</p>}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

export { TextFieldProps };
export default TextField;
