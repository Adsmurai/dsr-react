/**
 * @fileoverview Sonner toast notification component
 *
 * @description
 * Toast system based on the Sonner library, exported as `Sonner` (the name
 * `Toaster` belongs to the useToast-based system in toaster.tsx). Its imperative
 * API is exported as `sonnerToast` for the same reason: the root `toast` export
 * is the useToast one, which has a different, object-based signature.
 *
 * @ai-note There are two toast systems and they are NOT interchangeable.
 * Prefer `useToast()` + `<Toaster />` — that is the default. Only reach for
 * `Sonner` + `sonnerToast` when you specifically want Sonner's promise-based
 * API. Mixing them (e.g. `<Sonner />` with `useToast()`) renders nothing.
 *
 * @when_to_use
 * - Promise-based async feedback (`sonnerToast.promise`)
 * - Toast stacking and grouping
 *
 * @when_not_to_use
 * - Anything else -> use `useToast()` + `<Toaster />`
 * - Inline alerts -> use `Alert`
 * - Blocking confirmations -> use `AlertDialog`
 *
 * @example
 * ```tsx
 * import { Sonner, sonnerToast } from 'adsmurai-dsr-react';
 *
 * // Mount once at the app root
 * <Sonner />
 *
 * sonnerToast('Event created', { description: 'Scheduled for tomorrow.' });
 * sonnerToast.success('Operation completed');
 * sonnerToast.error('Something went wrong');
 * sonnerToast.promise(saveData(), {
 *   loading: 'Saving...',
 *   success: 'Data saved',
 *   error: 'Failed to save',
 * });
 *
 * // WRONG - the root `toast` is the useToast API, it has no .success()
 * import { toast } from 'adsmurai-dsr-react';
 * toast.success('nope');
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

export { Toaster, toast as sonnerToast };
