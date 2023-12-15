import {create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import * as _ from "lodash"

import { CartItem, CartMetadata, Product} from "@/types"
import toast from "react-hot-toast";

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, metadata: CartMetadata) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateItem: (data: Product, metadata: CartMetadata) => void;
}

const usePreviewModal = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product, metadata: CartMetadata) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => {
        const sameId = item.id === data.id
        const sameMetadata = _.isEqual(item.selectedVariants, metadata.selectedVariants)

        return sameId && sameMetadata
      })

      if (existingItem) {
        return toast("Item already in cart")
      }

      set({items: [...get().items, {...data, quantity: metadata.quantity, selectedVariants: metadata.selectedVariants}]})
      toast.success("Item added to cart")
    },
    updateItem: (data: Product, metadata: CartMetadata) => {
      const newItems = get().items
      
      newItems.map((item => {
        if (item.id === data.id) {
          item.quantity = metadata.quantity
        }
      }))

      set({items: newItems})

      toast.success("Cart Updated!");
    },
    removeItem: (id: string) => {
      set({items: [...get().items.filter((item) => item.id !== id)]});
      toast.success("Item removed from cart");
    },
    removeAll: () => set({items: []}),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  }))

export default usePreviewModal
