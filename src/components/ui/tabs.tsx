/**
 * @fileoverview Tabs wrapper component for DSR TabGroup/Tab
 *
 * @description
 * Wrapper that adapts DSR TabGroup and Tab to a standard React compositional API.
 * Maintains the same API as components like Radix Tabs to facilitate migration.
 *
 * @when_to_use
 * - Navigation between related content sections
 * - Organize information in tabs
 * - Switch between views without changing pages
 *
 * @when_not_to_use
 * - For main navigation -> use Navigation/Menu
 * - For sequential steps -> use Stepper
 *
 * @example
 * ```tsx
 * // Basic
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 *
 * // With icons
 * <Tabs defaultValue="settings">
 *   <TabsList>
 *     <TabsTrigger value="settings" icon="Settings">Settings</TabsTrigger>
 *     <TabsTrigger value="users" icon="Person">Users</TabsTrigger>
 *   </TabsList>
 * </Tabs>
 *
 * // With scroll buttons and border
 * <TabsList hasBorderBottom hasScrollButtons>
 *   ...tabs...
 * </TabsList>
 *
 * // Tabs as links
 * <TabsTrigger value="docs" href="/docs" target="_blank">Documentation</TabsTrigger>
 *
 * // Dark mode
 * <TabsList dark>
 *   ...tabs...
 * </TabsList>
 * ```
 */
import * as React from 'react';
import { useState, createContext, useContext, Children, isValidElement } from 'react';
import { TabGroup, Tab, IconsEnum } from '@adsmurai/design-system-react';
import { cn } from '@/lib/utils';

/**
 * Valid tab variant values.
 *
 * @example
 * ```tsx
 * <TabsList variant="primary">...</TabsList>
 * <TabsList variant="secondary">...</TabsList>
 * ```
 */
export const TAB_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

/**
 * Valid tab size values.
 *
 * @example
 * ```tsx
 * <TabsList size="medium">...</TabsList>
 * <TabsList size="large">...</TabsList>
 * ```
 */
export const TAB_SIZES = {
  medium: 'medium',
  large: 'large',
} as const;

// Context for managing tab state
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// ============= Tabs (Container) =============
export interface TabsProps {
  /** Default active tab value */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
  /** Tab content */
  children: React.ReactNode;
  /** Optional className */
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
Tabs.displayName = 'Tabs';

// ============= TabsList =============
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  /** Visual variant */
  variant?: 'primary' | 'secondary';
  /** Show border at bottom */
  hasBorderBottom?: boolean;
  /** Enable scroll buttons when tabs overflow */
  hasScrollButtons?: boolean;
  /** Dark mode */
  dark?: boolean;
  /** Tab size */
  size?: 'medium' | 'large';
  /** data-qa attribute for testing */
  dataQa?: string;
}

const TabsList: React.FC<TabsListProps> = ({ 
  children, 
  className,
  variant = 'primary',
  hasBorderBottom = false,
  hasScrollButtons = false,
  dark = false,
  size,
  dataQa,
}) => {
  const { value, onValueChange } = useTabsContext();

  // Extract tab data from TabsTrigger children to render DSR Tab components
  const tabs = Children.toArray(children).filter(
    (child) => isValidElement(child) && (child.type as any)?.displayName === 'TabsTrigger'
  );

  return (
    <div className={cn('mb-4', className)}>
      <TabGroup 
        value={value} 
        onChange={onValueChange}
        variant={variant}
        hasBorderBottom={hasBorderBottom}
        hasScrollButtons={hasScrollButtons}
        dark={dark}
        size={size}
        dataQa={dataQa}
      >
        {tabs.map((child) => {
          if (!isValidElement(child)) return null;
          const { 
            value: tabValue, 
            children: tabLabel, 
            disabled,
            icon,
            iconPosition,
            href,
            target,
            dataQa: tabDataQa,
          } = child.props as TabsTriggerProps;
          
          // DSR Tab requires children to be a string
          const labelString = typeof tabLabel === 'string' ? tabLabel : String(tabLabel);

          // Convert icon string to IconsEnum - icon must be IconsEnum or ReactElement
          let iconValue = icon;
          if (typeof icon === 'string' && icon in IconsEnum) {
            iconValue = IconsEnum[icon as keyof typeof IconsEnum];
          }
          
          return (
            <Tab 
              key={tabValue} 
              value={tabValue}
              disabled={disabled}
              icon={iconValue as IconsEnum | React.ReactElement | undefined}
              iconPosition={iconPosition}
              href={href}
              target={target}
              dataQa={tabDataQa}
            >
              {labelString}
            </Tab>
          );
        })}
      </TabGroup>
    </div>
  );
};
TabsList.displayName = 'TabsList';

// ============= TabsTrigger =============
export interface TabsTriggerProps {
  /** Unique value for this tab */
  value: string;
  /** Tab label (string recommended for DSR Tab) */
  children: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Icon - can be IconsEnum name (string) or the enum directly */
  icon?: keyof typeof IconsEnum | IconsEnum | React.ReactElement;
  /** Icon position relative to label */
  iconPosition?: 'left' | 'right' | 'top';
  /** URL - converts the tab into a link */
  href?: string;
  /** Target for the link (e.g.: "_blank") */
  target?: string;
  /** data-qa attribute for testing */
  dataQa?: string;
  className?: string;
}

/**
 * TabsTrigger is a declarative component that defines tab metadata.
 * It doesn't render anything directly - TabsList reads its props to render DSR Tab components.
 */
const TabsTrigger: React.FC<TabsTriggerProps> = () => {
  // This component doesn't render anything directly
  // TabsList reads its props and renders DSR Tab components
  return null;
};
TabsTrigger.displayName = 'TabsTrigger';

// ============= TabsContent =============
export interface TabsContentProps {
  /** Value matching a TabsTrigger */
  value: string;
  /** Content to show when tab is active */
  children: React.ReactNode;
  /** Force mount (render even when not active) */
  forceMount?: boolean;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  forceMount = false,
  className,
}) => {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;

  if (!isActive && !forceMount) {
    return null;
  }

  return (
    <div 
      role="tabpanel"
      hidden={!isActive}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', 
        !isActive && 'hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
