import { Sidebar, SidebarHeader } from "../ui/sidebar";
import Image from "next/image";
import DynamicSidebar from "./DynamicSidebar";
import DynamicSidebarFooter from "./DynamicFooter";
import { Separator } from "../ui/separator";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="rcx-bg-sidebar">
      <SidebarHeader className="rcx-bg-header bg-[#1e1e42] p-0">
        <div className="flex justify-center items-center">
          <Image
            src="/app_logo_home.png"
            alt="Logo"
            width={300}
            height={300}
            className="mx-auto bg-[#1e1e42]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </SidebarHeader>
      <Separator className="bg-gray-200" />
      <DynamicSidebar />
      <DynamicSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
