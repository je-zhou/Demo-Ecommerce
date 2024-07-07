export interface Store {
  id: string;
  name: string;
  userId: string;
  userEmail: string;
  stripeAccountId: string;
  isTestAccount: boolean;
  categories: Category[];
  products: Product[];
  orders: Order[];
  shipping: Shipping[];
}
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  products: Product[];
}

export interface Variant {
  id: string;
  name: string;
  variablePricing: boolean;
  inputType: boolean;
  inputStart?: number;
  inputEnd?: number;
  variantOptions?: VariantValue[];
}

export interface VariantValue {
  id: string;
  value: string;
}

export interface ProductPricingMatrix {
  price: number;
  values: {
    [variantId: string]: string;
  };
}

export interface Product {
  id: string;
  categories: Category[];
  variants: Variant[];
  images: Image[];
  allowLocalPickUp: Boolean;
  productDetails: { type: string; data: Buffer };
  description: { type: string; data: Buffer };
  metadata: Object;
  pricingMatrix: Array<ProductPricingMatrix>;
  name: string;
  price: string;
  isFeatured: boolean;
  weight: string;
  width: string;
  height: string;
  length: string;
  shipping: Shipping[];
  reviews: Review[];
}

export interface Order {
  id: string;
  storeId: string;
  orderItems: OrderItem[];
  paidOn?: Date;
  phone: string;
  email: string;
  name: string;
  address: string;
  userId?: string;
  statuses: OrderStatus[];
  orderTotal: number;
  shipping: number;
  isLocalPickUp: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderStatus {
  id: string;
  status: Status;
  isCompleted: boolean;
  completedOn?: Date;
  displaySeq: number;
  note?: string;
}

export enum Status {
  ORDER_CREATED,
  PAYMENT_COMPLETED,
  ORDER_SENT,
  ORDER_DELIVERED,
  ORDER_COMPLETED,
  RETURN_REQUESTED,
  RETURN_ACCEPTED,
  RETURN_RECEIVED,
  PAYMENT_REFUNDED,
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  orderPrice?: number;
  selectedVariants?: SelectedVariants;
}

export interface Review {
  id: string;
  productId: string;
  title: string;
  text: string;
  rating: number;
  updatedAt: string;
}

export interface Shipping {
  id: string;
  name: string;
  price: string;
  regions: Region[];
  shippingEstimateMinDays: number;
  shippingEstimateMaxDays: number;
  shippingSpeed?: string;
  isVariablePrice: boolean;
  enforceProductDimension: boolean;
  variableShipping: VariableShipping;
}

export interface Region {
  id: string;
  name: string;
}

export interface VariableShipping {
  id: string;
  type: "Weight" | "Price";
  conditions: VariableShippingCondition[];
}

export interface VariableShippingCondition {
  id: string;
  equality:
    | "Equals"
    | "GreaterThan"
    | "LowerThan"
    | "LowerThanOrEqual"
    | "GreaterThanOrEqual"
    | "NotEqual";
  condition: string;
  shippingPrice: string;
  priority: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface SelectedVariants {
  [variantId: string]: string;
}

export interface CartMetadata {
  shippingId?: string;
  quantity: number;
  selectedVariants: SelectedVariants;
}

export type CartItem = Product & CartMetadata;

export enum SortBy {
  None,
  Featured,
  PriceHighLow,
  PriceLowHigh,
}
