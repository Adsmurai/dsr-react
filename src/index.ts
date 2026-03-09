/**
 * @adsmurai/dsr-react
 *
 * Adsmurai Design System React - UI component library
 * wrapping DSR components with standardized React APIs.
 *
 * @example
 * ```tsx
 * import { Button, Card, Input, useIsMobile } from '@adsmurai/dsr-react';
 * ```
 */

// Re-export all UI components
export * from './components/ui';

// Re-export hooks
export { useIsMobile } from './hooks/use-mobile';
export {
  useCopyToClipboard,
  type UseCopyToClipboardOptions,
  type UseCopyToClipboardResult,
} from './hooks/use-copy-to-clipboard';

// Re-export utilities
export { cn } from './lib/utils';
