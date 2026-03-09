/**
 * @fileoverview Button component wrapper for DSR ButtonV2
 *
 * @description
 * Wrapper that adapts DSR ButtonV2 to a standard React API.
 * DSR ButtonV2 uses `label` prop instead of `children` and requires
 * ButtonVariantEnum for variants.
 *
 * ## Variant Hierarchy (according to DSR)
 *
 * | Variant       | DSR Enum        | Use                                      |
 * |---------------|-----------------|------------------------------------------|
 * | `default`     | Filled          | Single primary action per section        |
 * | `outline`     | Outlined        | Important secondary action               |
 * | `ghost`       | Standard        | Tertiary action, less emphasis           |
 * | `secondary`   | Tonal           | Secondary action with subtle background  |
 * | `destructive` | Error           | Destructive actions (delete, etc.)       |
 * | `destructive-outline` | ErrorOutlined | Destructive with less emphasis   |
 * | `brand`       | Brand           | Actions with corporate style             |
 * | `link`        | Standard        | Link style, no background                |
 *
 * ## Usage Rules
 * - **Only 1 primary action** (`default`) per section/modal
 * - **Secondary actions** (`outline`): important but not primary
 * - **Tertiary actions** (`ghost`): optional, less visual emphasis
 * - **Destructive** (`destructive`): ALWAYS for actions that delete/discard
 * - **size="lg"**: Use for prominent CTAs (hero, important modals)
 *
 * @when_to_use
 * - Primary and secondary actions in forms
 * - CTAs on pages and modals
 * - Any interactive button in the UI
 *
 * @when_not_to_use
 * - For icon-only buttons -> use IconButton
 * - For links that look like buttons -> use DSR LinkText or styled <a>
 *
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="default">Save</Button>
 *
 * // Important secondary action
 * <Button variant="outline">Export</Button>
 *
 * // Tertiary action (less emphasis)
 * <Button variant="ghost">Cancel</Button>
 *
 * // Destructive action
 * <Button variant="destructive">Delete</Button>
 *
 * // With loading state
 * <Button isLoading>Saving...</Button>
 *
 * // With icons via name (IconsEnum)
 * <Button startIcon="Add">Add Item</Button>
 * <Button endIcon="OpenInNew">Open</Button>
 *
 * // With icons via React component
 * <Button leadingIcon={<Icon name="Add" />}>Add</Button>
 * <Button trailingIcon={<CustomIcon />}>Open</Button>
 *
 * // Prominent CTA
 * <Button size="lg">Get Started Now</Button>
 *
 * // Brand corporate style
 * <Button variant="brand">Corporate Action</Button>
 *
 * // Incorrect: complex children (will show warning in dev)
 * <Button><Icon /><span>Text</span></Button>
 * ```
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ButtonV2,
  ButtonVariantEnum,
  Icon,
  IconsEnum,
} from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",              // -> DSR Filled (primary)
        destructive: "",          // -> DSR Error (destructive)
        "destructive-outline": "",// -> DSR ErrorOutlined (destructive with less emphasis)
        outline: "",              // -> DSR Outlined (important secondary)
        secondary: "",            // -> DSR Tonal (secondary with background)
        ghost: "",                // -> DSR Standard (tertiary)
        brand: "",                // -> DSR Brand (corporate)
        link: "",                 // -> DSR Standard (link style)
      },
      size: {
        default: "",      // -> DSR small (default compact)
        sm: "",           // -> DSR small
        md: "",           // -> DSR medium
        lg: "",           // -> DSR large (for prominent CTAs)
        icon: "",         // -> DSR small
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Valid button variant values and their DSR mappings.
 * Use these values for the `variant` prop.
 *
 * @example
 * ```tsx
 * <Button variant="default">Primary</Button>
 * <Button variant="outline">Secondary</Button>
 * <Button variant="destructive">Delete</Button>
 * ```
 */
export const BUTTON_VARIANTS = {
  /** Primary action (Filled) - Use for main CTA */
  default: 'default',
  /** Secondary action (Outlined) - Important but not primary */
  outline: 'outline',
  /** Tertiary action (Standard) - Low emphasis */
  ghost: 'ghost',
  /** Secondary with subtle background (Tonal) */
  secondary: 'secondary',
  /** Destructive action (Error) - Delete, remove, etc. */
  destructive: 'destructive',
  /** Destructive with less emphasis (ErrorOutlined) */
  'destructive-outline': 'destructive-outline',
  /** Brand/corporate style */
  brand: 'brand',
  /** Link style, no background */
  link: 'link',
} as const;

/**
 * Valid button size values and their DSR mappings.
 *
 * @example
 * ```tsx
 * <Button size="sm">Small</Button>
 * <Button size="lg">Large CTA</Button>
 * ```
 */
export const BUTTON_SIZES = {
  /** Default size (small) */
  default: 'default',
  /** Small button */
  sm: 'sm',
  /** Medium button */
  md: 'md',
  /** Large button - Use for prominent CTAs */
  lg: 'lg',
  /** Icon-only button size */
  icon: 'icon',
} as const;

/** @internal Mapping of local variants to DSR ButtonVariantEnum */
const variantMap: Record<string, ButtonVariantEnum> = {
  default: ButtonVariantEnum.Filled,
  destructive: ButtonVariantEnum.Error,
  "destructive-outline": ButtonVariantEnum.ErrorOutlined,
  outline: ButtonVariantEnum.Outlined,
  secondary: ButtonVariantEnum.Tonal,
  ghost: ButtonVariantEnum.Standard,
  brand: ButtonVariantEnum.Brand,
  link: ButtonVariantEnum.Standard,
};

/** @internal Mapping of local sizes to DSR SizeEnum values */
const sizeMap: Record<string, "small" | "medium" | "large"> = {
  default: "small",
  sm: "small",
  md: "medium",
  lg: "large",
  icon: "small",
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof buttonVariants> {
  /** Render as Slot if true (advanced composition) */
  asChild?: boolean;
  /**
   * Button text content - should be plain text string for best results.
   * @ai-note For icons, use startIcon/endIcon or leadingIcon/trailingIcon props.
   * Passing JSX as children may render as "[object Object]".
   * @example <Button startIcon="Add">Add Item</Button>
   */
  children?: React.ReactNode;
  /** Icon at the start of the button (IconsEnum name) */
  startIcon?: keyof typeof IconsEnum;
  /** Icon at the end of the button (IconsEnum name) */
  endIcon?: keyof typeof IconsEnum;
  /** Icon at the start as React component (priority over startIcon) */
  leadingIcon?: React.ReactNode;
  /** Icon at the end as React component (priority over endIcon) */
  trailingIcon?: React.ReactNode;
  /** Shows a loading spinner and disables the button */
  isLoading?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
  /** Full width - takes up all available width */
  fullWidth?: boolean;
}

/**
 * Button component that internally uses DSR ButtonV2.
 * Maintains standard React API (children, onClick, disabled, etc.)
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    asChild = false, 
    children, 
    startIcon, 
    endIcon, 
    leadingIcon, 
    trailingIcon, 
    isLoading = false,
    dataQa,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
// Dev warning for complex children
    if (process.env.NODE_ENV === 'development' && children && typeof children !== 'string') {
      console.warn(
        '[Button] Complex children (JSX) detected. ' +
        'Use children="text" with startIcon/endIcon or leadingIcon/trailingIcon. ' +
        'Example: <Button endIcon="OpenInNew">Open</Button>'
      );
    }

    const dsrVariant = variantMap[variant || "default"];
    const dsrSize = sizeMap[size || "default"];

    // Extract text from children for label (only if string)
    const label = typeof children === "string" ? children : "";
    
    // Icons: priority to React component props, then string (IconsEnum)
    const finalLeadingIcon = (leadingIcon ?? (startIcon ? <Icon>{IconsEnum[startIcon]}</Icon> : undefined)) as React.ReactElement | undefined;
    const finalTrailingIcon = (trailingIcon ?? (endIcon ? <Icon>{IconsEnum[endIcon]}</Icon> : undefined)) as React.ReactElement | undefined;

    return (
      <div className={cn("inline-flex", fullWidth && "w-full", className)}>
        <ButtonV2
          ref={ref as React.Ref<HTMLButtonElement>}
          label={label}
          variant={dsrVariant}
          size={dsrSize}
          disabled={disabled || isLoading}
          isLoading={isLoading}
          onClick={props.onClick}
          leadingIcon={finalLeadingIcon}
          trailingIcon={finalTrailingIcon}
          type={props.type}
          dataQa={dataQa}
        />
      </div>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, ButtonVariantEnum, IconsEnum };
