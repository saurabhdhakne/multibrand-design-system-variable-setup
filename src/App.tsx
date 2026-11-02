import { Badge } from './components/Badge';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
import { modeCollections, tokens, type ModeCollectionKey, type TokenName } from './tokens';
import './App.css';

const collectionKeys = Object.keys(modeCollections) as ModeCollectionKey[];

function ModeSwitcher() {
  const { modes, setMode } = useTheme();
  return (
    <div className="switcher">
      {collectionKeys.map((key) => {
        const c = modeCollections[key];
        return (
          <label key={key}>
            <span>{c.name}</span>
            <select value={modes[key]} onChange={(e) => setMode(key, e.target.value as never)}>
              {Object.entries(c.modes).map(([slug, label]) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );
}

function Showcase({ title }: { title: string }) {
  return (
    <Card>
      <h3 className="h5">{title}</h3>
      <p className="caption">Components only use semantic tokens, so they follow every brand and theme.</p>
      <div className="row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="error">Delete</Button>
      </div>
      <div className="row">
        <Badge status="information">Information</Badge>
        <Badge status="success">Success</Badge>
        <Badge status="warning">Warning</Badge>
        <Badge status="error">Error</Badge>
      </div>
    </Card>
  );
}

function Typography() {
  return (
    <Card>
      <p className="caption">Responsive collection: resize below 768px to switch Desktop → Mobile</p>
      <h1 className="h1">Heading 1</h1>
      <h2 className="h2">Heading 2</h2>
      <h3 className="h3">Heading 3</h3>
      <p className="body-lg">Body large: the quick brown fox jumps over the lazy dog.</p>
      <p>Body: the quick brown fox jumps over the lazy dog.</p>
    </Card>
  );
}

function TokenGallery() {
  const byCollection = new Map<string, TokenName[]>();
  for (const name of Object.keys(tokens) as TokenName[]) {
    const c = tokens[name].collection;
    byCollection.set(c, [...(byCollection.get(c) ?? []), name]);
  }
  return (
    <>
      {[...byCollection].map(([collection, names]) => (
        <section key={collection}>
          <h2 className="h4">{collection}</h2>
          <div className="gallery">
            {names.map((name) => {
              const t = tokens[name];
              return (
                <div key={name} className="token">
                  {t.type === 'color' && <div className="swatch" style={{ background: t.var }} />}
                  <code>{name}</code>
                  <small className="caption">{t.cssName}</small>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

export function App() {
  return (
    <main className="page">
      <header className="header">
        <h1 className="h3">Multibrand Design System</h1>
        <ModeSwitcher />
      </header>

      <div className="grid">
        <Showcase title="Follows the switcher" />
        <ThemeProvider scope="local" initialModes={{ theme: 'dark' }}>
          <Showcase title="Nested scope: Theme locked to Dark" />
        </ThemeProvider>
      </div>

      <div className="grid">
        <Typography />
      </div>

      <TokenGallery />
    </main>
  );
}
