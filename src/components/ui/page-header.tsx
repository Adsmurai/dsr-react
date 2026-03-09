/**
 * PageHeader wrapper component
 *
 * Page header with title, description, breadcrumbs (using DSR Breadcrumbs), and actions.
 *
 * @example
 * // Basic usage
 * <PageHeader
 *   title="Dashboard"
 *   description="Overview of your data"
 *   breadcrumbs={[{ title: 'Home', url: '/' }, { title: 'Dashboard' }]}
 *   actions={() => <Button>Add New</Button>}
 * >
 *   <div>Page content here</div>
 * </PageHeader>
 *
 * @example
 * // With React Router
 * import { Link } from 'react-router-dom';
 *
 * <PageHeader
 *   title="Settings"
 *   breadcrumbs={[{ title: 'Home', url: '/' }, { title: 'Settings' }]}
 *   renderBreadcrumbLink={(url, children) => <Link to={url}>{children}</Link>}
 * >
 *   <div>Settings content</div>
 * </PageHeader>
 */
import * as React from 'react';
import { Typography } from './typography';
import { Breadcrumbs, type BreadcrumbStep } from './breadcrumbs';

/** @deprecated Use BreadcrumbStep from breadcrumbs instead */
export type PageHeaderBreadcrumb = BreadcrumbStep;

export interface PageHeaderProps {
  /** Page content */
  children: React.ReactNode;
  /** Page title */
  title?: string | React.ReactNode;
  /** Page description */
  description?: string;
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbStep[];
  /** Custom render function for breadcrumb links (for SPA navigation like React Router) */
  renderBreadcrumbLink?: (url: string, children: React.ReactNode) => React.ReactElement;
  /** Render function for action buttons */
  actions?: () => React.ReactNode;
  /** Show divider below header */
  withDivider?: boolean;
  /** Optional className */
  className?: string;
}

/**
 * PageHeader component
 *
 * Provides a consistent page header with title, DSR breadcrumbs, and actions.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  title,
  description,
  breadcrumbs,
  renderBreadcrumbLink,
  actions,
  withDivider = true,
  className,
}) => {
  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumbs steps={breadcrumbs} renderLink={renderBreadcrumbLink} />
          </div>
        )}

        {/* Title and Actions Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {title && (
              <Typography variant="h4" weight="bold">
                {title}
              </Typography>
            )}
            {description && (
              <div className="mt-1">
                <Typography variant="body2" intensity="medium">
                  {description}
                </Typography>
              </div>
            )}
          </div>
          
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions()}
            </div>
          )}
        </div>

        {/* Divider */}
        {withDivider && (
          <hr className="mt-6 border-t border-border" />
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

PageHeader.displayName = 'PageHeader';

export default PageHeader;
