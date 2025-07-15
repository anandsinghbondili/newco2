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
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <Settings2 className="mr-2" /> App Settings
                                <ChevronUp className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="right"        /* pop out adjacent to the sidebar */
                            align="start"
                            className="w-56"
                        >
                            {settings?.map((section, index) => (
                                <div key={section.title}>
                                    {/* Group label */}
                                    <DropdownMenuLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {section.title}
                                    </DropdownMenuLabel>

                                    {/* Items under group */}
                                    {section.items.map((item) => (
                                        <DropdownMenuItem asChild key={item.routeId}>
                                            <Link href={`/${item.routeId}`} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors">
                                                {item.label}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}

                                    {/* Divider between groups */}
                                    {index < (settings.length - 1) && <DropdownMenuSeparator />}
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
