import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { cn } from "@/lib/utils";

/**
 * AdminLayout - Main layout wrapper for admin dashboard
 * 
 * Structure:
 * - Fixed sidebar on left (collapsible)
 * - Header at top with search and user menu
 * - Main content area with Outlet for nested routes
 * 
 * Backend Integration:
 * - Wrap with AuthProvider/AdminAuthGuard
 * - Fetch user role on mount to pass to sidebar
 */

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Replace with actual user role from auth context
  const userRole: "owner" | "manager" | "staff" = "owner";

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar userRole={userRole} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className={cn("lg:pl-64 min-h-screen flex flex-col transition-all duration-300")}>
        <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
