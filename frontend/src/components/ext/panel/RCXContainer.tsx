"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface RCXContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    title?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    className?: string;
}

const RCXContainer = ({
    children,
    title,
    collapsible = false,
    defaultCollapsed = false,
    className,
    ...props
}: RCXContainerProps) => {
    const [isOpen, setIsOpen] = React.useState(!defaultCollapsed);

    if (!collapsible) {
        return (
            <div className={cn("w-full h-full", className)} {...props}>
                {title && (
                    <div className="text-lg font-semibold mb-4">{title}</div>
                )}
                {children}
            </div>
        );
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={cn("w-full h-full", className)}
            {...props}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="text-lg font-semibold">{title}</div>
                <CollapsibleTrigger className="hover:bg-accent/50 rounded-md p-2">
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
};

export default RCXContainer;
