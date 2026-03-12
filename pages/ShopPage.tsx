"use client"
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/mockData";

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
];

const ShopPage = () => {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();

  const activeCategory = searchParams?.get("category") || "";
  const activeSort = searchParams?.get("sort") || "latest";
  const activeQuery = searchParams?.get("q") || "";

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (activeCategory) {
      filtered = filtered.filter(p => p.category.toLowerCase().replace(" ", "-") === activeCategory);
    }
    if (activeQuery.trim()) {
      const q = activeQuery.trim().toLowerCase();
      filtered = filtered.filter((p) => {
        const haystack = [
          p.name,
          p.shortBenefit,
          p.category,
          p.description,
          ...(p.tags || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }
    switch (activeSort) {
      case "price-asc": filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case "price-desc": filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case "popular": filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return filtered;
  }, [activeCategory, activeQuery, activeSort]);

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || undefined);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container-narrow py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-light">Shop All Products</h1>
        <p className="text-muted-foreground text-sm font-body mt-2">{filteredProducts.length} products</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-sm font-body">
          <SlidersHorizontal size={16} /> Filters
          {activeCategory && <span className="bg-rose-gold text-accent-foreground text-[10px] px-2 py-0.5 rounded-full">1</span>}
        </button>
        <select
          value={activeSort}
          onChange={e => setFilter("sort", e.target.value)}
          className="text-sm font-body bg-transparent border border-border rounded-sm px-3 py-2 focus:outline-none"
        >
          {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        {filtersOpen && (
          <div className="w-56 flex-shrink-0 hidden md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest font-body font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <button onClick={() => setFilter("category", "")}
                    className={`block text-sm font-body ${!activeCategory ? "text-rose-gold font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => setFilter("category", cat.slug)}
                      className={`block text-sm font-body ${activeCategory === cat.slug ? "text-rose-gold font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active filters (mobile) */}
        {activeCategory && (
          <div className="md:hidden mb-4">
            <button onClick={() => setFilter("category", "")}
              className="inline-flex items-center gap-1 text-xs bg-secondary px-3 py-1.5 rounded-full font-body">
              {activeCategory} <X size={12} />
            </button>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
