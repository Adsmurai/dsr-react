/**
 * @fileoverview HoverCard component
 *
 * @description
 * A card component that appears when hovering over a trigger element, built on
 * Radix UI Hover Card primitive. Useful for displaying additional information
 * or previews without requiring a click. Features smooth enter/exit animations
 * and configurable positioning.
 *
 * @example
 * ```tsx
 * import {
 *   HoverCard,
 *   HoverCardTrigger,
 *   HoverCardContent,
 * } from 'adsmurai-dsr-react';
 *
 * // Basic hover card for user profile preview
 * <HoverCard>
 *   <HoverCardTrigger asChild>
 *     <a href="/user/johndoe" className="underline">@johndoe</a>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <div className="flex gap-4">
 *       <img src="/avatar.jpg" alt="Avatar" className="w-12 h-12 rounded-full" />
 *       <div>
 *         <h4 className="font-semibold">John Doe</h4>
 *         <p className="text-sm text-muted-foreground">
 *           Software Engineer at Acme Inc.
 *         </p>
 *         <p className="text-sm mt-2">Joined December 2021</p>
 *       </div>
 *     </div>
 *   </HoverCardContent>
 * </HoverCard>
 *
 * // Hover card with custom positioning
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <span>Hover for details</span>
 *   </HoverCardTrigger>
 *   <HoverCardContent align="start" sideOffset={8}>
 *     <p>Additional information displayed on hover</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 */
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
