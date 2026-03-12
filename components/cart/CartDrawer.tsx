"use client"
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import Link from "next/link";
import { CartItem } from "@/types";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-foreground/40 z-50" onClick={() => setIsCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-heading text-xl font-semibold">Shopping Bag ({itemCount})</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-1 text-foreground hover:text-muted-foreground">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-body">Your bag is empty</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 btn-rose text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item: CartItem) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-secondary rounded-sm shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium font-body truncate">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">{item.product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-border rounded-sm">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-secondary">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-secondary">
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-sm font-semibold font-body">৳{(price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground self-start">
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-body">Subtotal</span>
              <span className="text-lg font-semibold font-heading">৳{subtotal.toLocaleString()}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full btn-outline-dark text-center"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full btn-rose text-center"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
