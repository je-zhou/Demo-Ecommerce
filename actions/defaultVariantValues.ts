import { Product } from "@/types";

export function loadDefaultVariantValues(product: Product) {
  const initialVariants: { [key: string]: string } = {};

  Object.entries(product.variants).forEach(([k, v]) => {
    const options = v.values ?? [];

    if (v.isInput) {
      initialVariants[k] = v.inputRangeLow ? v.inputRangeLow.toString() : "";
    } else {
      initialVariants[k] = options.length > 0 ? options[0].value : "";
    }
  });

  return initialVariants;
}
