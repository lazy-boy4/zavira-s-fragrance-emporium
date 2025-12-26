import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Settings - Store configuration
 * 
 * Backend Integration:
 * - GET /api/admin/settings - Fetch all settings
 * - PUT /api/admin/settings - Update settings
 */

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your store</p>
        </div>
        <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="payments">Payments</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger></TabsList>
        
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader><CardTitle>Store Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Store Name</Label><Input defaultValue="ZAVIRA" /></div>
                <div><Label>Contact Email</Label><Input defaultValue="contact@zavira.com" /></div>
                <div><Label>Phone</Label><Input defaultValue="+1 (555) 000-0000" /></div>
                <div><Label>Currency</Label>
                  <Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="usd">USD ($)</SelectItem><SelectItem value="eur">EUR (€)</SelectItem><SelectItem value="gbp">GBP (£)</SelectItem></SelectContent></Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Shipping</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><div><Label>Free Shipping Threshold</Label><p className="text-sm text-muted-foreground">Orders above this amount get free shipping</p></div><Input className="w-32" defaultValue="150" /></div>
              <div className="flex items-center justify-between"><div><Label>Enable International Shipping</Label></div><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6 mt-6">
          <Card>
            <CardHeader><CardTitle>Payment Methods</CardTitle><CardDescription>Configure accepted payment methods</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><Label>Credit/Debit Cards</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Mobile Payment (bKash)</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Cash on Delivery</Label><Switch defaultChecked /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader><CardTitle>Email Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between"><Label>New Order Notifications</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Low Stock Alerts</Label><Switch defaultChecked /></div>
              <div className="flex items-center justify-between"><Label>Customer Reviews</Label><Switch /></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
