import type { HTMLAttributes } from 'react';
import './components.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status: 'information' | 'success' | 'warning' | 'error';
};

export function Badge({ status, className = '', ...props }: BadgeProps) {
  return <span className={`ds-badge ds-badge--${status} ${className}`} {...props} />;
}
