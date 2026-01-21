"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // Filter nav items based on user role
  const visibleItems = navItems.filter((item) => item.roles.includes(userRole));

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="relative h-8 w-auto aspect-[3/1]">
              <Image 
                src="/assets/zavira-logo.png" 
                alt="Zavira" 
                width={120} 
                height={40}
                className="h-8 w-auto object-contain invert dark:invert-0"
                priority
              />
            </div>
            <span className="font-display text-lg tracking-wider">ADMIN</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex flex-col gap-1 p-2 mt-2 flex-1 overflow-y-auto">
        {visibleItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors",
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-2 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title={collapsed ? "Back to Store" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {!collapsed && <span>Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
}
