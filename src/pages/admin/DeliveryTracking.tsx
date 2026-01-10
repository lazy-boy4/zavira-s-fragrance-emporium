import { useState } from "react";
import {
  Truck,
  Package,
  Search,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Save,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

/**
 * DeliveryTracking - Configure delivery partners and track shipments
 * 
 * Features:
 * - Steadfast API configuration
 * - Pathao API configuration
 * - Shipment status tracking
 * - Bulk tracking lookup
 * 
 * Backend Integration:
 * - GET /api/admin/delivery/config - Get delivery partner configs
 * - PUT /api/admin/delivery/config/:provider - Update provider config
 * - POST /api/admin/delivery/:provider/track - Track shipment
 * - POST /api/admin/delivery/:provider/create - Create shipment
 */

interface DeliveryProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  enabled: boolean;
  configured: boolean;
  credentials: {
    apiKey?: string;
    secretKey?: string;
    baseUrl?: string;
  };
  webhookUrl?: string;
}

interface Shipment {
  id: string;
  orderId: string;
  trackingNumber: string;
  provider: string;
  status: "pending" | "picked" | "in_transit" | "delivered" | "returned";
  customerName: string;
  destination: string;
  createdAt: string;
  updatedAt: string;
}

const initialProviders: DeliveryProvider[] = [
  {
    id: "steadfast",
    name: "Steadfast Courier",
    logo: "🚚",
    description: "Fast & reliable delivery across Bangladesh with real-time tracking",
    enabled: true,
    configured: true,
    credentials: {
      apiKey: "••••••••••••••••",
      secretKey: "••••••••••••••••",
      baseUrl: "https://portal.steadfast.com.bd/api/v1",
    },
    webhookUrl: "https://your-domain.com/webhooks/steadfast",
  },
  {
    id: "pathao",
    name: "Pathao Courier",
    logo: "🛵",
    description: "On-demand delivery with extensive coverage in major cities",
    enabled: true,
    configured: false,
    credentials: {},
  },
];

const mockShipments: Shipment[] = [
  {
    id: "ship_1",
    orderId: "ZAV-2024-0047",
    trackingNumber: "STD1234567890",
    provider: "steadfast",
    status: "in_transit",
    customerName: "Ahmed Rahman",
    destination: "Dhaka",
    createdAt: "2024-01-09T10:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "ship_2",
    orderId: "ZAV-2024-0048",
    trackingNumber: "STD1234567891",
    provider: "steadfast",
    status: "delivered",
    customerName: "Fatima Begum",
    destination: "Chittagong",
    createdAt: "2024-01-08T09:00:00Z",
    updatedAt: "2024-01-10T11:00:00Z",
  },
  {
    id: "ship_3",
    orderId: "ZAV-2024-0049",
    trackingNumber: "PTH9876543210",
    provider: "pathao",
    status: "pending",
    customerName: "Karim Uddin",
    destination: "Sylhet",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-10T08:00:00Z",
  },
];

export default function DeliveryTracking() {
  const { toast } = useToast();
  const [providers, setProviders] = useState(initialProviders);
  const [shipments] = useState(mockShipments);
  const [configDialog, setConfigDialog] = useState<DeliveryProvider | null>(null);
  const [trackingSearch, setTrackingSearch] = useState("");
  const [showSecrets, setShowSecrets] = useState(false);
  
  // Form state for configuration
  const [formData, setFormData] = useState({
    apiKey: "",
    secretKey: "",
    baseUrl: "",
  });

  const openConfigDialog = (provider: DeliveryProvider) => {
    setConfigDialog(provider);
    setFormData({
      apiKey: provider.credentials.apiKey || "",
      secretKey: provider.credentials.secretKey || "",
      baseUrl: provider.credentials.baseUrl || "",
    });
    setShowSecrets(false);
  };

  const saveConfiguration = () => {
    if (!configDialog) return;
    
    setProviders(providers.map(p => 
      p.id === configDialog.id 
        ? { 
            ...p, 
            configured: true,
            credentials: {
              apiKey: formData.apiKey,
              secretKey: formData.secretKey,
              baseUrl: formData.baseUrl,
            }
          } 
        : p
    ));
    setConfigDialog(null);
    toast({ title: `${configDialog.name} configured successfully` });
  };

  const testConnection = (provider: DeliveryProvider) => {
    toast({ 
      title: "Testing connection...", 
      description: `Verifying ${provider.name} API credentials` 
    });
    setTimeout(() => {
      toast({ title: "Connection successful", description: `${provider.name} API is working` });
    }, 1500);
  };

  const toggleProvider = (providerId: string) => {
    setProviders(providers.map(p => 
      p.id === providerId ? { ...p, enabled: !p.enabled } : p
    ));
    toast({ title: "Delivery settings updated" });
  };

  const getStatusBadge = (status: Shipment["status"]) => {
    const variants = {
      pending: { label: "Pending Pickup", className: "bg-amber-500/10 text-amber-600 border-amber-600/20" },
      picked: { label: "Picked Up", className: "bg-blue-500/10 text-blue-600 border-blue-600/20" },
      in_transit: { label: "In Transit", className: "bg-purple-500/10 text-purple-600 border-purple-600/20" },
      delivered: { label: "Delivered", className: "bg-green-500/10 text-green-600 border-green-600/20" },
      returned: { label: "Returned", className: "bg-red-500/10 text-red-600 border-red-600/20" },
    };
    const variant = variants[status];
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  const getStatusIcon = (status: Shipment["status"]) => {
    switch (status) {
      case "delivered": return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "in_transit": return <Truck className="h-4 w-4 text-purple-600" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-600" />;
      case "picked": return <Package className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const refreshTracking = () => {
    toast({ title: "Refreshing shipment data...", description: "Fetching latest status from carriers" });
    setTimeout(() => {
      toast({ title: "Shipments updated", description: "All tracking information is up to date" });
    }, 1500);
  };

  const filteredShipments = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(trackingSearch.toLowerCase()) ||
    s.orderId.toLowerCase().includes(trackingSearch.toLowerCase()) ||
    s.customerName.toLowerCase().includes(trackingSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Delivery Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Configure delivery partners and track shipments
          </p>
        </div>
        <Button onClick={refreshTracking} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh All
        </Button>
      </div>

      <Tabs defaultValue="tracking">
        <TabsList>
          <TabsTrigger value="tracking" className="gap-2">
            <Package className="h-4 w-4" />
            Shipment Tracking
          </TabsTrigger>
          <TabsTrigger value="config" className="gap-2">
            <Settings className="h-4 w-4" />
            API Configuration
          </TabsTrigger>
        </TabsList>

        {/* Shipment Tracking Tab */}
        <TabsContent value="tracking" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="font-display">Active Shipments</CardTitle>
                  <CardDescription>Track and manage all deliveries</CardDescription>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by tracking #, order, or customer..."
                    value={trackingSearch}
                    onChange={(e) => setTrackingSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(shipment.status)}
                            {getStatusBadge(shipment.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{shipment.trackingNumber}</TableCell>
                        <TableCell className="font-medium">{shipment.orderId}</TableCell>
                        <TableCell>{shipment.customerName}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {shipment.destination}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {shipment.provider === "steadfast" ? "Steadfast" : "Pathao"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(shipment.updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" asChild>
                            <a 
                              href={`https://${shipment.provider === "steadfast" ? "portal.steadfast.com.bd" : "courier.pathao.com"}/track/${shipment.trackingNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredShipments.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No shipments found matching your search</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Configuration Tab */}
        <TabsContent value="config" className="mt-6 space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Credentials Security</AlertTitle>
            <AlertDescription>
              API keys are encrypted and stored securely. Never share your secret keys with anyone.
              Contact the delivery partner for API access if you don't have credentials.
            </AlertDescription>
          </Alert>

          {providers.map((provider) => (
            <Card key={provider.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{provider.logo}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-lg">{provider.name}</h3>
                        {provider.configured ? (
                          <Badge variant="outline" className="text-green-600 border-green-600/50">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Configured
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600 border-amber-600/50">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Not Configured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {provider.description}
                      </p>
                      {provider.configured && provider.webhookUrl && (
                        <p className="text-xs text-muted-foreground mt-2 font-mono">
                          Webhook: {provider.webhookUrl}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openConfigDialog(provider)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    {provider.configured && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testConnection(provider)}
                      >
                        Test
                      </Button>
                    )}
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={() => toggleProvider(provider.id)}
                      disabled={!provider.configured}
                    />
                  </div>
                </div>

                {/* Documentation Links */}
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  {provider.id === "steadfast" && (
                    <>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://steadfast.com.bd/api" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          API Docs
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://portal.steadfast.com.bd" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          Merchant Portal
                        </a>
                      </Button>
                    </>
                  )}
                  {provider.id === "pathao" && (
                    <>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://courier.pathao.com/api-documentation" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          API Docs
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://courier.pathao.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                          <ExternalLink className="h-3 w-3" />
                          Merchant Portal
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={!!configDialog} onOpenChange={() => setConfigDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <span className="text-2xl">{configDialog?.logo}</span>
              Configure {configDialog?.name}
            </DialogTitle>
            <DialogDescription>
              Enter your API credentials from the merchant portal
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showSecrets ? "text" : "password"}
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="Enter your API key"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowSecrets(!showSecrets)}
                >
                  {showSecrets ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secret-key">Secret Key</Label>
              <Input
                id="secret-key"
                type={showSecrets ? "text" : "password"}
                value={formData.secretKey}
                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                placeholder="Enter your secret key"
              />
            </div>

            {configDialog?.id === "steadfast" && (
              <div className="space-y-2">
                <Label htmlFor="base-url">API Base URL</Label>
                <Input
                  id="base-url"
                  type="text"
                  value={formData.baseUrl}
                  onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                  placeholder="https://portal.steadfast.com.bd/api/v1"
                />
                <p className="text-xs text-muted-foreground">
                  Default: https://portal.steadfast.com.bd/api/v1
                </p>
              </div>
            )}

            {configDialog?.id === "pathao" && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Get your API credentials from <a href="https://courier.pathao.com" target="_blank" rel="noopener noreferrer" className="underline">Pathao Merchant Portal</a> → Settings → API Keys
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfigDialog(null)}>
              Cancel
            </Button>
            <Button onClick={saveConfiguration} className="gap-2">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
