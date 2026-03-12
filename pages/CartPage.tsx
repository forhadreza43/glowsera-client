"use client"
import Link from "next/link"
import { Minus, Plus, X, ArrowLeft } from "lucide-react"
import { useCart } from "@/stores/cartStore"
import { CartItem } from "@/types"

const CartPage = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <div className="container-narrow py-8 md:py-12">
      <h1 className="mb-8 font-heading text-3xl font-light md:text-4xl">
        Shopping Bag
      </h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-4 font-body text-muted-foreground">
            Your bag is empty
          </p>
          <Link href="/shop" className="inline-block btn-rose">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {items.map((item: CartItem) => {
              const price = item.product.discountPrice || item.product.price
              return (
                <div
                  key={item.product.id}
                  className="flex gap-5 border-b border-border pb-6"
                >
                  <div className="h-28 w-24 flex-shrink-0 rounded-sm bg-secondary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-body text-sm font-medium hover:text-rose-gold"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 font-body text-xs text-muted-foreground">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-sm border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-secondary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-secondary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-body font-semibold">
                        ৳{(price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="sticky top-24 rounded-sm bg-secondary p-6">
              <h2 className="mb-6 font-heading text-lg font-semibold">
                Order Summary
              </h2>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <span>Total</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
              </div>
              {/* Coupon */}
              <div className="mt-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 rounded-sm border border-border bg-background px-3 py-2 font-body text-sm focus:outline-none"
                  />
                  <button className="rounded-sm border border-foreground px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors hover:bg-foreground hover:text-background">
                    Apply
                  </button>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full btn-rose text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
