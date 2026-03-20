/**
 * @fileoverview Toast notification container component
 *
 * @description
 * The container component that renders toast notifications from the useToast hook.
 * Must be placed at the root of your app to display toasts globally.
 * Works with the toast system from @/components/ui/use-toast.
 *
 * ## Toast System Architecture
 *
 * | Component | Purpose |
 * |-----------|---------|
 * | `Toaster` | Container that renders active toasts |
 * | `useToast` | Hook to trigger toasts imperatively |
 * | `toast()` | Function to create new toasts |
 *
 * @when_to_use
 * - Global toast notification system
 * - Success/error feedback messages
 * - Action confirmations
 * - Non-blocking user notifications
 *
 * @when_not_to_use
 * - For the Sonner-based alternative -> use Sonner component
 * - For inline alerts -> use Alert component
 * - For blocking confirmations -> use AlertDialog
 *
 * @example
 * ```tsx
 * import { Toaster } from 'adsmurai-dsr-react';
 * import { useToast, toast } from 'adsmurai-dsr-react';
 *
 * // Add Toaster to your app root (layout.tsx or App.tsx)
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
 * // Using the useToast hook
 * function MyComponent() {
 *   const { toast } = useToast();
 *
 *   const handleSave = () => {
 *     toast({
 *       title: 'Saved successfully',
 *       description: 'Your changes have been saved.',
 *     });
 *   };
 *
 *   return <Button onClick={handleSave}>Save</Button>;
 * }
 *
 * // Toast variants
 * function ToastExamples() {
 *   const { toast } = useToast();
 *
 *   // Default toast
 *   toast({
 *     title: 'Notification',
 *     description: 'This is a default toast.',
 *   });
 *
 *   // Destructive/error toast
 *   toast({
 *     variant: 'destructive',
 *     title: 'Error',
 *     description: 'Something went wrong.',
 *   });
 *
 *   // Toast with action
 *   toast({
 *     title: 'File deleted',
 *     description: 'The file has been moved to trash.',
 *     action: (
 *       <ToastAction altText="Undo">Undo</ToastAction>
 *     ),
 *   });
 * }
 * ```
 */
import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
