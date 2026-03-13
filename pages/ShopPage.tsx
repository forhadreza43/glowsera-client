'use client'
import { useMemo, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products, categories } from '@/data/mockData'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
]

const ShopPage = () => {
  const searchParams = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const isMobile = useIsMobile()
  const router = useRouter()

  const activeCategory = searchParams?.get('category') || ''
  const activeSort = searchParams?.get('sort') || 'latest'
  const activeQuery = searchParams?.get('q') || ''
  const activeMinPrice = searchParams?.get('minPrice') || ''
  const activeMaxPrice = searchParams?.get('maxPrice') || ''
  const activeInStock = (searchParams?.get('inStock') || '') === '1'
  const activeNew = (searchParams?.get('new') || '') === '1'
  const activeBestSeller = (searchParams?.get('bestSeller') || '') === '1'

  const DEFAULT_MIN_PRICE = 50
  const DEFAULT_MAX_PRICE = 100000

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = Number(activeMinPrice) || DEFAULT_MIN_PRICE
    const max = Number(activeMaxPrice) || DEFAULT_MAX_PRICE
    return [min, max]
  })

  // Keep the URL in sync with search params without triggering navigation loops
  useEffect(() => {
    if (typeof window === 'undefined') return

    const currentSearch = window.location.search || ''
    const searchParamsString = searchParams?.toString() || ''
    const desiredSearch = searchParamsString ? `?${searchParamsString}` : ''

    if (currentSearch !== desiredSearch) {
      router.replace(desiredSearch)
    }
  }, [router, searchParams])

  const activeCategorySlugs = useMemo(() => {
    if (!activeCategory.trim()) return []
    return activeCategory
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [activeCategory])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]
    if (activeCategorySlugs.length > 0) {
      filtered = filtered.filter((p) => {
        const categorySlug = p.category.toLowerCase().replace(/\s+/g, '-')
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
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
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
      case 'price-asc':
        filtered.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        )
        break
      case 'price-desc':
        filtered.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        )
        break
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }
    return filtered
  }, [
    activeBestSeller,
    activeCategorySlugs,
    activeInStock,
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
    const params = new URLSearchParams(searchParams?.toString() || undefined)
    if (enabled) params.set(key, '1')
    else params.delete(key)
    router.push(`?${params.toString()}`)
  }

  const applyPriceFilter = (value: number[]) => {
    const [min, max] = value
    const params = new URLSearchParams(searchParams?.toString() || undefined)

    // Do not keep price filters in URL at the defaults
    if (min > 50) params.set('minPrice', String(min))
    else params.delete('minPrice')

    if (max < 100000) params.set('maxPrice', String(max))
    else params.delete('maxPrice')

    router.push(`?${params.toString()}`)
  }

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
          <SlidersHorizontal
            size={16}
            className={`${filtersOpen ? 'text-primary' : ''}`}
          />{' '}
          Filters
          {(activeCategory ||
            activeMinPrice ||
            activeMaxPrice ||
            activeInStock ||
            activeNew ||
            activeBestSeller) && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
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
        <Select
          onValueChange={(value) => setFilter('sort', value)}
          defaultValue={activeSort}
        >
          <SelectTrigger className="w-48 rounded border border-border bg-transparent px-3 py-2 font-body text-sm focus:outline-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
                    onClick={() => setFilter('category', '')}
                    className={`block font-body text-sm ${!activeCategory ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter('category', cat.slug)}
                      className={`block font-body text-sm ${activeCategory === cat.slug ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}
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
                    min={50}
                    max={100000}
                    step={50}
                    value={priceRange}
                    onValueChange={(value) =>
                      setPriceRange(value as [number, number])
                    }
                    onValueCommit={applyPriceFilter}
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
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
                      setBoolFilter('inStock', Boolean(checked))
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
                        setBoolFilter('bestSeller', Boolean(checked))
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
                        setBoolFilter('new', Boolean(checked))
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
                      'category',
                      'minPrice',
                      'maxPrice',
                      'inStock',
                      'new',
                      'bestSeller',
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
                      onClick={() => setFilter('category', '')}
                      className={`block font-body text-sm ${!activeCategory ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      All Products
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFilter('category', cat.slug)}
                        className={`block font-body text-sm ${activeCategory === cat.slug ? 'font-medium text-primary' : 'text-muted-foreground hover:text-foreground'}`}
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
                      min={50}
                      max={100000}
                      step={50}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      onValueCommit={applyPriceFilter}
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
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
                        setBoolFilter('inStock', Boolean(checked))
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
                          setBoolFilter('bestSeller', Boolean(checked))
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
                          setBoolFilter('new', Boolean(checked))
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
                        'category',
                        'minPrice',
                        'maxPrice',
                        'inStock',
                        'new',
                        'bestSeller',
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
          <div className="mb-4 hidden">
            <div className="flex flex-wrap gap-2">
              {activeCategory && (
                <button
                  onClick={() => setFilter('category', '')}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  {activeCategory} <X size={12} />
                </button>
              )}
              {(activeMinPrice || activeMaxPrice) && (
                <button
                  onClick={() => {
                    setFilter('minPrice', '')
                    setFilter('maxPrice', '')
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  Price <X size={12} />
                </button>
              )}
              {activeInStock && (
                <button
                  onClick={() => setBoolFilter('inStock', false)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  In stock <X size={12} />
                </button>
              )}
              {activeBestSeller && (
                <button
                  onClick={() => setBoolFilter('bestSeller', false)}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-body text-xs"
                >
                  Popular <X size={12} />
                </button>
              )}
              {activeNew && (
                <button
                  onClick={() => setBoolFilter('new', false)}
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
          <div
            className={`grid grid-cols-2 gap-4 md:gap-6 ${filtersOpen ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'}`}
          >
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
