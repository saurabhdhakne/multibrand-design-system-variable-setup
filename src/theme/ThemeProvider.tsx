import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { modeCollections, type ModeCollectionKey, type ModeSelection } from '../tokens';

type ThemeContextValue = {
  modes: Required<ModeSelection>;
  setMode: <K extends ModeCollectionKey>(collection: K, mode: Required<ModeSelection>[K]) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const collectionKeys = Object.keys(modeCollections) as ModeCollectionKey[];

const defaults = Object.fromEntries(
  collectionKeys.map((k) => [k, modeCollections[k].defaultMode]),
) as Required<ModeSelection>;

/** Data attributes that activate the given modes, e.g. `{ 'data-brand': 'acme', 'data-theme': 'dark' }`. */
export function modeAttributes(modes: Required<ModeSelection>) {
  return Object.fromEntries(collectionKeys.map((k) => [modeCollections[k].attribute, modes[k]]));
}

type ThemeProviderProps = {
  children: ReactNode;
  /** Initial modes per Figma collection; anything omitted inherits from the parent provider or the Figma default. */
  initialModes?: ModeSelection;
  /**
   * `root` writes the attributes on <html> (use once, at the app root).
   * `local` wraps children in a scoped element so a section can render a different brand/theme.
   */
  scope?: 'root' | 'local';
};

export function ThemeProvider({ children, initialModes, scope = 'root' }: ThemeProviderProps) {
  const parent = useContext(ThemeContext);
  // Only this provider's own choices are stored; everything else keeps following the parent.
  const [overrides, setOverrides] = useState<ModeSelection>(initialModes ?? {});
  const parentModes = parent?.modes ?? defaults;

  const value = useMemo<ThemeContextValue>(
    () => ({
      modes: { ...parentModes, ...overrides },
      setMode: (collection, mode) => setOverrides((o) => ({ ...o, [collection]: mode })),
    }),
    [parentModes, overrides],
  );
  const { modes } = value;

  useLayoutEffect(() => {
    if (scope !== 'root') return;
    const html = document.documentElement;
    for (const [attr, mode] of Object.entries(modeAttributes(modes))) html.setAttribute(attr, mode);
  }, [modes, scope]);

  return (
    <ThemeContext.Provider value={value}>
      {scope === 'root' ? (
        children
      ) : (
        // Every mode attribute is re-applied here so aliased variables re-resolve inside this scope.
        <div data-ds-scope="" {...modeAttributes(modes)}>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
