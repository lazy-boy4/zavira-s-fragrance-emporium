import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Banknote,
  Save,
  ExternalLink,
  Settings,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
 * PaymentSettings - Configure payment methods for Bangladesh
 * 
 * Features:
 * - bKash integration
 * - Nagad integration
 * - Rocket integration
 * - Upay integration
 * - Uddokta Pay integration
 * - Cash on Delivery settings
 * - Bank Transfer settings
 * 
 * Backend Integration:
 * - GET /api/admin/payments - Fetch payment settings
 * - PUT /api/admin/payments/:provider - Update provider settings
 * - POST /api/admin/payments/:provider/test - Test connection
 */

interface PaymentProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  configured: boolean;
  testMode: boolean;
  credentials: {
    appKey?: string;
    appSecret?: string;
    username?: string;
    password?: string;
    merchantId?: string;
    apiKey?: string;
  };
  fees?: {
    percentage: number;
    fixed: number;
  };
}

const initialProviders: PaymentProvider[] = [
  {
    id: "bkash",
    name: "bKash",
    description: "Bangladesh's largest mobile financial service",
    icon: "🔴",
    enabled: true,
    configured: true,
    testMode: true,
    credentials: {
      appKey: "••••••••••••",
      appSecret: "••••••••••••",
      username: "merchant@zavira.com",
    },
    fees: { percentage: 1.5, fixed: 0 },
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Digital Financial Service by Bangladesh Post Office",
    icon: "🟠",
    enabled: true,
    configured: false,
    testMode: false,
    credentials: {},
    fees: { percentage: 1.4, fixed: 0 },
  },
  {
    id: "rocket",
    name: "Rocket (DBBL)",
    description: "Mobile banking by Dutch-Bangla Bank",
    icon: "🟣",
    enabled: false,
    configured: false,
    testMode: false,
    credentials: {},
    fees: { percentage: 1.8, fixed: 0 },
  },
  {
    id: "upay",
    name: "Upay",
    description: "United Commercial Bank's mobile wallet",
    icon: "🔵",
    enabled: false,
    configured: false,
    testMode: false,
    credentials: {},
    fees: { percentage: 1.5, fixed: 0 },
  },
  {
    id: "uddoktapay",
    name: "Uddokta Pay",
    description: "Payment gateway for Bangladeshi businesses",
    icon: "🟢",
    enabled: false,
    configured: false,
    testMode: false,
    credentials: {},
    fees: { percentage: 2.0, fixed: 5 },
  },
];

const codSettings = {
  enabled: true,
  additionalFee: 50,
  maxOrderAmount: 50000,
  minOrderAmount: 500,
  restrictedAreas: ["Remote Areas", "Some Hill Districts"],
};

export default function PaymentSettings() {
  const { toast } = useToast();
  const [providers, setProviders] = useState(initialProviders);
  const [cod, setCod] = useState(codSettings);
  const [configureDialog, setConfigureDialog] = useState<PaymentProvider | null>(null);
  
  // Form states for configuration
  const [formData, setFormData] = useState({
    appKey: "",
    appSecret: "",
    username: "",
    password: "",
    merchantId: "",
    apiKey: "",
  });

  const toggleProvider = (providerId: string) => {
    setProviders(providers.map(p => 
      p.id === providerId ? { ...p, enabled: !p.enabled } : p
    ));
    toast({ title: "Payment settings updated" });
  };

  const openConfigureDialog = (provider: PaymentProvider) => {
    setConfigureDialog(provider);
    setFormData({
      appKey: provider.credentials.appKey || "",
      appSecret: provider.credentials.appSecret || "",
      username: provider.credentials.username || "",
      password: provider.credentials.password || "",
      merchantId: provider.credentials.merchantId || "",
      apiKey: provider.credentials.apiKey || "",
    });
  };

  const saveConfiguration = () => {
    if (!configureDialog) return;
    
    setProviders(providers.map(p => 
      p.id === configureDialog.id 
        ? { 
            ...p, 
            configured: true,
            credentials: {
              appKey: formData.appKey,
              appSecret: formData.appSecret,
              username: formData.username,
              merchantId: formData.merchantId,
              apiKey: formData.apiKey,
            }
          } 
        : p
    ));
    setConfigureDialog(null);
    toast({ title: `${configureDialog.name} configured successfully` });
  };

  const testConnection = (provider: PaymentProvider) => {
    toast({ 
      title: "Testing connection...", 
      description: `Verifying ${provider.name} API credentials` 
    });
    // Simulate test
    setTimeout(() => {
      toast({ title: "Connection successful", description: `${provider.name} is properly configured` });
    }, 1500);
  };

  const saveSettings = () => {
    toast({ title: "Payment settings saved" });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Payment Methods</h1>
          <p className="text-muted-foreground mt-1">
            Configure payment options for your store
          </p>
        </div>
        <Button onClick={saveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Bangladesh Notice */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Bangladesh Payment Gateway</AlertTitle>
        <AlertDescription>
          These payment methods are configured for Bangladesh. All transactions are in BDT (৳).
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="mobile">
        <TabsList>
          <TabsTrigger value="mobile" className="gap-2">
            <Wallet className="h-4 w-4" />
            Mobile Payments
          </TabsTrigger>
          <TabsTrigger value="gateway" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Gateways
          </TabsTrigger>
          <TabsTrigger value="cod" className="gap-2">
            <Banknote className="h-4 w-4" />
            Cash on Delivery
          </TabsTrigger>
        </TabsList>

        {/* Mobile Payment Providers */}
        <TabsContent value="mobile" className="mt-6 space-y-4">
          {providers.filter(p => ["bkash", "nagad", "rocket", "upay"].includes(p.id)).map((provider) => (
            <Card key={provider.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{provider.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
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
                        {provider.testMode && provider.configured && (
                          <Badge variant="secondary">Test Mode</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {provider.description}
                      </p>
                      {provider.fees && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Fee: {provider.fees.percentage}%{provider.fees.fixed > 0 ? ` + ৳${provider.fees.fixed}` : ""} per transaction
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openConfigureDialog(provider)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={() => toggleProvider(provider.id)}
                      disabled={!provider.configured}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Payment Gateway */}
        <TabsContent value="gateway" className="mt-6 space-y-4">
          {providers.filter(p => p.id === "uddoktapay").map((provider) => (
            <Card key={provider.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{provider.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
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
                      <p className="text-xs text-muted-foreground mt-2">
                        Supports: bKash, Nagad, Rocket, Cards, Bank Transfer
                      </p>
                      {provider.fees && (
                        <p className="text-xs text-muted-foreground">
                          Fee: {provider.fees.percentage}%{provider.fees.fixed > 0 ? ` + ৳${provider.fees.fixed}` : ""} per transaction
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openConfigureDialog(provider)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={() => toggleProvider(provider.id)}
                      disabled={!provider.configured}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                Need to accept international cards or other payment methods?
              </p>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Request Integration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash on Delivery */}
        <TabsContent value="cod" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Banknote className="h-5 w-5" />
                    Cash on Delivery
                  </CardTitle>
                  <CardDescription>
                    Accept payment when order is delivered
                  </CardDescription>
                </div>
                <Switch
                  checked={cod.enabled}
                  onCheckedChange={(checked) => setCod({ ...cod, enabled: checked })}
                />
              </div>
            </CardHeader>
            {cod.enabled && (
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>COD Fee (৳)</Label>
                    <Input
                      type="number"
                      value={cod.additionalFee}
                      onChange={(e) => setCod({ ...cod, additionalFee: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Additional fee charged for COD orders
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Order Amount (৳)</Label>
                    <Input
                      type="number"
                      value={cod.maxOrderAmount}
                      onChange={(e) => setCod({ ...cod, maxOrderAmount: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">
                      COD not available for orders above this amount
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Order Amount (৳)</Label>
                    <Input
                      type="number"
                      value={cod.minOrderAmount}
                      onChange={(e) => setCod({ ...cod, minOrderAmount: Number(e.target.value) })}
                    />
                    <p className="text-xs text-muted-foreground">
                      COD only available for orders above this amount
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Restricted Areas</Label>
                  <p className="text-sm text-muted-foreground">
                    Areas where COD is not available:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cod.restrictedAreas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configure Provider Dialog */}
      <Dialog open={!!configureDialog} onOpenChange={() => setConfigureDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">
              Configure {configureDialog?.name}
            </DialogTitle>
            <DialogDescription>
              Enter your merchant credentials to enable this payment method
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {(configureDialog?.id === "bkash" || configureDialog?.id === "nagad") && (
              <>
                <div className="space-y-2">
                  <Label>App Key</Label>
                  <Input
                    type="password"
                    value={formData.appKey}
                    onChange={(e) => setFormData({ ...formData, appKey: e.target.value })}
                    placeholder="Enter your app key"
                  />
                </div>
                <div className="space-y-2">
                  <Label>App Secret</Label>
                  <Input
                    type="password"
                    value={formData.appSecret}
                    onChange={(e) => setFormData({ ...formData, appSecret: e.target.value })}
                    placeholder="Enter your app secret"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Username/Merchant ID</Label>
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                </div>
              </>
            )}

            {(configureDialog?.id === "rocket" || configureDialog?.id === "upay") && (
              <>
                <div className="space-y-2">
                  <Label>Merchant ID</Label>
                  <Input
                    value={formData.merchantId}
                    onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                    placeholder="Enter your merchant ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="Enter your API key"
                  />
                </div>
              </>
            )}

            {configureDialog?.id === "uddoktapay" && (
              <>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    placeholder="Enter your API key"
                  />
                </div>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Get your API key from the Uddokta Pay merchant dashboard
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>

          <DialogFooter className="gap-2">
            {configureDialog?.configured && (
              <Button
                variant="outline"
                onClick={() => testConnection(configureDialog)}
              >
                Test Connection
              </Button>
            )}
            <Button onClick={saveConfiguration}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
