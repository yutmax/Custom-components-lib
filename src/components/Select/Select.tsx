import React, { ReactElement, useState, useId } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import './Select.scss';

interface SelectProps {
  open?: boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[];
  className?: string;
  disabled?: boolean;
  id?: string;
}

interface SelectItemProps {
  value: string;
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
}

const Select: React.FC<SelectProps> = ({
  open = false,
  children,
  label,
  className = '',
  onChange,
  value,
  disabled = false,
  id: propId,
}) => {
  const isControlled = value !== undefined;
  const [isOpen, setIsOpen] = useState(open);
  const [internalValue, setInternalValue] = useState<string | undefined>(value);

  const generatedId = useId();
  const id = propId || `select-${generatedId}`;

  const activeValue = isControlled ? value : internalValue;

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleItemClick = (value: string) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
    setIsOpen(false);
  };

  const getLabelByValue = (v?: string) => {
    if (!children || v === undefined) return '';
    const items = Array.isArray(children) ? children : [children];
    const selectedItem = items.find((item) => item.props.value === v);
    return selectedItem?.props.label || selectedItem?.props.value || '';
  };

  const hasValue = Boolean(activeValue) || isOpen;

  return (
    <div
      className={`select ${className} ${isOpen ? '_open' : ''} ${disabled ? 'select--disabled' : ''}`}
      id={id}
    >
      <button
        type="button"
        className="select__btn"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-dropdown`}
        disabled={disabled}
      >
        {label && (
          <label className={`select__label ${hasValue ? 'select__label--active' : ''}`}>
            {label}
          </label>
        )}
        <div className="select__selected-value">{getLabelByValue(activeValue)}</div>
        <FaChevronDown className="select__chevron" />
      </button>

      <ul className="select__dropdown" role="listbox" id={`${id}-dropdown`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childValue = child.props.value;

            return React.cloneElement(child, {
              isSelected: childValue === activeValue,
              onClick: () => handleItemClick(childValue),

              tabIndex: isOpen ? 0 : -1,
            });
          }
          return child;
        })}
      </ul>
    </div>
  );
};

const SelectItem: React.FC<SelectItemProps> = ({
  icon,
  value,
  label = value,
  className = '',
  isSelected = false,
  disabled = false,
  onClick,
  tabIndex,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onClick && !disabled) {
        onClick();
      }
    }
  };
  return (
    <li
      className={`select-item ${isSelected ? 'select-item--selected' : ''} ${
        disabled ? 'select-item--disabled' : ''
      } ${className}`}
      onClick={disabled ? undefined : onClick}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
    >
      {icon && <span className="select-item__icon">{icon}</span>}
      <div className="select-item__label">{label}</div>
    </li>
  );
};

export { Select, SelectItem, SelectItemProps, SelectProps };
