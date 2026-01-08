import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Calendar,
  RefreshCw,
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
} from "recharts";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRevenueData,
  useTopProducts,
  useCustomerDemographics,
  useTrafficSources,
  useDailyOrders,
  useKPIData,
} from "@/hooks/useAnalyticsData";
import {
  KPICardSkeleton,
  ChartSkeleton,
  PieChartSkeleton,
  BarChartSkeleton,
} from "@/components/admin/AnalyticsChartSkeleton";

/**
 * Analytics - Admin analytics and reporting page
 * 
 * Features:
 * - Real-time data refresh with React Query
 * - Loading skeletons for better UX
 * - Auto-refresh every 60 seconds
 * - Manual refresh button
 */

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
  const queryClient = useQueryClient();

  // Data fetching with React Query
  const { data: kpiData, isLoading: kpiLoading, isFetching: kpiFetching } = useKPIData(timeRange);
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData(timeRange);
  const { data: topProducts, isLoading: productsLoading } = useTopProducts(timeRange);
  const { data: demographics, isLoading: demographicsLoading } = useCustomerDemographics();
  const { data: trafficSources, isLoading: trafficLoading } = useTrafficSources();
  const { data: dailyOrders, isLoading: dailyOrdersLoading } = useDailyOrders();

  const isAnyLoading = kpiLoading || revenueLoading || productsLoading || 
                       demographicsLoading || trafficLoading || dailyOrdersLoading;

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["analytics"] });
  };

  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  // KPI cards configuration
  const kpiCards = kpiData ? [
    {
      title: "Total Revenue",
      value: formatCurrency(kpiData.totalRevenue),
      change: `${kpiData.revenueChange > 0 ? "+" : ""}${kpiData.revenueChange}%`,
      trend: kpiData.revenueChange >= 0 ? "up" : "down",
      icon: DollarSign,
      description: "vs. last period",
    },
    {
      title: "Total Orders",
      value: kpiData.totalOrders.toLocaleString(),
      change: `${kpiData.ordersChange > 0 ? "+" : ""}${kpiData.ordersChange}%`,
      trend: kpiData.ordersChange >= 0 ? "up" : "down",
      icon: ShoppingCart,
      description: "vs. last period",
    },
    {
      title: "New Customers",
      value: kpiData.newCustomers.toLocaleString(),
      change: `${kpiData.customersChange > 0 ? "+" : ""}${kpiData.customersChange}%`,
      trend: kpiData.customersChange >= 0 ? "up" : "down",
      icon: Users,
      description: "vs. last period",
    },
    {
      title: "Avg. Order Value",
      value: `$${kpiData.avgOrderValue.toFixed(2)}`,
      change: `${kpiData.aovChange > 0 ? "+" : ""}${kpiData.aovChange}%`,
      trend: kpiData.aovChange >= 0 ? "up" : "down",
      icon: Package,
      description: "vs. last period",
    },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your store's performance and customer insights.
            {!isAnyLoading && <span className="ml-2 text-xs">(Auto-refreshes every minute)</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            disabled={isAnyLoading}
            className="shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${kpiFetching ? "animate-spin" : ""}`} />
          </Button>
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
        {kpiLoading ? (
          <>
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
            <KPICardSkeleton />
          </>
        ) : (
          kpiCards.map((kpi) => (
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
          ))
        )}
      </div>

      {/* Revenue & Orders Chart */}
      {revenueLoading ? (
        <ChartSkeleton height={350} />
      ) : (
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
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        {productsLoading ? (
          <BarChartSkeleton height={300} />
        ) : (
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
        )}

        {/* Weekly Orders */}
        {dailyOrdersLoading ? (
          <ChartSkeleton height={300} />
        ) : (
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
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Demographics */}
        {demographicsLoading ? (
          <PieChartSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-display tracking-wider">Customer Demographics</CardTitle>
              <CardDescription>Age distribution of customers</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer config={chartConfig} className="h-[300px] w-full max-w-[400px]">
                <PieChart>
                  <Pie
                    data={demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {demographics?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {/* Traffic Sources */}
        {trafficLoading ? (
          <PieChartSkeleton />
        ) : (
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
                    {trafficSources?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Customer Growth */}
      {revenueLoading ? (
        <ChartSkeleton height={300} />
      ) : (
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
      )}
    </div>
  );
}
