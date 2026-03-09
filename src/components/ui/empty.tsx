/**
 * Empty state wrapper component for DSR Empty
 * 
 * DSR Empty is used to display empty states in the application.
 * Note: DSR Empty expects string children or simple content.
 * 
 * @example
 * <Empty>No hay datos disponibles</Empty>
 * 
 * @example
 * // For complex content, use wrapper
 * <Empty className="my-empty">
 *   Sin resultados
 * </Empty>
 */
import * as React from 'react';
import { Empty as DSREmpty } from '@adsmurai/design-system-react';

export interface EmptyProps {
  /** Content to display - for DSR compatibility, prefer string */
  children: React.ReactNode;
  /** Optional className for wrapper styling */
  className?: string;
}

/**
 * Empty component - wrapper for DSR Empty
 * 
 * Used to display empty state content when no data is available.
 * DSR Empty works best with string children.
 */
export const Empty: React.FC<EmptyProps> = ({
  children,
  className,
}) => {
  // DSR Empty expects string - if children is complex, render in wrapper
  const isString = typeof children === 'string';
  
  if (isString) {
    return (
      <div className={className}>
        <DSREmpty>{children}</DSREmpty>
      </div>
    );
  }
  
  // For complex children, use wrapper approach
  return (
    <div className={className}>
      <DSREmpty>
        {''}
      </DSREmpty>
      <div className="text-center text-muted-foreground">
        {children}
      </div>
    </div>
  );
};

Empty.displayName = 'Empty';

export default Empty;
