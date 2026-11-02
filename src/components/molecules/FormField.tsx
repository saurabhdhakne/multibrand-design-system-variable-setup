import { useId, type ComponentProps } from 'react';
import { Input, Label } from '@/components/atoms';
import { cn } from '@/lib/utils';

type FormFieldProps = ComponentProps<typeof Input> & {
  label: string;
  description?: string;
  error?: string;
};

/** Label + Input + helper or error text, wired up for accessibility. */
export function FormField({ label, description, error, id, className, required, ...props }: FormFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const hint = error ?? description;

  return (
    <div className={cn('grid gap-gap-xs', className)}>
      <Label htmlFor={inputId}>
        {label}
        {required && <span className="text-text-error-default">*</span>}
      </Label>
      <Input
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint ? hintId : undefined}
        {...props}
      />
      {hint && (
        <p id={hintId} className={cn('text-caption', error ? 'text-text-error-default' : 'text-muted-foreground')}>
          {hint}
        </p>
      )}
    </div>
  );
}
