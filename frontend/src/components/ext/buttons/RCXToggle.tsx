"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { toggleVariants } from "@/components/ui/toggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RCXToggleProps extends React.ComponentProps<typeof Toggle>,
    VariantProps<typeof toggleVariants> {
    className?: string;
    children?: React.ReactNode;
    tooltip?: string;
}

const RCXToggle = React.forwardRef<HTMLButtonElement, RCXToggleProps>(
    ({ className, variant, size, children, tooltip, ...props }, ref) => {
        const hasText = React.Children.toArray(children).some(
            child => typeof child === 'string' || (typeof child === 'object' && 'type' in child && child.type !== 'svg')
        );

        const toggle = (
            <Toggle
                ref={ref}
                variant={variant}
                size={size}
                className={cn(
                    'rcx-btn rcx-btn-secondary',
                    props.disabled && 'opacity-70 cursor-not-allowed',
                    !hasText && 'p-2',
                    'data-[state=on]:bg-[#adb7da] !important data-[state=on]:hover:bg-[#adb7da] !important',
                    className
                )}
                {...props}
            >
                {children}
            </Toggle>
        );

        if (tooltip) {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {toggle}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return toggle;
    }
);

RCXToggle.displayName = "RCXToggle";

export default RCXToggle;