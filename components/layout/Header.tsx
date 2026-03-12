"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/stores/cartStore"
import { useWishlist } from "@/stores/wishlistStore"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Skincare", href: "/shop?category=serums" },
  { label: "Hair Care", href: "/shop?category=hair-care" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const cartItems = useCart((s) => s.items)
  const setIsCartOpen = useCart((s) => s.setIsCartOpen)
  const wishlistItems = useWishlist((s) => s.items)
  const [searchValue, setSearchValue] = useState(searchParams?.get("q") || "")

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0)
  const wishlistCount = wishlistItems.length

  const debouncedSearchValue = useDebouncedValue(searchValue, 350)
  const urlQuery = searchParams?.get("q") || ""

  // Keep input in sync with URL when search opens
  useEffect(() => {
    if (!searchOpen) return
    // eslint-disable-next-line
    setSearchValue(urlQuery)
  }, [searchOpen, urlQuery])

  // Debounced URL sync (and navigate to /shop)
  useEffect(() => {
    if (!searchOpen) return

    const q = debouncedSearchValue.trim()
    const currentQs = searchParams?.toString() || ""

    // If user is not on /shop and query is empty, don't navigate.
    if (pathname !== "/shop" && !q) return

    const baseParams =
      pathname === "/shop"
        ? new URLSearchParams(currentQs || undefined)
        : new URLSearchParams()

    if (q) baseParams.set("q", q)
    else baseParams.delete("q")

    const qs = baseParams.toString()
    // Avoid pushing the same URL repeatedly.
    if (pathname === "/shop" && qs === currentQs) return
    router.push(`/shop${qs ? `?${qs}` : ""}`)
  }, [debouncedSearchValue, pathname, router, searchOpen, searchParams])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-narrow">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="-ml-2 p-2 text-foreground md:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="font-heading text-2xl text-rose-gold font-semibold tracking-tight md:text-3xl">
                Glowsera
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-foreground transition-colors hover:text-rose-gold"
            >
              <Search size={20} />
            </button>
            <Link
              href="/login"
              className="p-2 text-foreground transition-colors hover:text-rose-gold"
            >
              <User size={20} />
            </Link>
            <Link
              href="/wishlist"
              className="relative p-2 text-foreground transition-colors hover:text-rose-gold"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-gold px-1 text-[10px] font-medium text-accent-foreground">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground transition-colors hover:text-rose-gold"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-gold px-1 text-[10px] font-medium text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="animate-fade-in pb-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search for products, ingredients, concerns..."
                className="w-full rounded-sm bg-secondary py-3 pr-4 pl-12 font-body text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-rose-gold focus:outline-none"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return
                  const q = searchValue.trim()
                  const currentQs = searchParams?.toString() || ""
                  if (pathname !== "/shop" && !q) return
                  const baseParams =
                    pathname === "/shop"
                      ? new URLSearchParams(currentQs || undefined)
                      : new URLSearchParams()
                  if (q) baseParams.set("q", q)
                  else baseParams.delete("q")
                  const qs = baseParams.toString()
                  if (pathname === "/shop" && qs === currentQs) return
                  router.push(`/shop${qs ? `?${qs}` : ""}`)
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-border bg-background md:hidden">
          <nav className="container-narrow flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 font-body text-sm tracking-wide text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
