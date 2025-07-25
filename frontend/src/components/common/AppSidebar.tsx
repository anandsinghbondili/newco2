import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import DynamicSidebar from "./DynamicSidebar";
import DynamicSidebarFooter from "./DynamicFooter";

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon" className="rcx-bg-sidebar">
            <SidebarHeader className="py-4 rcx-bg-header bg-[#1e1e42]">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Image
                                    src="/Recaptix_Logo.png"
                                    alt="Logo"
                                    width={250}
                                    height={180}
                                    className="mx-auto rounded-full bg-[#1e1e42]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <DynamicSidebar />
            <DynamicSidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;