"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RCXLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  className?: string;
  children: React.ReactNode;
}

const RCXLink = React.forwardRef<HTMLAnchorElement, RCXLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          "text-blue-600 no-underline transition-colors cursor-pointer font-semibold",
          "hover:text-blue-700 hover:underline",
          "active:text-blue-800",
          "focus:outline-2 focus:outline-blue-500 focus:outline-offset-2",
          "visited:text-purple-800",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

RCXLink.displayName = "RCXLink";

export default RCXLink;
