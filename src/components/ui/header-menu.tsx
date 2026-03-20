/**
 * @fileoverview HeaderMenu wrapper for DSR HeaderMenuTemplateV2
 *
 * @description
 * Main application navigation component.
 * Pure UI Component - all data is passed manually as props.
 * Does not make API calls - defines navigation statically.
 *
 * @patterns
 * There are 3 main usage patterns:
 *
 * 1. **Simple App** (Floating header without sidebar)
 *    - Ideal for: Landing pages, wizards, onboarding
 *    - Uses Tabs in the header, without Content
 *
 * 2. **Dashboard App** (Header with SidebarNav icons)
 *    - Ideal for: Dashboards, admin panels, data-heavy apps
 *    - Uses `Content` + `SidebarNav` (72px, icons only)
 *
 * 3. **Multi-Section App** (Header with LeftMenu text)
 *    - Ideal for: CMS, docs, complex settings
 *    - Uses `Content` + `LeftMenu` (240px, text with sections)
 *
 * @when_to_use
 * - When you need main application navigation
 * - For layouts with header and/or sidebar
 * - SPA navigation compatible with react-router-dom
 *
 * @when_not_to_use
 * - For secondary navigation → use Tabs or Breadcrumbs
 * - For contextual menus → use ActionMenu or DropdownMenu
 * 
 * @important
 * - Do NOT mix LeftMenu and SidebarNav - use one or the other
 * - Use `linkVariant: 'full'` in SidebarNav for better UX
 * - Each `id` must be unique to avoid React warnings
 * - When there's no sidebar, Main can be a direct child of HeaderMenuTemplateV2
 *
 * @example Simple App (Floating header)
 * ```tsx
 * import { HeaderMenuTemplateV2 } from '@adsmurai/design-system-react';
 * 
 * <HeaderMenuTemplateV2>
 *   <HeaderMenuTemplateV2.TopBar>
 *     <HeaderMenuTemplateV2.Start>
 *       <HeaderMenuTemplateV2.Logo homeLinks={homeLinks} />
 *     </HeaderMenuTemplateV2.Start>
 *     <HeaderMenuTemplateV2.Tabs tabs={tabsLinks} isSelected={isSelected} />
 *     <HeaderMenuTemplateV2.Options>
 *       <HeaderMenuTemplateV2.User firstName="John" lastName="Doe" email="ana@example.com" menuSections={userMenuLinks} />
 *     </HeaderMenuTemplateV2.Options>
 *   </HeaderMenuTemplateV2.TopBar>
 *   <HeaderMenuTemplateV2.Main>
 *     {children}
 *   </HeaderMenuTemplateV2.Main>
 * </HeaderMenuTemplateV2>
 * ```
 * 
 * @example Dashboard App (SidebarNav with icons)
 * ```tsx
 * import { HeaderMenuTemplateV2, IconsEnum } from '@adsmurai/design-system-react';
 * import type { HeaderMenuV2SidebarNavOption } from '@adsmurai/design-system-react';
 * 
 * const sidebarOptions: HeaderMenuV2SidebarNavOption[] = [
 *   { name: 'Home', icon: IconsEnum.Home, to: '/', linkVariant: 'full' },
 *   { name: 'Dashboard', icon: IconsEnum.Dashboard, to: '/dashboard', linkVariant: 'full' },
 *   { name: 'Settings', icon: IconsEnum.Settings, to: '/settings', linkVariant: 'full', isBottom: true },
 * ];
 * 
 * <HeaderMenuTemplateV2>
 *   <HeaderMenuTemplateV2.TopBar>
 *     <HeaderMenuTemplateV2.Start>
 *       <HeaderMenuTemplateV2.Logo homeLinks={homeLinks} />
 *     </HeaderMenuTemplateV2.Start>
 *     <HeaderMenuTemplateV2.Options>
 *       <HeaderMenuTemplateV2.User {...userData} />
 *     </HeaderMenuTemplateV2.Options>
 *   </HeaderMenuTemplateV2.TopBar>
 *   <HeaderMenuTemplateV2.Content>
 *     <HeaderMenuTemplateV2.SidebarNav 
 *       options={sidebarOptions}
 *       LinkComponent={NavLink}
 *       isActive={(to) => location.pathname === to}
 *     />
 *     <HeaderMenuTemplateV2.Main>
 *       {children}
 *     </HeaderMenuTemplateV2.Main>
 *   </HeaderMenuTemplateV2.Content>
 * </HeaderMenuTemplateV2>
 * ```
 * 
 * @example Multi-Section App (LeftMenu with text)
 * ```tsx
 * const leftMenuSections = [
 *   { 
 *     id: 'main-section', 
 *     title: 'Main', 
 *     links: [
 *       { id: 'overview', title: 'Overview', url: '/overview', target: '', section: 'leftMenu', icon: IconsEnum.Dashboard, alt: null },
 *       { id: 'reports', title: 'Reports', url: '/reports', target: '', section: 'leftMenu', icon: IconsEnum.InsertChart, alt: null },
 *     ],
 *   },
 * ];
 * 
 * <HeaderMenuTemplateV2>
 *   <HeaderMenuTemplateV2.TopBar>...</HeaderMenuTemplateV2.TopBar>
 *   <HeaderMenuTemplateV2.Content>
 *     <HeaderMenuTemplateV2.LeftMenu sections={leftMenuSections} isSelected={isSelected} scrollable />
 *     <HeaderMenuTemplateV2.Main>{children}</HeaderMenuTemplateV2.Main>
 *   </HeaderMenuTemplateV2.Content>
 * </HeaderMenuTemplateV2>
 * ```
 */

// Re-export the component directly from DSR (compositional, no adaptation needed)
import {
  HeaderMenuTemplateV2 as DSRHeaderMenuTemplateV2,
  type HeaderMenuTemplateV2Props,
} from '@adsmurai/design-system-react';

// Type annotation to avoid TS4023 error
type HeaderMenuTemplateV2Type = typeof DSRHeaderMenuTemplateV2;

// Export with both names for convenience
export const HeaderMenu: HeaderMenuTemplateV2Type = DSRHeaderMenuTemplateV2;
export const HeaderMenuTemplateV2: HeaderMenuTemplateV2Type = DSRHeaderMenuTemplateV2;

// Also export as default for easier importing
export default DSRHeaderMenuTemplateV2;

// Re-export types for easier usage
export type {
  HeaderMenuTemplateV2Props,
  HeaderMenuV2SidebarNavOption,
  HeaderMenuV2LinkVariant,
  LinksSection,
  Link,
  IsSelectedFn,
} from '@adsmurai/design-system-react';

// Note: Import enums from 'adsmurai-dsr-react/enums' instead
// e.g.: import { IconsEnum, ThemesEnum } from 'adsmurai-dsr-react/enums';
