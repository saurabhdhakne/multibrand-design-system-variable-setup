import type { HTMLAttributes } from 'react';
import './components.css';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`ds-card ${className}`} {...props} />;
}
