// FAQ answers and the contact form read prices from the pricing document.
import { formatPeriod, formatPrice } from "./price";

export const PRICING_REFS_PROJECTION = `{
  "tiers": tiers[]{ tierName, "key": key.current, price },
  "retainer": retainer{ title, price, interval }
}`;

export interface PricingRefs {
  tiers?: { tierName?: string; key?: string; price?: number }[];
  retainer?: { title?: string; price?: number; interval?: string };
}

/**
 * Tokens for FAQ text:
 *   {{growth.price}} {{growth.name}}            (key = the tier's Key field)
 *   {{retainer.name}} {{retainer.price}} {{retainer.period}} ("/ month") {{retainer.interval}} ("month")
 */
export function buildPriceTokens(p?: PricingRefs | null) {
  const t: Record<string, string> = {};
  for (const tier of p?.tiers ?? []) {
    if (!tier.key || !tier.tierName) continue;
    t[`${tier.key}.name`] = tier.tierName;
    t[`${tier.key}.price`] = formatPrice(tier.price);
  }
  const r = p?.retainer;
  if (r?.title) t["retainer.name"] = r.title;
  if (typeof r?.price === "number") t["retainer.price"] = formatPrice(r.price);
  if (r?.interval) {
    t["retainer.period"] = formatPeriod(r.interval);
    t["retainer.interval"] = r.interval;
  }
  return t;
}

// An unknown token is left as written so a typo is easy to spot on the page
export const fillTokens = (
  text: string | undefined,
  tokens: Record<string, string>
) =>
  (text ?? "").replace(
    /\{\{\s*([a-z0-9.-]+)\s*\}\}/gi,
    (m, k: string) => tokens[k.toLowerCase()] ?? m
  );

// "Growth (from $4,495)", then "Care & Content Plan ($249 / month)"
export function packageOptionLabels(p?: PricingRefs | null) {
  const labels: string[] = [];
  for (const tier of p?.tiers ?? []) {
    if (!tier.tierName) continue;
    labels.push(
      typeof tier.price === "number"
        ? `${tier.tierName} (from ${formatPrice(tier.price)})`
        : tier.tierName
    );
  }
  const r = p?.retainer;
  if (r?.title) {
    const price = [formatPrice(r.price), formatPeriod(r.interval)]
      .filter(Boolean)
      .join(" ");
    labels.push(price ? `${r.title} (${price})` : r.title);
  }
  return labels;
}
