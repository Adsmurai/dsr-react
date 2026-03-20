/**
 * @fileoverview Centralized barrel export for all DSR enums
 *
 * @description
 * Single import point for all public enums from adsmurai-dsr-react.
 * This provides a cleaner API and better tree-shaking support.
 *
 * @example
 * ```tsx
 * // Recommended: Import from /enums subpath
 * import { IconsEnum, ButtonVariantEnum } from 'adsmurai-dsr-react/enums';
 *
 * // Also available from root (backwards compatibility)
 * import { IconsEnum } from 'adsmurai-dsr-react';
 * ```
 *
 * @since 0.1.1-snapshot.2
 */

// Re-export all enums from @adsmurai/design-system-react
export {
  // Icons
  IconsEnum,
  IconBaseTypeEnum,

  // Button
  ButtonVariantEnum,

  // Badge
  BadgeColorEnum,

  // Alert
  AlertTypeEnum,

  // Tag/Chip
  TagColorsEnum,
  TagVariantsEnum,

  // Theme
  ThemesEnum,

  // Typography
  TypographyColorEnum,

  // Social
  SocialIconColorEnum,

  // EventList
  EventListPositionSelectedEnum,
} from '@adsmurai/design-system-react';
