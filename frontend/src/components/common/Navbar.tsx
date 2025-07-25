"use client";

import { LogOut, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// import { Button } from "../ui/button";
// import { useTheme } from "next-themes";
import { SidebarTrigger } from "../ui/sidebar";
import { showSuccessToast } from "../ext/window/RCXToaster";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const Navbar = () => {
    // const { setTheme } = useTheme();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("user");
        sessionStorage.clear();
        showSuccessToast("Logout successful");
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    };

    const handleSettings = () => {
        router.push("/settings");
    };

    const handleProfile = () => {
        router.push("/profile");
    };

    return (
        <nav className="px-3 py-2 flex items-center justify-between sticky top-0 z-10 pb-3 mb-3 bg-[#f8fafb] shadow-md">
            {/* LEFT */}
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                {/* SEARCH */}
                <div className="relative max-w-sm w-64">
                    <Search className="absolute left-2 top-2 h-3.5 w-3.5" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-7 py-1 w-[400px] bg-transparent border-0 h-8 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>
            </div>
            {/* RIGHT */}
            <div className="flex items-center gap-2">
                {/* THEME MENU */}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="text-sm">
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
                </DropdownMenu> */}
                {/* USER MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatar_shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={8} className="text-sm w-40">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleProfile}>
                            <User className="h-4 w-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSettings}>
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/30"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;