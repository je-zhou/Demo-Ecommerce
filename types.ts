export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Variant {
  id: string;
  name: string;
  variablePricing: boolean;
  inputType: boolean;
  inputStart?: number
  inputEnd?: number
  variantOptions: VariantValue[]
}

export interface VariantValue {
  id: string;
  name: string;
}

export interface ProductPricingMatrix {
  price: number,
  values: {
    [variantId: string] : string
  }
}

export interface Product {
  id: string
  categories: Category[]
  variants: Variant[]
  images: Image[]
  allowLocalPickUp: Boolean
  productDetails: {type: string, data: Buffer }
  description: {type: string, data: Buffer }
  metadata: Object
  pricingMatrix: Array<ProductPricingMatrix>
  name: string
  price: string
  isFeatured: boolean
  weight: string
  width: string
  height: string
  length: string
  shipping?: Shipping
  reviews: Review[]
}

export interface Review {
  id: string
  productId: string
  title: string
  text: string
  rating: number
  updatedAt: string
}

export interface Shipping {
  id: string
  name: string
  price: string
  shippingSpeed? : string
  isVariablePrice: boolean
  enforceProductDimension: boolean
  sendleIntegration: boolean
  transDirectIntegration: boolean
  variableShipping: VariableShipping
}

export interface VariableShipping {
  id: string
  type: "Weight" | "Price"
  conditions: VariableShippingCondition[]
}

export interface VariableShippingCondition {
  id: string
  equality: "Equals" | "GreaterThan" | "LowerThan" | "LowerThanOrEqual" | "GreaterThanOrEqual" | "NotEqual"
  condition: string
  shippingPrice: string
  priority: string
}

export interface Image {
  id: string
  url: string
}

export interface SelectedVariants {
  [variantId: string] : string
}

export interface CartMetadata {
  quantity: number
  selectedVariants: SelectedVariants
}

export type CartItem = Product & CartMetadata