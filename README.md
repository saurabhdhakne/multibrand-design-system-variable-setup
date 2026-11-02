# Multibrand Design System: Figma variables → React

The Figma variables (exported with Tokens Studio) are the source of truth. They're compiled to CSS
custom properties, a Tailwind theme and typed TS. shadcn/ui components consume them, and Storybook documents them.

```
Figma variables ──(Tokens Studio export / GitHub sync)──▶ tokens/figma/*.json
                                                           │  npm run tokens
                                                           ▼
                                   src/tokens/generated/tokens.css           (CSS vars per collection/mode)
                                   src/tokens/generated/tokens.tailwind.css  (Tailwind utilities backed by tokens)
                                   src/tokens/generated/tokens.ts            (typed names, collections, modes)
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

## Storybook

`npm run storybook` opens http://localhost:6006.

- **Toolbar:** the **Brand** and **Theme** menus come from the Figma collections. **Viewport** (Mobile 440 / Desktop 1440) previews the Responsive collection.
- **Foundations:** Colors (Mapped / Alias / Primitives), Typography, and Spacing & Radius, all read live from the tokens.
- **Atoms:** the shadcn primitives in `src/components/ui`, imported via `@/components/atoms`: Button, Badge, Input, Textarea, Label, Checkbox, Switch, Avatar, Separator, Tooltip.
- **Molecules** (`src/components/molecules`): FormField, SearchBar, UserChip, StatusAlert, ThemeSwitcher.
- **Organisms** (`src/components/organisms`): LoginForm (with interaction tests), AppHeader, SettingsDialog.

Each layer imports only from the layers below it.

## shadcn theming

`src/index.css` maps shadcn's variables to the Figma tokens, so stock shadcn components follow brand and theme:

| shadcn | Figma token |
| --- | --- |
| `--background` / `--foreground` | `surface.page` / `text.default.body` |
| `--primary` / `--primary-foreground` | `surface.primary.default` / `text.primary.on-color` |
| `--card`, `--popover` | `surface.default` |
| `--secondary`, `--muted`, `--accent` | `surface.page-secondary`, `surface.secondary` |
| `--muted-foreground` | `text.default.placeholder` |
| `--destructive` | `surface.error.default` |
| `--border`, `--input` / `--ring` | `border.secondary` / `border.primary.focus` |
| `rounded-sm/md/lg` | `Border-Radius.100/200/300` |
| `font-sans` | `Font.primary` |

shadcn's `dark:` variant is tied to `data-theme="dark"`. Badge and Alert gain `information`, `success`
and `warning` variants backed by the status tokens.

To add more shadcn components, run `npx shadcn@latest add <name>`. They are themed automatically.
Check that new files import `cn` from `@/lib/utils`: the CLI once wrote `from "cn"` here.

**Tailwind utilities from tokens:** `bg-surface-primary-default`, `text-text-error-default`, `border-border-primary-focus`,
`p-inset-md`, `gap-gap-sm`, `py-layout-lg`, `text-h1` … `text-caption` (responsive). Avoid raw palette classes in components.

## Using it in React

```tsx
<ThemeProvider initialModes={{ brand: 'natural', theme: 'dark' }}>   {/* sets attributes on <html> */}
  <TooltipProvider>
    <App />
  </TooltipProvider>
</ThemeProvider>

const { modes, setMode } = useTheme();
setMode('brand', 'ocean');

// A section rendered in a different mode; any collection not listed inherits from the parent
<ThemeProvider scope="local" initialModes={{ theme: 'dark' }}>…</ThemeProvider>
```

## Scripts
- `npm run storybook` / `npm run build-storybook`: regenerate tokens, then run or build Storybook
- `npm run dev`: regenerates tokens, then starts the small Vite playground app
- `npm run build`: regenerates tokens, type-checks (including stories), builds
- `npm run tokens`: regenerates tokens only
