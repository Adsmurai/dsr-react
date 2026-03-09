/**
 * @fileoverview SimpleLayout - Pre-configured layout with floating header
 *
 * @description
 * Ready-to-use simple layout using HeaderMenuTemplateV2 with tabs navigation.
 * Ideal for landing pages, wizards, onboarding flows, and apps with few sections.
 *
 * @example
 * ```tsx
 * import { SimpleLayout } from '@adsmurai/dsr-react';
 *
 * <SimpleLayout tabs={tabSections} user={{ firstName: 'Ana', lastName: 'García', email: 'ana@example.com' }}>
 *   <div>Page content</div>
 * </SimpleLayout>
 * ```
 */

import React from 'react';
import { HeaderMenuTemplateV2 } from '../header-menu';
import type { LinksSection, IsSelectedFn } from '../header-menu';
import {
  defaultHomeLinks,
  defaultUserMenuSections,
  defaultIsSelected,
  resolveUser,
  type LayoutUser,
} from './layout-defaults';

export interface SimpleLayoutProps {
  children: React.ReactNode;
  tabs?: LinksSection[];
  isSelected?: IsSelectedFn;
  user?: LayoutUser | null;
  userMenuSections?: LinksSection[];
  homeLinks?: LinksSection[];
  showBrandName?: boolean;
  onLogout?: () => void;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  children,
  tabs = [],
  isSelected = defaultIsSelected,
  user,
  userMenuSections = defaultUserMenuSections,
  homeLinks = defaultHomeLinks,
  showBrandName = false,
  onLogout,
}) => {
  const displayUser = resolveUser(user);

  return (
    <HeaderMenuTemplateV2>
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
      <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
    </HeaderMenuTemplateV2>
  );
};
