import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  Package,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * OrderList - Admin order management page
 * 
 * Features:
 * - Order table with filtering
 * - Status updates
 * - Bulk actions
 * - Order export
 * 
 * Backend Integration:
 * - GET /api/admin/orders - List orders with pagination
 * - PATCH /api/admin/orders/:id/status - Update order status
 * - GET /api/admin/orders/export - Export orders CSV
 */

const mockOrders = [
  {
    id: "ZAV-2847",
    customer: { name: "John Smith", email: "john@example.com" },
    items: 2,
    total: 285.00,
    status: "processing",
    payment: "paid",
    date: "2024-12-26",
  },
  {
    id: "ZAV-2846",
    customer: { name: "Emma Wilson", email: "emma@example.com" },
    items: 1,
    total: 145.00,
    status: "shipped",
    payment: "paid",
    date: "2024-12-26",
  },
  {
    id: "ZAV-2845",
    customer: { name: "Michael Brown", email: "michael@example.com" },
    items: 3,
    total: 430.00,
    status: "delivered",
    payment: "paid",
    date: "2024-12-25",
  },
  {
    id: "ZAV-2844",
    customer: { name: "Sarah Davis", email: "sarah@example.com" },
    items: 1,
    total: 95.00,
    status: "pending",
    payment: "pending",
    date: "2024-12-25",
  },
  {
    id: "ZAV-2843",
    customer: { name: "James Johnson", email: "james@example.com" },
    items: 2,
    total: 210.00,
    status: "cancelled",
    payment: "refunded",
    date: "2024-12-24",
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-destructive/10 text-destructive",
};

const paymentColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  paid: "bg-green-500/10 text-green-500",
  refunded: "bg-muted text-muted-foreground",
};

export default function OrderList() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleSelectAll = () => {
    if (selectedOrders.length === mockOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(mockOrders.map((o) => o.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    // Generate CSV content
    const headers = ["Order ID", "Customer", "Email", "Items", "Total", "Status", "Payment", "Date"];
    const rows = filteredOrders.map(order => [
      order.id,
      order.customer.name,
      order.customer.email,
      order.items.toString(),
      `$${order.total.toFixed(2)}`,
      order.status,
      order.payment,
      order.date,
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer orders and fulfillment
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => handleExport()}>
          <Printer className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {selectedOrders.length > 0 && (
            <div className="flex items-center gap-4 mt-4 p-3 bg-muted rounded">
              <span className="text-sm">{selectedOrders.length} selected</span>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button variant="outline" size="sm">
                Print Labels
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedOrders.length === mockOrders.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Order <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Total <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleSelect(order.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <NavLink
                      to={`/admin/orders/${order.id}`}
                      className="font-medium hover:underline"
                    >
                      #{order.id}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={paymentColors[order.payment]}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <NavLink to={`/admin/orders/${order.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> View Details
                          </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Package className="h-4 w-4" /> Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Printer className="h-4 w-4" /> Print Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
