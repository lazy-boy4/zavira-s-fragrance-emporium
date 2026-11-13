import { defaultSiteConfig } from "@/lib/siteConfig";
import { readSiteConfig, SITE_CONFIG_STORAGE_KEY, type SiteConfigStorage } from "@/lib/siteConfigStorage";

function assertEqual(actual: unknown, expected: unknown, message: string) {
  if (actual !== expected) throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
}

function assertDefaultConfig(actual: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(defaultSiteConfig)) {
    throw new Error("Invalid stored data must fall back to the complete default configuration.");
  }
}

class MemoryStorage implements SiteConfigStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

const storage = new MemoryStorage();
const initial = readSiteConfig(storage);
assertEqual(initial.commerce.countryName, "Bangladesh", "Default country");
assertEqual(initial.commerce.currencyCode, "BDT", "Default currency");
assertEqual(initial.commerce.currencySymbol, "৳", "Default currency symbol");
assertEqual(initial.commerce.paymentMethods.cashOnDelivery.enabled, true, "COD default");
assertEqual(initial.commerce.taxRatePercent, null, "Unknown tax rate stays unset");
assertEqual(initial.commerce.shipping.freeShippingThreshold, null, "Unknown delivery threshold stays unset");

storage.setItem(SITE_CONFIG_STORAGE_KEY, "not valid JSON");
assertDefaultConfig(readSiteConfig(storage));

storage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify({ commerce: { currencyCode: "USD" } }));
assertDefaultConfig(readSiteConfig(storage));

console.log("Site config defaults and invalid-storage fallback passed.");