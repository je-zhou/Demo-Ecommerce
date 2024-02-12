import { CartItem, Product, ProductPricingMatrix } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
})

export function findPrice(product: Product, selectedVariants: {[key: string]: string}) {
  const variablePricingIds = product.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 
  const sortedPricingMatrix = product.pricingMatrix ? sortPricingMatrix(product.pricingMatrix, variablePricingIds) : [];

  if (product.pricingMatrix) {
    const newPriceCombo = sortedPricingMatrix.find((pc) => sameVariantCombo(pc.values, selectedVariants, variablePricingIds))
    if (newPriceCombo) {
      const newPrice = newPriceCombo.price.toFixed(2)
      return newPrice
    } else {
      return product.price
    }
  } else {
    return product.price
  }
}

export function sortPricingMatrix(pricingMatrix: ProductPricingMatrix[] | undefined, variablePricingIds: string[]) {
  if (pricingMatrix) {
    const sorted = [...pricingMatrix ?? []]

    sorted.sort(function (a,b) {
      for (let i = 0; i< variablePricingIds.length; i++) {
        const id = variablePricingIds[i];

        const widthA = Number(a.values[id])
        const widthB = Number(b.values[id])
  
        if (widthA < widthB) return -1
        if (widthB < widthA) return 1
      }

      return 0
    })

    return sorted
  }

  return [];
}

export function sameVariantCombo(variants1: {[key: string] : string} , variants2: {[key: string] : string}, variablePricingIds: string[]) {
  const var1 = Object.entries(variants1)

  return var1.every(([k,v]) => {
    // Input type
    if (variablePricingIds.includes(k)) {
      const numVal = Number(v) ?? 0;
      const numTest = Number(variants2[k]) ?? 0

      return numTest <= numVal;
    }
    
    return variants2[k] === v
  });
}

export function getVariablePrice(selectedVariants:{[key: string] : string} , pricingMatrix: ProductPricingMatrix[], variablePricingIds: string[]) {
  const sortedPricingMatrix = sortPricingMatrix(pricingMatrix, variablePricingIds);
  
  const newPriceCombo = sortedPricingMatrix.find((pc) => sameVariantCombo(pc.values, selectedVariants, variablePricingIds))

  return newPriceCombo ? newPriceCombo.price : null;
}

export function calculateProductShipping(product: CartItem) {
  let shipping = 0;

  const productShipping = product.shipping

  if (productShipping) {
    shipping = Number(productShipping.price)
    
    const variablePricingIds = product.variants.filter(v => v.inputType && v.variablePricing).map(v => v.id); 

    const varShipping = productShipping.variableShipping
    
    let itemPrice = product.pricingMatrix ? getVariablePrice(product.selectedVariants as any, product.pricingMatrix as any, variablePricingIds) ?? product.price : product.price
    
    if (varShipping && productShipping.isVariablePrice) {
      let test = varShipping.type === "Price" ? Number(itemPrice) : Number(product.weight) ?? 0;

      const sortedConditions = varShipping.conditions.sort((a,b) => Number(a.priority)-Number(b.priority))

      const conditionMatch = sortedConditions.find((condition) => {
        const eq = condition.equality
        let conditionSatisfied = false;

        if (eq === "Equals") {
          conditionSatisfied = Number(condition.condition) === test
        } else if (eq === "GreaterThan") {
          conditionSatisfied = test > Number(condition.condition) 
        } else if (eq === "LowerThan") {
          conditionSatisfied = test < Number(condition.condition)
        } else if (eq === "GreaterThanOrEqual") {
          conditionSatisfied = test >= Number(condition.condition)
        } else if (eq === "LowerThanOrEqual") {
          conditionSatisfied = test <= Number(condition.condition)
        } else if (eq === "NotEqual") {
          conditionSatisfied = test != Number(condition.condition)
        }

        return conditionSatisfied
      })
      
      if (conditionMatch) {
        shipping = Number(conditionMatch.shippingPrice)
      } 
    }
  }

  return shipping
}