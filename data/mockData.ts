import { Product, Category, BlogPost, Testimonial } from "@/types";

// Product images
import vitaminCSerum from "@/assets/products/vitamin-c-serum.jpg";
import hyaluronicGel from "@/assets/products/hyaluronic-gel.jpg";
import niacinamideSerum from "@/assets/products/niacinamide-serum.jpg";
import retinolCream from "@/assets/products/retinol-cream.jpg";
import foamingCleanser from "@/assets/products/foaming-cleanser.jpg";
import sunscreenImg from "@/assets/products/sunscreen.jpg";
import hairMask from "@/assets/products/hair-mask.jpg";
import acneGel from "@/assets/products/acne-gel.jpg";

// Category images
import serumsCategory from "@/assets/categories/serums.jpg";
import moisturizersCategory from "@/assets/categories/moisturizers.jpg";
import cleansersCategory from "@/assets/categories/cleansers.jpg";
import sunscreenCategory from "@/assets/categories/sunscreen.jpg";
import hairCareCategory from "@/assets/categories/hair-care.jpg";
import faceMasksCategory from "@/assets/categories/face-masks.jpg";

// Concern images
import acneConcern from "@/assets/concerns/acne.jpg";
import drySkinConcern from "@/assets/concerns/dry-skin.jpg";
import antiAgingConcern from "@/assets/concerns/anti-aging.jpg";
import hairFallConcern from "@/assets/concerns/hair-fall.jpg";
import pigmentationConcern from "@/assets/concerns/pigmentation.jpg";

// Blog images
import blogSkincareRoutine from "@/assets/blog/skincare-routine.jpg";
import blogAntiAging from "@/assets/blog/anti-aging-ingredients.jpg";
import blogSunscreen from "@/assets/blog/sunscreen-guide.jpg";
export const categories: Category[] = [
  { id: "1", name: "Serums", slug: "serums", description: "Concentrated formulas for targeted results", image: serumsCategory, productCount: 24 },
  { id: "2", name: "Moisturizers", slug: "moisturizers", description: "Deep hydration for every skin type", image: moisturizersCategory, productCount: 18 },
  { id: "3", name: "Cleansers", slug: "cleansers", description: "Gentle yet effective cleansing", image: cleansersCategory, productCount: 15 },
  { id: "4", name: "Sunscreen", slug: "sunscreen", description: "Advanced UV protection", image: sunscreenCategory, productCount: 12 },
  { id: "5", name: "Hair Care", slug: "hair-care", description: "Nourish from root to tip", image: hairCareCategory, productCount: 20 },
  { id: "6", name: "Face Masks", slug: "face-masks", description: "Spa-quality treatments at home", image: faceMasksCategory, productCount: 10 },
];

export const products: Product[] = [
  {
    id: "1", name: "Vitamin C Radiance Serum", slug: "vitamin-c-radiance-serum",
    shortBenefit: "Brightens & evens skin tone",
    description: "A powerful antioxidant serum with 15% Vitamin C to visibly brighten, firm, and protect your skin from environmental damage.",
    price: 2450, discountPrice: 1999, rating: 4.8, reviewCount: 234, inStock: true,
    images: [vitaminCSerum], category: "Serums", tags: ["brightening", "anti-aging"],
    benefits: ["Reduces dark spots", "Boosts collagen", "Protects against UV damage", "Evens skin tone"],
    ingredients: "Ascorbic Acid (15%), Vitamin E, Ferulic Acid, Hyaluronic Acid, Aloe Vera Extract",
    howToUse: "Apply 3-4 drops on cleansed face every morning before moisturizer. Follow with SPF.",
    isNew: false, isBestSeller: true,
  },
  {
    id: "2", name: "Hyaluronic Acid Hydrating Gel", slug: "hyaluronic-acid-hydrating-gel",
    shortBenefit: "72-hour deep hydration",
    description: "Multi-weight hyaluronic acid gel that delivers intense hydration to all skin layers for a plump, dewy complexion.",
    price: 1850, rating: 4.7, reviewCount: 189, inStock: true,
    images: [hyaluronicGel], category: "Moisturizers", tags: ["hydrating", "dry-skin"],
    benefits: ["Deep hydration", "Plumps fine lines", "Lightweight formula", "Non-comedogenic"],
    isNew: true, isBestSeller: false,
  },
  {
    id: "3", name: "Niacinamide Pore Refining Serum", slug: "niacinamide-pore-refining-serum",
    shortBenefit: "Minimizes pores & controls oil",
    description: "10% Niacinamide serum that refines pores, controls excess sebum, and improves skin texture.",
    price: 1650, discountPrice: 1399, rating: 4.6, reviewCount: 156, inStock: true,
    images: [niacinamideSerum], category: "Serums", tags: ["acne", "oily-skin"],
    isBestSeller: true,
  },
  {
    id: "4", name: "Retinol Night Renewal Cream", slug: "retinol-night-renewal-cream",
    shortBenefit: "Reduces wrinkles overnight",
    description: "Advanced retinol cream with encapsulated retinol for maximum anti-aging benefits without irritation.",
    price: 2850, rating: 4.9, reviewCount: 312, inStock: true,
    images: [retinolCream], category: "Moisturizers", tags: ["anti-aging"],
    isNew: false, isBestSeller: true,
  },
  {
    id: "5", name: "Gentle Foaming Cleanser", slug: "gentle-foaming-cleanser",
    shortBenefit: "Removes impurities gently",
    description: "pH-balanced foaming cleanser that removes makeup and impurities without stripping skin's natural moisture.",
    price: 1250, rating: 4.5, reviewCount: 98, inStock: true,
    images: [foamingCleanser], category: "Cleansers", tags: ["gentle", "all-skin"],
    isNew: true,
  },
  {
    id: "6", name: "SPF 50+ Invisible Sunscreen", slug: "spf-50-invisible-sunscreen",
    shortBenefit: "Weightless UV protection",
    description: "Ultra-light, invisible sunscreen with broad-spectrum SPF 50+ that leaves no white cast.",
    price: 1750, discountPrice: 1499, rating: 4.8, reviewCount: 267, inStock: true,
    images: [sunscreenImg], category: "Sunscreen", tags: ["sun-protection"],
    isBestSeller: true,
  },
  {
    id: "7", name: "Keratin Hair Repair Mask", slug: "keratin-hair-repair-mask",
    shortBenefit: "Repairs damaged hair in minutes",
    description: "Intensive keratin treatment mask that repairs damaged, frizzy hair and restores silky smoothness.",
    price: 1950, rating: 4.7, reviewCount: 145, inStock: true,
    images: [hairMask], category: "Hair Care", tags: ["hair-fall", "repair"],
  },
  {
    id: "8", name: "Salicylic Acid Acne Spot Gel", slug: "salicylic-acid-acne-spot-gel",
    shortBenefit: "Targets acne overnight",
    description: "Fast-acting spot treatment with 2% salicylic acid to clear breakouts and prevent new ones.",
    price: 950, rating: 4.4, reviewCount: 203, inStock: false,
    images: [acneGel], category: "Serums", tags: ["acne"],
    isNew: true,
  },
];

export const blogPosts: BlogPost[] = [
  { id: "1", title: "The Ultimate Guide to Building a Skincare Routine", slug: "ultimate-skincare-routine-guide", excerpt: "Learn how to layer your products correctly for maximum results.", image: blogSkincareRoutine, date: "2026-02-28", author: "Dr. Sarah Ahmed", category: "Skincare Tips" },
  { id: "2", title: "5 Ingredients to Look for in Anti-Aging Products", slug: "anti-aging-ingredients", excerpt: "Discover the science-backed ingredients that actually work.", image: blogAntiAging, date: "2026-02-20", author: "Glowsera Team", category: "Ingredients" },
  { id: "3", title: "How to Choose the Right Sunscreen for Your Skin Type", slug: "choosing-right-sunscreen", excerpt: "Not all sunscreens are created equal. Here's what to know.", image: blogSunscreen, date: "2026-02-15", author: "Dr. Sarah Ahmed", category: "Sun Care" },
];

export const testimonials: Testimonial[] = [
  { id: "1", name: "Fatima K.", text: "Glowsera's Vitamin C serum completely transformed my skin. Dark spots are fading and my skin glows!", rating: 5 },
  { id: "2", name: "Ayesha R.", text: "The retinol cream is amazing. I've been using it for 3 months and my fine lines are visibly reduced.", rating: 5 },
  { id: "3", name: "Nadia S.", text: "Best skincare brand I've tried. The products are authentic and delivery is always fast.", rating: 4 },
  { id: "4", name: "Zara M.", text: "Love the hyaluronic acid gel! My dry skin finally feels hydrated all day long.", rating: 5 },
];

export const skinConcerns = [
  { name: "Acne", slug: "acne", icon: "🔴", image: acneConcern },
  { name: "Dry Skin", slug: "dry-skin", icon: "💧", image: drySkinConcern },
  { name: "Anti-Aging", slug: "anti-aging", icon: "✨", image: antiAgingConcern },
  { name: "Hair Fall", slug: "hair-fall", icon: "💇", image: hairFallConcern },
  { name: "Pigmentation", slug: "pigmentation", icon: "🌟", image: pigmentationConcern },
];
