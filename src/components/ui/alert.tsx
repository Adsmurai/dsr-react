/**
 * @fileoverview Alert component wrapper for DSR Alert
 *
 * @description
 * Wrapper that adapts DSR Alert to a standard React API.
 * DSR Alert uses `content` prop and AlertTypeEnum for type.
 *
 * @when_to_use
 * - User feedback messages (success, error, warning, info)
 * - Inline notifications in forms
 * - Informational banners
 *
 * @when_not_to_use
 * - For toast notifications → use Notification/Sonner
 * - For confirmation modals → use Dialog
 *
 * @example
 * ```tsx
 * // Color variants
 * <Alert variant="success">Operation completed</Alert>
 * <Alert variant="destructive">Processing error</Alert>
 * <Alert variant="warning">Attention required</Alert>
 * <Alert variant="info">Important information</Alert>
 *
 * // With title
 * <Alert variant="success" title="Success">The operation completed successfully.</Alert>
 *
 * // With custom icon
 * <Alert variant="info" icon="Lightbulb">Tip: You can use keyboard shortcuts</Alert>
 *
 * // Closeable
 * <Alert variant="warning" onClose={() => setShow(false)}>
 *   This alert can be closed
 * </Alert>
 *
 * // Auto-close
 * <Alert variant="success" autoClose>Will close automatically</Alert>
 *
 * // Banner style (full width)
 * <Alert variant="info" isBanner>Informational banner</Alert>
 * ```
 */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Alert as DSRAlert, AlertTypeEnum, IconsEnum } from "@adsmurai/design-system-react";

import { cn } from "@/lib/utils";

const alertVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      success: "",
      warning: "",
      info: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Valid alert variant values.
 *
 * @example
 * ```tsx
 * <Alert variant="success">Operation completed</Alert>
 * <Alert variant="destructive">Error occurred</Alert>
 * ```
 */
export const ALERT_VARIANTS = {
  /** Neutral/informational alert */
  default: 'default',
  /** Error alert (destructive) */
  destructive: 'destructive',
  /** Success alert */
  success: 'success',
  /** Warning alert */
  warning: 'warning',
  /** Info alert */
  info: 'info',
} as const;

/** @internal Mapping of local variants to DSR AlertTypeEnum */
const variantMap: Record<string, AlertTypeEnum> = {
  default: AlertTypeEnum.NEUTRAL,
  destructive: AlertTypeEnum.ERROR,
  success: AlertTypeEnum.SUCCESS,
  warning: AlertTypeEnum.WARNING,
  info: AlertTypeEnum.INFO,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Alert title (optional) */
  title?: string;
  /** Custom icon (IconsEnum name) */
  icon?: keyof typeof IconsEnum;
  /** Icon color */
  iconColor?: "Success" | "Warning" | "Error" | "Info" | "Default" | "Color";
  /** Callback on close - shows close button */
  onClose?: () => void;
  /** Whether it closes automatically after a time */
  autoClose?: boolean;
  /** Banner style (full width, straight borders) */
  isBanner?: boolean;
  /** data-qa attribute for testing */
  dataQa?: string;
}

/**
 * Alert component that internally uses DSR Alert.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant = "default",
    children,
    title,
    icon,
    iconColor,
    onClose,
    autoClose = false,
    isBanner = false,
    dataQa,
    ...props
  }, ref) => {
    // Development validation
    if (process.env.NODE_ENV === 'development' && typeof children !== 'string' && children) {
      console.warn(
        '[Alert] Complex children (JSX) detected. ' +
        'For structured content, use AlertTitle and AlertDescription components. ' +
        'Example: <Alert><AlertTitle>Title</AlertTitle><AlertDescription>Content</AlertDescription></Alert>'
      );
    }

    const dsrType = variantMap[variant || "default"];

    // Extract text from children for content
    const content = typeof children === "string" ? children : "";

    // If it has complex children, use native HTML as fallback
    if (typeof children !== "string" && children) {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
            variant === "destructive" && "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            variant === "success" && "border-green-500/50 text-green-700 [&>svg]:text-green-500",
            variant === "warning" && "border-yellow-500/50 text-yellow-700 [&>svg]:text-yellow-500",
            variant === "info" && "border-blue-500/50 text-blue-700 [&>svg]:text-blue-500",
            variant === "default" && "bg-background text-foreground",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <DSRAlert
          type={dsrType}
          content={content}
          title={title}
          icon={icon ? IconsEnum[icon] : undefined}
          iconColor={iconColor}
          handleOnClose={onClose}
          isAutoClose={autoClose}
          isBanner={isBanner}
          dataQa={dataQa}
        />
      </div>
    );
  },
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, AlertTypeEnum };
