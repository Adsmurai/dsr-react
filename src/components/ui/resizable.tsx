/**
 * @fileoverview Resizable component
 *
 * @description
 * A set of resizable panel components built on react-resizable-panels.
 * Allows users to resize panels by dragging handles between them.
 * Supports both horizontal and vertical layouts with optional visual
 * drag handles. Useful for creating flexible layouts like split views,
 * sidebars, and code editors.
 *
 * @example
 * ```tsx
 * import {
 *   ResizablePanelGroup,
 *   ResizablePanel,
 *   ResizableHandle,
 * } from '@adsmurai/dsr-react';
 *
 * // Horizontal resizable panels
 * <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
 *   <ResizablePanel defaultSize={25}>
 *     <div className="flex h-full items-center justify-center p-6">
 *       <span className="font-semibold">Sidebar</span>
 *     </div>
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={75}>
 *     <div className="flex h-full items-center justify-center p-6">
 *       <span className="font-semibold">Main Content</span>
 *     </div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 *
 * // Vertical resizable panels
 * <ResizablePanelGroup direction="vertical" className="min-h-[400px] rounded-lg border">
 *   <ResizablePanel defaultSize={30}>
 *     <div className="p-4">Header Panel</div>
 *   </ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel defaultSize={70}>
 *     <div className="p-4">Content Panel</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 *
 * // Three-panel layout
 * <ResizablePanelGroup direction="horizontal" className="min-h-[300px]">
 *   <ResizablePanel defaultSize={20} minSize={15}>
 *     <div>Left Panel</div>
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={60}>
 *     <div>Center Panel</div>
 *   </ResizablePanel>
 *   <ResizableHandle withHandle />
 *   <ResizablePanel defaultSize={20} minSize={15}>
 *     <div>Right Panel</div>
 *   </ResizablePanel>
 * </ResizablePanelGroup>
 * ```
 */
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
