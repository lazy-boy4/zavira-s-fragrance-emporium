import { useState } from "react";
import { Plus, MoreHorizontal, Edit, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { DiscountFormModal } from "@/components/admin/DiscountFormModal";
import { useToast } from "@/hooks/use-toast";

/**
 * DiscountList - Manage discount codes
 * 
 * Backend Integration:
 * - GET /api/admin/discounts - List discounts
 * - POST /api/admin/discounts - Create discount
 * - PATCH /api/admin/discounts/:id - Update discount
 * - DELETE /api/admin/discounts/:id - Delete discount
 */

const mockDiscounts = [
  {
    id: "disc_1",
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    usageCount: 45,
    usageLimit: 100,
    status: "active",
    expiresAt: "2025-01-31",
  },
  {
    id: "disc_2",
    code: "FREESHIP",
    type: "shipping",
    value: 0,
    usageCount: 120,
    usageLimit: null,
    status: "active",
    expiresAt: null,
  },
  {
    id: "disc_3",
    code: "HOLIDAY15",
    type: "percentage",
    value: 15,
    usageCount: 78,
    usageLimit: 200,
    status: "expired",
    expiresAt: "2024-12-25",
  },
];

export default function DiscountList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: `Discount code ${code} copied to clipboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Discounts</h1>
          <p className="text-muted-foreground mt-1">Manage discount codes and promotions</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Create Discount
        </Button>
      </div>

      <DiscountFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDiscounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {discount.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyCode(discount.code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{discount.type}</TableCell>
                  <TableCell>
                    {discount.type === "percentage" && `${discount.value}%`}
                    {discount.type === "fixed" && `$${discount.value}`}
                    {discount.type === "shipping" && "Free Shipping"}
                  </TableCell>
                  <TableCell>
                    {discount.usageCount}
                    {discount.usageLimit && ` / ${discount.usageLimit}`}
                  </TableCell>
                  <TableCell>
                    {discount.expiresAt || "No expiry"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={discount.status === "active"} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
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
