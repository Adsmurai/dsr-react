/**
 * @fileoverview ScrollArea component
 *
 * @description
 * A custom scrollable area component built on Radix UI Scroll Area primitive.
 * Provides a consistent, styled scrollbar across all platforms while maintaining
 * native scrolling behavior. Supports both vertical and horizontal scrolling
 * with customizable scrollbar appearance.
 *
 * @example
 * ```tsx
 * import { ScrollArea, ScrollBar } from 'adsmurai-dsr-react';
 *
 * // Vertical scroll area
 * <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
 *   <div>
 *     <h4 className="font-medium mb-4">Notifications</h4>
 *     {notifications.map((notification) => (
 *       <div key={notification.id} className="mb-4 pb-4 border-b last:border-0">
 *         <p className="font-medium">{notification.title}</p>
 *         <p className="text-sm text-muted-foreground">{notification.description}</p>
 *       </div>
 *     ))}
 *   </div>
 * </ScrollArea>
 *
 * // Horizontal scroll area for image gallery
 * <ScrollArea className="w-full whitespace-nowrap rounded-md border">
 *   <div className="flex w-max space-x-4 p-4">
 *     {images.map((image) => (
 *       <img
 *         key={image.id}
 *         src={image.src}
 *         alt={image.alt}
 *         className="w-[150px] h-[200px] object-cover rounded-md"
 *       />
 *     ))}
 *   </div>
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 *
 * // Both vertical and horizontal scrolling
 * <ScrollArea className="h-[300px] w-[400px] rounded-md border">
 *   <div className="p-4 w-[600px]">
 *     Wide content that scrolls both ways
 *   </div>
 *   <ScrollBar orientation="vertical" />
 *   <ScrollBar orientation="horizontal" />
 * </ScrollArea>
 * ```
 */
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
