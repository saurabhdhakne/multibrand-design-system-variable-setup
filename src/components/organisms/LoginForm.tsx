import { useState, type FormEvent } from 'react';
import { Button, Checkbox, Label } from '@/components/atoms';
import { FormField, StatusAlert } from '@/components/molecules';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type LoginValues = { email: string; password: string; remember: boolean };

type LoginFormProps = {
  onSubmit?: (values: LoginValues) => void;
  /** Error from the server, shown above the fields. */
  error?: string;
  loading?: boolean;
  className?: string;
};

export function LoginForm({ onSubmit, error, loading, className }: LoginFormProps) {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '', remember: false });
  const [touched, setTouched] = useState(false);

  const emailError = touched && !/^\S+@\S+\.\S+$/.test(values.email) ? 'Enter a valid email address' : undefined;
  const passwordError = touched && values.password.length < 8 ? 'Use at least 8 characters' : undefined;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (/^\S+@\S+\.\S+$/.test(values.email) && values.password.length >= 8) onSubmit?.(values);
  };

  return (
    <Card className={cn('w-full max-w-sm', className)}>
      <CardHeader>
        <CardTitle className="text-h5">Sign in</CardTitle>
        <CardDescription>Use your work email to continue.</CardDescription>
      </CardHeader>
      <form onSubmit={submit} noValidate>
        <CardContent className="grid gap-gap-md">
          {error && <StatusAlert status="error" title={error} />}
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            value={values.email}
            error={emailError}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <FormField
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            value={values.password}
            error={passwordError}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <div className="flex items-center gap-gap-xs">
            <Checkbox
              id="login-remember"
              checked={values.remember}
              onCheckedChange={(checked) => setValues({ ...values, remember: checked === true })}
            />
            <Label htmlFor="login-remember" className="font-normal">
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="mt-gap-md flex-col gap-gap-sm">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
          <Button type="button" variant="link" size="sm">
            Forgot password?
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
