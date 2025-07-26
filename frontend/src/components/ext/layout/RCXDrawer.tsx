"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Drawer as ShadDrawer,
  DrawerTrigger as ShadDrawerTrigger,
  DrawerContent as ShadDrawerContent,
  DrawerHeader as ShadDrawerHeader,
  DrawerFooter as ShadDrawerFooter,
  DrawerTitle as ShadDrawerTitle,
  DrawerDescription as ShadDrawerDescription,
} from "@/components/ui/drawer";

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  large: "p-6",
};

const variantMap = {
  default: "",
  bordered: "border border-border",
  ghost: "bg-transparent shadow-none",
};

export function Drawer({
  children,
  className,
  header,
  footer,
  variant = "default",
  padding = "default",
  ...props
}: DrawerProps) {
  return (
    <ShadDrawer>
      <div
        className={cn(variantMap[variant], paddingMap[padding], className)}
        {...props}
      >
        {header && <div className="mb-4">{header}</div>}

        {children}

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </ShadDrawer>
  );
}

export const DrawerTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => (
  <ShadDrawerTrigger className={cn(className)} {...props}>
    {children}
  </ShadDrawerTrigger>
);

export const DrawerContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadDrawerContent className={cn(className)} {...props}>
    {children}
  </ShadDrawerContent>
);

export const DrawerHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadDrawerHeader className={cn(className)} {...props}>
    {children}
  </ShadDrawerHeader>
);

export const DrawerFooter = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadDrawerFooter className={cn(className)} {...props}>
    {children}
  </ShadDrawerFooter>
);

export const DrawerTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <ShadDrawerTitle className={cn(className)} {...props}>
    {children}
  </ShadDrawerTitle>
);

export const DrawerDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <ShadDrawerDescription className={cn(className)} {...props}>
    {children}
  </ShadDrawerDescription>
);

export default Drawer;
