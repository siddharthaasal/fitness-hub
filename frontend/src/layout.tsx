import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen">
                <AppSidebar />
                <SidebarTrigger />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto pt-[72px] px-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
