import React, { useId, useState } from 'react';
import './Switch.scss';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  color?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium';
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
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
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const generatedId = useId();
  const switchId = id || `switch-${generatedId}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setIsChecked(e.target.checked);
      onChange?.(e);
    }
  };

  const SwitchClass = [
    'switch',
    `switch--${color}`,
    `switch--${size}`,
    `label-${labelPlacement}`,
    disabled ? 'switch--disabled' : '',
    className,
  ]
    .join(' ')
    .trim();

  return (
    <label className={SwitchClass} style={style} htmlFor={switchId}>
      <input
        type="checkbox"
        id={switchId}
        checked={checked !== undefined ? checked : isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="switch__input"
        role="switch"
        aria-checked={checked !== undefined ? checked : isChecked}
        aria-labelledby={label ? `${switchId}-label` : undefined}
        aria-disabled={disabled || undefined}
        {...props}
      />
      <span className="switch__slider" aria-hidden="true"></span>
      {label && (
        <span className="switch__label" id={`${switchId}-label`}>
          {label}
        </span>
      )}
    </label>
  );
};

export { SwitchProps };
export default Switch;
