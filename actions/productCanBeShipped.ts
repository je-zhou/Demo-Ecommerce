import { Product } from "@/types";

export function productCanBeShipped(product: Product, countryCode: string) {
  return product.shipping.length > 0
    ? product.shipping.some((s) => s.regions.some((r) => r.id === countryCode))
    : false;
}
