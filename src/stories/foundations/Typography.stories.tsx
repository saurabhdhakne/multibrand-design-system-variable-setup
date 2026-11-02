import type { Meta, StoryObj } from '@storybook/react-vite';

const scale = [
  { className: 'text-h1', label: 'Heading 1', token: 'Font.Heading.H1' },
  { className: 'text-h2', label: 'Heading 2', token: 'Font.Heading.H2' },
  { className: 'text-h3', label: 'Heading 3', token: 'Font.Heading.H3' },
  { className: 'text-h4', label: 'Heading 4', token: 'Font.Heading.H4' },
  { className: 'text-h5', label: 'Heading 5', token: 'Font.Heading.H5' },
  { className: 'text-h6', label: 'Heading 6', token: 'Font.Heading.H6' },
  { className: 'text-body-lg', label: 'Body large', token: 'Font.Copy.body-lg' },
  { className: 'text-body', label: 'Body', token: 'Font.Copy.body' },
  { className: 'text-body-sm', label: 'Body small', token: 'Font.Copy.body-sm' },
  { className: 'text-caption', label: 'Caption', token: 'Font.Copy.caption' },
];

function TypeScale() {
  return (
    <div className="grid gap-gap-md">
      <p className="text-caption text-muted-foreground">
        Sizes come from the Figma Responsive collection. Switch the viewport to Mobile (Figma 440) to see them change.
      </p>
      {scale.map((s) => (
        <div key={s.className} className="grid gap-gap-xs border-b pb-gap-sm md:grid-cols-[200px_1fr] md:items-baseline">
          <div className="grid">
            <code className="text-caption">{s.className}</code>
            <small className="text-caption text-muted-foreground">{s.token}</small>
          </div>
          <span className={`${s.className} ${s.className.startsWith('text-h') ? 'font-bold text-text-default-heading' : ''}`}>
            {s.label}: The quick brown fox
          </span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: TypeScale,
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof TypeScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
