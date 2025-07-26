"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PanelProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export const RCXSimplePanel: React.FC<PanelProps> = ({
  title,
  className,
  children,
  collapsible = false,
  defaultCollapsed = false,
  onCollapseChange,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  return (
    <Card
      className={cn(
        "grid grid-cols-1 gap-1 h-full shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-sm .bg-primary-foreground py-0 p-2",
        className
      )}
    >
      {title && (
        <CardHeader className="p-3">
          <CardTitle
            className={cn(
              "text-lg font-semibold flex items-center gap-1",
              collapsible && "cursor-pointer"
            )}
            onClick={collapsible ? handleToggleCollapse : undefined}
          >
            {title}
            {collapsible &&
              (isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              ))}
          </CardTitle>
        </CardHeader>
      )}

      {!isCollapsed && (
        <CardContent className="min-h-0 overflow-auto p-3">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default RCXSimplePanel;
