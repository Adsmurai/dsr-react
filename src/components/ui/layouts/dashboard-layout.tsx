/**
 * @fileoverview DashboardLayout - Pre-configured layout with icon sidebar
 *
 * @description
 * Ready-to-use dashboard layout using HeaderMenuTemplateV2 with SidebarNav.
 * Ideal for dashboards, admin panels, and data-heavy applications.
 *
 * @example
 * ```tsx
 * import { DashboardLayout } from '@adsmurai/dsr-react';
 * import { IconsEnum } from '@adsmurai/dsr-react/enums';
 *
 * const sidebarOptions = [
 *   { name: 'Home', icon: IconsEnum.Home, to: '/', linkVariant: 'full' },
 *   { name: 'Dashboard', icon: IconsEnum.Dashboard, to: '/dashboard', linkVariant: 'full' },
 *   { name: 'Settings', icon: IconsEnum.Settings, to: '/settings', linkVariant: 'full', isBottom: true },
 * ];
 *
 * <DashboardLayout sidebarOptions={sidebarOptions}>
 *   <div>Page content</div>
 * </DashboardLayout>
 * ```
 */

import React from 'react';
import { HeaderMenuTemplateV2 } from '../header-menu';
import type { HeaderMenuV2SidebarNavOption, LinksSection } from '../header-menu';
import {
  defaultHomeLinks,
  defaultUserMenuSections,
  resolveUser,
  type LayoutUser,
} from './layout-defaults';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarOptions: HeaderMenuV2SidebarNavOption[];
  user?: LayoutUser | null;
  userMenuSections?: LinksSection[];
  homeLinks?: LinksSection[];
  showBrandName?: boolean;
  LinkComponent?: React.ComponentType<any>;
  isActive?: (to: string) => boolean;
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarOptions,
  user,
  userMenuSections = defaultUserMenuSections,
  homeLinks = defaultHomeLinks,
  showBrandName = false,
  LinkComponent,
  isActive,
  onLogout,
}) => {
  const displayUser = resolveUser(user);

  return (
    <HeaderMenuTemplateV2>
      <HeaderMenuTemplateV2.TopBar>
        <HeaderMenuTemplateV2.Start>
          <HeaderMenuTemplateV2.Logo homeLinks={homeLinks} showBrandName={showBrandName} />
        </HeaderMenuTemplateV2.Start>
        <HeaderMenuTemplateV2.MiddleSlot>
          <div className="h-[66px]" />
        </HeaderMenuTemplateV2.MiddleSlot>
        <HeaderMenuTemplateV2.Options>
          {displayUser && (
            <HeaderMenuTemplateV2.User
              firstName={displayUser.firstName}
              lastName={displayUser.lastName}
              email={displayUser.email}
              pictureUrl={displayUser.pictureUrl}
              menuSections={userMenuSections}
              onLogout={onLogout}
            />
          )}
        </HeaderMenuTemplateV2.Options>
      </HeaderMenuTemplateV2.TopBar>
      <HeaderMenuTemplateV2.Content>
        <HeaderMenuTemplateV2.SidebarNav options={sidebarOptions} LinkComponent={LinkComponent} isActive={isActive} />
        <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
      </HeaderMenuTemplateV2.Content>
    </HeaderMenuTemplateV2>
  );
};
