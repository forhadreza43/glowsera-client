"use client"
import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import ProductCard from "@/components/product/ProductCard"
import { products, categories } from "@/data/mockData"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/hooks/use-mobile"

const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "popular" },
]

const allPrices = products.map((p) => p.discountPrice || p.price)
const ABS_MIN_PRICE = allPrices.length ? Math.min(...allPrices) : 0
const ABS_MAX_PRICE = allPrices.length ? Math.max(...allPrices) : 0

const ShopPage = () => {
  const searchParams = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()

  const activeCategory = searchParams?.get("category") || ""
  const activeSort = searchParams?.get("sort") || "latest"
  const activeQuery = searchParams?.get("q") || ""
  const activeMinPrice = searchParams?.get("minPrice") || ""
  const activeMaxPrice = searchParams?.get("maxPrice") || ""
  const activeInStock = (searchParams?.get("inStock") || "") === "1"
  const activeNew = (searchParams?.get("new") || "") === "1"
  const activeBestSeller = (searchParams?.get("bestSeller") || "") === "1"

  const activeCategorySlugs = useMemo(() => {
    if (!activeCategory.trim()) return []
    return activeCategory
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }, [activeCategory])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (activeCategorySlugs.length > 0) {
      filtered = filtered.filter((p) => {
        const categorySlug = p.category.toLowerCase().replace(/\s+/g, "-")
        return activeCategorySlugs.includes(categorySlug)
      })
    }
    if (activeQuery.trim()) {
      const q = activeQuery.trim().toLowerCase()
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
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    const min = Number.parseFloat(activeMinPrice)
    const max = Number.parseFloat(activeMaxPrice)
    const hasMin = Number.isFinite(min)
    const hasMax = Number.isFinite(max)
    if (hasMin || hasMax) {
      filtered = filtered.filter((p) => {
        const price = p.discountPrice || p.price
        if (hasMin && price < min) return false
        if (hasMax && price > max) return false
        return true
      })
    }

    if (activeInStock) {
      filtered = filtered.filter((p) => p.inStock)
    }
    if (activeNew) {
      filtered = filtered.filter((p) => Boolean(p.isNew))
    }
    if (activeBestSeller) {
      // Using isBestSeller as "popular product" flag in current data model
      filtered = filtered.filter((p) => Boolean(p.isBestSeller))
    }

    switch (activeSort) {
      case "price-asc":
        filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        )
        break
      case "price-desc":
        filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        )
        break
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }
    return filtered
  }, [
    activeBestSeller,
    activeCategorySlugs,
    activeInStock,
    activeMaxPrice,
    activeMinPrice,
    activeNew,
    activeQuery,
    activeSort,
  ])

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || undefined)
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`?${params.toString()}`)
  }

  const setBoolFilter = (key: string, enabled: boolean) => {
    setFilter(key, enabled ? "1" : "")
  }

  const parsedMin = Number.parseFloat(activeMinPrice)
  const parsedMax = Number.parseFloat(activeMaxPrice)
  const sliderMin = Number.isFinite(parsedMin) ? parsedMin : ABS_MIN_PRICE
  const sliderMax = Number.isFinite(parsedMax) ? parsedMax : ABS_MAX_PRICE

  return (
    <div className="container-narrow py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-light md:text-4xl">
          Shop All Products
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          {filteredProducts.length} products
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 font-body text-sm"
        >
          <SlidersHorizontal size={16} /> Filters
          {(activeCategory ||
            activeMinPrice ||
            activeMaxPrice ||
            activeInStock ||
            activeNew ||
            activeBestSeller) && (
            <span className="rounded-full bg-rose-gold px-2 py-0.5 text-[10px] text-accent-foreground">
              {
                [
                  Boolean(activeCategory),
                  Boolean(activeMinPrice || activeMaxPrice),
                  activeInStock,
                  activeNew,
                  activeBestSeller,
                ].filter(Boolean).length
              }
            </span>
          )}
        </button>
        <select
          value={activeSort}
          onChange={(e) => setFilter("sort", e.target.value)}
          className="rounded-sm border border-border bg-transparent px-3 py-2 font-body text-sm focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        {filtersOpen && (
          <div className="hidden w-56 shrink-0 md:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                  Category
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilter("category", "")}
                    className={`block font-body text-sm ${!activeCategory ? "font-medium text-rose-gold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter("category", cat.slug)}
                      className={`block font-body text-sm ${activeCategory === cat.slug ? "font-medium text-rose-gold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                  Price Range
                </h3>
                <div className="mb-3">
                  <Slider
                    min={ABS_MIN_PRICE}
                    max={ABS_MAX_PRICE}
                    step={50}
                    value={[sliderMin, sliderMax]}
                    onValueChange={([min, max]) => {
                      setFilter("minPrice", String(Math.round(min)))
                      setFilter("maxPrice", String(Math.round(max)))
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field orientation="vertical">
                    <FieldLabel>
                      <FieldTitle>
                        <Label htmlFor="price-min">Min</Label>
                      </FieldTitle>
                      <FieldContent>
                        <Input
                          id="price-min"
                          value={activeMinPrice}
                          inputMode="numeric"
                          placeholder={ABS_MIN_PRICE.toString()}
                          onChange={(e) =>
                            setFilter(
                              "minPrice",
                              e.target.value.replace(/[^\d.]/g, "")
                            )
                          }
                        />
                      </FieldContent>
                    </FieldLabel>
                  </Field>
                  <Field orientation="vertical">
                    <FieldLabel>
                      <FieldTitle>
                        <Label htmlFor="price-max">Max</Label>
                      </FieldTitle>
                      <FieldContent>
                        <Input
                          id="price-max"
                          value={activeMaxPrice}
                          inputMode="numeric"
                          placeholder={ABS_MAX_PRICE.toString()}
                          onChange={(e) =>
                            setFilter(
                              "maxPrice",
                              e.target.value.replace(/[^\d.]/g, "")
                            )
                          }
                        />
                      </FieldContent>
                    </FieldLabel>
                  </Field>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                  Availability
                </h3>
                <Field orientation="horizontal">
                  <Checkbox
                    id="in-stock-checkbox"
                    checked={activeInStock}
                    onCheckedChange={(checked) =>
                      setBoolFilter("inStock", Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor="in-stock-checkbox"
                    className="font-body text-sm text-muted-foreground"
                  >
                    In stock only
                  </Label>
                </Field>
              </div>

              <div>
                <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                  Tags
                </h3>
                <div className="space-y-2">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="popular-checkbox"
                      checked={activeBestSeller}
                      onCheckedChange={(checked) =>
                        setBoolFilter("bestSeller", Boolean(checked))
                      }
                    />
                    <Label
                      htmlFor="popular-checkbox"
                      className="font-body text-sm text-muted-foreground"
                    >
                      Popular products
                    </Label>
                  </Field>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="new-checkbox"
                      checked={activeNew}
                      onCheckedChange={(checked) =>
                        setBoolFilter("new", Boolean(checked))
                      }
                    />
                    <Label
                      htmlFor="new-checkbox"
                      className="font-body text-sm text-muted-foreground"
                    >
                      New arrivals
                    </Label>
                  </Field>
                </div>
              </div>

              {(activeCategory ||
                activeMinPrice ||
                activeMaxPrice ||
                activeInStock ||
                activeNew ||
                activeBestSeller) && (
                <button
                  onClick={() => {
                    const params = new URLSearchParams(
                      searchParams?.toString() || undefined
                    )
                    ;[
                      "category",
                      "minPrice",
                      "maxPrice",
                      "inStock",
                      "new",
                      "bestSeller",
                    ].forEach((k) => params.delete(k))
                    router.push(`?${params.toString()}`)
                  }}
                  className="text-left font-body text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile filter drawer - only show on mobile */}
        {isMobile && (
          <Drawer
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            direction="bottom"
          >
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader className="flex flex-row items-center justify-between border-b pb-4">
                <DrawerTitle className="text-lg font-semibold">
                  Filters
                </DrawerTitle>
                <DrawerClose asChild>
                  <button className="rounded-full p-2 hover:bg-secondary">
                    <X size={20} />
                  </button>
                </DrawerClose>
              </DrawerHeader>
              <div className="space-y-6 overflow-y-auto p-4">
                <div>
                  <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFilter("category", "")}
                      className={`block font-body text-sm ${!activeCategory ? "font-medium text-rose-gold" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFilter("category", cat.slug)}
                        className={`block font-body text-sm ${activeCategory === cat.slug ? "font-medium text-rose-gold" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                    Price Range
                  </h3>
                  <div className="mb-3">
                    <Slider
                      min={ABS_MIN_PRICE}
                      max={ABS_MAX_PRICE}
                      step={50}
                      value={[sliderMin, sliderMax]}
                      onValueChange={([min, max]) => {
                        setFilter("minPrice", String(Math.round(min)))
                        setFilter("maxPrice", String(Math.round(max)))
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field orientation="vertical">
                      <FieldLabel>
                        <FieldTitle>
                          <Label htmlFor="price-min-mobile">Min</Label>
                        </FieldTitle>
                        <FieldContent>
                          <Input
                            id="price-min-mobile"
                            value={activeMinPrice}
                            inputMode="numeric"
                            placeholder={ABS_MIN_PRICE.toString()}
                            onChange={(e) =>
                              setFilter(
                                "minPrice",
                                e.target.value.replace(/[^\d.]/g, "")
                              )
                            }
                          />
                        </FieldContent>
                      </FieldLabel>
                    </Field>
                    <Field orientation="vertical">
                      <FieldLabel>
                        <FieldTitle>
                          <Label htmlFor="price-max-mobile">Max</Label>
                        </FieldTitle>
                        <FieldContent>
                          <Input
                            id="price-max-mobile"
                            value={activeMaxPrice}
                            inputMode="numeric"
                            placeholder={ABS_MAX_PRICE.toString()}
                            onChange={(e) =>
                              setFilter(
                                "maxPrice",
                                e.target.value.replace(/[^\d.]/g, "")
                              )
                            }
                          />
                        </FieldContent>
                      </FieldLabel>
                    </Field>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                    Availability
                  </h3>
                  <Field orientation="horizontal">
                    <Checkbox
                      id="in-stock-checkbox-mobile"
                      checked={activeInStock}
                      onCheckedChange={(checked) =>
                        setBoolFilter("inStock", Boolean(checked))
                      }
                    />
                    <Label
                      htmlFor="in-stock-checkbox-mobile"
                      className="font-body text-sm text-muted-foreground"
                    >
                      In stock only
                    </Label>
                  </Field>
                </div>

                <div>
                  <h3 className="mb-3 font-body text-xs font-semibold tracking-widest uppercase">
                    Tags
                  </h3>
                  <div className="space-y-2">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="popular-checkbox-mobile"
                        checked={activeBestSeller}
                        onCheckedChange={(checked) =>
                          setBoolFilter("bestSeller", Boolean(checked))
                        }
                      />
                      <Label
                        htmlFor="popular-checkbox-mobile"
                        className="font-body text-sm text-muted-foreground"
                      >
                        Popular products
                      </Label>
                    </Field>
                    <Field orientation="horizontal">
                      <Checkbox
                        id="new-checkbox-mobile"
                        checked={activeNew}
                        onCheckedChange={(checked) =>
                          setBoolFilter("new", Boolean(checked))
                        }
                      />
                      <Label
                        htmlFor="new-checkbox-mobile"
                        className="font-body text-sm text-muted-foreground"
                      >
                        New arrivals
                      </Label>
                    </Field>
                  </div>
                </div>

                {(activeCategory ||
                  activeMinPrice ||
                  activeMaxPrice ||
                  activeInStock ||
                  activeNew ||
                  activeBestSeller) && (
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams?.toString() || undefined
                      )
                      ;[
                        "category",
                        "minPrice",
                        "maxPrice",
                        "inStock",
                        "new",
                        "bestSeller",
                      ].forEach((k) => params.delete(k))
                      router.push(`?${params.toString()}`)
                    }}
                    className="text-left font-body text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        )}
        {(activeCategory ||
          activeMinPrice ||
          activeMaxPrice ||
          activeInStock ||
          activeNew ||
          activeBestSeller) && (
          <div className="mb-4 md:hidden">
            <div className="flex flex-wrap gap-2">
              {activeCategory && (
                <button
                  onClick={() => setFilter("category", "")}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  {activeCategory} <X size={12} />
                </button>
              )}
              {(activeMinPrice || activeMaxPrice) && (
                <button
                  onClick={() => {
                    setFilter("minPrice", "")
                    setFilter("maxPrice", "")
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  Price <X size={12} />
                </button>
              )}
              {activeInStock && (
                <button
                  onClick={() => setBoolFilter("inStock", false)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  In stock <X size={12} />
                </button>
              )}
              {activeBestSeller && (
                <button
                  onClick={() => setBoolFilter("bestSeller", false)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  Popular <X size={12} />
                </button>
              )}
              {activeNew && (
                <button
                  onClick={() => setBoolFilter("new", false)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  New <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-body text-muted-foreground">
                No products found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopPage
