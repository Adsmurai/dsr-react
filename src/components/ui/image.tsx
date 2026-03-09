/**
 * @fileoverview Image wrapper for DSR Image component
 *
 * @description
 * Wrapper that adapts DSR Image to display images with optional preview.
 *
 * @example
 * // Basic usage
 * <Image src="/photo.jpg" alt="Photo" />
 *
 * @example
 * // With preview on click
 * <Image src="/photo.jpg" alt="Photo" hasPreview />
 *
 * @example
 * // With specific fit
 * <Image src="/photo.jpg" alt="Photo" fit="cover" className="w-32 h-32" />
 */
import * as React from "react";
import { Image as DSRImage } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

/**
 * Available fit modes for Image component.
 * - `fill`: Stretch to fill container
 * - `contain`: Scale to fit within container
 * - `cover`: Scale to cover container (may crop)
 * - `none`: No scaling applied
 */
export const IMAGE_FIT_MODES = ['fill', 'contain', 'cover', 'none'] as const;

/**
 * Available loading modes for Image component.
 * - `lazy`: Load when entering viewport
 * - `eager`: Load immediately
 */
export const IMAGE_LOADING_MODES = ['lazy', 'eager'] as const;

/** Type for image fit mode values */
export type ImageFitMode = (typeof IMAGE_FIT_MODES)[number];

/** Type for image loading mode values */
export type ImageLoadingMode = (typeof IMAGE_LOADING_MODES)[number];

export interface ImageProps {
  /** Image URL */
  src?: string;
  /** Alternative text */
  alt?: string;
  /** If shows preview on click */
  hasPreview?: boolean;
  /** How to fit the image */
  fit?: ImageFitMode;
  /** Additional images for gallery in preview */
  imagesForPreview?: Array<{ src?: string; alt?: string }>;
  /** If only shows icon in preview message */
  hasOnlyIconInPreview?: boolean;
  /** Lazy or eager loading */
  loading?: ImageLoadingMode;
  /** If the background is transparent */
  isTransparent?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  hasPreview = false,
  fit = "cover",
  imagesForPreview,
  hasOnlyIconInPreview,
  loading = "lazy",
  isTransparent,
  className,
  width,
  height,
}) => {
  return (
    <div 
      className={cn("inline-block overflow-hidden", className)}
      style={{ width, height }}
    >
      <DSRImage
        src={src}
        alt={alt}
        hasPreview={hasPreview}
        fit={fit}
        imagesForPreview={imagesForPreview}
        hasOnlyIconInPreviewMessage={hasOnlyIconInPreview}
        loadingConfig={loading}
        isTransparent={isTransparent}
      />
    </div>
  );
};
Image.displayName = "Image";
