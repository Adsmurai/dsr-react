/**
 * @fileoverview AspectRatio component
 *
 * @description
 * A container component that maintains a specified aspect ratio for its children,
 * built on Radix UI Aspect Ratio primitive. Useful for images, videos, maps, and
 * other media that need to maintain consistent proportions across different
 * viewport sizes. Prevents layout shifts as content loads.
 *
 * @example
 * ```tsx
 * import { AspectRatio } from 'adsmurai-dsr-react';
 *
 * // 16:9 aspect ratio for video content
 * <div className="w-[450px]">
 *   <AspectRatio ratio={16 / 9}>
 *     <img
 *       src="/landscape.jpg"
 *       alt="Landscape"
 *       className="object-cover w-full h-full rounded-md"
 *     />
 *   </AspectRatio>
 * </div>
 *
 * // Square aspect ratio (1:1)
 * <div className="w-[200px]">
 *   <AspectRatio ratio={1}>
 *     <img
 *       src="/avatar.jpg"
 *       alt="Profile"
 *       className="object-cover w-full h-full rounded-full"
 *     />
 *   </AspectRatio>
 * </div>
 *
 * // 4:3 aspect ratio for embedded content
 * <div className="w-full max-w-[600px]">
 *   <AspectRatio ratio={4 / 3}>
 *     <iframe
 *       src="https://www.google.com/maps/embed?..."
 *       className="w-full h-full border-0"
 *       title="Map"
 *     />
 *   </AspectRatio>
 * </div>
 * ```
 */
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
