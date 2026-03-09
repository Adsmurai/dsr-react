/**
 * @fileoverview Drawer component - Side panel that slides in from left or right
 *
 * @description
 * Wrapper around DSR Drawer component for side panels.
 *
 * @ai-note CRITICAL: Drawer only supports left/right placement.
 * For top/bottom panels, use the Sheet component instead.
 * This is a DSR limitation.
 *
 * @when_to_use
 * - Settings or configuration panels
 * - Detail views that don't require full page
 * - Filters panel
 * - Navigation menus on mobile
 *
 * @when_not_to_use
 * - Bottom sheets (mobile action sheets) → use Sheet with side="bottom"
 * - Top panels → use Sheet with side="top"
 * - Modal confirmations → use Dialog or AlertDialog
 *
 * @example Basic usage
 * ```tsx
 * import { Drawer } from '@adsmurai/dsr-react';
 * import { useState } from 'react';
 *
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
 *       <Drawer
 *         open={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         title="Settings"
 *         placement="right"
 *       >
 *         <p>Panel content here</p>
 *       </Drawer>
 *     </>
 *   );
 * }
 * ```
 *
 * @example With subtitle and size
 * ```tsx
 * <Drawer
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="User Details"
 *   subtitle="View and edit user information"
 *   placement="right"
 *   size="large"
 * >
 *   <UserForm />
 * </Drawer>
 * ```
 *
 * @example Left placement (navigation)
 * ```tsx
 * <Drawer
 *   open={isMenuOpen}
 *   onClose={() => setIsMenuOpen(false)}
 *   title="Menu"
 *   placement="left"
 *   size="small"
 * >
 *   <Navigation />
 * </Drawer>
 * ```
 */
import * as React from "react";
import { Drawer as DSRDrawerComponent } from '@adsmurai/design-system-react';

/**
 * Valid Drawer placement values.
 *
 * @example
 * ```tsx
 * <Drawer placement="right" open={isOpen} onClose={onClose} title="Settings">
 *   Content
 * </Drawer>
 * ```
 */
export const DRAWER_PLACEMENTS = {
  /** Left side */
  left: 'left',
  /** Right side (default) */
  right: 'right',
} as const;

/**
 * Valid Drawer size values.
 *
 * @example
 * ```tsx
 * <Drawer size="large" open={isOpen} onClose={onClose} title="Details">
 *   Content
 * </Drawer>
 * ```
 */
export const DRAWER_SIZES = {
  /** Small - narrow panel */
  small: 'small',
  /** Medium - default width */
  medium: 'medium',
  /** Large - wide panel */
  large: 'large',
} as const;

export interface DrawerProps {
  /** Controls drawer visibility */
  open: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Drawer title (required) */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Side from which the drawer appears. Only left/right supported. For top/bottom use Sheet. */
  placement?: 'left' | 'right';
  /** Drawer width */
  size?: 'small' | 'medium' | 'large';
  /** Drawer content */
  children?: React.ReactNode;
}

/**
 * Drawer component - Side panel from DSR
 *
 * For bottom/top panels, use Sheet component instead.
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  placement = 'right',
  size = 'small',
  children
}) => {
  return (
    <DSRDrawerComponent
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      placement={placement}
      size={size}
    >
      {children}
    </DSRDrawerComponent>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;
