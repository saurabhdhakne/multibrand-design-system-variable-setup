import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/atoms';
import { cn } from '@/lib/utils';

type UserChipProps = {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: string;
  className?: string;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

/** Avatar + name/email, with an optional role badge. */
export function UserChip({ name, email, avatarUrl, role, className }: UserChipProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-gap-sm', className)}>
      <Avatar>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className="bg-primary-100 text-primary-800">{initials(name)}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 text-left">
        <span className="truncate text-body-sm font-medium text-text-default-heading">{name}</span>
        {email && <span className="truncate text-caption text-muted-foreground">{email}</span>}
      </div>
      {role && <Badge variant="secondary">{role}</Badge>}
    </div>
  );
}
