/**
 * @fileoverview Avatar user profile component
 *
 * @description
 * A user avatar component built on Radix UI Avatar primitive.
 * Displays user profile images with automatic fallback support
 * when images fail to load. Includes graceful loading states.
 *
 * ## Component Hierarchy
 *
 * | Component | Purpose |
 * |-----------|---------|
 * | `Avatar` | Root container with size and shape |
 * | `AvatarImage` | Profile image with lazy loading |
 * | `AvatarFallback` | Fallback content (initials, icon) |
 *
 * @when_to_use
 * - User profile displays
 * - Comment and message author indicators
 * - Team member lists
 * - Navigation user menus
 *
 * @when_not_to_use
 * - Generic image display -> use Image component
 * - Logo display -> use Logo component
 * - Icon buttons -> use IconButton component
 *
 * @example
 * ```tsx
 * import { Avatar, AvatarImage, AvatarFallback } from '@adsmurai/dsr-react';
 *
 * // Basic avatar with fallback
 * <Avatar>
 *   <AvatarImage src="/user-photo.jpg" alt="John Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 *
 * // Avatar with custom size
 * <Avatar className="h-16 w-16">
 *   <AvatarImage src="/user-photo.jpg" alt="John Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 *
 * // Avatar with icon fallback
 * <Avatar>
 *   <AvatarImage src="/user-photo.jpg" alt="User" />
 *   <AvatarFallback>
 *     <UserIcon className="h-4 w-4" />
 *   </AvatarFallback>
 * </Avatar>
 *
 * // Avatar group/stack
 * <div className="flex -space-x-4">
 *   <Avatar className="border-2 border-background">
 *     <AvatarImage src="/user1.jpg" />
 *     <AvatarFallback>U1</AvatarFallback>
 *   </Avatar>
 *   <Avatar className="border-2 border-background">
 *     <AvatarImage src="/user2.jpg" />
 *     <AvatarFallback>U2</AvatarFallback>
 *   </Avatar>
 *   <Avatar className="border-2 border-background">
 *     <AvatarFallback>+3</AvatarFallback>
 *   </Avatar>
 * </div>
 *
 * // In a user menu
 * <DropdownMenuTrigger asChild>
 *   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
 *     <Avatar className="h-8 w-8">
 *       <AvatarImage src={user.image} alt={user.name} />
 *       <AvatarFallback>{user.initials}</AvatarFallback>
 *     </Avatar>
 *   </Button>
 * </DropdownMenuTrigger>
 * ```
 */
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
