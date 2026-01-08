import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/**
 * Analytics - Admin analytics and reporting page
 * 
 * Displays:
 * - Revenue trends over time
 * - Order statistics
 * - Top selling products
 * - Customer demographics
 * - Traffic sources
 * 
 * Backend Integration:
 * - GET /api/admin/analytics/revenue - Revenue data
 * - GET /api/admin/analytics/orders - Order statistics
 * - GET /api/admin/analytics/products - Top products
 * - GET /api/admin/analytics/customers - Customer insights
 */

// Mock data - replace with API calls
const revenueData = [
  { month: "Jan", revenue: 12500, orders: 145, customers: 89 },
  { month: "Feb", revenue: 15200, orders: 168, customers: 102 },
  { month: "Mar", revenue: 18900, orders: 198, customers: 134 },
  { month: "Apr", revenue: 16800, orders: 175, customers: 118 },
  { month: "May", revenue: 22400, orders: 234, customers: 156 },
  { month: "Jun", revenue: 28100, orders: 289, customers: 189 },
  { month: "Jul", revenue: 31500, orders: 312, customers: 210 },
  { month: "Aug", revenue: 29800, orders: 298, customers: 198 },
  { month: "Sep", revenue: 34200, orders: 345, customers: 223 },
  { month: "Oct", revenue: 38900, orders: 389, customers: 256 },
  { month: "Nov", revenue: 42100, orders: 412, customers: 278 },
  { month: "Dec", revenue: 45200, orders: 445, customers: 298 },
];

const topProducts = [
  { name: "Midnight Oud", sales: 1245, revenue: 186750 },
  { name: "Velvet Rose", sales: 987, revenue: 128310 },
  { name: "Essence Noir", sales: 856, revenue: 111280 },
  { name: "Primal Musk", sales: 734, revenue: 88080 },
  { name: "Golden Amber", sales: 623, revenue: 74760 },
];

const customerDemographics = [
  { name: "18-24", value: 15, fill: "hsl(var(--chart-1))" },
  { name: "25-34", value: 35, fill: "hsl(var(--chart-2))" },
  { name: "35-44", value: 28, fill: "hsl(var(--chart-3))" },
  { name: "45-54", value: 15, fill: "hsl(var(--chart-4))" },
  { name: "55+", value: 7, fill: "hsl(var(--chart-5))" },
];

const trafficSources = [
  { name: "Organic Search", value: 42, fill: "hsl(var(--chart-1))" },
  { name: "Direct", value: 28, fill: "hsl(var(--chart-2))" },
  { name: "Social Media", value: 18, fill: "hsl(var(--chart-3))" },
  { name: "Email", value: 8, fill: "hsl(var(--chart-4))" },
  { name: "Referral", value: 4, fill: "hsl(var(--chart-5))" },
];

const dailyOrders = [
  { day: "Mon", orders: 45, returns: 2 },
  { day: "Tue", orders: 52, returns: 3 },
  { day: "Wed", orders: 49, returns: 1 },
  { day: "Thu", orders: 63, returns: 4 },
  { day: "Fri", orders: 78, returns: 2 },
  { day: "Sat", orders: 89, returns: 5 },
  { day: "Sun", orders: 67, returns: 3 },
];

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$345,670",
    change: "+23.5%",
    trend: "up" as const,
    icon: DollarSign,
    description: "vs. last period",
  },
  {
    title: "Total Orders",
    value: "3,890",
    change: "+18.2%",
    trend: "up" as const,
    icon: ShoppingCart,
    description: "vs. last period",
  },
  {
    title: "New Customers",
    value: "2,051",
    change: "+12.8%",
    trend: "up" as const,
    icon: Users,
    description: "vs. last period",
  },
  {
    title: "Avg. Order Value",
    value: "$88.86",
    change: "-2.3%",
    trend: "down" as const,
    icon: Package,
    description: "vs. last period",
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-3))",
  },
  returns: {
    label: "Returns",
    color: "hsl(var(--chart-4))",
  },
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("12m");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your store's performance and customer insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{kpi.value}</div>
              <div className="flex items-center text-xs mt-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                )}
                <span className={kpi.trend === "up" ? "text-green-500" : "text-destructive"}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground ml-1">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display tracking-wider">Revenue & Orders Overview</CardTitle>
          <CardDescription>Monthly revenue and order trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `$${value / 1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                name="Orders"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display tracking-wider">Top Selling Products</CardTitle>
            <CardDescription>Best performers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} name="Revenue ($)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display tracking-wider">Weekly Order Pattern</CardTitle>
            <CardDescription>Orders and returns by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={dailyOrders} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="orders" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Orders" />
                <Bar dataKey="returns" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} name="Returns" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display tracking-wider">Customer Demographics</CardTitle>
            <CardDescription>Age distribution of customers</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[400px]">
              <PieChart>
                <Pie
                  data={customerDemographics}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {customerDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display tracking-wider">Traffic Sources</CardTitle>
            <CardDescription>Where your customers come from</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[400px]">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display tracking-wider">Customer Growth</CardTitle>
          <CardDescription>New customer acquisition over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2 }}
                name="New Customers"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
