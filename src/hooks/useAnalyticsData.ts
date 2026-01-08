import { useQuery } from "@tanstack/react-query";

/**
 * Analytics data types and fetching hooks
 * Using React Query for caching, refetching, and loading states
 */

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

export interface DemographicData {
  name: string;
  value: number;
  fill: string;
}

export interface DailyOrderData {
  day: string;
  orders: number;
  returns: number;
}

export interface KPIData {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  newCustomers: number;
  customersChange: number;
  avgOrderValue: number;
  aovChange: number;
}

// Simulate API delay for realistic loading states
const simulateApiCall = <T>(data: T, delay = 800): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

// Mock data generators - replace with actual API calls
const fetchRevenueData = async (): Promise<RevenueData[]> => {
  return simulateApiCall([
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
  ]);
};

const fetchTopProducts = async (): Promise<TopProduct[]> => {
  return simulateApiCall([
    { name: "Midnight Oud", sales: 1245, revenue: 186750 },
    { name: "Velvet Rose", sales: 987, revenue: 128310 },
    { name: "Essence Noir", sales: 856, revenue: 111280 },
    { name: "Primal Musk", sales: 734, revenue: 88080 },
    { name: "Golden Amber", sales: 623, revenue: 74760 },
  ], 600);
};

const fetchCustomerDemographics = async (): Promise<DemographicData[]> => {
  return simulateApiCall([
    { name: "18-24", value: 15, fill: "hsl(var(--chart-1))" },
    { name: "25-34", value: 35, fill: "hsl(var(--chart-2))" },
    { name: "35-44", value: 28, fill: "hsl(var(--chart-3))" },
    { name: "45-54", value: 15, fill: "hsl(var(--chart-4))" },
    { name: "55+", value: 7, fill: "hsl(var(--chart-5))" },
  ], 500);
};

const fetchTrafficSources = async (): Promise<DemographicData[]> => {
  return simulateApiCall([
    { name: "Organic Search", value: 42, fill: "hsl(var(--chart-1))" },
    { name: "Direct", value: 28, fill: "hsl(var(--chart-2))" },
    { name: "Social Media", value: 18, fill: "hsl(var(--chart-3))" },
    { name: "Email", value: 8, fill: "hsl(var(--chart-4))" },
    { name: "Referral", value: 4, fill: "hsl(var(--chart-5))" },
  ], 550);
};

const fetchDailyOrders = async (): Promise<DailyOrderData[]> => {
  return simulateApiCall([
    { day: "Mon", orders: 45, returns: 2 },
    { day: "Tue", orders: 52, returns: 3 },
    { day: "Wed", orders: 49, returns: 1 },
    { day: "Thu", orders: 63, returns: 4 },
    { day: "Fri", orders: 78, returns: 2 },
    { day: "Sat", orders: 89, returns: 5 },
    { day: "Sun", orders: 67, returns: 3 },
  ], 650);
};

const fetchKPIData = async (): Promise<KPIData> => {
  return simulateApiCall({
    totalRevenue: 345670,
    revenueChange: 23.5,
    totalOrders: 3890,
    ordersChange: 18.2,
    newCustomers: 2051,
    customersChange: 12.8,
    avgOrderValue: 88.86,
    aovChange: -2.3,
  }, 400);
};

// React Query hooks with auto-refresh
export const useRevenueData = (timeRange: string) => {
  return useQuery({
    queryKey: ["analytics", "revenue", timeRange],
    queryFn: fetchRevenueData,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};

export const useTopProducts = (timeRange: string) => {
  return useQuery({
    queryKey: ["analytics", "topProducts", timeRange],
    queryFn: fetchTopProducts,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
};

export const useCustomerDemographics = () => {
  return useQuery({
    queryKey: ["analytics", "demographics"],
    queryFn: fetchCustomerDemographics,
    staleTime: 5 * 60 * 1000, // 5 minutes - demographics change less frequently
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useTrafficSources = () => {
  return useQuery({
    queryKey: ["analytics", "trafficSources"],
    queryFn: fetchTrafficSources,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};

export const useDailyOrders = () => {
  return useQuery({
    queryKey: ["analytics", "dailyOrders"],
    queryFn: fetchDailyOrders,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
};

export const useKPIData = (timeRange: string) => {
  return useQuery({
    queryKey: ["analytics", "kpi", timeRange],
    queryFn: fetchKPIData,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
  });
};
