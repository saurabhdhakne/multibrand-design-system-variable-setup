import type { Decorator, Preview } from '@storybook/react-vite';
import { TooltipProvider } from '@/components/atoms';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { modeCollections, type ModeCollectionKey, type ModeSelection } from '@/tokens';
import '../src/index.css';

const collectionKeys = Object.keys(modeCollections) as ModeCollectionKey[];

// Wraps every story in the Figma modes picked in the toolbar. Keyed so a toolbar change resets the provider.
// On Docs pages each story gets its own themed surface, since the docs page itself stays white.
const withFigmaModes: Decorator = (Story, { globals, viewMode }) => {
  const modes = Object.fromEntries(collectionKeys.map((k) => [k, globals[k]])) as ModeSelection;
  return (
    <ThemeProvider key={JSON.stringify(modes)} initialModes={modes}>
      <TooltipProvider>
        {viewMode === 'docs' ? (
          <div className="rounded-md bg-background p-inset-md text-foreground">
            <Story />
          </div>
        ) : (
          <Story />
        )}
      </TooltipProvider>
    </ThemeProvider>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withFigmaModes],

  // One toolbar menu per switchable Figma collection (Brand, Theme), generated from the token export.
  globalTypes: Object.fromEntries(
    collectionKeys.map((key) => {
      const c = modeCollections[key];
      return [
        key,
        {
          description: `Figma "${c.name}" collection`,
          toolbar: {
            title: c.name,
            icon: key === 'theme' ? 'mirror' : 'paintbrush',
            items: Object.entries(c.modes).map(([value, title]) => ({ value, title })),
            dynamicTitle: true,
          },
        },
      ];
    }),
  ),
  initialGlobals: Object.fromEntries(collectionKeys.map((k) => [k, modeCollections[k].defaultMode])),

  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    // The Responsive collection switches by media query, so the viewport toolbar previews it.
    viewport: {
      options: {
        mobile: { name: 'Mobile (Figma 440)', styles: { width: '440px', height: '900px' }, type: 'mobile' },
        desktop: { name: 'Desktop (Figma 1440)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
    },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Atoms', 'Molecules', 'Organisms'] },
    },
  },
};

export default preview;
