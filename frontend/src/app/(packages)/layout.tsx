import AppSidebar from "@/components/common/AppSidebar";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
// import AuthGuard from "@/components/auth/AuthGuard";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <AuthGuard> */}
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="px-4">{children}</div>
        </main>
      </SidebarProvider>
      {/* </AuthGuard> */}
    </ThemeProvider>
  );
}
