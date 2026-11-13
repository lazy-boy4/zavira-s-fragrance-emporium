import { defaultSiteConfig, siteConfigSchema, type SiteConfig } from "@/lib/siteConfig";

export const SITE_CONFIG_STORAGE_KEY = "zavira_site_config_v1";

export interface SiteConfigStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function browserStorage(): SiteConfigStorage | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function readSiteConfig(storage = browserStorage()): SiteConfig {
  if (!storage) return siteConfigSchema.parse(defaultSiteConfig);

  try {
    const raw = storage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (!raw) return siteConfigSchema.parse(defaultSiteConfig);
    const parsed: unknown = JSON.parse(raw);
    const result = siteConfigSchema.safeParse(parsed);
    return result.success ? result.data : siteConfigSchema.parse(defaultSiteConfig);
  } catch {
    return siteConfigSchema.parse(defaultSiteConfig);
  }
}

export function saveSiteConfig(config: SiteConfig, storage = browserStorage()): boolean {
  if (!storage) return false;

  try {
    const validated = siteConfigSchema.parse(config);
    storage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(validated));
    return true;
  } catch {
    return false;
  }
}

export function resetSiteConfig(storage = browserStorage()): boolean {
  if (!storage) return false;

  try {
    storage.removeItem(SITE_CONFIG_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}