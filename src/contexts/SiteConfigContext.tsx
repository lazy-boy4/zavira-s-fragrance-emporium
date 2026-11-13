import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultSiteConfig, siteConfigSchema, type SiteConfig } from "@/lib/siteConfig";
import {
  readSiteConfig,
  resetSiteConfig,
  saveSiteConfig,
  SITE_CONFIG_STORAGE_KEY,
} from "@/lib/siteConfigStorage";

interface SiteConfigContextValue {
  config: SiteConfig;
  saveConfig: (config: SiteConfig) => boolean;
  resetConfig: () => boolean;
}

const SiteConfigContext = createContext<SiteConfigContextValue | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(() => readSiteConfig());

  useEffect(() => {
    const syncConfig = (event: StorageEvent) => {
      if (event.key !== SITE_CONFIG_STORAGE_KEY && event.key !== null) return;
      setConfig(readSiteConfig());
    };

    window.addEventListener("storage", syncConfig);
    return () => window.removeEventListener("storage", syncConfig);
  }, []);

  const saveConfig = useCallback((nextConfig: SiteConfig) => {
    const validated = siteConfigSchema.safeParse(nextConfig);
    if (!validated.success || !saveSiteConfig(validated.data)) return false;
    setConfig(validated.data);
    return true;
  }, []);

  const resetConfig = useCallback(() => {
    if (!resetSiteConfig()) return false;
    setConfig(siteConfigSchema.parse(defaultSiteConfig));
    return true;
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, saveConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfigContextValue {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  return context;
}