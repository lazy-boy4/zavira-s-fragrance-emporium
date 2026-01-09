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
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <NavLink to="/admin" className="flex items-center gap-2">
            <img src={zaviraLogo} alt="Zavira" className="h-8 w-auto invert dark:invert-0" />
            <span className="font-display text-lg tracking-wider">ADMIN</span>
          </NavLink>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-2 mt-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Back to Store</span>}
        </NavLink>
      </div>
    </aside>
  );
}
