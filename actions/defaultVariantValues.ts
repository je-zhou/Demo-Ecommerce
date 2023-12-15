import { Product } from "@/types";

export function loadDefaultVariantValues(product: Product) {
  const initialVariants: {[key: string]: string} = {}

  product.variants.forEach((v) => {
    const options = v.variantOptions ?? []
    
    if (v.inputType) {
      initialVariants[v.id] = v.inputStart? v.inputStart.toString() : ""
    } else {
      initialVariants[v.id] = options.length > 0 ? options[0].name : ""
    }
  })

  return initialVariants;

}