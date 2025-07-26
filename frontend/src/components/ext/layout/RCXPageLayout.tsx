"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function PageLayout({
  children,
  className,
  header,
  footer,
  variant = "default",
  padding = "default",
  ...props
}: PageLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen",
        variantMap[variant],
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {header && <div className="mb-4">{header}</div>}

      {children}

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export default PageLayout;
