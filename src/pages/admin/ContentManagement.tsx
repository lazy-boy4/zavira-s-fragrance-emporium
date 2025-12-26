import { FileText, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * ContentManagement - Edit site content and policies
 * 
 * Backend Integration:
 * - GET /api/admin/content/:type - Fetch content
 * - PUT /api/admin/content/:type - Update content
 */

const contentTypes = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "shipping", label: "Shipping & Returns" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About/Story" },
];

export default function ContentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Content</h1>
          <p className="text-muted-foreground mt-1">Edit site content and policies</p>
        </div>
        <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="privacy">
            <TabsList className="mb-6">
              {contentTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="gap-2">
                  <FileText className="h-4 w-4" /> {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {contentTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Edit the {type.label.toLowerCase()} content. Markdown is supported.
                  </p>
                  <Textarea rows={20} placeholder={`Enter ${type.label} content...`} className="font-mono text-sm" />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
