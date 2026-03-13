"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Star,
  Truck,
  Shield,
  CreditCard,
  Clock,
  ChevronRight,
} from "lucide-react"
import ProductCard from "@/components/product/ProductCard"
import {
  products,
  categories,
  testimonials,
  skinConcerns,
  blogPosts,
} from "@/data/mockData"
import heroImage from "@/assets/hero-skincare.jpg"
import heroCollection from "@/assets/hero-collection.jpg"
import { useState } from "react"
import Image from "next/image"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const HomePage = () => {
  const [heroIndex, setHeroIndex] = useState(0)
  const heroes = [
    {
      image: heroImage,
      title: "Unlock Your\nNatural Glow",
      subtitle:
        "Clinically proven skincare formulas crafted for radiant, healthy skin.",
      cta: "Shop Now",
      ctaLink: "/shop",
    },
    {
      image: heroCollection,
      title: "The Essentials\nCollection",
      subtitle: "Everything your skin needs in one curated set.",
      cta: "Explore",
      ctaLink: "/shop?collection=essentials",
    },
  ]
  const hero = heroes[heroIndex]

  const bestSellers = products.filter((p) => p.isBestSeller)
  const newArrivals = products.filter((p) => p.isNew)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] overflow-hidden md:h-[90vh]">
        <Image
          src={hero.image}
          alt="Glowsera skincare"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-linear-to-r from-foreground/60 via-foreground/30 to-transparent" />
        <div className="relative container-narrow flex h-full items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-lg"
          >
            <h1 className="font-heading text-4xl leading-[1.1] font-light whitespace-pre-line text-background md:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-background/80 md:text-base">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex gap-4">
              <Link href={hero.ctaLink} className="btn-rose">
                {hero.cta}
              </Link>
              <Link
                href="/shop"
                className="rounded-sm border border-background/40 px-8 py-3 text-xs font-medium tracking-wider text-background uppercase transition-all hover:bg-background/10"
              >
                View All
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {heroes.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${i === heroIndex ? "w-6 bg-background" : "bg-background/40"}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Find exactly what your skin needs
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group overflow-hidden rounded bg-secondary p-4 text-center transition-all duration-300 hover:bg-primary-light"
              >
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full bg-background">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    width={512}
                    height={512}
                  />
                </div>
                <h3 className="font-body text-sm font-medium">{cat.name}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  {cat.productCount} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/50 py-16">
        <div className="container-narrow">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-light md:text-4xl">
                Best Sellers
              </h2>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Our most loved products
              </p>
            </div>
            <Link
              href="/shop?sort=popular"
              className="flex items-center gap-1 font-body text-sm text-foreground transition-colors hover:text-primary"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded bg-foreground p-10 text-background md:flex-row md:p-16">
            <div className="flex-1">
              <span className="font-body text-xs tracking-widest text-primary uppercase">
                Limited Time Offer
              </span>
              <h2 className="mt-3 font-heading text-3xl leading-tight font-light md:text-5xl">
                Get 20% Off
                <br />
                Your First Order
              </h2>
              <p className="mt-4 max-w-md font-body text-sm text-background/70">
                Join the Glowsera family and start your skincare journey with an
                exclusive welcome discount.
              </p>
              <Link href="/register" className="mt-6 inline-block btn-rose">
                Sign Up Now
              </Link>
            </div>
            <div className="h-48 w-48 shrink-0 rounded-full bg-primary/20 md:h-64 md:w-64" />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container-narrow">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-light md:text-4xl">
                New Arrivals
              </h2>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Fresh additions to our collection
              </p>
            </div>
            <Link
              href="/shop?sort=latest"
              className="flex items-center gap-1 font-body text-sm text-foreground transition-colors hover:text-primary"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="bg-secondary/50 py-16">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              Shop by Concern
            </h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Targeted solutions for your skin goals
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {skinConcerns.map((concern) => (
              <Link
                key={concern.slug}
                href={`/shop?concern=${concern.slug}`}
                className="group relative aspect-square overflow-hidden rounded"
              >
                <Image
                  src={concern.image}
                  alt={concern.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={512}
                  height={512}
                />
                <div className="absolute inset-0 bg-foreground/40 transition-colors group-hover:bg-foreground/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-body text-sm font-semibold tracking-wider text-background uppercase">
                    {concern.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Glowsera */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              Why Choose Glowsera
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "100% Authentic",
                desc: "Every product verified genuine",
              },
              {
                icon: CreditCard,
                title: "Secure Payment",
                desc: "SSL encrypted transactions",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Across Bangladesh",
              },
              {
                icon: Clock,
                title: "COD Available",
                desc: "Pay when you receive",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h3 className="mb-1 font-body text-sm font-semibold">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/50 py-16">
        <div className="container-narrow">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-light md:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded border border-border bg-background p-6"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mb-4 font-body text-sm leading-relaxed text-foreground">
                  {t.text}
                </p>
                <p className="font-body text-xs font-semibold text-muted-foreground">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-light md:text-4xl">
                From Our Blog
              </h2>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Expert skincare advice & tips
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 font-body text-sm text-foreground transition-colors hover:text-primary"
            >
              All Articles <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="mb-4 aspect-16/10 overflow-hidden rounded bg-secondary">
                  {post.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={512}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="font-body text-xs tracking-wider text-primary uppercase">
                  {post.category}
                </span>
                <h3 className="mt-1 font-heading text-base leading-snug font-medium transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-body text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
