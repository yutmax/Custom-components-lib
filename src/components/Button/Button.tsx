import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = ['button', `${variant}-button`, `button--${size}`, className].join(' ');
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
export default Button;
