import type { Meta, StoryObj } from '@storybook/react';
import { Button, Chip, Card, CardContent, Input, Typography } from '@/components/ui';
import tokens from '@/tailwind/tokens.json';

/**
 * Renders the generated token layer so a DS bump is visually reviewable.
 *
 * Everything here comes from `scripts/generate-tokens.mjs`, which compiles
 * `@adsmurai/design-system/scss`. If a swatch looks wrong, the mapping in that
 * script is wrong — these stories never hardcode a value.
 */
const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const SHADCN_TOKENS = Object.keys(tokens.shadcn) as Array<keyof typeof tokens.shadcn>;

function Swatch({ token }: { token: string }) {
  const dsKey = tokens.shadcn[token as keyof typeof tokens.shadcn];
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded border border-border"
        style={{ background: `hsl(var(--${token}))` }}
      />
      <div className="min-w-0">
        <div className="truncate text-sm text-foreground">--{token}</div>
        <div className="truncate text-xs text-muted-foreground">
          ${dsKey} · {tokens.ds[dsKey as keyof typeof tokens.ds]}
        </div>
      </div>
    </div>
  );
}

export const Colors: Story = {
  name: 'Colours (shadcn ← DS)',
  render: () => (
    <div className="bg-background p-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {SHADCN_TOKENS.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  name: 'Shadows (purple-tinted)',
  render: () => (
    <div className="bg-background p-10">
      <p className="mb-6 text-sm text-muted-foreground">
        Built from alphas of $brand-black ({tokens.ds['brand-black']}), so they carry a purple
        tint rather than neutral grey.
      </p>
      <div className="flex flex-wrap gap-8">
        {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
          <div
            key={s}
            className="flex h-24 w-40 items-center justify-center rounded-lg bg-popover"
            style={{ boxShadow: tokens.ds[`shadow-${s}` as keyof typeof tokens.ds] }}
          >
            <code className="text-xs text-muted-foreground">shadow-{s}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 bg-background p-10">
      {(['radius-2', 'radius-4', 'radius-8', 'radius-12', 'radius-16', 'radius-24'] as const).map(
        (r) => (
          <div key={r} className="text-center">
            <div
              className="mb-2 h-20 w-20 border border-border bg-accent"
              style={{ borderRadius: tokens.ds[r] }}
            />
            <code className="text-xs text-muted-foreground">
              ${r} · {tokens.ds[r]}
            </code>
          </div>
        ),
      )}
    </div>
  ),
};

/**
 * The DS breakpoints are NOT Tailwind's defaults — only `md: 768px` overlaps,
 * and it is shifted (DS `sm` equals Tailwind's default `md`). Switch the
 * Storybook viewport to each DS width and check that the label below changes
 * exactly at 576 / 768 / 992 / 1200 / 1440.
 */
export const Breakpoints: Story = {
  name: 'Breakpoints (DS, not Tailwind defaults)',
  render: () => (
    <div className="bg-background p-6">
      <table className="mb-6 text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="pr-8">Token</th>
            <th className="pr-8">DS</th>
            <th>Tailwind default</th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          {[
            ['xs', tokens.ds['bp-xs'], '—'],
            ['sm', tokens.ds['bp-sm'], '640px'],
            ['md', tokens.ds['bp-md'], '768px'],
            ['lg', tokens.ds['bp-lg'], '1024px'],
            ['xl', tokens.ds['bp-xl'], '1280px'],
          ].map(([t, ds, tw]) => (
            <tr key={t}>
              <td className="pr-8">
                <code>{t}</code>
              </td>
              <td className="pr-8">{ds}</td>
              <td className="text-muted-foreground">{tw}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rounded-lg border border-border p-4">
        <span className="xs:hidden text-foreground">below xs (&lt; 576)</span>
        <span className="hidden xs:inline sm:hidden text-foreground">xs — 576 to 767</span>
        <span className="hidden sm:inline md:hidden text-foreground">sm — 768 to 991</span>
        <span className="hidden md:inline lg:hidden text-foreground">md — 992 to 1199</span>
        <span className="hidden lg:inline xl:hidden text-foreground">lg — 1200 to 1439</span>
        <span className="hidden xl:inline text-foreground">xl — 1440 and up</span>
      </div>
    </div>
  ),
};

/**
 * The three style layers together: DSR's own `.e-*` CSS (Button, Chip, Input),
 * the shadcn token layer (Card, surfaces), and Tailwind utilities resolving
 * against the tokens. If any layer is missing, this story looks wrong.
 */
export const AllLayers: Story = {
  name: 'All three layers together',
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <Typography variant="h5">Style contract</Typography>
      <Card className="mt-4 max-w-md">
        <CardContent className="space-y-4 p-6">
          <Input label="Campaign name" />
          <div className="flex flex-wrap gap-2">
            <Chip variant="status" status="success" label="Active" />
            <Chip variant="status" status="warning" label="Review" />
            <Chip variant="colorful" color="purple-light" label="UX" />
          </div>
          <div className="flex gap-2">
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
          </div>
          <p className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
            This surface uses <code>bg-muted</code> / <code>text-muted-foreground</code>, which
            only resolve when the token layer is loaded.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
