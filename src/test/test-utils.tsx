import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Wrapper with necessary providers for testing.
 * Add providers here as needed (e.g., ThemeProvider, TooltipProvider).
 */
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Custom render function that wraps components with necessary providers.
 */
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with our custom version
export { customRender as render };
