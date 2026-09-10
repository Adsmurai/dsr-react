import * as React from 'react';

/**
 * Flattens a React node into plain text for the DSR components that only
 * accept a string (`ButtonV2.label`, `Badge.children`, DSR `Tab`, `Tooltip.title`).
 *
 * Replaces the `String(children)` / `typeof children === 'string' ? … : ''`
 * patterns, both of which fail destructively:
 *
 *   `<Button>Save {count}</Button>`  children is an array, so the old
 *                                    empty-string fallback rendered an
 *                                    **invisible** button
 *   `<Badge />`                      `String(undefined)` rendered the literal
 *                                    text "undefined"
 *   `<TabsTrigger><Icon/>Home</…>`   `String(element)` rendered "[object Object]"
 *
 * Strings, numbers and arrays of them flatten correctly. Elements cannot be
 * represented as text, so their own children are used and a dev warning points
 * at the icon props that exist for this.
 *
 * @returns the flattened text, or `undefined` when there is nothing to render
 *          (so callers can omit the prop instead of passing "undefined")
 */
export function toText(node: React.ReactNode): string | undefined {
  const parts: string[] = [];
  let sawElement = false;

  const walk = (n: React.ReactNode): void => {
    if (n === null || n === undefined || typeof n === 'boolean') return;
    if (typeof n === 'string' || typeof n === 'number') {
      parts.push(String(n));
      return;
    }
    if (Array.isArray(n)) {
      n.forEach(walk);
      return;
    }
    if (React.isValidElement(n)) {
      sawElement = true;
      walk((n.props as { children?: React.ReactNode }).children);
      return;
    }
  };

  walk(node);

  if (sawElement && process.env.NODE_ENV === 'development') {
    console.warn(
      '[dsr-react] JSX children were flattened to text because the underlying ' +
        'design-system component only accepts a string. Use the icon props ' +
        '(startIcon/endIcon/leadingIcon) for icons, or a component that takes ' +
        'children, such as Card or Typography.',
    );
  }

  const text = parts.join('');
  return text.length > 0 ? text : undefined;
}
