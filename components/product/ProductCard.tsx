"use client"
import { Heart, ShoppingBag, Zap, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/stores/cartStore";
import { useWishlist } from "@/stores/wishlistStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const router = useRouter();
  const wishlisted = isInWishlist(product.id);
  const productImage = product.images?.[0];

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    router.push("/checkout");
  };

  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden relative">
          {productImage ? (
            <Image src={productImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-body">No image</div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-foreground text-background text-[10px] tracking-widest uppercase px-2.5 py-1 font-body font-medium">New</span>
            )}
            {product.discountPrice && (
              <span className="bg-rose-gold text-accent-foreground text-[10px] tracking-widest uppercase px-2.5 py-1 font-body font-medium">
                {Math.round((1 - product.discountPrice / product.price) * 100)}% Off
              </span>
            )}
            {!product.inStock && (
              <span className="bg-muted text-muted-foreground text-[10px] tracking-widest uppercase px-2.5 py-1 font-body font-medium">Sold Out</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggleItem(product); }}
            className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
          >
            <Heart size={16} className={wishlisted ? "fill-rose-gold text-rose-gold" : "text-foreground"} />
          </button>

          {/* Quick action buttons */}
          {product.inStock && (
            <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={(e) => { e.preventDefault(); addItem(product); }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-foreground/90 text-background py-2.5 text-[11px] tracking-wider uppercase font-body font-medium rounded-sm hover:bg-foreground transition-colors"
              >
                <ShoppingBag size={13} /> Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-1.5 bg-rose-gold text-accent-foreground py-2.5 text-[11px] tracking-wider uppercase font-body font-medium rounded-sm hover:bg-rose-gold/90 transition-colors"
              >
                <Zap size={13} /> Buy Now
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium font-body text-foreground leading-snug hover:text-rose-gold transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground font-body">{product.shortBenefit}</p>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-rose-gold text-rose-gold" />
            <span className="text-xs font-medium font-body">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground font-body">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="text-sm font-semibold font-body">৳{product.discountPrice.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground line-through font-body">৳{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-sm font-semibold font-body">৳{product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
