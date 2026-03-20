/**
 * @fileoverview MultiSectionLayout - Pre-configured layout with text sidebar
 *
 * @description
 * Ready-to-use multi-section layout using HeaderMenuTemplateV2 with LeftMenu.
 * Ideal for CMS, documentation, settings, and apps with hierarchical navigation.
 *
 * @example
 * ```tsx
 * import { MultiSectionLayout } from 'adsmurai-dsr-react';
 * import { IconsEnum } from 'adsmurai-dsr-react/enums';
 *
 * const sections = [
 *   {
 *     id: 'main',
 *     title: 'Main',
 *     links: [
 *       { id: 'home', title: 'Home', url: '/', icon: IconsEnum.Home, target: '', section: 'main', alt: null },
 *       { id: 'docs', title: 'Documentation', url: '/docs', icon: IconsEnum.Description, target: '', section: 'main', alt: null },
 *     ],
 *   },
 * ];
 *
 * <MultiSectionLayout leftMenuSections={sections}>
 *   <div>Page content</div>
 * </MultiSectionLayout>
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

export interface MultiSectionLayoutProps {
  children: React.ReactNode;
  leftMenuSections: LinksSection[];
  isSelected?: IsSelectedFn;
  tabs?: LinksSection[];
  scrollable?: boolean;
  user?: LayoutUser | null;
  userMenuSections?: LinksSection[];
  homeLinks?: LinksSection[];
  showBrandName?: boolean;
  onLogout?: () => void;
}

export const MultiSectionLayout: React.FC<MultiSectionLayoutProps> = ({
  children,
  leftMenuSections,
  isSelected = defaultIsSelected,
  tabs = [],
  scrollable = true,
  user,
  userMenuSections = defaultUserMenuSections,
  homeLinks = defaultHomeLinks,
  showBrandName = true,
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
      <HeaderMenuTemplateV2.Content>
        <HeaderMenuTemplateV2.LeftMenu sections={leftMenuSections} isSelected={isSelected} scrollable={scrollable} />
        <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
      </HeaderMenuTemplateV2.Content>
    </HeaderMenuTemplateV2>
  );
};
