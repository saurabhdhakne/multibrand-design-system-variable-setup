import { useState, type FormEvent } from 'react';
import { SearchIcon } from 'lucide-react';
import { Button, Input } from '@/components/atoms';
import { cn } from '@/lib/utils';

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  /** Hide the submit button (search on Enter only). */
  compact?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
};

export function SearchBar({ placeholder = 'Search…', defaultValue = '', compact, onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form role="search" onSubmit={submit} className={cn('flex w-full items-center gap-gap-xs', className)}>
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label={placeholder}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      {!compact && <Button type="submit">Search</Button>}
    </form>
  );
}
