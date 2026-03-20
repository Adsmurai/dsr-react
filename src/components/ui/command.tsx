/**
 * @fileoverview Command palette component (cmdk)
 *
 * @description
 * A command menu/palette component built on top of cmdk library.
 * Provides a fast, keyboard-driven interface for searching and executing
 * commands. Commonly used for spotlight-like search, command palettes,
 * and autocomplete interfaces.
 *
 * ## Component Hierarchy
 *
 * | Component | Purpose |
 * |-----------|---------|
 * | `Command` | Root container with search functionality |
 * | `CommandDialog` | Modal dialog wrapper for command menu |
 * | `CommandInput` | Search input field |
 * | `CommandList` | Scrollable results container |
 * | `CommandEmpty` | Empty state when no results |
 * | `CommandGroup` | Groups related commands |
 * | `CommandItem` | Individual selectable command |
 * | `CommandSeparator` | Visual separator between groups |
 * | `CommandShortcut` | Keyboard shortcut display |
 *
 * @when_to_use
 * - Spotlight/command palette interfaces (Cmd+K)
 * - Quick action menus
 * - Searchable command lists
 * - Autocomplete dropdowns with keyboard navigation
 *
 * @when_not_to_use
 * - Simple dropdown menus -> use DropdownMenu
 * - Form select inputs -> use Select
 * - Navigation menus -> use NavigationMenu or Sidebar
 *
 * @example
 * ```tsx
 * import {
 *   Command,
 *   CommandDialog,
 *   CommandEmpty,
 *   CommandGroup,
 *   CommandInput,
 *   CommandItem,
 *   CommandList,
 *   CommandSeparator,
 *   CommandShortcut,
 * } from 'adsmurai-dsr-react';
 *
 * // Basic command menu
 * <Command>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>
 *         <CalendarIcon className="mr-2 h-4 w-4" />
 *         <span>Calendar</span>
 *       </CommandItem>
 *       <CommandItem>
 *         <SearchIcon className="mr-2 h-4 w-4" />
 *         <span>Search</span>
 *       </CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // Command palette with dialog (Cmd+K style)
 * function CommandPalette() {
 *   const [open, setOpen] = useState(false);
 *
 *   useEffect(() => {
 *     const down = (e: KeyboardEvent) => {
 *       if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
 *         e.preventDefault();
 *         setOpen((open) => !open);
 *       }
 *     };
 *     document.addEventListener('keydown', down);
 *     return () => document.removeEventListener('keydown', down);
 *   }, []);
 *
 *   return (
 *     <CommandDialog open={open} onOpenChange={setOpen}>
 *       <CommandInput placeholder="Type a command or search..." />
 *       <CommandList>
 *         <CommandEmpty>No results found.</CommandEmpty>
 *         <CommandGroup heading="Actions">
 *           <CommandItem onSelect={() => console.log('New file')}>
 *             <PlusIcon className="mr-2 h-4 w-4" />
 *             <span>New File</span>
 *             <CommandShortcut>Ctrl+N</CommandShortcut>
 *           </CommandItem>
 *           <CommandItem onSelect={() => console.log('Save')}>
 *             <SaveIcon className="mr-2 h-4 w-4" />
 *             <span>Save</span>
 *             <CommandShortcut>Ctrl+S</CommandShortcut>
 *           </CommandItem>
 *         </CommandGroup>
 *         <CommandSeparator />
 *         <CommandGroup heading="Settings">
 *           <CommandItem>
 *             <SettingsIcon className="mr-2 h-4 w-4" />
 *             <span>Settings</span>
 *           </CommandItem>
 *         </CommandGroup>
 *       </CommandList>
 *     </CommandDialog>
 *   );
 * }
 *
 * // With keyboard shortcuts display
 * <CommandItem>
 *   <span>Copy</span>
 *   <CommandShortcut>Cmd+C</CommandShortcut>
 * </CommandItem>
 * ```
 */
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogProps;

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
