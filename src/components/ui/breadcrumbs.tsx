/**
 * @fileoverview Breadcrumbs wrapper component for DSR Breadcrumbs
 *
 * @description
 * DSR Breadcrumbs displays a hierarchical navigation path.
 * Supports native links and custom render functions for SPA navigation.
 *
 * @when_to_use
 * - Show user location in the site hierarchy
 * - Secondary navigation
 * - Page context
 *
 * @when_not_to_use
 * - For main navigation -> use Navigation/Menu
 * - For process steps -> use Stepper
 *
 * @example
 * ```tsx
 * // Basic
 * <Breadcrumbs
 *   steps={[
 *     { title: 'Home', url: '/' },
 *     { title: 'Products', url: '/products' },
 *     { title: 'Details' }
 *   ]}
 * />
 *
 * // With React Router
 * import { Link } from 'react-router-dom';
 *
 * <Breadcrumbs
 *   steps={[
 *     { title: 'Home', url: '/' },
 *     { title: 'Dashboard', url: '/dashboard' },
 *     { title: 'Settings' }
 *   ]}
 *   renderLink={(url, children) => <Link to={url}>{children}</Link>}
 * />
 *
 * // With icons on home
 * <Breadcrumbs
 *   steps={[
 *     { title: 'Home', url: '/', icon: 'Home' },
 *     { title: 'Settings', url: '/settings' },
 *     { title: 'Profile' }
 *   ]}
 * />
 * ```
 */
import * as React from 'react';
import { Breadcrumbs as DSRBreadcrumbs } from '@adsmurai/design-system-react';

export interface BreadcrumbStep {
  /** Display title */
  title: string;
  /** Optional URL - if not provided, renders as text (current page) */
  url?: string;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb steps */
  steps: BreadcrumbStep[];
  /** Custom render function for links (for SPA navigation like React Router) */
  renderLink?: (url: string, children: React.ReactNode) => React.ReactElement;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Optional className for wrapper */
  className?: string;
}

/**
 * Breadcrumbs component - wrapper for DSR Breadcrumbs
 * 
 * Provides navigation trail showing the user's location in the app hierarchy.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  steps,
  renderLink,
  dataQa,
  className,
}) => {
  // Transform steps to DSR format
  const dsrSteps = steps.map((step) => ({
    title: step.title,
    url: step.url,
    // DSR expects renderLink with { content } props if custom navigation is needed
    renderLink: renderLink && step.url 
      ? (props: { content: React.ReactNode }) => renderLink(step.url!, props.content)
      : undefined,
  }));

  return (
    <div className={className}>
      <DSRBreadcrumbs 
        steps={dsrSteps}
        dataQa={dataQa}
      />
    </div>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
