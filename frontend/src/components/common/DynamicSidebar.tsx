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
} from "lucide-react";

// ShadCN sidebar primitives
import {
    Sidebar,
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
            <Sidebar className="w-64 shrink-0 border-r bg-background" /> // simple skeleton
        );
    }

    return (
        <SidebarContent className="flex-1 overflow-y-auto">
            {navData.map((section) => (
                <SidebarGroup key={section.title}>
                    <SidebarGroupLabel className="px-4 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.title}
                    </SidebarGroupLabel>
                    <TooltipProvider delayDuration={100}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    const Icon = iconMap[item.icon] ?? LayoutDashboard;
                                    const href = `/${item.routeId}`;
                                    const active = pathname.startsWith(href);
                                    return (
                                        <SidebarMenuItem key={item.routeId} className="px-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link
                                                            href={href}
                                                            className={cn(
                                                                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                                                active
                                                                    ? "bg-accent text-accent-foreground"
                                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                            )}
                                                        >
                                                            <Icon
                                                                size={16}
                                                                className="opacity-70 transition-opacity group-hover:opacity-100"
                                                            />
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="flex items-center gap-2">
                                                    <Icon size={14} />
                                                    {item.label}
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
