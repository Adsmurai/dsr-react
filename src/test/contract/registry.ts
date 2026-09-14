/**
 * One row per component that a consumer (or an AI code generator) actually
 * writes by hand. Drives the generic contract suites in ./contract.test.tsx,
 * so covering a new component is a few lines rather than a new test file.
 *
 * Radix sub-components (`DropdownMenuItem`, `SheetHeader`, …) are deliberately
 * absent: they cannot render outside their parent's context, and they are
 * plain pass-throughs that already forward `className`, `ref` and `...props`.
 */
import type { ComponentType } from 'react';
import * as ui from '@/components/ui';

/**
 * Where a consumer's `className` is expected to land.
 *
 * This is not a style preference — it records a real constraint. Only three
 * public DSR components accept `className` at all (`Icon`, `Container`,
 * `InputSearch`); everything else extends `BaseComponentProps`, which is just
 * `{ dataQa?, theme? }`. And `ButtonV2` accepts it but spreads the consumer's
 * value *after* its own computed classes, so forwarding it there would replace
 * DSR's styling outright.
 *
 * So `container` is the honest answer for most DSR-backed wrappers. Recording
 * it here means a change in that behaviour fails the suite instead of silently
 * moving a consumer's styles onto a different element.
 */
export type ClassNameTarget =
  /** Lands on the element that also carries DSR's own `e-*` class. */
  | 'dsr'
  /** Lands on a layout wrapper around the DSR element (DSR cannot take it). */
  | 'container'
  /** Lands on the component's real root (no DSR involved). */
  | 'root'
  /** Component exposes no `className` prop. */
  | 'unsupported';

export interface ContractRow {
  name: string;
  Component: ComponentType<Record<string, unknown>>;
  /** Minimum props needed to render without throwing. */
  props?: Record<string, unknown>;
  classNameTarget: ClassNameTarget;
  /** Component forwards a ref to a DOM node. */
  ref?: boolean;
  /**
   * Props extend an HTML attributes type, i.e. the component *promises*
   * arbitrary attribute passthrough (`id`, `data-*`, `aria-*`). Only these
   * are held to it — a component with a closed prop list is not lying by
   * ignoring `data-testid`, it simply never offered it.
   */
  attrs?: boolean;
  /** Accepts `children` and renders them as visible text. */
  children?: boolean;
  /** Why this row skips a suite, when it does. */
  notes?: string;
}

const c = (name: keyof typeof ui) => ui[name] as ComponentType<Record<string, unknown>>;

export const REGISTRY: ContractRow[] = [
  // ---- Forms & inputs
  { name: 'Button', Component: c('Button'), props: { children: 'Save' }, attrs: true, classNameTarget: 'container', ref: true, children: true },
  { name: 'Input', Component: c('Input'), props: { label: 'Name' }, attrs: true, classNameTarget: 'container', ref: true },
  { name: 'Textarea', Component: c('Textarea'), props: { label: 'Notes' }, attrs: true, classNameTarget: 'container', ref: true },
  { name: 'InputSearch', Component: c('InputSearch'), classNameTarget: 'container', notes: 'DSR accepts className but the wrapper keeps it; see Fase 5' },
  { name: 'Checkbox', Component: c('Checkbox'), props: { children: 'Accept' }, classNameTarget: 'container', children: true, notes: 'no ref: DSR CheckBox does not support one' },
  { name: 'Switch', Component: c('Switch'), classNameTarget: 'container', notes: 'no ref: DSR Switch does not support one' },
  { name: 'Select', Component: c('Select'), props: { label: 'Pick', options: [{ label: 'One', value: '1' }] }, classNameTarget: 'container', notes: 'SelectProps is a closed interface and Select is not a forwardRef — no passthrough promised' },
  { name: 'Slider', Component: c('Slider'), props: { value: [50] }, classNameTarget: 'container', ref: true },
  { name: 'Label', Component: c('Label'), props: { children: 'Field' }, attrs: true, classNameTarget: 'root', ref: true, children: true },
  { name: 'MultiTextField', Component: c('MultiTextField'), classNameTarget: 'container' },

  // ---- Display
  { name: 'Badge', Component: c('Badge'), props: { children: '3' }, attrs: true, classNameTarget: 'container', children: true },
  { name: 'Chip', Component: c('Chip'), props: { label: 'Tag' }, classNameTarget: 'container', notes: 'label is string-typed, so no children coercion is possible' },
  { name: 'StatusTag', Component: c('StatusTag'), props: { status: 'success' }, classNameTarget: 'container' },
  { name: 'Icon', Component: c('Icon'), props: { name: 'Add' }, classNameTarget: 'dsr', notes: 'DSR Icon merges className correctly — one of only three that do' },
  { name: 'Typography', Component: c('Typography'), props: { children: 'Text' }, classNameTarget: 'container', children: true },
  { name: 'Alert', Component: c('Alert'), props: { children: 'Heads up' }, attrs: true, classNameTarget: 'container', ref: true, children: true },
  { name: 'Progress', Component: c('Progress'), props: { value: 50 }, classNameTarget: 'container', ref: true },
  { name: 'Skeleton', Component: c('Skeleton'), attrs: true, classNameTarget: 'container' },
  { name: 'ProcessingIcon', Component: c('ProcessingIcon'), classNameTarget: 'unsupported', notes: 'declares className but never destructures it — see Fase 5' },

  // ---- Containers
  { name: 'Card', Component: c('Card'), props: { children: 'Body' }, attrs: true, classNameTarget: 'container', ref: true, children: true },
  { name: 'Separator', Component: c('Separator'), classNameTarget: 'container', ref: true },
  { name: 'Table', Component: c('Table'), props: { children: null }, classNameTarget: 'root', ref: true },
  { name: 'AspectRatio', Component: c('AspectRatio'), props: { ratio: 1, children: null }, classNameTarget: 'root' },
  { name: 'ScrollArea', Component: c('ScrollArea'), props: { children: 'Body' }, attrs: true, classNameTarget: 'root', ref: true, children: true },

  // ---- Feedback / misc
  { name: 'BaseMessage', Component: c('BaseMessage'), props: { children: 'Message' }, classNameTarget: 'container' },
  { name: 'Description', Component: c('Description'), props: { children: 'Detail' }, classNameTarget: 'unsupported', notes: 'DescriptionProps declares no className' },
  { name: 'TipItem', Component: c('TipItem'), props: { children: 'Tip' }, classNameTarget: 'container' },
  { name: 'Empty', Component: c('Empty'), props: { children: 'Nothing here' }, classNameTarget: 'container' },
  { name: 'NoResults', Component: c('NoResults'), classNameTarget: 'unsupported' },
  { name: 'Breadcrumbs', Component: c('Breadcrumbs'), props: { steps: [{ label: 'Home' }] }, classNameTarget: 'container' },
];
