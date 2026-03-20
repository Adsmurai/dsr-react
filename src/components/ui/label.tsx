/**
 * @fileoverview Form label component
 *
 * @description
 * An accessible label component built on Radix UI Label primitive.
 * Provides proper form field association and styling with automatic
 * disabled state handling when paired with form controls.
 *
 * ## Accessibility
 *
 * - Automatically associates with form controls via `htmlFor`
 * - Inherits disabled styling from peer form elements
 * - Click on label focuses the associated input
 *
 * @when_to_use
 * - Form field labels
 * - Input descriptions and titles
 * - Checkbox and radio labels
 * - Any labeled form control
 *
 * @when_not_to_use
 * - For general text -> use Typography component
 * - For form field descriptions -> use FormDescription
 * - For error messages -> use FormMessage
 *
 * @example
 * ```tsx
 * import { Label } from 'adsmurai-dsr-react';
 * import { Input } from 'adsmurai-dsr-react';
 *
 * // Basic label with input
 * <div className="grid gap-2">
 *   <Label htmlFor="email">Email</Label>
 *   <Input id="email" type="email" placeholder="Enter your email" />
 * </div>
 *
 * // Label with required indicator
 * <div className="grid gap-2">
 *   <Label htmlFor="name">
 *     Name <span className="text-destructive">*</span>
 *   </Label>
 *   <Input id="name" required />
 * </div>
 *
 * // Label with checkbox (peer styling)
 * <div className="flex items-center space-x-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>
 *
 * // Disabled state (automatic via peer)
 * <div className="grid gap-2">
 *   <Label htmlFor="disabled-input">Disabled Field</Label>
 *   <Input id="disabled-input" disabled />
 * </div>
 *
 * // With form field (recommended pattern)
 * <FormField
 *   control={form.control}
 *   name="username"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Username</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
