"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Tabs as RCXTabs,
    TabsList as RCXTabsList,
    TabsTrigger as RCXTabsTrigger,
    TabsContent as RCXTabsContent,
} from "@/components/ui/tabs";
import { TabsContentProps, TabsTriggerProps } from "@radix-ui/react-tabs";

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    variant?: "default" | "bordered" | "ghost";
    padding?: "none" | "small" | "default" | "large";
}

const paddingMap = {
    none: "p-0",
    small: "p-3",
    default: "p-4",
    large: "p-6"
};

const variantMap = {
    default: "",
    bordered: "border border-border",
    ghost: "bg-transparent shadow-none"
};

export function RCXTabPanel({
    children,
    className,
    header,
    footer,
    variant = "default",
    padding = "default",
    ...props
}: TabPanelProps) {
    return (
        <RCXTabs>
            <div
                className={cn(
                    variantMap[variant],
                    paddingMap[padding],
                    className
                )}
                {...props}
            >
                {header && (
                    <div className="mb-4">
                        {header}
                    </div>
                )}

                {children}

                {footer && (
                    <div className="mt-4">
                        {footer}
                    </div>
                )}
            </div>
        </RCXTabs>
    );
}

export const TabsList = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <RCXTabsList className={cn(className)} {...props}>
        {children}
    </RCXTabsList>
);

export const TabsTrigger = ({
    children,
    className,
    ...props
}: TabsTriggerProps) => (
    <RCXTabsTrigger className={cn(className)} {...props}>
        {children}
    </RCXTabsTrigger>
);

export const TabsContent = ({
    children,
    className,
    ...props
}: TabsContentProps) => (
    <RCXTabsContent className={cn(className)} {...props}>
        {children}
    </RCXTabsContent>
);

export default RCXTabPanel;
