/**
 * @fileoverview Sonner toast notification component
 *
 * @description
 * A modern toast notification system using the Sonner library.
 * Provides a simpler API than the standard Toaster component with
 * automatic theme support, stacking, and rich toast types.
 * Alternative to the useToast/Toaster system.
 *
 * ## Toast Types
 *
 * | Type | Description |
 * |------|-------------|
 * | `toast()` | Default notification |
 * | `toast.success()` | Success message with check icon |
 * | `toast.error()` | Error message with X icon |
 * | `toast.warning()` | Warning message |
 * | `toast.info()` | Informational message |
 * | `toast.loading()` | Loading state with spinner |
 * | `toast.promise()` | Async promise with loading/success/error states |
 *
 * @when_to_use
 * - Modern toast notifications with minimal setup
 * - Promise-based async feedback
 * - Toast stacking and grouping
 * - When you prefer Sonner's API over useToast
 *
 * @when_not_to_use
 * - If already using useToast/Toaster system
 * - For inline alerts -> use Alert component
 * - For blocking confirmations -> use AlertDialog
 *
 * @example
 * ```tsx
 * import { Toaster, toast } from 'adsmurai-dsr-react';
 *
 * // Add Toaster to your app root
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <Toaster />
 *       </body>
 *     </html>
 *   );
 * }
 *
 * // Basic toasts
 * function ToastDemo() {
 *   return (
 *     <div className="flex gap-2">
 *       <Button onClick={() => toast('Default notification')}>
 *         Default
 *       </Button>
 *       <Button onClick={() => toast.success('Operation completed!')}>
 *         Success
 *       </Button>
 *       <Button onClick={() => toast.error('Something went wrong')}>
 *         Error
 *       </Button>
 *       <Button onClick={() => toast.warning('Please review')}>
 *         Warning
 *       </Button>
 *       <Button onClick={() => toast.info('New update available')}>
 *         Info
 *       </Button>
 *     </div>
 *   );
 * }
 *
 * // Toast with description
 * toast('Event created', {
 *   description: 'Your event has been scheduled for tomorrow.',
 * });
 *
 * // Toast with action
 * toast('File deleted', {
 *   action: {
 *     label: 'Undo',
 *     onClick: () => restoreFile(),
 *   },
 * });
 *
 * // Promise toast (loading -> success/error)
 * toast.promise(saveData(), {
 *   loading: 'Saving...',
 *   success: 'Data saved successfully!',
 *   error: 'Failed to save data',
 * });
 *
 * // Async function example
 * async function handleSubmit() {
 *   toast.promise(
 *     fetch('/api/submit', { method: 'POST' }),
 *     {
 *       loading: 'Submitting form...',
 *       success: 'Form submitted!',
 *       error: 'Submission failed',
 *     }
 *   );
 * }
 *
 * // Custom duration
 * toast('Quick notification', {
 *   duration: 2000, // 2 seconds
 * });
 *
 * // Dismissible toast
 * const toastId = toast('Processing...');
 * // Later: toast.dismiss(toastId);
 * ```
 */
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
