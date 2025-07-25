// dynamicSidebar.tsx
// Sidebar rendered with ShadCN‑style primitives from "../ui/sidebar".
// It reads its structure from /public/data/Menu.json so the menu can be
// updated without a code‑change.

"use client";

import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from "next/navigation";
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
    const router = useRouter();

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
            <SidebarContent className="flex-1 overflow-y-auto rcx-bg-sidebar p-2">
                <div className="space-y-4">
                    {/* Skeleton loading state */}
                    <div className="animate-pulse">
                        <div className="h-4 rcx-bg-header rounded w-1/3"></div>
                        <div className="space-y-1">
                            <div className="h-7 rcx-bg-header rounded"></div>
                            <div className="h-7 rcx-bg-header rounded"></div>
                            <div className="h-7 rcx-bg-header rounded"></div>
                        </div>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-4 rcx-bg-header rounded w-1/2"></div>
                        <div className="space-y-1">
                            <div className="h-7 rcx-bg-header rounded"></div>
                            <div className="h-7 rcx-bg-header rounded"></div>
                        </div>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-4 rcx-bg-header rounded w-1/2"></div>
                        <div className="space-y-1">
                            <div className="h-7 rcx-bg-header rounded"></div>
                            <div className="h-7 rcx-bg-header rounded"></div>
                        </div>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-4 rcx-bg-header rounded w-1/2"></div>
                        <div className="space-y-1">
                            <div className="h-7 rcx-bg-header rounded"></div>
                            <div className="h-7 rcx-bg-header rounded"></div>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        );
    }

    return (
        <SidebarContent className="flex-1 overflow-y-auto rcx-bg-sidebar p-2">
            {navData.map((section) => (
                <SidebarGroup key={section.title} className="p-0 mb-2">
                    <SidebarGroupLabel className="pt-2 pb-1 text-xs font-medium uppercase tracking-wide rcx-text-on-dark">
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
                                                        <Button
                                                            type="button"
                                                            onClick={() => router.push(href)}
                                                            className={cn(
                                                                // Base styles with smooth transitions
                                                                "rcx-sidebar-item group w-full bg-transparent justify-start cursor-pointer",
                                                                "px-3 py-2.5 mx-2 rounded-lg transition-all duration-300 ease-in-out",
                                                                "relative overflow-hidden",

                                                                // Default state - subtle contrast with sidebar bg #1e1e42
                                                                "text-slate-300 hover:text-white",

                                                                // Hover state - complementary to sidebar background
                                                                "hover:bg-gradient-to-r hover:from-indigo-600/20 hover:to-purple-600/20",
                                                                "hover:shadow-lg hover:shadow-indigo-500/10",
                                                                "hover:scale-[1.01] hover:translate-x-0.5",
                                                                "hover:border-l-4 hover:border-indigo-400",
                                                                active && [
                                                                    "bg-gradient-to-r from-indigo-500/25 to-purple-500/25",
                                                                    "border-l-4 border-indigo-400",
                                                                    "text-white font-semibold",
                                                                    "shadow-lg shadow-indigo-500/20",
                                                                    "scale-[1.01] translate-x-0.5"
                                                                ].join(' ')
                                                            )}
                                                        >
                                                            {/* Background glow effect */}
                                                            <div
                                                                className={cn(
                                                                    "absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                                                    active && "opacity-100"
                                                                )}
                                                            />

                                                            <Icon
                                                                size={20}
                                                                className={cn(
                                                                    "min-w-[20px] mr-3 transition-all duration-300 ease-in-out relative z-10",
                                                                    "drop-shadow-sm",
                                                                    active
                                                                        ? "text-indigo-300 scale-110"
                                                                        : "text-slate-400 group-hover:text-indigo-300 group-hover:scale-110"
                                                                )}
                                                            />

                                                            <span
                                                                className={cn(
                                                                    "truncate transition-all duration-300 ease-in-out relative z-10",
                                                                    "drop-shadow-sm",
                                                                    active
                                                                        ? "text-white font-semibold"
                                                                        : "text-slate-300 group-hover:text-white group-hover:font-medium"
                                                                )}
                                                            >
                                                                {item.label}
                                                            </span>

                                                            {/* Active indicator dot */}
                                                            {active && (
                                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                                                            )}
                                                        </Button>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="flex items-center gap-2 rcx-bg-sidebar rcx-text-on-dark">
                                                    <Icon size={14} />{item.label}
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
