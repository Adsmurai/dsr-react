/**
 * Logo Wrapper - DSR Logo component
 * 
 * @description Adsmurai brand logo component with variants.
 * Use for consistent brand representation across the application.
 * 
 * @example
 * // Default logo (image)
 * <Logo />
 * 
 * // Logo with text
 * <Logo type="text" width={150} />
 * 
 * // Grayscale version
 * <Logo type="imageGrey" />
 * 
 * @note This renders the Adsmurai brand logo. For custom logos, use Image component.
 */
import { Logo as DSRLogo } from '@adsmurai/design-system-react';

/**
 * Available logo type variants.
 * - `image`: Standard color logo image
 * - `text`: Text-based logo
 * - `imageGrey`: Grayscale logo image
 */
export const LOGO_TYPES = ['image', 'text', 'imageGrey'] as const;

/** Type for logo type values */
export type LogoType = (typeof LOGO_TYPES)[number];

export interface LogoProps {
  /** Logo variant type */
  type?: LogoType;
  /** Width of the logo in pixels */
  width?: number;
  /** Test ID for QA */
  dataQa?: string;
}

export function Logo({
  type = 'image',
  width,
  dataQa,
}: LogoProps) {
  return (
    <DSRLogo
      type={type}
      width={width}
      dataQa={dataQa}
    />
  );
}

export default Logo;
