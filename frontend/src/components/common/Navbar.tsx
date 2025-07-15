"use client";

import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "../ui/sidebar";
import { showSuccessToast } from "../ext/window/Toaster";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { setTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        sessionStorage.clear();

        showSuccessToast("Logout successful");

        setTimeout(
            () => {
                window.location.href = "/";
            },
            500
        );
    };

    const handleSettings = () => {
        router.push("/settings");
    };

    const handleProfile = () => {
        router.push("/profile");
    };

    return (
        <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">
            {/* LEFT */}
            <SidebarTrigger />
            {/* RIGHT */}
            <div className="flex items-center gap-4">
                {/* THEME MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* USER MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleProfile}>
                            <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSettings}>
                            <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/30"
                        >
                            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;