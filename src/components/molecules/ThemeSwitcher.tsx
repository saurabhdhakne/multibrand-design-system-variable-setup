import { Label } from '@/components/atoms';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTheme } from '@/theme/ThemeProvider';
import { modeCollections, type ModeCollectionKey } from '@/tokens';

const collectionKeys = Object.keys(modeCollections) as ModeCollectionKey[];

/** One select per switchable Figma collection (Brand, Theme, …), generated from the token export. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { modes, setMode } = useTheme();
  return (
    <div className={cn('flex flex-wrap gap-gap-sm', className)}>
      {collectionKeys.map((key) => {
        const c = modeCollections[key];
        const id = `theme-switcher-${key}`;
        return (
          <div key={key} className="grid gap-gap-xs">
            <Label htmlFor={id} className="text-caption text-muted-foreground">
              {c.name}
            </Label>
            <Select value={modes[key]} onValueChange={(value) => setMode(key, value as never)}>
              <SelectTrigger id={id} size="sm" className="min-w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(c.modes).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
}
