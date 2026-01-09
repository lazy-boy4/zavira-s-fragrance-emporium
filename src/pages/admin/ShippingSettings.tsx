import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Package,
  Truck,
  Globe,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

/**
 * ShippingSettings - Complete shipping configuration page
 * 
 * Features:
 * - Shipping zones management
 * - Shipping rates configuration
 * - Carrier settings
 * - Free shipping thresholds
 * - International shipping options
 * 
 * Backend Integration:
 * - GET /api/admin/shipping/zones - List shipping zones
 * - POST /api/admin/shipping/zones - Create zone
 * - PUT /api/admin/shipping/zones/:id - Update zone
 * - DELETE /api/admin/shipping/zones/:id - Delete zone
 * - GET /api/admin/shipping/rates - Get shipping rates
 * - PUT /api/admin/shipping/settings - Update shipping settings
 */

// Validation schemas
const shippingZoneSchema = z.object({
  name: z.string().min(1, "Zone name is required").max(100),
  countries: z.string().min(1, "At least one country is required"),
  baseRate: z.string().min(1, "Base rate is required"),
  freeShippingThreshold: z.string().optional(),
  estimatedDays: z.string().min(1, "Estimated delivery is required"),
});

type ShippingZoneFormData = z.infer<typeof shippingZoneSchema>;

// Mock data
// Bangladesh-focused shipping zones
const mockShippingZones = [
  {
    id: "zone_1",
    name: "Dhaka Metro",
    countries: ["Dhaka City", "Dhaka North", "Dhaka South"],
    baseRate: 60,
    freeShippingThreshold: 2000,
    estimatedDays: "1-2",
    isActive: true,
  },
  {
    id: "zone_2",
    name: "Dhaka Suburbs",
    countries: ["Gazipur", "Narayanganj", "Savar", "Tongi", "Keraniganj"],
    baseRate: 80,
    freeShippingThreshold: 2500,
    estimatedDays: "2-3",
    isActive: true,
  },
  {
    id: "zone_3",
    name: "Major Cities",
    countries: ["Chittagong", "Sylhet", "Rajshahi", "Khulna", "Comilla"],
    baseRate: 120,
    freeShippingThreshold: 3000,
    estimatedDays: "3-5",
    isActive: true,
  },
  {
    id: "zone_4",
    name: "All Bangladesh",
    countries: ["All other districts"],
    baseRate: 150,
    freeShippingThreshold: 4000,
    estimatedDays: "5-7",
    isActive: true,
  },
];

// Bangladesh delivery partners
const mockCarriers = [
  { 
    id: "steadfast", 
    name: "Steadfast Courier", 
    enabled: true, 
    trackingUrl: "https://steadfast.com.bd/tracking/",
    logo: "🚚",
    description: "Fast & reliable delivery across Bangladesh"
  },
  { 
    id: "pathao", 
    name: "Pathao Courier", 
    enabled: true, 
    trackingUrl: "https://courier.pathao.com/track/",
    logo: "🛵",
    description: "On-demand delivery with real-time tracking"
  },
  { 
    id: "redx", 
    name: "RedX", 
    enabled: false, 
    trackingUrl: "https://redx.com.bd/track/",
    logo: "📦",
    description: "Nationwide logistics network"
  },
  { 
    id: "sundarban", 
    name: "Sundarban Courier", 
    enabled: false, 
    trackingUrl: "https://sundarbancourier.com/tracking/",
    logo: "🚛",
    description: "Traditional courier with wide coverage"
  },
  { 
    id: "ecourier", 
    name: "eCourier", 
    enabled: false, 
    trackingUrl: "https://ecourier.com.bd/track/",
    logo: "📬",
    description: "E-commerce focused logistics"
  },
  { 
    id: "paperfly", 
    name: "Paperfly", 
    enabled: false, 
    trackingUrl: "https://paperfly.com.bd/tracking/",
    logo: "✈️",
    description: "Express delivery service"
  },
];

export default function ShippingSettings() {
  const { toast } = useToast();
  const [zones, setZones] = useState(mockShippingZones);
  const [carriers, setCarriers] = useState(mockCarriers);
  const [isZoneDialogOpen, setIsZoneDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<typeof mockShippingZones[0] | null>(null);
  const [globalFreeShipping, setGlobalFreeShipping] = useState(false);
  const [globalFreeShippingThreshold, setGlobalFreeShippingThreshold] = useState("100");

  const form = useForm<ShippingZoneFormData>({
    resolver: zodResolver(shippingZoneSchema),
    defaultValues: {
      name: "",
      countries: "",
      baseRate: "",
      freeShippingThreshold: "",
      estimatedDays: "",
    },
  });

  const openNewZoneDialog = () => {
    setEditingZone(null);
    form.reset({
      name: "",
      countries: "",
      baseRate: "",
      freeShippingThreshold: "",
      estimatedDays: "",
    });
    setIsZoneDialogOpen(true);
  };

  const openEditZoneDialog = (zone: typeof mockShippingZones[0]) => {
    setEditingZone(zone);
    form.reset({
      name: zone.name,
      countries: zone.countries.join(", "),
      baseRate: zone.baseRate.toString(),
      freeShippingThreshold: zone.freeShippingThreshold?.toString() || "",
      estimatedDays: zone.estimatedDays,
    });
    setIsZoneDialogOpen(true);
  };

  const onSaveZone = (data: ShippingZoneFormData) => {
    if (editingZone) {
      // Update existing zone
      setZones(zones.map(z => 
        z.id === editingZone.id 
          ? {
              ...z,
              name: data.name,
              countries: data.countries.split(",").map(c => c.trim()),
              baseRate: parseFloat(data.baseRate),
              freeShippingThreshold: data.freeShippingThreshold ? parseFloat(data.freeShippingThreshold) : null,
              estimatedDays: data.estimatedDays,
            }
          : z
      ));
      toast({ title: "Shipping zone updated" });
    } else {
      // Create new zone
      const newZone = {
        id: `zone_${Date.now()}`,
        name: data.name,
        countries: data.countries.split(",").map(c => c.trim()),
        baseRate: parseFloat(data.baseRate),
        freeShippingThreshold: data.freeShippingThreshold ? parseFloat(data.freeShippingThreshold) : null,
        estimatedDays: data.estimatedDays,
        isActive: true,
      };
      setZones([...zones, newZone]);
      toast({ title: "Shipping zone created" });
    }
    setIsZoneDialogOpen(false);
  };

  const deleteZone = (zoneId: string) => {
    setZones(zones.filter(z => z.id !== zoneId));
    toast({ title: "Shipping zone deleted" });
  };

  const toggleZoneActive = (zoneId: string) => {
    setZones(zones.map(z => 
      z.id === zoneId ? { ...z, isActive: !z.isActive } : z
    ));
  };

  const toggleCarrier = (carrierId: string) => {
    setCarriers(carriers.map(c => 
      c.id === carrierId ? { ...c, enabled: !c.enabled } : c
    ));
    toast({ title: "Carrier settings updated" });
  };

  const saveGlobalSettings = () => {
    // TODO: API call to save settings
    toast({ title: "Shipping settings saved" });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Shipping</h1>
          <p className="text-muted-foreground mt-1">
            Configure shipping zones, rates, and carriers
          </p>
        </div>
        <Button onClick={saveGlobalSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Global shipping settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Global Settings
          </CardTitle>
          <CardDescription>
            Configure global shipping options that apply across all zones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Free Shipping</p>
              <p className="text-sm text-muted-foreground">
                Offer free shipping on orders above a certain amount
              </p>
            </div>
            <Switch 
              checked={globalFreeShipping} 
              onCheckedChange={setGlobalFreeShipping} 
            />
          </div>
          
          {globalFreeShipping && (
            <div className="pl-4 border-l-2 border-primary/20">
              <Label htmlFor="threshold">Free Shipping Threshold ($)</Label>
              <Input
                id="threshold"
                type="number"
                value={globalFreeShippingThreshold}
                onChange={(e) => setGlobalFreeShippingThreshold(e.target.value)}
                className="mt-2 max-w-[200px]"
                placeholder="100"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Orders above ${globalFreeShippingThreshold} qualify for free shipping
              </p>
            </div>
          )}

          <Separator />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Packaging</Label>
              <Select defaultValue="box">
                <SelectTrigger>
                  <SelectValue placeholder="Select packaging" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="box">Standard Box</SelectItem>
                  <SelectItem value="gift">Gift Box</SelectItem>
                  <SelectItem value="envelope">Padded Envelope</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Order Processing Time</Label>
              <Select defaultValue="1-2">
                <SelectTrigger>
                  <SelectValue placeholder="Select processing time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same">Same Day</SelectItem>
                  <SelectItem value="1-2">1-2 Business Days</SelectItem>
                  <SelectItem value="2-3">2-3 Business Days</SelectItem>
                  <SelectItem value="3-5">3-5 Business Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping zones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-display flex items-center gap-2">
              <Package className="h-5 w-5" />
              Shipping Zones
            </CardTitle>
            <CardDescription>
              Define shipping rates for different regions
            </CardDescription>
          </div>
          <Button onClick={openNewZoneDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Zone
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Countries</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Free Shipping</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {zones.map((zone) => (
                <TableRow key={zone.id}>
                  <TableCell className="font-medium">{zone.name}</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {zone.countries.slice(0, 2).join(", ")}
                      {zone.countries.length > 2 && ` +${zone.countries.length - 2} more`}
                    </span>
                  </TableCell>
                  <TableCell>${zone.baseRate.toFixed(2)}</TableCell>
                  <TableCell>
                    {zone.freeShippingThreshold 
                      ? `$${zone.freeShippingThreshold}+` 
                      : <span className="text-muted-foreground">—</span>
                    }
                  </TableCell>
                  <TableCell>{zone.estimatedDays} days</TableCell>
                  <TableCell>
                    <Switch 
                      checked={zone.isActive} 
                      onCheckedChange={() => toggleZoneActive(zone.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditZoneDialog(zone)} className="gap-2">
                          <Edit className="h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteZone(zone.id)} 
                          className="gap-2 text-destructive"
                        >
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

      {/* Carriers */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Carriers
          </CardTitle>
          <CardDescription>
            Enable carriers and configure tracking URLs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {carriers.map((carrier) => (
              <div key={carrier.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Switch 
                    checked={carrier.enabled} 
                    onCheckedChange={() => toggleCarrier(carrier.id)}
                  />
                  <div>
                    <p className="font-medium">{carrier.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {carrier.trackingUrl}
                    </p>
                  </div>
                </div>
                <Badge variant={carrier.enabled ? "default" : "secondary"}>
                  {carrier.enabled ? "Active" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zone Dialog */}
      <Dialog open={isZoneDialogOpen} onOpenChange={setIsZoneDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingZone ? "Edit Shipping Zone" : "Add Shipping Zone"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSaveZone)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Zone Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="e.g., Domestic, Europe"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="countries">Countries</Label>
              <Textarea
                id="countries"
                {...form.register("countries")}
                placeholder="United States, Canada (comma separated)"
                rows={3}
              />
              {form.formState.errors.countries && (
                <p className="text-sm text-destructive">{form.formState.errors.countries.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="baseRate">Base Rate ($)</Label>
                <Input
                  id="baseRate"
                  type="number"
                  step="0.01"
                  {...form.register("baseRate")}
                  placeholder="5.99"
                />
                {form.formState.errors.baseRate && (
                  <p className="text-sm text-destructive">{form.formState.errors.baseRate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  step="0.01"
                  {...form.register("freeShippingThreshold")}
                  placeholder="100 (optional)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDays">Estimated Delivery</Label>
              <Input
                id="estimatedDays"
                {...form.register("estimatedDays")}
                placeholder="3-5"
              />
              {form.formState.errors.estimatedDays && (
                <p className="text-sm text-destructive">{form.formState.errors.estimatedDays.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsZoneDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingZone ? "Save Changes" : "Create Zone"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
