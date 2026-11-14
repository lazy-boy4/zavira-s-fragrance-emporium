import { defaultSiteConfig, siteConfigSchema } from "@/lib/siteConfig";
import { parseNullableNumber, updateSiteConfigValue } from "@/lib/siteConfigEditor";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const edited = updateSiteConfigValue(defaultSiteConfig, ["brand", "name"], "Atelier Zavira");
assert(edited.brand.name === "Atelier Zavira", "nested settings updates should be applied");
assert(defaultSiteConfig.brand.name === "Zavira", "editing should not mutate the saved defaults");

const nestedArrayEdit = updateSiteConfigValue(defaultSiteConfig, ["commerce", "shipping", "zones", 0, "name"], "Central Dhaka");
assert(nestedArrayEdit.commerce.shipping.zones[0]?.name === "Central Dhaka", "nested array item settings should update");
assert(defaultSiteConfig.commerce.shipping.zones[0]?.name === "Dhaka Metro", "nested array updates should not mutate defaults");

assert(parseNullableNumber("") === null, "blank optional charges should remain unset");
assert(parseNullableNumber("125.5") === 125.5, "numeric charges should be parsed");
assert(parseNullableNumber("invalid") === null, "invalid optional charges should remain unset");

assert(defaultSiteConfig.commerce.countryCode === "BD", "store defaults should remain Bangladesh-focused");
assert(defaultSiteConfig.commerce.currencyCode === "BDT", "store defaults should retain BDT");
assert(defaultSiteConfig.commerce.paymentMethods.cashOnDelivery.enabled, "cash on delivery should remain enabled by default");
assert(siteConfigSchema.safeParse(edited).success, "valid editor changes should satisfy the shared settings schema");

console.log("Site config editor update, nullable-number, and validation checks passed.");