import React, { useState } from 'react';
import './Checkbox.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  color = 'primary',
  size = 'medium',
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  className = '',
  style,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsChecked(e.target.checked);
      onChange?.(e);
    }
  };

  const checkboxClass = [
    'checkbox',
    `checkbox--${color}`,
    `checkbox--${size}`,
    disabled ? 'checkbox--disabled' : '',
    className,
  ]
    .join(' ')
    .trim();

  return (
    <label className={checkboxClass} style={style}>
      <input
        type="checkbox"
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="checkbox__input"
        {...props}
      />
      <span className="checkbox__custom"></span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};

export default Checkbox;
