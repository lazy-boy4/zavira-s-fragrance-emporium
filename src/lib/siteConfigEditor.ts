import type { SiteConfig } from "@/lib/siteConfig";

export type SiteConfigPath = Array<string | number>;

export function updateSiteConfigValue<T>(config: SiteConfig, path: SiteConfigPath, value: T): SiteConfig {
  if (path.length === 0) return config;

  const update = (current: unknown, depth: number): unknown => {
    if (depth === path.length) return value;

    const key = path[depth];
    if (key === undefined) return current;

    if (Array.isArray(current)) {
      const next = [...current];
      const index = typeof key === "number" ? key : Number(key);
      next[index] = update(current[index], depth + 1);
      return next;
    }

    if (current !== null && typeof current === "object") {
      const next = { ...current } as Record<string, unknown>;
      const property = String(key);
      next[property] = update(next[property], depth + 1);
      return next;
    }

    return current;
  };

  return update(config, 0) as SiteConfig;
}

export function parseNullableNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}