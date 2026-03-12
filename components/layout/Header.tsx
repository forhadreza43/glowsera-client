"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import { useWishlist } from "@/stores/wishlistStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Skincare", href: "/shop?category=serums" },
  { label: "Hair Care", href: "/shop?category=hair-care" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cartItems = useCart((s) => s.items);
  const setIsCartOpen = useCart((s) => s.setIsCartOpen);
  const wishlistItems = useWishlist((s) => s.items);
  const [searchValue, setSearchValue] = useState("");

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const debouncedSearchValue = useDebouncedValue(searchValue, 350);
  const urlQuery = searchParams?.get("q") || "";

  // Keep input in sync with URL when opening/searching
  useEffect(() => {
    if (!searchOpen) return;
    setSearchValue((prev) => (prev === urlQuery ? prev : urlQuery));
  }, [searchOpen, urlQuery]);

  // Debounced URL sync (and navigate to /shop)
  useEffect(() => {
    if (!searchOpen) return;

    const q = debouncedSearchValue.trim();
    const currentQs = searchParams?.toString() || "";

    // If user is not on /shop and query is empty, don't navigate.
    if (pathname !== "/shop" && !q) return;

    const baseParams =
      pathname === "/shop"
        ? new URLSearchParams(currentQs || undefined)
        : new URLSearchParams();

    if (q) baseParams.set("q", q);
    else baseParams.delete("q");

    const qs = baseParams.toString();
    // Avoid pushing the same URL repeatedly.
    if (pathname === "/shop" && qs === currentQs) return;
    router.push(`/shop${qs ? `?${qs}` : ""}`);
  }, [debouncedSearchValue, pathname, router, searchOpen, searchParams]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-narrow">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 -ml-2 text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Glowsera
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-foreground hover:text-rose-gold transition-colors">
              <Search size={20} />
            </button>
            <Link href="/login" className="p-2 text-foreground hover:text-rose-gold transition-colors">
              <User size={20} />
            </Link>
            <Link href="/wishlist" className="p-2 text-foreground hover:text-rose-gold transition-colors relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-gold text-accent-foreground text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="p-2 text-foreground hover:text-rose-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-gold text-accent-foreground text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products, ingredients, concerns..."
                className="w-full pl-12 pr-4 py-3 bg-secondary rounded-sm text-sm font-body focus:outline-none focus:ring-1 focus:ring-rose-gold placeholder:text-muted-foreground"
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  const q = searchValue.trim();
                  const currentQs = searchParams?.toString() || "";
                  if (pathname !== "/shop" && !q) return;
                  const baseParams =
                    pathname === "/shop"
                      ? new URLSearchParams(currentQs || undefined)
                      : new URLSearchParams();
                  if (q) baseParams.set("q", q);
                  else baseParams.delete("q");
                  const qs = baseParams.toString();
                  if (pathname === "/shop" && qs === currentQs) return;
                  router.push(`/shop${qs ? `?${qs}` : ""}`);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-narrow py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-wide py-2 text-foreground font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
