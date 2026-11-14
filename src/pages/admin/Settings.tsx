import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { siteConfigSchema, type SiteConfig } from "@/lib/siteConfig";
import { parseNullableNumber, updateSiteConfigValue, type SiteConfigPath } from "@/lib/siteConfigEditor";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Link = SiteConfig["header"]["navigation"][number];

function valueAtPath(config: SiteConfig, path: SiteConfigPath): unknown {
  return path.reduce<unknown>((current, key) => {
    if (current === null || typeof current !== "object") return undefined;
    return (current as Record<string | number, unknown>)[key];
  }, config);
}

function Field({
  config,
  path,
  label,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  config: SiteConfig;
  path: SiteConfigPath;
  label: string;
  onChange: (path: SiteConfigPath, value: unknown) => void;
  type?: "text" | "url" | "email" | "number" | "textarea";
  placeholder?: string;
  hint?: string;
}) {
  const id = path.map(String).join("-");
  const value = valueAtPath(config, path);
  const stringValue = value === null || value === undefined ? "" : String(value);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea id={id} value={stringValue} placeholder={placeholder} onChange={(event) => onChange(path, event.target.value)} />
      ) : (
        <Input
          id={id}
          type={type}
          min={type === "number" ? 0 : undefined}
          step={type === "number" ? "any" : undefined}
          value={stringValue}
          placeholder={placeholder}
          onChange={(event) => onChange(path, type === "number" ? parseNullableNumber(event.target.value) : event.target.value)}
        />
      )}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ToggleField({
  config,
  path,
  label,
  onChange,
}: {
  config: SiteConfig;
  path: SiteConfigPath;
  label: string;
  onChange: (path: SiteConfigPath, value: unknown) => void;
}) {
  const id = path.map(String).join("-");
  return (
    <div className="flex min-h-10 items-center justify-between gap-4 border-b border-border/60 py-2 last:border-0">
      <Label htmlFor={id} className="cursor-pointer">{label}</Label>
      <Switch id={id} checked={valueAtPath(config, path) === true} onCheckedChange={(checked) => onChange(path, checked)} />
    </div>
  );
}

function StringListEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...values, ""])}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      {values.length === 0 && <p className="text-sm text-muted-foreground">No entries added.</p>}
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex gap-2">
          <Input aria-label={`${label} ${index + 1}`} value={value} placeholder={placeholder} onChange={(event) => onChange(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} />
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${label} ${index + 1}`} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function LinksEditor({
  label,
  links,
  onChange,
}: {
  label: string;
  links: Link[];
  onChange: (links: Link[]) => void;
}) {
  const updateLink = (index: number, patch: Partial<Link>) => onChange(links.map((link, itemIndex) => itemIndex === index ? { ...link, ...patch } : link));
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{label}</Label>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...links, { id: `link-${Date.now()}`, label: "", href: "", visible: true }])}>
          <Plus className="mr-2 h-4 w-4" /> Add link
        </Button>
      </div>
      {links.map((link, index) => (
        <div key={link.id} className="grid gap-3 border-b border-border/60 pb-3 sm:grid-cols-[1fr_1fr_1.2fr_auto_auto] sm:items-end">
          <Field config={{ ...({} as SiteConfig), brand: { ...({} as SiteConfig["brand"]), name: link.label } } as SiteConfig} path={["brand", "name"]} label="Label" onChange={(_, value) => updateLink(index, { label: String(value) })} />
          <Field config={{ ...({} as SiteConfig), brand: { ...({} as SiteConfig["brand"]), name: link.id } } as SiteConfig} path={["brand", "name"]} label="Key" onChange={(_, value) => updateLink(index, { id: String(value) })} />
          <div className="space-y-2"><Label htmlFor={`${label}-${index}-href`}>Link</Label><Input id={`${label}-${index}-href`} value={link.href} onChange={(event) => updateLink(index, { href: event.target.value })} /></div>
          <div className="flex items-center gap-2 pb-2"><Switch aria-label={`Show ${link.label || label}`} checked={link.visible} onCheckedChange={(visible) => updateLink(index, { visible })} /><span className="text-sm text-muted-foreground">Show</span></div>
          <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${label} link ${index + 1}`} onClick={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
    </div>
  );
}

export default function Settings() {
  const { config, saveConfig, resetConfig } = useSiteConfig();
  const [draft, setDraft] = useState(config);
  const [validationError, setValidationError] = useState("");

  useEffect(() => setDraft(config), [config]);

  const update = (path: SiteConfigPath, value: unknown) => {
    setDraft((current) => updateSiteConfigValue(current, path, value));
    setValidationError("");
  };

  const save = () => {
    const result = siteConfigSchema.safeParse(draft);
    if (!result.success) {
      setValidationError(result.error.issues[0]?.message ?? "Review the settings and try again.");
      toast.error("Settings could not be saved", { description: result.error.issues[0]?.message });
      return;
    }
    if (!saveConfig(result.data)) {
      setValidationError("Browser storage could not save these settings.");
      toast.error("Settings could not be saved", { description: "Browser storage is unavailable." });
      return;
    }
    setValidationError("");
    toast.success("Store settings saved in this browser");
  };

  const reset = () => {
    if (!resetConfig()) {
      toast.error("Defaults could not be restored", { description: "Browser storage is unavailable." });
      return;
    }
    toast.success("Store settings restored to defaults");
  };

  const configField = (path: SiteConfigPath, label: string, type: "text" | "url" | "email" | "number" | "textarea" = "text", hint?: string) => (
    <Field config={draft} path={path} label={label} type={type} hint={hint} onChange={update} />
  );
  const toggle = (path: SiteConfigPath, label: string) => <ToggleField config={draft} path={path} label={label} onChange={update} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-display tracking-wider">Store Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage the storefront configuration.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="outline"><RotateCcw className="mr-2 h-4 w-4" /> Restore defaults</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Restore store defaults?</AlertDialogTitle><AlertDialogDescription>This replaces saved settings in this browser with the original configuration.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={reset}>Restore defaults</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={save}><Save className="mr-2 h-4 w-4" /> Save changes</Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">Changes are saved on this browser only. Shared saving will be added with secure sign-in.</p>

      <Tabs defaultValue="brand" className="space-y-5">
        <div className="max-w-full overflow-x-auto"><TabsList className="w-max">
          <TabsTrigger value="brand">Brand</TabsTrigger><TabsTrigger value="storefront">Storefront</TabsTrigger><TabsTrigger value="homepage">Homepage</TabsTrigger><TabsTrigger value="content">Footer & Pages</TabsTrigger><TabsTrigger value="delivery">Delivery & Payments</TabsTrigger>
        </TabsList></div>

        <TabsContent value="brand" className="space-y-5">
          <Card><CardHeader><CardTitle>Brand identity</CardTitle><CardDescription>Store name, logos, and contact details.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2">
            {configField(["brand", "name"], "Store name")}{configField(["brand", "tagline"], "Tagline")}{configField(["brand", "logoUrl"], "Logo URL")}{configField(["brand", "logoLightUrl"], "Light logo URL")}{configField(["brand", "logoDarkUrl"], "Dark logo URL")}{configField(["brand", "logoAlt"], "Logo description")}{configField(["brand", "faviconUrl"], "Favicon URL")}{configField(["brand", "contactEmail"], "Contact email", "email")}{configField(["brand", "phone"], "Phone")}{configField(["brand", "address"], "Address")}
            <div className="sm:col-span-2">{configField(["brand", "description"], "Brand description", "textarea")}</div>
            <div className="sm:col-span-2"><StringListEditor label="Social profile links" values={draft.brand.socialLinks.map((item) => `${item.platform}|${item.url}`)} placeholder="Platform|URL" onChange={(items) => update(["brand", "socialLinks"], items.map((item) => { const [platform = "", ...url] = item.split("|"); return { platform, url: url.join("|") }; }))} /></div>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="storefront" className="space-y-5">
          <Card><CardHeader><CardTitle>Search and appearance</CardTitle></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2">
            {configField(["seo", "titleTemplate"], "Page title template")}{configField(["seo", "defaultTitle"], "Default page title")}{configField(["seo", "defaultDescription"], "Default search description", "textarea")}
            {configField(["theme", "colors", "background"], "Background color value")}{configField(["theme", "colors", "foreground"], "Text color value")}{configField(["theme", "colors", "accent"], "Accent color value")}{configField(["theme", "colors", "surface"], "Surface color value")}{configField(["theme", "typography", "displayFont"], "Heading font")}{configField(["theme", "typography", "bodyFont"], "Body font")}
            <div className="sm:col-span-2">{toggle(["theme", "motionEnabled"], "Enable motion effects")}</div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Announcement bar</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["announcement", "enabled"], "Show announcement")}{configField(["announcement", "text"], "Announcement text")}{configField(["announcement", "href"], "Announcement link", "url")}</CardContent></Card>
          <Card><CardHeader><CardTitle>Header navigation</CardTitle></CardHeader><CardContent><LinksEditor label="Navigation links" links={draft.header.navigation} onChange={(links) => update(["header", "navigation"], links)} /></CardContent></Card>
        </TabsContent>

        <TabsContent value="homepage" className="space-y-5">
          <Card><CardHeader><CardTitle>Hero</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["homepage", "hero", "enabled"], "Show hero section")}<div className="grid gap-5 sm:grid-cols-2">{configField(["homepage", "hero", "tagline"], "Tagline")}{configField(["homepage", "hero", "heading"], "Heading")}{configField(["homepage", "hero", "subheading"], "Subheading")}{configField(["homepage", "hero", "backgroundImage"], "Background image URL")}{configField(["homepage", "hero", "primaryButtonText"], "Main button label")}{configField(["homepage", "hero", "primaryButtonLink"], "Main button link", "url")}{configField(["homepage", "hero", "secondaryButtonText"], "Second button label")}{configField(["homepage", "hero", "secondaryButtonLink"], "Second button link", "url")}</div><div>{configField(["homepage", "hero", "description"], "Description", "textarea")}</div></CardContent></Card>
          <Card><CardHeader><CardTitle>Featured products</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["homepage", "featuredProducts", "enabled"], "Show featured products")}<div className="grid gap-5 sm:grid-cols-2">{configField(["homepage", "featuredProducts", "tagline"], "Tagline")}{configField(["homepage", "featuredProducts", "heading"], "Heading")}{configField(["homepage", "featuredProducts", "ctaButtonText"], "Button label")}{configField(["homepage", "featuredProducts", "ctaButtonLink"], "Button link", "url")}{configField(["homepage", "featuredProducts", "productsToShow"], "Products to show", "number")}</div>{toggle(["homepage", "featuredProducts", "showPrices"], "Show product prices")}{configField(["homepage", "featuredProducts", "description"], "Description", "textarea")}<StringListEditor label="Selected product IDs" values={draft.homepage.featuredProducts.selectedProducts} placeholder="Product ID" onChange={(items) => update(["homepage", "featuredProducts", "selectedProducts"], items)} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Brand story</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["homepage", "brandStory", "enabled"], "Show brand story")}<div className="grid gap-5 sm:grid-cols-2">{configField(["homepage", "brandStory", "tagline"], "Tagline")}{configField(["homepage", "brandStory", "heading"], "Heading")}{configField(["homepage", "brandStory", "quote"], "Quote", "textarea")}{configField(["homepage", "brandStory", "signature"], "Signature")}{configField(["homepage", "brandStory", "ctaButtonText"], "Button label")}{configField(["homepage", "brandStory", "ctaButtonLink"], "Button link", "url")}{configField(["homepage", "brandStory", "image"], "Image URL")}</div><StringListEditor label="Story paragraphs" values={draft.homepage.brandStory.paragraphs} placeholder="Paragraph" onChange={(items) => update(["homepage", "brandStory", "paragraphs"], items)} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Newsletter</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["homepage", "newsletter", "enabled"], "Show newsletter section")}<div className="grid gap-5 sm:grid-cols-2">{configField(["homepage", "newsletter", "tagline"], "Tagline")}{configField(["homepage", "newsletter", "heading"], "Heading")}{configField(["homepage", "newsletter", "buttonText"], "Button label")}{configField(["homepage", "newsletter", "disclaimer"], "Disclaimer")}</div>{configField(["homepage", "newsletter", "description"], "Description", "textarea")}</CardContent></Card>
          <Card><CardHeader><CardTitle>Section order</CardTitle><CardDescription>Choose the order of homepage sections.</CardDescription></CardHeader><CardContent className="space-y-2">{draft.homepage.sectionOrder.map((section, index) => <div key={`${section}-${index}`} className="flex items-center justify-between gap-3 border-b border-border/60 py-2 last:border-0"><span className="capitalize">{section === "featuredProducts" ? "Featured products" : section === "brandStory" ? "Brand story" : section}</span><div className="flex gap-1"><Button type="button" variant="ghost" size="icon" aria-label={`Move ${section} up`} disabled={index === 0} onClick={() => { const next = [...draft.homepage.sectionOrder]; [next[index - 1], next[index]] = [next[index]!, next[index - 1]!]; update(["homepage", "sectionOrder"], next); }}><ArrowUp className="h-4 w-4" /></Button><Button type="button" variant="ghost" size="icon" aria-label={`Move ${section} down`} disabled={index === draft.homepage.sectionOrder.length - 1} onClick={() => { const next = [...draft.homepage.sectionOrder]; [next[index], next[index + 1]] = [next[index + 1]!, next[index]!]; update(["homepage", "sectionOrder"], next); }}><ArrowDown className="h-4 w-4" /></Button></div></div>)}</CardContent></Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-5">
          <Card><CardHeader><CardTitle>Footer</CardTitle></CardHeader><CardContent className="space-y-5"><div className="grid gap-5 sm:grid-cols-2">{configField(["footer", "copyright"], "Copyright text")}{configField(["footer", "location"], "Store location")}</div>{configField(["footer", "description"], "Footer description", "textarea")}<LinksEditor label="Legal links" links={draft.footer.legalLinks} onChange={(links) => update(["footer", "legalLinks"], links)} />{draft.footer.linkGroups.map((group, groupIndex) => <div key={`${group.title}-${groupIndex}`} className="space-y-4 border-t border-border/60 pt-4"><div className="flex items-end gap-3"><div className="flex-1">{configField(["footer", "linkGroups", groupIndex, "title"], `Link group ${groupIndex + 1} title`)}</div><Button type="button" variant="ghost" size="icon" aria-label={`Remove footer group ${groupIndex + 1}`} onClick={() => update(["footer", "linkGroups"], draft.footer.linkGroups.filter((_, index) => index !== groupIndex))}><Trash2 className="h-4 w-4" /></Button></div><LinksEditor label={`${group.title || "Footer"} links`} links={group.links} onChange={(links) => update(["footer", "linkGroups", groupIndex, "links"], links)} /></div>)}<Button type="button" variant="outline" onClick={() => update(["footer", "linkGroups"], [...draft.footer.linkGroups, { title: "", links: [] }])}><Plus className="mr-2 h-4 w-4" /> Add link group</Button></CardContent></Card>
          <Card><CardHeader><CardTitle>Content pages</CardTitle><CardDescription>Manage the titles, page text, search details, and publishing status.</CardDescription></CardHeader><CardContent className="space-y-5">{draft.contentPages.map((page, index) => <div key={`${page.slug}-${index}`} className="space-y-4 border-b border-border/60 pb-5 last:border-0"><div className="flex items-center justify-between gap-4"><h3 className="font-medium">{page.title || page.slug}</h3>{toggle(["contentPages", index, "published"], "Published")}</div><div className="grid gap-5 sm:grid-cols-2">{configField(["contentPages", index, "slug"], "Page address")}{configField(["contentPages", index, "title"], "Page title")}{configField(["contentPages", index, "metaTitle"], "Search title")}{configField(["contentPages", index, "metaDescription"], "Search description", "textarea")}</div>{configField(["contentPages", index, "content"], "Page content", "textarea")}</div>)}<Button type="button" variant="outline" onClick={() => update(["contentPages"], [...draft.contentPages, { slug: `page-${Date.now()}`, title: "New page", content: "", metaTitle: "", metaDescription: "", published: false }])}><Plus className="mr-2 h-4 w-4" /> Add page</Button></CardContent></Card>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-5">
          <Card><CardHeader><CardTitle>Bangladesh store region</CardTitle><CardDescription>Currency and country are fixed for this Bangladesh storefront.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2"><div className="space-y-2"><Label>Country</Label><Input value={`${draft.commerce.countryName} (${draft.commerce.countryCode})`} disabled /></div><div className="space-y-2"><Label>Currency</Label><Input value={`${draft.commerce.currencyCode} (${draft.commerce.currencySymbol})`} disabled /></div>{configField(["commerce", "taxRatePercent"], "Tax rate (%)", "number", "Leave empty until the confirmed rate is known.")}{configField(["commerce", "shipping", "freeShippingThreshold"], "Storewide free-delivery threshold (৳)", "number", "Leave empty if there is no confirmed threshold.")}</CardContent></Card>
          <Card><CardHeader><CardTitle>Delivery zones</CardTitle><CardDescription>Fees and thresholds are in Bangladeshi taka.</CardDescription></CardHeader><CardContent className="space-y-5">{draft.commerce.shipping.zones.map((zone, index) => <div key={zone.id} className="space-y-4 border-b border-border/60 pb-5 last:border-0"><div className="flex items-center justify-between gap-4"><h3 className="font-medium">{zone.name}</h3>{toggle(["commerce", "shipping", "zones", index, "enabled"], "Zone available")}</div><div className="grid gap-5 sm:grid-cols-2">{configField(["commerce", "shipping", "zones", index, "name"], "Zone name")}{configField(["commerce", "shipping", "zones", index, "deliveryFee"], "Delivery fee (৳)", "number", "Blank means not set.")}{configField(["commerce", "shipping", "zones", index, "freeShippingThreshold"], "Free-delivery threshold (৳)", "number", "Blank means not set.")}{configField(["commerce", "shipping", "zones", index, "estimatedDays"], "Estimated delivery time")}</div><StringListEditor label={`${zone.name} regions`} values={zone.regions} placeholder="Area or region" onChange={(items) => update(["commerce", "shipping", "zones", index, "regions"], items)} /></div>)}<StringListEditor label="Delivery partners" values={draft.commerce.shipping.carriers} placeholder="Courier name" onChange={(items) => update(["commerce", "shipping", "carriers"], items)} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Cash on delivery</CardTitle></CardHeader><CardContent className="space-y-4">{toggle(["commerce", "paymentMethods", "cashOnDelivery", "enabled"], "Accept cash on delivery")}<div className="grid gap-5 sm:grid-cols-2">{configField(["commerce", "paymentMethods", "cashOnDelivery", "fee"], "COD fee (৳)", "number", "Leave empty if no confirmed fee applies.")}{configField(["commerce", "paymentMethods", "cashOnDelivery", "minimumOrder"], "Minimum order (৳)", "number")}{configField(["commerce", "paymentMethods", "cashOnDelivery", "maximumOrder"], "Maximum order (৳)", "number")}</div><StringListEditor label="COD restricted areas" values={draft.commerce.paymentMethods.cashOnDelivery.restrictedAreas} placeholder="Area" onChange={(items) => update(["commerce", "paymentMethods", "cashOnDelivery", "restrictedAreas"], items)} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Payment options</CardTitle><CardDescription>Choose which payment methods the storefront accepts.</CardDescription></CardHeader><CardContent><div className="space-y-1">{toggle(["commerce", "paymentMethods", "bkash"], "bKash")}{toggle(["commerce", "paymentMethods", "nagad"], "Nagad")}{toggle(["commerce", "paymentMethods", "rocket"], "Rocket")}{toggle(["commerce", "paymentMethods", "upay"], "Upay")}{toggle(["commerce", "paymentMethods", "uddoktaPay"], "Uddokta Pay")}</div></CardContent></Card>
        </TabsContent>
      </Tabs>
      {validationError && <p role="alert" className="text-sm text-destructive">{validationError}</p>}
      <div className="flex justify-end"><Button onClick={save}><Save className="mr-2 h-4 w-4" /> Save changes</Button></div>
    </div>
  );
}