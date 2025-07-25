// components/common/Breadcrumb.tsx
'use client';

import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import {
    Breadcrumb as ShadcnBreadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbProps {
    homeLabel?: string;
    customPaths?: Record<string, string>;
    hideDefaultPaths?: boolean;
    className?: string;
    showHomeIcon?: boolean;
}

export function RCXBreadcrumb({
    homeLabel = 'Home',
    customPaths = {},
    hideDefaultPaths = false,
    className,
    showHomeIcon = true,
}: BreadcrumbProps) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    function formatSegment(segment: string): string {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const breadcrumbs = [];

    // Add Home link
    if (!hideDefaultPaths) {
        breadcrumbs.push({
            label: homeLabel,
            href: '/dashboard',
            isHome: true,
        });
    }

    // Build breadcrumb items
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        // Skip if this is the last segment and we want to hide current page
        if (hideDefaultPaths && index === pathSegments.length - 1) return;
        breadcrumbs.push({
            label: customPaths[segment] || formatSegment(segment),
            href: index === pathSegments.length - 1 ? undefined : currentPath,
            isHome: false,
        });
    });

    return (
        <ShadcnBreadcrumb className={cn("mb-2 text-sm", className)}>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center">
                        <BreadcrumbItem className="px-2 py-1 rounded-sm bg-background hover:bg-slate-100 transition-colors duration-200">
                            {crumb.href ? (
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.href} className="flex items-center gap-1 text-muted-foreground hover:text-blue-600 transition-colors">
                                        {crumb.isHome && showHomeIcon && (
                                            <Home className="w-3 h-3" />
                                        )}
                                        {crumb.label}
                                    </Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage className="flex items-center gap-1 text-foreground font-normal">
                                    {crumb.isHome && showHomeIcon && (
                                        <Home className="w-3 h-3" />
                                    )}
                                    {crumb.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </div>
                ))}
            </BreadcrumbList>
        </ShadcnBreadcrumb>
    );
}