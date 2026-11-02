# Multibrand Design System: Figma variables → React

The Figma variables (exported with Tokens Studio) are the source of truth. They're compiled to CSS
custom properties and typed TS, and consumed by React through a `ThemeProvider`.

```
Figma variables ──(Tokens Studio export / GitHub sync)──▶ tokens/figma/*.json
                                                           │  npm run tokens
                                                           ▼
                                   src/tokens/generated/tokens.css   (CSS vars per collection/mode)
                                   src/tokens/generated/tokens.ts    (typed names, collections, modes)
```

## Collections

| Figma collection | Modes | In code |
| --- | --- | --- |
| `Brand` | Mode 1 | Primitives (`--blue-500`, `--scale-400`, `--fonts-inter-family`…) on `:root` |
| `Alias` | Ocean, Natural | `data-brand="ocean" \| "natural"`: `--primary-500`, `--neutral-100`, `--spacing-…`, `--border-radius-…` |
| `Mapped` | Light, Dark | `data-theme="light" \| "dark"`: `--surface-…`, `--text-…`, `--icon-…`, `--border-…` |
| `Responsive` | Desktop, Mobile | Automatic: Mobile applies under `(max-width: 767px)`. Set `data-viewport="mobile"` to force it. |

The `core`, `light`, `dark` and `theme` sets are the Tokens Studio starter template and are excluded.
Attribute names, labels, the breakpoint and the exclusions all live in [tokens.config.json](tokens.config.json).

Mapping rules:
- Token `Spacing.inset.space-inset-sm` → `--spacing-inset-space-inset-sm`
- A reference such as `{Primary.500}` → `var(--primary-500)`, so switching brand cascades through the theme tokens
- Numbers → `px` (font weights stay unitless); fonts → quoted strings
- The build fails if two collections produce the same CSS name (pure pass-throughs like `Alias/Foundation.black` are ignored)

## Updating tokens

1. Re-export from Tokens Studio, or use its GitHub sync to push straight to `tokens/figma`.
2. Run `npm run tokens`. It also runs automatically before `dev` and `build`.

## Using it in React

```tsx
<ThemeProvider initialModes={{ brand: 'natural', theme: 'dark' }}>   {/* sets attributes on <html> */}
  <App />
</ThemeProvider>

const { modes, setMode } = useTheme();
setMode('brand', 'ocean');

// A section rendered in a different mode; any collection not listed inherits from the parent
<ThemeProvider scope="local" initialModes={{ theme: 'dark' }}>…</ThemeProvider>
```

Styling options:
- CSS: `background: var(--surface-primary-default);`
- TS: `style={{ color: token('text.default.caption') }}`. `token()` is type-checked against the export, so a
  token that is renamed or removed in Figma breaks `npm run build`.

Components should use `Mapped`, `Alias` and `Responsive` tokens, never `Brand` primitives, so they re-skin for every brand × theme × viewport.

## Scripts
- `npm run dev`: regenerates tokens, then starts Vite
- `npm run build`: regenerates tokens, type-checks, builds
- `npm run tokens`: regenerates tokens only
