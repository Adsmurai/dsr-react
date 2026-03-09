/**
 * SocialIcon Wrapper - DSR SocialIcon component
 * 
 * @description Social media platform icons (Facebook, Instagram, Google, etc.).
 * Use for displaying social network branding in a standardized way.
 * 
 * @example
 * // Basic usage
 * <SocialIcon network="facebook" />
 * 
 * // With color and size
 * <SocialIcon network="instagram" color="color" size="medium" />
 * 
 * // Grayscale (default)
 * <SocialIcon network="google" />
 * 
 * @see Use Icon for general Material icons
 * @see Available networks: facebook, instagram, google, linkedin, tiktok, 
 *      twitter, youtube, pinterest, snapchat, spotify, amazon, amazonads
 */
import {
  SocialIcon as DSRSocialIcon,
  SocialIconColorEnum
} from '@adsmurai/design-system-react';

/**
 * Available social network icons.
 */
export const SOCIAL_NETWORKS = [
  'facebook', 'instagram', 'google', 'linkedin', 'tiktok',
  'twitter', 'youtube', 'pinterest', 'snapchat', 'spotify',
  'amazon', 'amazonads'
] as const;

/**
 * Available color modes for social icons.
 * - `default`: Grayscale/monochrome
 * - `color`: Brand colors
 */
export const SOCIAL_ICON_COLORS = ['default', 'color'] as const;

/**
 * Available sizes for social icons.
 * - `small`: Smaller icon
 * - `medium`: Default size
 */
export const SOCIAL_ICON_SIZES = ['small', 'medium'] as const;

/** Type for social network values */
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number] | string;

/** Type for social icon color values */
export type SocialIconColor = (typeof SOCIAL_ICON_COLORS)[number];

/** Type for social icon size values */
export type SocialIconSize = (typeof SOCIAL_ICON_SIZES)[number];

export interface SocialIconProps {
  /** Social network name */
  network: SocialNetwork;
  /** Color variant - 'default' for grayscale, 'color' for brand colors */
  color?: SocialIconColor;
  /** Size of the icon */
  size?: SocialIconSize;
  /** Test ID for QA */
  dataQa?: string;
}

const colorMap: Record<SocialIconColor, SocialIconColorEnum> = {
  default: SocialIconColorEnum.Default,
  color: SocialIconColorEnum.Color,
};

export function SocialIcon({
  network,
  color = 'default',
  size = 'medium',
  dataQa,
}: SocialIconProps) {
  return (
    <DSRSocialIcon
      socialNetwork={network}
      color={colorMap[color]}
      size={size}
      dataQa={dataQa}
    />
  );
}

export { SocialIconColorEnum };
export default SocialIcon;
