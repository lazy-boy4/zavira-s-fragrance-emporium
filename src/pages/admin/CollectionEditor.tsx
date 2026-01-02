import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

/**
 * CollectionEditor - Create or edit a collection
 * 
 * Backend Integration:
 * - GET /api/admin/collections/:id - Get collection details
 * - POST /api/admin/collections - Create collection
 * - PUT /api/admin/collections/:id - Update collection
 */

const collectionSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  description: z.string().max(500).optional(),
  status: z.enum(["active", "draft"]),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

type CollectionFormData = z.infer<typeof collectionSchema>;

// Mock collection data
const mockCollections: Record<string, CollectionFormData & { id: string; image?: string }> = {
  col_1: {
    id: "col_1",
    name: "Signature Collection",
    slug: "signature",
    description: "Our most iconic fragrances that define the Zavira experience.",
    status: "active",
    seoTitle: "Signature Collection | Zavira",
    seoDescription: "Discover our most iconic fragrances",
    image: "/src/assets/product-primal.jpg",
  },
};

export default function CollectionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);

  const form = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
    },
  });

  // Load collection data if editing
  useEffect(() => {
    if (id && mockCollections[id]) {
      const collection = mockCollections[id];
      form.reset({
        name: collection.name,
        slug: collection.slug,
        description: collection.description || "",
        status: collection.status,
        seoTitle: collection.seoTitle || "",
        seoDescription: collection.seoDescription || "",
      });
      if (collection.image) {
        setImagePreview(collection.image);
      }
    }
  }, [id, form]);

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("name", e.target.value);
    if (!isEditing) {
      const slug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  };

  const onSubmit = (data: CollectionFormData) => {
    // TODO: API call to save collection
    toast({
      title: isEditing ? "Collection updated" : "Collection created",
      description: `${data.name} has been saved successfully.`,
    });
    navigate("/admin/collections");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/collections")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-display tracking-wider">
            {isEditing ? "Edit Collection" : "New Collection"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Update collection details" : "Create a new product collection"}
          </p>
        </div>
        <Button onClick={form.handleSubmit(onSubmit)} className="gap-2">
          <Save className="h-4 w-4" />
          {isEditing ? "Save Changes" : "Create Collection"}
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Collection Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  onChange={handleNameChange}
                  placeholder="e.g., Summer Collection"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">/collections/</span>
                  <Input
                    id="slug"
                    {...form.register("slug")}
                    placeholder="summer-collection"
                    className="flex-1"
                  />
                </div>
                {form.formState.errors.slug && (
                  <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Write a description for this collection..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Collection image */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Collection Image</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={imagePreview}
                    alt="Collection preview"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setImagePreview(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display">SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  {...form.register("seoTitle")}
                  placeholder="Collection Name | Zavira"
                />
                <p className="text-xs text-muted-foreground">
                  {form.watch("seoTitle")?.length || 0}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  {...form.register("seoDescription")}
                  placeholder="Brief description for search engines..."
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  {form.watch("seoDescription")?.length || 0}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(value: "active" | "draft") => form.setValue("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Featured Collection</p>
                  <p className="text-xs text-muted-foreground">Show on homepage</p>
                </div>
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Products can be added after creating the collection
              </p>
              <Button variant="outline" className="w-full" disabled={!isEditing}>
                Manage Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
