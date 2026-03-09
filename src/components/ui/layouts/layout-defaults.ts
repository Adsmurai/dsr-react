/**
 * @fileoverview Shared defaults for layout components
 *
 * @description
 * Common default values used across SimpleLayout, DashboardLayout,
 * MultiSectionLayout, and CustomLayout to avoid duplication.
 */

import { IconsEnum } from '@adsmurai/design-system-react';
import type { LinksSection, IsSelectedFn } from '../header-menu';

/** User shape accepted by all layouts */
export interface LayoutUser {
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl?: string;
}

/** Default home links for the logo area */
export const defaultHomeLinks: LinksSection[] = [
  {
    id: 'home',
    title: 'Home',
    links: [{
      id: 'home-link',
      title: 'Home',
      url: '/',
      target: '',
      section: 'home',
      icon: null,
      alt: null,
    }],
  },
];

/** Default user menu with Profile, Settings, and Logout */
export const defaultUserMenuSections: LinksSection[] = [
  {
    id: 'user-menu',
    title: '',
    links: [
      { id: 'profile', title: 'My Profile', url: '/profile', target: '', section: 'user', icon: IconsEnum.Person, alt: null },
      { id: 'settings', title: 'Settings', url: '/settings', target: '', section: 'user', icon: IconsEnum.Settings, alt: null },
      { id: 'logout', title: 'Logout', url: '/logout', target: '', section: 'user', icon: IconsEnum.Logout, alt: null, isDanger: true },
    ],
  },
];

/** Default user placeholder */
export const defaultUser: LayoutUser = {
  firstName: 'User',
  lastName: '',
  email: 'user@example.com',
};

/** Default isSelected function based on window.location.pathname */
export const defaultIsSelected: IsSelectedFn = (link) => {
  if (typeof window !== 'undefined') {
    return link.url === window.location.pathname;
  }
  return false;
};

/**
 * Resolves user prop: null means no user, undefined means use default
 */
export const resolveUser = (user: LayoutUser | null | undefined): LayoutUser | null => {
  return user === null ? null : (user ?? defaultUser);
};
