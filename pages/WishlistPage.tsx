"use client"
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/stores/wishlistStore";
import { useCart } from "@/stores/cartStore";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";

const WishlistPage = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="font-heading text-3xl md:text-4xl font-light mb-2">Wishlist</h1>
      <p className="text-muted-foreground text-sm font-body mb-8">{items.length} items saved</p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-body mb-4">Your wishlist is empty</p>
          <Link href="/shop" className="btn-rose inline-block">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((product: Product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              <div className="mt-2 flex gap-2">
                <button onClick={() => { addItem(product); removeItem(product.id); }}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-body py-2 border border-border rounded-sm hover:bg-secondary">
                  <ShoppingBag size={12} /> Move to Bag
                </button>
                <button onClick={() => removeItem(product.id)}
                  className="p-2 border border-border rounded-sm hover:bg-secondary text-muted-foreground hover:text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
