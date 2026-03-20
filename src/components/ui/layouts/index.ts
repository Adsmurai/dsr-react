/**
 * @fileoverview Pre-configured layout components
 *
 * @description
 * Ready-to-use layouts built on HeaderMenuTemplateV2.
 * Each layout is a thin wrapper that handles the compositional API
 * so you only need to pass props.
 *
 * @example
 * ```tsx
 * import { SimpleLayout, DashboardLayout, MultiSectionLayout } from 'adsmurai-dsr-react';
 * ```
 */

export { SimpleLayout } from './simple-layout';
export type { SimpleLayoutProps } from './simple-layout';

export { DashboardLayout } from './dashboard-layout';
export type { DashboardLayoutProps } from './dashboard-layout';

export { MultiSectionLayout } from './multi-section-layout';
export type { MultiSectionLayoutProps } from './multi-section-layout';

export { CustomLayout } from './custom-layout';
export type { CustomLayoutProps, SidebarType } from './custom-layout';

// Shared defaults (useful for customizing layouts)
export {
  defaultHomeLinks,
  defaultUserMenuSections,
  defaultUser,
  defaultIsSelected,
  resolveUser,
} from './layout-defaults';
export type { LayoutUser } from './layout-defaults';
