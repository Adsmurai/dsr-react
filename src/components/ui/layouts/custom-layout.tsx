/**
 * @fileoverview CustomLayout - Fully configurable layout
 *
 * @description
 * Flexible layout using HeaderMenuTemplateV2 that can be configured
 * to behave like Simple, Dashboard, or MultiSection layouts.
 * Supports all header options: tabs, helpers, organizations, user.
 *
 * @example
 * ```tsx
 * import { CustomLayout } from '@adsmurai/dsr-react';
 *
 * // As a dashboard with organizations
 * <CustomLayout
 *   sidebarType="icons"
 *   sidebarOptions={sidebarOptions}
 *   organizations={orgSections}
 *   activeOrgId="org-1"
 *   activeOrgName="Acme Corp"
 *   user={userData}
 * >
 *   <div>Page content</div>
 * </CustomLayout>
 * ```
 */

import React from 'react';
import { HeaderMenuTemplateV2 } from '../header-menu';
import type { LinksSection, IsSelectedFn, HeaderMenuV2SidebarNavOption } from '../header-menu';
import {
  defaultHomeLinks,
  defaultUserMenuSections,
  defaultIsSelected,
  resolveUser,
  type LayoutUser,
} from './layout-defaults';

export type SidebarType = 'none' | 'icons' | 'text';

export interface CustomLayoutProps {
  children: React.ReactNode;

  // Sidebar configuration
  sidebarType?: SidebarType;
  sidebarOptions?: HeaderMenuV2SidebarNavOption[];
  leftMenuSections?: LinksSection[];
  scrollable?: boolean;

  // Header - Logo
  homeLinks?: LinksSection[];
  showBrandName?: boolean;

  // Header - Tabs (center)
  tabs?: LinksSection[];
  isSelected?: IsSelectedFn;

  // Header - Options (right side)
  helpers?: LinksSection[];
  organizations?: LinksSection[];
  activeOrgId?: string;
  activeOrgName?: string;

  // Header - User
  user?: LayoutUser | null;
  userMenuSections?: LinksSection[];
  onLogout?: () => void;

  // Router integration
  LinkComponent?: React.ComponentType<any>;
  isActive?: (to: string) => boolean;
}

export const CustomLayout: React.FC<CustomLayoutProps> = ({
  children,
  sidebarType = 'none',
  sidebarOptions = [],
  leftMenuSections = [],
  scrollable = true,
  homeLinks = defaultHomeLinks,
  showBrandName = false,
  tabs = [],
  isSelected = defaultIsSelected,
  helpers,
  organizations,
  activeOrgId,
  activeOrgName,
  user,
  userMenuSections = defaultUserMenuSections,
  onLogout,
  LinkComponent,
  isActive,
}) => {
  const displayUser = resolveUser(user);

  const renderTopBar = () => (
    <HeaderMenuTemplateV2.TopBar>
      <HeaderMenuTemplateV2.Start>
        <HeaderMenuTemplateV2.Logo homeLinks={homeLinks} showBrandName={showBrandName} />
      </HeaderMenuTemplateV2.Start>

      {tabs.length > 0 ? (
        <HeaderMenuTemplateV2.Tabs tabs={tabs} isSelected={isSelected} />
      ) : (
        <HeaderMenuTemplateV2.MiddleSlot>
          <div className="h-[66px]" />
        </HeaderMenuTemplateV2.MiddleSlot>
      )}

      <HeaderMenuTemplateV2.Options>
        {helpers && helpers.length > 0 && (
          <HeaderMenuTemplateV2.Helpers icons={helpers} />
        )}
        {organizations && organizations.length > 0 && activeOrgId && (
          <HeaderMenuTemplateV2.Organizations
            sections={organizations}
            activeId={activeOrgId}
            activeName={activeOrgName}
          />
        )}
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
  );

  if (sidebarType === 'none') {
    return (
      <HeaderMenuTemplateV2>
        {renderTopBar()}
        <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
      </HeaderMenuTemplateV2>
    );
  }

  if (sidebarType === 'icons') {
    return (
      <HeaderMenuTemplateV2>
        {renderTopBar()}
        <HeaderMenuTemplateV2.Content>
          <HeaderMenuTemplateV2.SidebarNav
            options={sidebarOptions}
            LinkComponent={LinkComponent}
            isActive={isActive}
          />
          <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
        </HeaderMenuTemplateV2.Content>
      </HeaderMenuTemplateV2>
    );
  }

  // sidebarType === 'text'
  return (
    <HeaderMenuTemplateV2>
      {renderTopBar()}
      <HeaderMenuTemplateV2.Content>
        <HeaderMenuTemplateV2.LeftMenu
          sections={leftMenuSections}
          isSelected={isSelected}
          scrollable={scrollable}
        />
        <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
      </HeaderMenuTemplateV2.Content>
    </HeaderMenuTemplateV2>
  );
};
