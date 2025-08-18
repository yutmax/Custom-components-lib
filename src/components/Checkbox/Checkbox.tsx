import React, { useId, useState } from 'react';
import './Checkbox.scss';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-errormessage'?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelPlacement = 'end',
  color = 'primary',
  size = 'medium',
  disabled = false,
  checked,
  defaultChecked = false,
  onChange,
  className = '',
  style,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-errormessage': ariaErrormessage,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const generatedId = useId();
  const checkboxId = id || `checkbox-${generatedId}`;

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
    `label-${labelPlacement}`,
    disabled ? 'checkbox--disabled' : '',
    className,
  ]
    .join(' ')
    .trim();

  return (
    <label className={checkboxClass} style={style} htmlFor={checkboxId}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="checkbox__input"
        aria-label={ariaLabel || (label ? undefined : 'Checkbox')}
        aria-describedby={ariaDescribedby}
        aria-errormessage={ariaErrormessage}
        aria-invalid={props['aria-invalid']}
        aria-checked={checked !== undefined ? checked : isChecked}
        {...props}
      />
      <span className="checkbox__custom" aria-hidden="true"></span>
      {label && (
        <span className="checkbox__label" id={`${checkboxId}-label`}>
          {label}
        </span>
      )}
    </label>
  );
};

export { CheckboxProps };
export default Checkbox;
