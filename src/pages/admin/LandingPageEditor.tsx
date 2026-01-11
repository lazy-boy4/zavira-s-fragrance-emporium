import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  Type,
  Link as LinkIcon,
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Palette,
  Layout,
  Megaphone,
} from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

/**
 * LandingPageEditor - Full customization of landing page sections
 * 
 * Features:
 * - Hero section customization
 * - Featured products configuration
 * - Brand story section editing
 * - Newsletter section settings
 * - Section visibility toggles
 * - Section reordering
 * 
 * Backend Integration:
 * - GET /api/admin/landing-page - Fetch landing page config
 * - PUT /api/admin/landing-page - Save landing page config
 * - POST /api/admin/upload - Upload images
 */

// Hero Section Schema
const heroSchema = z.object({
  tagline: z.string().max(50, "Tagline must be less than 50 characters"),
  heading: z.string().max(100, "Heading must be less than 100 characters"),
  subheading: z.string().max(50, "Subheading must be less than 50 characters"),
  description: z.string().max(300, "Description must be less than 300 characters"),
  primaryButtonText: z.string().max(30),
  primaryButtonLink: z.string(),
  secondaryButtonText: z.string().max(30),
  secondaryButtonLink: z.string(),
  backgroundImage: z.string(),
});

// Featured Products Schema
const featuredProductsSchema = z.object({
  tagline: z.string().max(50),
  heading: z.string().max(100),
  description: z.string().max(300),
  ctaButtonText: z.string().max(30),
  ctaButtonLink: z.string(),
  showPrices: z.boolean(),
  productsToShow: z.number().min(2).max(8),
});

// Brand Story Schema
const brandStorySchema = z.object({
  tagline: z.string().max(50),
  heading: z.string().max(100),
  paragraphs: z.array(z.string().max(500)),
  ctaButtonText: z.string().max(30),
  ctaButtonLink: z.string(),
  image: z.string(),
});

// Newsletter Schema
const newsletterSchema = z.object({
  tagline: z.string().max(50),
  heading: z.string().max(100),
  description: z.string().max(300),
  buttonText: z.string().max(30),
  disclaimer: z.string().max(200),
});

// Mock initial data
const initialData = {
  hero: {
    enabled: true,
    tagline: "Eau de Parfum",
    heading: "Essence of the Noir",
    subheading: "L'âme de la Nuit",
    description: "A captivating journey through darkness and elegance. Experience the soul of the night, crafted with the finest ingredients from France.",
    primaryButtonText: "Discover Collection",
    primaryButtonLink: "/shop",
    secondaryButtonText: "Our Story",
    secondaryButtonLink: "/story",
    backgroundImage: "/src/assets/hero-perfume.jpg",
  },
  featuredProducts: {
    enabled: true,
    tagline: "Our Collection",
    heading: "Signature Fragrances",
    description: "Each scent is a masterpiece, meticulously crafted to evoke emotion and leave an unforgettable impression.",
    ctaButtonText: "View All Fragrances",
    ctaButtonLink: "/shop",
    showPrices: true,
    productsToShow: 4,
    selectedProducts: [] as string[],
  },
  brandStory: {
    enabled: true,
    tagline: "Our Heritage",
    heading: "Crafted in France",
    paragraphs: [
      "Born from a passion for the extraordinary, Zavira represents the pinnacle of French perfumery. Each fragrance is a testament to centuries of artisanal tradition, reimagined for the modern connoisseur.",
      "We source only the finest raw materials from around the world, blending them with precision and care in our atelier in Grasse, the heart of the perfume world.",
      "The result? Fragrances that transcend time, designed for those who refuse to blend in.",
    ],
    ctaButtonText: "Discover Our Story",
    ctaButtonLink: "/story",
    image: "/src/assets/product-box.png",
  },
  newsletter: {
    enabled: true,
    tagline: "Stay Connected",
    heading: "Join the Inner Circle",
    description: "Be the first to discover new fragrances, exclusive offers, and behind-the-scenes access to the world of Zavira.",
    buttonText: "Subscribe",
    disclaimer: "By subscribing, you agree to receive marketing emails from Zavira. Unsubscribe anytime.",
  },
  sectionOrder: ["hero", "featuredProducts", "brandStory", "newsletter"],
};

export default function LandingPageEditor() {
  const { toast } = useToast();
  const [pageData, setPageData] = useState(initialData);
  const [activeTab, setActiveTab] = useState("hero");

  // Hero form
  const heroForm = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues: pageData.hero,
  });

  // Featured Products form
  const featuredForm = useForm({
    resolver: zodResolver(featuredProductsSchema),
    defaultValues: pageData.featuredProducts,
  });

  // Brand Story form
  const storyForm = useForm({
    resolver: zodResolver(brandStorySchema),
    defaultValues: pageData.brandStory,
  });

  // Newsletter form
  const newsletterForm = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: pageData.newsletter,
  });

  const toggleSection = (section: "hero" | "featuredProducts" | "brandStory" | "newsletter") => {
    setPageData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        enabled: !prev[section].enabled,
      },
    }));
  };

  const handleSave = () => {
    // TODO: API call to save configuration
    toast({ title: "Landing page saved", description: "Changes will be visible on the storefront." });
  };

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  const addParagraph = () => {
    const currentParagraphs = storyForm.getValues("paragraphs");
    storyForm.setValue("paragraphs", [...currentParagraphs, ""]);
    setPageData((prev) => ({
      ...prev,
      brandStory: {
        ...prev.brandStory,
        paragraphs: [...prev.brandStory.paragraphs, ""],
      },
    }));
  };

  const removeParagraph = (index: number) => {
    const currentParagraphs = storyForm.getValues("paragraphs");
    const newParagraphs = currentParagraphs.filter((_, i) => i !== index);
    storyForm.setValue("paragraphs", newParagraphs);
    setPageData((prev) => ({
      ...prev,
      brandStory: {
        ...prev.brandStory,
        paragraphs: newParagraphs,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Landing Page</h1>
          <p className="text-muted-foreground mt-1">
            Customize every aspect of your storefront homepage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview} className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Section Visibility Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Section Visibility
          </CardTitle>
          <CardDescription>
            Toggle sections on or off. Drag to reorder (coming soon).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { key: "hero", label: "Hero Section", icon: Megaphone },
              { key: "featuredProducts", label: "Featured Products", icon: Palette },
              { key: "brandStory", label: "Brand Story", icon: Type },
              { key: "newsletter", label: "Newsletter", icon: LinkIcon },
            ].map((section) => (
              <div
                key={section.key}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  <section.icon className="h-4 w-4" />
                  <span className="font-medium">{section.label}</span>
                </div>
                <Switch
                  checked={pageData[section.key as "hero" | "featuredProducts" | "brandStory" | "newsletter"].enabled}
                  onCheckedChange={() => toggleSection(section.key as "hero" | "featuredProducts" | "brandStory" | "newsletter")}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Editors */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-2">
            <Palette className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="story" className="gap-2">
            <Type className="h-4 w-4" />
            Story
          </TabsTrigger>
          <TabsTrigger value="newsletter" className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Newsletter
          </TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                The main banner that visitors see first on your homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-tagline">Tagline</Label>
                    <Input
                      id="hero-tagline"
                      {...heroForm.register("tagline")}
                      placeholder="e.g., Eau de Parfum"
                    />
                    <p className="text-xs text-muted-foreground">Small text above the main heading</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hero-heading">Main Heading</Label>
                    <Input
                      id="hero-heading"
                      {...heroForm.register("heading")}
                      placeholder="e.g., Essence of the Noir"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hero-subheading">Subheading</Label>
                    <Input
                      id="hero-subheading"
                      {...heroForm.register("subheading")}
                      placeholder="e.g., L'âme de la Nuit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      {...heroForm.register("description")}
                      rows={4}
                      placeholder="Describe your brand or featured product..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <ImageUploader
                    value={pageData.hero.backgroundImage}
                    onChange={(url) => {
                      setPageData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, backgroundImage: url },
                      }));
                      heroForm.setValue("backgroundImage", url);
                    }}
                    aspectRatio="hero"
                    label="Background Image"
                    hint="Recommended: 1920x1080px for best quality"
                  />

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Button Text</Label>
                      <Input {...heroForm.register("primaryButtonText")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Primary Button Link</Label>
                      <Input {...heroForm.register("primaryButtonLink")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Text</Label>
                      <Input {...heroForm.register("secondaryButtonText")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Button Link</Label>
                      <Input {...heroForm.register("secondaryButtonLink")} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Featured Products Tab */}
        <TabsContent value="products" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products Section</CardTitle>
              <CardDescription>
                Showcase your best products on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input
                      {...featuredForm.register("tagline")}
                      placeholder="e.g., Our Collection"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      {...featuredForm.register("heading")}
                      placeholder="e.g., Signature Fragrances"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      {...featuredForm.register("description")}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input {...featuredForm.register("ctaButtonText")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input {...featuredForm.register("ctaButtonLink")} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Prices</Label>
                      <p className="text-xs text-muted-foreground">Display product prices in grid</p>
                    </div>
                    <Switch
                      checked={pageData.featuredProducts.showPrices}
                      onCheckedChange={(checked) =>
                        setPageData((prev) => ({
                          ...prev,
                          featuredProducts: { ...prev.featuredProducts, showPrices: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Number of Products</Label>
                    <Input
                      type="number"
                      min={2}
                      max={8}
                      {...featuredForm.register("productsToShow", { valueAsNumber: true })}
                    />
                    <p className="text-xs text-muted-foreground">2-8 products</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Select Products</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Choose which products to feature (or leave empty for automatic selection)
                    </p>
                    <Button variant="outline" className="w-full gap-2">
                      <Plus className="h-4 w-4" />
                      Select Products
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Story Tab */}
        <TabsContent value="story" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Story Section</CardTitle>
              <CardDescription>
                Share your brand's heritage and values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input {...storyForm.register("tagline")} />
                  </div>

                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input {...storyForm.register("heading")} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Paragraphs</Label>
                      <Button variant="outline" size="sm" onClick={addParagraph}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Paragraph
                      </Button>
                    </div>
                    {pageData.brandStory.paragraphs.map((_, index) => (
                      <div key={index} className="relative">
                        <Textarea
                          {...storyForm.register(`paragraphs.${index}`)}
                          rows={3}
                          placeholder={`Paragraph ${index + 1}`}
                        />
                        {pageData.brandStory.paragraphs.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeParagraph(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <ImageUploader
                    value={pageData.brandStory.image}
                    onChange={(url) => {
                      setPageData((prev) => ({
                        ...prev,
                        brandStory: { ...prev.brandStory, image: url },
                      }));
                      storyForm.setValue("image", url);
                    }}
                    aspectRatio="square"
                    label="Section Image"
                    hint="Square format recommended"
                  />

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input {...storyForm.register("ctaButtonText")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Button Link</Label>
                      <Input {...storyForm.register("ctaButtonLink")} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Newsletter Tab */}
        <TabsContent value="newsletter" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Section</CardTitle>
              <CardDescription>
                Capture email subscribers with a compelling call to action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <Input {...newsletterForm.register("tagline")} />
                  </div>

                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input {...newsletterForm.register("heading")} />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea {...newsletterForm.register("description")} rows={3} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input {...newsletterForm.register("buttonText")} />
                  </div>

                  <div className="space-y-2">
                    <Label>Disclaimer Text</Label>
                    <Textarea
                      {...newsletterForm.register("disclaimer")}
                      rows={2}
                      placeholder="e.g., By subscribing, you agree to..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
