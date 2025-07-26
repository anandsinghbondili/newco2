"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardDescription as ShadCardDescription,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
} from "@/components/ui/card";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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

export function Card({
  children,
  className,
  header,
  footer,
  variant = "default",
  padding = "default",
  ...props
}: CardProps) {
  return (
    <ShadCard
      className={cn(variantMap[variant], paddingMap[padding], className)}
      {...props}
    >
      {header && <div className="mb-4">{header}</div>}

      {children}

      {footer && <div className="mt-4">{footer}</div>}
    </ShadCard>
  );
}

export const CardHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadCardHeader className={cn(className)} {...props}>
    {children}
  </ShadCardHeader>
);

export const CardTitle = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <ShadCardTitle className={cn(className)} {...props}>
    {children}
  </ShadCardTitle>
);

export const CardDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <ShadCardDescription className={cn(className)} {...props}>
    {children}
  </ShadCardDescription>
);

export const CardContent = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadCardContent className={cn(className)} {...props}>
    {children}
  </ShadCardContent>
);

export const CardFooter = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <ShadCardFooter className={cn(className)} {...props}>
    {children}
  </ShadCardFooter>
);

export default Card;
