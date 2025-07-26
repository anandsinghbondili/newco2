"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash } from "lucide-react";
import RCXPriButton from "../buttons/RCXPriButton";
import RCXSecButton from "../buttons/RCXSecButton";
import RCXNeuButton from "../buttons/RCXNeuButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PanelProps {
  title?: string;
  onCreate?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  toolbarExtra?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  canEdit?: boolean;
  canDelete?: boolean;
}

const RCXSmartPanel = ({
  title,
  onCreate,
  onEdit,
  onDelete,
  toolbarExtra,
  className,
  children,
  canEdit = false,
  canDelete = false,
}: PanelProps) => {
  return (
    <Card
      className={cn(
        "grid grid-cols-1 gap-1 h-full shadow-[0_0_15px_rgba(0,0,0,0.15)] rounded-sm",
        className
      )}
    >
      {title && (
        <CardHeader className="p-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
      )}

      <div className="px-2 flex items-center gap-2 min-h-0">
        {onCreate && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <RCXPriButton
                  onClick={onCreate}
                  className="flex items-center gap-1 py-0.5 px-2"
                >
                  <Plus className="h-4 w-4" />
                </RCXPriButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {onEdit && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <RCXSecButton
                  onClick={onEdit}
                  className="flex items-center gap-1 py-0.5 px-2"
                  disabled={!canEdit}
                >
                  <Pencil className="h-4 w-4" />
                </RCXSecButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {onDelete && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <RCXNeuButton
                  onClick={onDelete}
                  className="flex items-center gap-1 py-0.5 px-2 bg-red-500 hover:bg-red-600 text-white border-red-600 hover:border-red-700"
                  disabled={!canDelete}
                >
                  <Trash className="h-4 w-4" />
                </RCXNeuButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {toolbarExtra && (
          <div className="ml-auto flex items-center gap-1">{toolbarExtra}</div>
        )}
      </div>

      <CardContent className="min-h-0 overflow-auto p-1">
        {children}
      </CardContent>
    </Card>
  );
};

export default RCXSmartPanel;
