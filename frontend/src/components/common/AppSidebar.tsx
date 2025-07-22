
import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import DynamicSidebar from "./DynamicSidebar";
import DynamicSidebarFooter from "./DynamicFooter";

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Image
                                    src="/newco_logo.png"
                                    alt="Logo"
                                    width={150}
                                    height={150}
                                    className="mx-auto rounded-full"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <DynamicSidebar />
            <DynamicSidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;