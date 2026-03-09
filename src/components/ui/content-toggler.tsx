/**
 * @fileoverview ContentToggler wrapper for DSR ContentToggler component
 *
 * @description
 * Wrapper that adapts DSR ContentToggler to toggle between two contents.
 * Useful for showing/hiding alternative content, toggle states, etc.
 *
 * @example
 * // Basic toggle
 * <ContentToggler
 *   contentA={<div>Content A</div>}
 *   contentB={<div>Content B</div>}
 * />
 */
import * as React from "react";
import { ContentToggler as DSRContentToggler } from "@adsmurai/design-system-react";
import { cn } from "@/lib/utils";

export interface ContentTogglerProps {
  /** First element to display */
  contentA: React.ReactElement;
  /** Second element to display (alternative) */
  contentB: React.ReactElement;
  /** Additional CSS classes */
  className?: string;
}

export function ContentToggler({
  contentA,
  contentB,
  className,
}: ContentTogglerProps): React.ReactElement {
  return (
    <div className={cn("inline-block", className)}>
      <DSRContentToggler
        elementA={contentA}
        elementB={contentB}
      />
    </div>
  );
}

ContentToggler.displayName = "ContentToggler";
