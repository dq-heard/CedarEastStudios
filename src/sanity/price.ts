// Prices are numbers in Studio and currency is a constant, so the legacy string handling is gone.
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

type Amount = number | null | undefined;

// "$2,995" (empty when no price is set)
export const formatPrice = (amount: Amount) =>
  typeof amount === "number" ? usd.format(amount) : "";

// { symbol: "$", value: "2,995" } for markup that styles the symbol separately
export function formatPriceParts(amount: Amount) {
  if (typeof amount !== "number") return { symbol: "", value: "" };
  const parts = usd.formatToParts(amount);
  return {
    symbol: parts.find((p) => p.type === "currency")?.value ?? "",
    value: parts
      .filter((p) => p.type !== "currency")
      .map((p) => p.value)
      .join(""),
  };
}

// "/ month"
export const formatPeriod = (interval?: string | null) =>
  interval ? `/ ${interval}` : "";
