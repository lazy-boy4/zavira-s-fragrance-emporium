import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
 * ProductList - Admin product management page
 * 
 * Features:
 * - Product table with sorting and filtering
 * - Bulk actions (delete, update status)
 * - Quick edit actions
 * - Search and category filter
 * 
 * Backend Integration:
 * - GET /api/admin/products - List products with pagination
 * - DELETE /api/admin/products/:id - Delete product
 * - PATCH /api/admin/products/:id - Update product
 * - POST /api/admin/products/:id/duplicate - Duplicate product
 */

// Mock data - replace with API call
const mockProducts = [
  {
    id: "prod_1",
    name: "Zavira Primal",
    sku: "ZAV-PRM-50",
    price: 145.00,
    stock: 24,
    category: "For Him",
    status: "active",
    image: "/src/assets/product-primal.jpg",
  },
  {
    id: "prod_2",
    name: "Midnight Essence",
    sku: "ZAV-MNE-50",
    price: 165.00,
    stock: 18,
    category: "Unisex",
    status: "active",
    image: "/src/assets/product-midnight.jpg",
  },
  {
    id: "prod_3",
    name: "Velvet Rose",
    sku: "ZAV-VLR-50",
    price: 185.00,
    stock: 5,
    category: "For Her",
    status: "low_stock",
    image: "/src/assets/product-velvet.jpg",
  },
  {
    id: "prod_4",
    name: "Pure Essence",
    sku: "ZAV-PES-50",
    price: 125.00,
    stock: 0,
    category: "Unisex",
    status: "out_of_stock",
    image: "/src/assets/product-essence.jpg",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-500",
  low_stock: "bg-yellow-500/10 text-yellow-500",
  out_of_stock: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
  draft: "Draft",
};

export default function ProductList() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const toggleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(mockProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your perfume collection
          </p>
        </div>
        <NavLink to="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </NavLink>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="For Him">For Him</SelectItem>
                <SelectItem value="For Her">For Her</SelectItem>
                <SelectItem value="Unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Bulk actions */}
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-4 mt-4 p-3 bg-muted rounded">
              <span className="text-sm">
                {selectedProducts.length} selected
              </span>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === mockProducts.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Price <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3">
                    Stock <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[product.status]}>
                      {statusLabels[product.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <NavLink to={`/admin/products/${product.id}`} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" /> Edit
                          </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" /> View on Store
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Copy className="h-4 w-4" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" /> Delete
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
