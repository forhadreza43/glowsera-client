import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  get itemCount(): number;
}

export const useWishlist = create<WishlistState>()(
  immer((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
      if (!state.items.some((i) => i.id === product.id)) {
        state.items.push(product);
      }
    }),
    removeItem: (productId) => set((state) => {
      state.items = state.items.filter((i) => i.id !== productId);
    }),
    isInWishlist: (productId) => get().items.some((i) => i.id === productId),
    toggleItem: (product) => set((state) => {
      const index = state.items.findIndex((i) => i.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
    }),
    get itemCount() { return get().items.length; },
  }))
);
