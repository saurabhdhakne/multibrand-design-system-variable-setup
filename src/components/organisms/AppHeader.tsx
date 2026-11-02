import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/atoms';
import { SearchBar, UserChip } from '@/components/molecules';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type NavItem = { label: string; href: string };

type AppHeaderProps = {
  productName?: string;
  nav?: NavItem[];
  activeHref?: string;
  user: { name: string; email: string };
  onSearch?: (query: string) => void;
  onSignOut?: () => void;
  className?: string;
};

export function AppHeader({
  productName = 'Acme',
  nav = [],
  activeHref,
  user,
  onSearch,
  onSignOut,
  className,
}: AppHeaderProps) {
  return (
    <header className={cn('flex items-center gap-gap-md border-b bg-card px-inset-md py-inset-sm', className)}>
      <a href="#" className="flex items-center gap-gap-xs font-semibold text-text-default-heading">
        <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
          {productName[0]}
        </span>
        <span className="hidden sm:inline">{productName}</span>
      </a>

      <nav className="hidden items-center gap-gap-xs md:flex">
        {nav.map((item) => (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            size="sm"
            className={cn(item.href === activeHref && 'bg-accent text-accent-foreground')}
          >
            <a href={item.href} aria-current={item.href === activeHref ? 'page' : undefined}>
              {item.label}
            </a>
          </Button>
        ))}
      </nav>

      <SearchBar compact onSearch={onSearch} className="ml-auto max-w-xs" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <BellIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary-100 text-primary-800">
                {user.name
                  .split(/\s+/)
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel>
            <UserChip name={user.name} email={user.email} />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={onSignOut}>
            <LogOutIcon /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
