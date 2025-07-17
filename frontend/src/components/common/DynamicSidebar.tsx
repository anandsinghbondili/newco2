// dynamicSidebar.tsx
// Sidebar rendered with ShadCN‑style primitives from "../ui/sidebar".
// It reads its structure from /public/data/Menu.json so the menu can be
// updated without a code‑change.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
    LayoutDashboard,
    BadgeDollarSign,
    Handshake,
    Gavel,
    ReceiptText,
    CreditCard,
    CalendarClock,
    Package,
    Boxes,
    ShieldAlert,
    Database,
} from "lucide-react";

// ShadCN sidebar primitives
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "../ui/tooltip";

/** Nav types */
export interface NavItem {
    routeId: string;
    label: string;
    icon: string;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

/** Map icon string → Lucide icon component */
const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    BadgeDollarSign,
    Handshake,
    Gavel,
    ReceiptText,
    CreditCard,
    CalendarClock,
    Package,
    Boxes,
    ShieldAlert,
    Database,
};

/** Utility for conditional classes */
function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function DynamicSidebar() {
    const pathname = usePathname() ?? "/";
    const [navData, setNavData] = useState<NavSection[] | null>(null);

    // Fetch menu definition on mount.
    useEffect(() => {
        fetch("/data/Menu.json")
            .then((res) => res.json())
            .then((data: NavSection[]) => setNavData(data))
            .catch((e) => {
                console.error("Failed to load Menu.json", e);
                setNavData([]);
            });
    }, []);

    if (!navData) {
        return (
            <SidebarContent className="flex-1 overflow-y-auto px-2">
                <div className="space-y-4">
                    {/* Skeleton loading state */}
                    <div className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                        <div className="space-y-1">
                            <div className="h-7 bg-slate-100 rounded"></div>
                            <div className="h-7 bg-slate-100 rounded"></div>
                            <div className="h-7 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                        <div className="space-y-1">
                            <div className="h-7 bg-slate-100 rounded"></div>
                            <div className="h-7 bg-slate-100 rounded"></div>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        );
    }

    return (
        <SidebarContent className="flex-1 overflow-y-auto px-2">
            {navData.map((section) => (
                <SidebarGroup key={section.title} className="mb-4">
                    <SidebarGroupLabel className="px-2 pt-2 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                        {section.title}
                    </SidebarGroupLabel>
                    <TooltipProvider delayDuration={100}>
                        <SidebarGroupContent className="space-y-1">
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    const Icon = iconMap[item.icon] ?? LayoutDashboard;
                                    const href = `/${item.routeId}`;
                                    const active = pathname.startsWith(href);
                                    return (
                                        <SidebarMenuItem key={item.routeId} className="group">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            href={href}
                                                            className={cn(
                                                                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all duration-200 group",
                                                                active
                                                                    ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500 shadow-sm"
                                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm hover:border-l-2 hover:border-slate-300"
                                                            )}
                                                        >
                                                            <Icon
                                                                size={14}
                                                                className={cn(
                                                                    "transition-all duration-200",
                                                                    active
                                                                        ? "text-blue-600"
                                                                        : "text-slate-500 group-hover:text-slate-700"
                                                                )}
                                                            />
                                                            <span className="truncate">{item.label}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="flex items-center gap-2 bg-slate-900 text-white">
                                                    <Icon size={12} />{item.label}
                                                </TooltipContent>
                                            </Tooltip>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </TooltipProvider>
                </SidebarGroup>
            ))}
        </SidebarContent>
    );
}
