"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"
import { useState } from "react"
import { products } from "@/data/mockData"
import { useCart } from "@/stores/cartStore"
import { useWishlist } from "@/stores/wishlistStore"
import ProductCard from "@/components/product/ProductCard"
import Image from "next/image"
import { Product } from "@/types"

const tabs = ["Description", "Benefits", "Ingredients", "How to Use"]

const ProductDetailPage = () => {
  const params = useParams()
  const slug = params?.slug as string
  const product = products.find((p: Product) => p.slug === slug)
  const { addItem } = useCart()
  const { isInWishlist, toggleItem } = useWishlist()
  const [activeTab, setActiveTab] = useState(0)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container-narrow py-20 text-center">
        <h1 className="font-heading text-2xl">Product not found</h1>
        <Link href="/shop" className="mt-6 inline-block btn-rose">
          Back to Shop
        </Link>
      </div>
    )
  }

  const wishlisted = isInWishlist(product.id)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="container-narrow py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 font-body text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground">
          Shop
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-sm bg-secondary">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square cursor-pointer overflow-hidden rounded-sm bg-secondary transition-all hover:ring-1 hover:ring-rose-gold"
              >
                {product.images?.[0] && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover opacity-70 transition-opacity hover:opacity-100"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="font-body text-xs tracking-widest text-rose-gold uppercase">
            {product.category}
          </span>
          <h1 className="mt-2 font-heading text-2xl font-light md:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-rose-gold text-rose-gold"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <span className="font-body text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            {product.discountPrice ? (
              <>
                <span className="font-heading text-2xl font-semibold">
                  ৳{product.discountPrice.toLocaleString()}
                </span>
                <span className="font-body text-lg text-muted-foreground line-through">
                  ৳{product.price.toLocaleString()}
                </span>
                <span className="rounded-sm bg-rose-gold px-2 py-0.5 font-body text-xs text-accent-foreground">
                  Save{" "}
                  {Math.round(
                    (1 - product.discountPrice / product.price) * 100
                  )}
                  %
                </span>
              </>
            ) : (
              <span className="font-heading text-2xl font-semibold">
                ৳{product.price.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Quantity & Actions */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-sm hover:bg-secondary"
                >
                  −
                </button>
                <span className="border-x border-border px-4 py-2 text-sm font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-sm hover:bg-secondary"
                >
                  +
                </button>
              </div>
              <span
                className={`font-body text-xs ${product.inStock ? "text-green-600" : "text-destructive"}`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) addItem(product)
                }}
                disabled={!product.inStock}
                className="flex flex-1 items-center justify-center gap-2 btn-rose disabled:opacity-50"
              >
                <ShoppingBag size={16} /> Add to Bag
              </button>
              <button
                onClick={() => toggleItem(product)}
                className={`rounded-sm border p-3 transition-colors ${wishlisted ? "border-rose-gold bg-rose-gold-light" : "border-border hover:border-rose-gold"}`}
              >
                <Heart
                  size={20}
                  className={
                    wishlisted
                      ? "fill-rose-gold text-rose-gold"
                      : "text-foreground"
                  }
                />
              </button>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { icon: Truck, label: "Free Delivery" },
              { icon: Shield, label: "Authentic" },
              { icon: RotateCcw, label: "Easy Returns" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon
                  size={18}
                  className="mx-auto mb-1 text-muted-foreground"
                />
                <span className="font-body text-[11px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-8 border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`pb-3 font-body text-sm transition-colors ${i === activeTab ? "border-b-2 border-rose-gold font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="max-w-2xl py-8 font-body text-sm leading-relaxed text-muted-foreground">
          {activeTab === 0 && <p>{product.description}</p>}
          {activeTab === 1 && (
            <ul className="space-y-2">
              {(
                product.benefits || [
                  "Improves skin health",
                  "Visible results in 4 weeks",
                ]
              ).map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 text-rose-gold">•</span> {b}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 2 && (
            <p>
              {product.ingredients ||
                "Full ingredients list available on packaging."}
            </p>
          )}
          {activeTab === 3 && (
            <p>{product.howToUse || "Apply as directed on packaging."}</p>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-16">
          <h2 className="mb-8 font-heading text-2xl font-light md:text-3xl">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetailPage
