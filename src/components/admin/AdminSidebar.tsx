import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  FolderOpen,
  UserCog,
  BarChart3,
  Tag,
  Truck,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import zaviraLogo from "@/assets/zavira-logo.png";

/**
 * AdminSidebar - Main navigation for admin dashboard
 * 
 * Features:
 * - Collapsible sidebar with icon-only mode
 * - Active route highlighting
 * - Role-based menu visibility (handled by parent)
 * 
 * Backend Integration:
 * - User role determines visible menu items
 * - Permissions fetched from /api/admin/me endpoint
 */

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  /** Roles that can see this item: 'owner' | 'manager' | 'staff' */
  roles: string[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, roles: ["owner", "manager", "staff"] },
  { label: "Products", path: "/admin/products", icon: Package, roles: ["owner", "manager"] },
  { label: "Collections", path: "/admin/collections", icon: FolderOpen, roles: ["owner", "manager"] },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart, roles: ["owner", "manager", "staff"] },
  { label: "Customers", path: "/admin/customers", icon: Users, roles: ["owner", "manager"] },
  { label: "Discounts", path: "/admin/discounts", icon: Tag, roles: ["owner", "manager"] },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3, roles: ["owner", "manager"] },
  { label: "Landing Page", path: "/admin/landing-page", icon: FileText, roles: ["owner", "manager"] },
  { label: "Content", path: "/admin/content", icon: FileText, roles: ["owner", "manager"] },
  { label: "Shipping", path: "/admin/shipping", icon: Truck, roles: ["owner"] },
  { label: "Delivery", path: "/admin/delivery", icon: Truck, roles: ["owner", "manager"] },
  { label: "Payments", path: "/admin/payments", icon: Settings, roles: ["owner"] },
  { label: "Team", path: "/admin/team", icon: UserCog, roles: ["owner"] },
  { label: "Settings", path: "/admin/settings", icon: Settings, roles: ["owner"] },
  { label: "Help", path: "/admin/help", icon: HelpCircle, roles: ["owner", "manager", "staff"] },
];

interface AdminSidebarProps {
  /** Current user's role for filtering menu items */
  userRole?: "owner" | "manager" | "staff";
}

export default function AdminSidebar({ userRole = "owner" }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Filter nav items based on user role
  const visibleItems = navItems.filter((item) => item.roles.includes(userRole));

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-midnight-surface border-r border-bronze/20 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-bronze/20">
        {!collapsed && (
          <NavLink to="/admin" className="flex items-center gap-2">
            <img src={zaviraLogo} alt="Zavira" className="h-8 w-auto" />
            <span className="font-serif-display italic text-lg text-bronze">Atelier</span>
          </NavLink>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-bronze hover:text-bronze hover:bg-bronze/10"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation - Scrollable area */}
      <nav className="flex flex-col gap-1 p-2 mt-2 flex-1 overflow-y-auto">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "relative flex items-center gap-3 px-3 py-2.5 text-xs font-sans-luxury uppercase tracking-[0.2em] transition-colors",
              isActive(item.path)
                ? "text-bronze before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-bronze"
                : "text-ivory/60 hover:text-bronze"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer - Fix for overlap on smaller screens */}
      <div className="mt-auto p-2 border-t border-bronze/20">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 text-xs font-sans-luxury uppercase tracking-[0.2em] text-ivory/60 hover:text-bronze transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Back to Store</span>}
        </NavLink>
      </div>
    </aside>
  );
}
