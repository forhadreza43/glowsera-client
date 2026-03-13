"use client"
import { Heart, ShoppingBag, Zap, Star } from "lucide-react"
import { Product } from "@/types"
import { useCart } from "@/stores/cartStore"
import { useWishlist } from "@/stores/wishlistStore"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()
  const router = useRouter()
  const wishlisted = isInWishlist(product.id)
  const productImage = product.images?.[0]

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    router.push("/checkout")
  }

  return (
    <div className="group relative overflow-hidden rounded bg-accent-foreground shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-secondary">
          {productImage ? (
            <Image
              src={productImage}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-body text-xs text-muted-foreground">
              No image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-foreground px-2.5 py-1 font-body text-[10px] font-medium tracking-widest text-background uppercase">
                New
              </span>
            )}
            {product.discountPrice && (
              <span className="bg-accent px-2.5 py-1 font-body text-[10px] font-medium tracking-widest text-accent-foreground uppercase">
                {Math.round((1 - product.discountPrice / product.price) * 100)}%
                Off
              </span>
            )}
            {!product.inStock && (
              <span className="bg-muted px-2.5 py-1 font-body text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleItem(product)
            }}
            className={`absolute shadow top-3 right-3 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-background ${wishlisted ? " opacity-100" : "md:opacity-0 md:group-hover:opacity-100"}`}
          >
            <Heart
              size={16}
              className={
                wishlisted ? "fill-accent text-accent" : "text-foreground"
              }
            />
          </button>

          {/* Quick action buttons */}
          {product?.inStock && (
            <div className="absolute right-3 bottom-3 left-3 z-10 flex gap-2 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  addItem(product)
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-accent px-2 py-2 font-body text-[11px] font-medium tracking-wider text-nowrap text-background uppercase transition-colors md:bg-foreground/90 md:hover:bg-foreground"
              >
                <ShoppingBag size={13} /> Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="hidden flex-1 items-center justify-center gap-1.5 rounded-sm bg-accent px-2 py-2 font-body text-[11px] font-medium tracking-wider text-nowrap text-accent-foreground uppercase transition-colors hover:bg-accent/90 md:flex"
              >
                <Zap size={13} /> Buy Now
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="mt-3 space-y-1 px-3 pb-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-body text-sm leading-snug font-medium text-foreground transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-xs text-muted-foreground">
          {product.shortBenefit}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star size={12} className="fill-accent text-accent" />
            <span className="font-body text-xs font-medium">
              {product.rating}
            </span>
          </div>
          <span className="font-body text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          {product.discountPrice ? (
            <>
              <span className="font-body text-sm font-semibold">
                ৳{product.discountPrice.toLocaleString()}
              </span>
              <span className="font-body text-xs text-muted-foreground line-through">
                ৳{product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-body text-sm font-semibold">
              ৳{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
