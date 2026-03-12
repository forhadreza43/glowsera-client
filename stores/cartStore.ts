import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  get itemCount(): number;
  get subtotal(): number;
}

export const useCart = create<CartState>()(
  immer((set, get) => ({
    items: [],
    isCartOpen: false,
    setIsCartOpen: (open) => set((state) => { state.isCartOpen = open; }),
    addItem: (product) => {
      set((state) => {
        const existing = state.items.find((i) => i.product.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ product, quantity: 1 });
        }
        state.isCartOpen = true;
      });
    },
    removeItem: (productId) => set((state) => {
      state.items = state.items.filter((i) => i.product.id !== productId);
    }),
    updateQuantity: (productId, quantity) => set((state) => {
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.product.id !== productId);
      } else {
        const item = state.items.find((i) => i.product.id === productId);
        if (item) item.quantity = quantity;
      }
    }),
    clearCart: () => set((state) => { state.items = []; }),
    get itemCount() { return get().items.reduce((sum, i) => sum + i.quantity, 0); },
    get subtotal() { return get().items.reduce((sum, i) => sum + (i.product.discountPrice || i.product.price) * i.quantity, 0); },
  }))
);
