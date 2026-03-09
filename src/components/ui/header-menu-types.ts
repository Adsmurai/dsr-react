/**
 * @fileoverview Types and helpers for HeaderMenuTemplateV2
 * 
 * @description
 * Provides simplified types and utility functions for creating
 * navigation links and sections used in HeaderMenuTemplateV2.
 */

import { IconsEnum, BadgeColorEnum } from '@adsmurai/design-system-react';

// ============================================
// Link Types (for LeftMenu, Tabs, User Menu)
// ============================================

/**
 * Individual navigation link
 * Used in: LeftMenu sections, Tabs, User menu
 */
export interface HeaderMenuLink {
  /** Unique identifier */
  id: string;
  /** Display text */
  title: string;
  /** Navigation URL */
  url: string;
  /** Link target: '' for same tab, '_blank' for new tab */
  target?: string;
  /** Category/section identifier */
  section?: string;
  /** Optional icon from IconsEnum */
  icon?: IconsEnum | null;
  /** Alternative text (usually null) */
  alt?: string | null;
  /** Badge configuration */
  badge?: {
    title: string;
    color: BadgeColorEnum;
  };
  /** Whether link is disabled */
  disabled?: boolean;
  /** Danger styling (e.g., for Logout) */
  isDanger?: boolean;
  /** Custom render function for SPA navigation */
  renderLink?: (props: { children: React.ReactNode; className: string }) => React.ReactNode;
}

/**
 * Section containing multiple links
 * Used in: LeftMenu, User menu
 */
export interface HeaderMenuSection {
  /** Unique section identifier */
  id: string;
  /** Section title (optional, shown as header) */
  title?: string;
  /** Links in this section */
  links: HeaderMenuLink[];
  /** Whether section is collapsable */
  collapsable?: boolean;
}

// ============================================
// SidebarNav Types
// ============================================

/**
 * SidebarNav option (icon-based navigation)
 * Simplified version of HeaderMenuV2SidebarNavOption
 */
export interface SidebarNavOption {
  /** Name (shown as tooltip) */
  name: string;
  /** Icon to display */
  icon?: IconsEnum;
  
  // Navigation (SPA)
  /** Route path for SPA navigation */
  to?: string;
  /** Visual variant: 'compact' (default) or 'full' (recommended) */
  linkVariant?: 'compact' | 'full';
  
  // State
  /** Manual selection override */
  isSelected?: boolean;
  /** Disable the option */
  isDisabled?: boolean;
  /** Position at bottom of sidebar */
  isBottom?: boolean;
  
  // Interaction
  /** Click handler for custom actions */
  onClick?: () => void;
  /** Traditional link (external) */
  href?: string;
  
  // Extras
  /** Show tooltip */
  hasTooltip?: boolean;
  /** Badge counter */
  badgeLabel?: string;
  /** Submenu actions */
  actions?: Array<{
    title: string;
    onClick?: () => void;
  }>;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Creates a link with DSR-compatible format
 * Fills in default values for required but often-unused props
 */
export const createLink = (link: Partial<HeaderMenuLink> & { id: string; title: string; url: string }): HeaderMenuLink => ({
  target: '',
  section: 'nav',
  icon: null,
  alt: null,
  ...link,
});

/**
 * Creates a section with links
 */
export const createSection = (
  id: string, 
  title: string | undefined, 
  links: HeaderMenuLink[]
): HeaderMenuSection => ({
  id,
  title,
  links,
});

/**
 * Creates home links for Logo component
 */
export const createHomeLinks = (url: string = '/'): HeaderMenuLink[] => [
  createLink({ id: 'home', title: 'Home', url }),
];

/**
 * Creates a SidebarNav option with common defaults
 */
export const createSidebarOption = (
  name: string,
  icon: IconsEnum,
  options: Partial<SidebarNavOption> = {}
): SidebarNavOption => ({
  name,
  icon,
  linkVariant: 'full', // Recommended for better UX
  ...options,
});

/**
 * Creates a standard user menu with Profile, Settings, and Logout
 */
export const createUserMenu = (options?: {
  profileUrl?: string;
  settingsUrl?: string;
  logoutUrl?: string;
}): HeaderMenuSection[] => [
  createSection('user-menu', '', [
    createLink({ id: 'profile', title: 'My Profile', url: options?.profileUrl || '/profile', icon: IconsEnum.Person }),
    createLink({ id: 'settings', title: 'Settings', url: options?.settingsUrl || '/settings', icon: IconsEnum.Settings }),
    createLink({ id: 'logout', title: 'Logout', url: options?.logoutUrl || '/logout', icon: IconsEnum.Logout, isDanger: true }),
  ]),
];

// ============================================
// Pattern Selection Helper
// ============================================

export type HeaderMenuPattern = 'simple' | 'dashboard' | 'multi-section';

/**
 * Describes when to use each pattern
 * Note: needsContent replaces old needsIsFixed (removed in DSR 9.93.0)
 */
export const patternGuide: Record<HeaderMenuPattern, {
  description: string;
  useCases: string[];
  menuType: 'none' | 'SidebarNav' | 'LeftMenu';
  needsContent: boolean;
}> = {
  simple: {
    description: 'Floating header without sidebar',
    useCases: ['Landing pages', 'Wizards', 'Onboarding', 'Apps with few sections'],
    menuType: 'none',
    needsContent: false,
  },
  dashboard: {
    description: 'Header with icon Sidebar (72px)',
    useCases: ['Dashboards', 'Admin panels', 'Data-heavy apps', 'Compact navigation'],
    menuType: 'SidebarNav',
    needsContent: true,
  },
  'multi-section': {
    description: 'Header with text side menu (240px)',
    useCases: ['CMS', 'Documentation', 'Complex settings', 'Hierarchical navigation'],
    menuType: 'LeftMenu',
    needsContent: true,
  },
};
