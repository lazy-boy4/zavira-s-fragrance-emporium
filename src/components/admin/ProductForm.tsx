"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Eye, Plus, X } from "lucide-react";
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
import { ImageUploader } from "@/components/admin/ImageUploader";

export interface ProductVariant {
  id: string;
  size: string;
  price: number;
  sku: string;
  stock: number;
}

export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  collection: string;
  status: string;
  featured: boolean;
  variants: ProductVariant[];
  images: string[];
  seoTitle: string;
  seoDescription: string;
  notes: string[];
}

const defaultVariants: ProductVariant[] = [
  { id: "v1", size: "50ml", price: 145, sku: "", stock: 0 },
];

let variantIdCounter = 1;

const defaultFormData: ProductFormData = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  category: "",
  collection: "",
  status: "draft",
  featured: false,
  variants: defaultVariants,
  images: [],
  seoTitle: "",
  seoDescription: "",
  notes: ["", "", ""],
};

interface ProductFormProps {
  initialData?: ProductFormData;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>(initialData || defaultFormData);

  const updateField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    const updated = [...formData.variants];
    updated[index] = { ...updated[index], [field]: value };
    updateField("variants", updated);
  };

  const addVariant = () => {
    variantIdCounter++;
    const newVariant: ProductVariant = {
      id: `v${variantIdCounter}`,
      size: "",
      price: 0,
      sku: "",
      stock: 0,
    };
    updateField("variants", [...formData.variants, newVariant]);
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      updateField("variants", formData.variants.filter((_, i) => i !== index));
    }
  };

  const updateNote = (index: number, value: string) => {
    const updated = [...formData.notes];
    updated[index] = value;
    updateField("notes", updated);
  };

  const addNote = () => {
    updateField("notes", [...formData.notes, ""]);
  };

  const removeNote = (index: number) => {
    updateField("notes", formData.notes.filter((_, i) => i !== index));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleNameChange = (name: string) => {
    updateField("name", name);
    if (!isEditing || !formData.slug) {
      updateField("slug", generateSlug(name));
    }
  };

  const handleSave = () => {
    // TODO: API call to save product
    console.log("Saving product:", formData);
    router.push("/admin/products");
  };

  const handleImageChange = (url: string) => {
    // For single image scenario in migration phase 1, we just replace the first image
    // or add it if empty. Ideally, we want multiple images.
    // The ImageUploader is single-file for now.
    // We will assume index 0 is the main image.
    if (url) {
      updateField("images", [url]);
    } else {
      updateField("images", []);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/products")} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display tracking-wider">
              {isEditing ? "Edit Product" : "New Product"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {isEditing ? "Update product details" : "Add a new perfume to your collection"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" /> Preview
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Save Product
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Zavira Primal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="zavira-primal"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    zavira.com/product/{formData.slug || "slug"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="shortDesc">Short Description</Label>
                  <Input
                    id="shortDesc"
                    value={formData.shortDescription}
                    onChange={(e) => updateField("shortDescription", e.target.value)}
                    placeholder="A bold, sophisticated fragrance..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Detailed product description..."
                    rows={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fragrance notes */}
          <Card>
            <CardHeader>
              <CardTitle>Fragrance Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.notes.map((note, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={note}
                    onChange={(e) => updateNote(index, e.target.value)}
                    placeholder={`Note ${index + 1} (e.g., Bergamot, Oud, Vanilla)`}
                  />
                  {formData.notes.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNote(index)}
                      aria-label="Remove note"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={addNote} className="gap-2">
                <Plus className="h-4 w-4" /> Add Note
              </Button>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Variants & Pricing</CardTitle>
              <Button variant="outline" size="sm" onClick={addVariant} className="gap-2">
                <Plus className="h-4 w-4" /> Add Variant
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.variants.map((variant, index) => (
                  <div key={variant.id} className="relative grid gap-4 sm:grid-cols-4 p-4 border border-border rounded">
                    {formData.variants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => removeVariant(index)}
                        aria-label="Remove variant"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                    <div>
                      <Label>Size</Label>
                      <Input
                        value={variant.size}
                        onChange={(e) => updateVariant(index, "size", e.target.value)}
                        placeholder="e.g., 50ml"
                      />
                    </div>
                    <div>
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={variant.price}
                        onChange={(e) => updateVariant(index, "price", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>SKU</Label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, "sku", e.target.value)}
                        placeholder="ZAV-PRM-50"
                      />
                    </div>
                    <div>
                      <Label>Stock</Label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(index, "stock", parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader 
                value={formData.images[0]} 
                onChange={handleImageChange}
                aspectRatio="square"
                hint="Main product image"
              />
              <p className="text-xs text-muted-foreground mt-4">
                Note: Multiple image support coming soon. Currently supporting main image only.
              </p>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">Meta Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => updateField("seoTitle", e.target.value)}
                  placeholder="Zavira Primal | Luxury Perfume for Men"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.seoTitle.length}/60 characters
                </p>
              </div>
              <div>
                <Label htmlFor="seoDesc">Meta Description</Label>
                <Textarea
                  id="seoDesc"
                  value={formData.seoDescription}
                  onChange={(e) => updateField("seoDescription", e.target.value)}
                  placeholder="Discover Zavira Primal, a bold fragrance..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={formData.status} onValueChange={(v) => updateField("status", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Product</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(v) => updateField("featured", v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Organization */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => updateField("category", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-him">For Him</SelectItem>
                    <SelectItem value="for-her">For Her</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Collection</Label>
                <Select value={formData.collection} onValueChange={(v) => updateField("collection", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="signature">Signature Collection</SelectItem>
                    <SelectItem value="noir">Noir Collection</SelectItem>
                    <SelectItem value="limited">Limited Edition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Danger zone */}
          {isEditing && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full gap-2">
                  <Trash2 className="h-4 w-4" /> Delete Product
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
