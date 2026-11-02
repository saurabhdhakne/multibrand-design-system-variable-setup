import type { ButtonHTMLAttributes } from 'react';
import './components.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'error';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`ds-button ds-button--${variant} ${className}`} {...props} />;
}
