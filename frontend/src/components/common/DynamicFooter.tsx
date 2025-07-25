// DynamicSidebarFooter.tsx
// Shows group labels and items from /public/data/SettingsMenu.json.
// The dropdown pops out to the right of the sidebar.

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronUp,
    Settings2,
} from "lucide-react";

import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface SettingsItem {
    routeId: string;
    label: string;
    icon?: string;
}

interface SettingsSection {
    title: string;
    items: SettingsItem[];
}

export default function DynamicSidebarFooter() {
    const [settings, setSettings] = useState<SettingsSection[] | null>(null);

    // Load settings JSON on mount.
    useEffect(() => {
        fetch("/data/SettingsMenu.json")
            .then((res) => res.json())
            .then((data: SettingsSection[]) => setSettings(data))
            .catch((e) => {
                console.error("Failed to load SettingsMenu.json", e);
                setSettings([]);
            });
    }, []);

    return (
        <SidebarFooter className="rcx-bg-sidebar pb-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="rcx-sidebar-item">
                                <Settings2 className="min-w-[16px] rcx-text-on-dark group-hover:rcx-text-on-primary" />
                                <span className="truncate">App Settings</span>
                                <ChevronUp className="ml-auto rcx-text-on-dark group-hover:rcx-text-on-primary" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="right"
                            align="start"
                            className="w-56 rcx-bg-header rcx-border-light z-10 shadow-lg"
                        >
                            {settings?.map((section, index) => (
                                <div key={section.title}>
                                    {/* Group label */}
                                    <DropdownMenuLabel
                                        className="text-xs font-medium uppercase tracking-wide rcx-text-secondary rcx-bg-header px-3 py-2"
                                    >
                                        {section.title}
                                    </DropdownMenuLabel>

                                    {/* Items under group */}
                                    {section.items.map((item) => (
                                        <DropdownMenuItem asChild key={item.routeId}>
                                            <Link
                                                href={`/${item.routeId}`}
                                                className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium rcx-text-secondary hover:rcx-bg-subtle hover:rcx-text-primary transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}

                                    {/* Divider between groups */}
                                    {index < (settings.length - 1) && <DropdownMenuSeparator className="rcx-border-light" />}
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
