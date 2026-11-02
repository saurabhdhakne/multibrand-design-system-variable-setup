import type { ReactNode } from 'react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const config = {
  information: { variant: 'information', Icon: InfoIcon },
  success: { variant: 'success', Icon: CircleCheckIcon },
  warning: { variant: 'warning', Icon: TriangleAlertIcon },
  error: { variant: 'destructive', Icon: CircleAlertIcon },
} as const;

type StatusAlertProps = {
  status: keyof typeof config;
  title: string;
  children?: ReactNode;
  className?: string;
};

/** Alert with the status icon and colours from the Figma "Mapped" collection. */
export function StatusAlert({ status, title, children, className }: StatusAlertProps) {
  const { variant, Icon } = config[status];
  return (
    <Alert variant={variant} className={className}>
      <Icon />
      <AlertTitle>{title}</AlertTitle>
      {children && <AlertDescription>{children}</AlertDescription>}
    </Alert>
  );
}
