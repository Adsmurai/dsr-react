/**
 * Generic contract suites over the registry.
 *
 * These are the assertions the previous 66 hand-written tests could not make —
 * two of those tests actually encoded a bug as the specification, asserting
 * that a consumer's `className` had landed on a wrapper element.
 *
 * What each suite protects against:
 *
 *   renders          a component that returns `null` for a valid call
 *                    (TooltipContent and DialogOverlay both do today)
 *   className        a consumer's class silently vanishing, or moving to a
 *                    different element than the one it lands on today
 *   data attributes  `data-testid` / `id` being accepted by the types and
 *                    dropped at runtime, which breaks every test selector
 *   ref              `forwardRef` declared and never attached, so
 *                    `ref.current` stays null forever
 *   text             children coerced into "[object Object]", the literal
 *                    string "undefined", or nothing at all
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { createRef } from 'react';
import { REGISTRY } from './registry';

afterEach(cleanup);

const rows = REGISTRY.map((r) => [r.name, r] as const);

/** DSR renders its own `e-`-prefixed classes on every component it owns. */
const hasDsrClass = (el: Element) => /(^|\s)e-[a-z]/.test(el.getAttribute('class') ?? '');

/**
 * True when the element sits inside the design system's own markup.
 *
 * Not "is the same node": DSR merges `className` onto whichever element owns
 * the visual, which can be nested — `Icon` puts it on the inner `<i>` while
 * `e-icon` is on the wrapping div. What distinguishes a real forward from a
 * dropped one is whether the class reached DSR's tree at all, or stopped at a
 * layout box we added around it.
 */
const insideDsrTree = (el: Element, container: Element) => {
  for (let node: Element | null = el; node && node !== container; node = node.parentElement) {
    if (hasDsrClass(node)) return true;
  }
  return false;
};

describe('contract: renders', () => {
  it.each(rows)('%s renders a DOM node', (_name, row) => {
    const { container } = render(<row.Component {...row.props} />);
    expect(container.querySelector('*')).not.toBeNull();
  });

  it.each(rows)('%s renders without console errors', (_name, row) => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<row.Component {...row.props} />);
    // DSR itself emits a forwardRef warning; only fail on anything else.
    const unexpected = spy.mock.calls.filter(
      (args) => !String(args[0]).includes('forwardRef render functions'),
    );
    spy.mockRestore();
    expect(unexpected).toEqual([]);
  });
});

describe('contract: className', () => {
  const supported = rows.filter(([, r]) => r.classNameTarget !== 'unsupported');

  it.each(supported)('%s puts className on a real element', (_name, row) => {
    const { container } = render(<row.Component {...row.props} className="dsr-probe" />);
    const probe = container.querySelector('.dsr-probe');
    expect(probe, 'className was accepted by the types but reached no element').not.toBeNull();
  });

  it.each(supported.filter(([, r]) => r.classNameTarget === 'dsr'))(
    '%s forwards className into the design system markup',
    (_name, row) => {
      const { container } = render(<row.Component {...row.props} className="dsr-probe" />);
      const probe = container.querySelector('.dsr-probe')!;
      expect(
        insideDsrTree(probe, container),
        'className stopped outside the DSR markup',
      ).toBe(true);
    },
  );

  it.each(supported.filter(([, r]) => r.classNameTarget === 'container'))(
    '%s keeps className on the wrapper (DSR cannot accept it)',
    (_name, row) => {
      const { container } = render(<row.Component {...row.props} className="dsr-probe" />);
      const probe = container.querySelector('.dsr-probe')!;
      // Pinned deliberately. DSR cannot take `className` on these, so the
      // wrapper is the only target available. If one ever starts forwarding
      // it inward, that changes rendering for every consumer who wrote
      // `className="mt-4"` — it should be a conscious edit, not a surprise.
      expect(insideDsrTree(probe, container)).toBe(false);
    },
  );
});

describe('contract: attribute passthrough', () => {
  // Only components whose props extend an HTML attributes type. A closed prop
  // list that ignores `data-testid` never promised it in the first place.
  const promising = rows.filter(([, r]) => r.attrs);

  it.each(promising)('%s forwards data-testid', (_name, row) => {
    const { container } = render(<row.Component {...row.props} data-testid="probe" />);
    expect(
      container.querySelector('[data-testid="probe"]'),
      'props extend an HTML attributes type, so data-testid must reach the DOM',
    ).not.toBeNull();
  });

  it.each(promising)('%s forwards id', (_name, row) => {
    const { container } = render(<row.Component {...row.props} id="probe-id" />);
    expect(container.querySelector('#probe-id')).not.toBeNull();
  });
});

describe('contract: ref', () => {
  const refRows = rows.filter(([, r]) => r.ref);

  it.each(refRows)('%s attaches its forwarded ref to a DOM node', (_name, row) => {
    const ref = createRef<HTMLElement>();
    render(<row.Component {...row.props} ref={ref} />);
    expect(
      ref.current,
      'forwardRef is declared but the ref never reaches a DOM node',
    ).toBeInstanceOf(Element);
  });
});

describe('contract: text is never garbage', () => {
  const GARBAGE = /\[object Object\]|\bundefined\b|\bNaN\b/;

  it.each(rows.filter(([, r]) => r.children))(
    '%s renders JSX children as readable text',
    (_name, row) => {
      const { container } = render(
        <row.Component {...row.props} children={<><b>Alpha</b> beta</>} />,
      );
      const text = container.textContent ?? '';
      expect(text, `rendered garbage instead of the children: "${text}"`).not.toMatch(GARBAGE);
      expect(text.length, 'children rendered as nothing at all').toBeGreaterThan(0);
    },
  );

  it.each(rows.filter(([, r]) => r.children))(
    '%s renders interpolated children as readable text',
    (_name, row) => {
      // `<Button>Save {2}</Button>` — children arrives as an array. This is the
      // single most common thing a code generator writes.
      const count = 2;
      const { container } = render(
        <row.Component {...row.props} children={['Save ', count]} />,
      );
      const text = container.textContent ?? '';
      expect(text, `rendered garbage instead of the children: "${text}"`).not.toMatch(GARBAGE);
      expect(text).toContain('Save');
    },
  );

  it.each(rows)('%s renders no stray "undefined" with minimal props', (_name, row) => {
    const { container } = render(<row.Component {...row.props} />);
    expect(container.textContent ?? '').not.toMatch(/\bundefined\b/);
  });
});
