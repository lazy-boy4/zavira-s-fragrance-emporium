import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

/**
 * Dashboard - Admin overview page
 * 
 * Displays:
 * - Key metrics (revenue, orders, products, customers)
 * - Recent orders
 * - Quick actions
 * - Sales chart (placeholder)
 * 
 * Backend Integration:
 * - GET /api/admin/stats - Dashboard metrics
 * - GET /api/admin/orders?limit=5 - Recent orders
 * - GET /api/admin/analytics/sales - Sales data for chart
 */

// Mock data - replace with API calls
const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "356",
    change: "+12.5%",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Products",
    value: "24",
    change: "+3",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Customers",
    value: "1,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: Users,
  },
];

const recentOrders = [
  { id: "ZAV-2847", customer: "John Smith", total: "$285.00", status: "Processing", date: "Today" },
  { id: "ZAV-2846", customer: "Emma Wilson", total: "$145.00", status: "Shipped", date: "Today" },
  { id: "ZAV-2845", customer: "Michael Brown", total: "$430.00", status: "Delivered", date: "Yesterday" },
  { id: "ZAV-2844", customer: "Sarah Davis", total: "$95.00", status: "Processing", date: "Yesterday" },
  { id: "ZAV-2843", customer: "James Johnson", total: "$210.00", status: "Delivered", date: "Dec 24" },
];

const quickActions = [
  { label: "Add Product", path: "/admin/products/new" },
  { label: "Create Discount", path: "/admin/discounts/new" },
  { label: "View Analytics", path: "/admin/analytics" },
  { label: "Manage Team", path: "/admin/team" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display tracking-wider">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back. Here's what's happening with your store.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display tracking-wider">Recent Orders</CardTitle>
            <NavLink to="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowUpRight className="h-4 w-4" />
              </Button>
            </NavLink>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      order.status === "Delivered"
                        ? "bg-green-500/10 text-green-500"
                        : order.status === "Shipped"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display tracking-wider">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <NavLink key={action.path} to={action.path} className="block">
                <Button variant="outline" className="w-full justify-start">
                  {action.label}
                </Button>
              </NavLink>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
