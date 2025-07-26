// DynamicSidebarFooter.tsx
// Shows group labels and items from /public/data/SettingsMenu.json.
// The dropdown pops out to the right of the sidebar.

"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Settings2 } from "lucide-react";

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

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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
                  <DropdownMenuLabel className="text-xs font-medium uppercase tracking-wide rcx-text-secondary rcx-bg-header px-3 py-2">
                    {section.title}
                  </DropdownMenuLabel>

                  {/* Items under group */}
                  {section.items.map((item) => (
                    <DropdownMenuItem asChild key={item.routeId}>
                      <Button
                        type="button"
                        onClick={() => {
                          if (item.routeId === "logout") {
                            localStorage.removeItem("access_token");
                            router.push("/login");
                          } else {
                            router.push(`/${item.routeId}`);
                          }
                        }}
                        className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium rcx-text-secondary hover:rcx-bg-subtle hover:rcx-text-primary transition-colors bg-transparent justify-start cursor-pointer ${
                          item.routeId === "logout"
                            ? "rcx-text-destructive"
                            : "rcx-text-secondary"
                        }`}
                      >
                        {item.label}
                      </Button>
                    </DropdownMenuItem>
                  ))}

                  {/* Divider between groups */}
                  {index < settings.length - 1 && (
                    <DropdownMenuSeparator className="rcx-border-light" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
