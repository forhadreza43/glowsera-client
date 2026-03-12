import type { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortBenefit: string;
  description: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: (string | StaticImageData)[];
  category: string;
  tags: string[];
  benefits?: string[];
  ingredients?: string;
  howToUse?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string | StaticImageData;
  productCount: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string | StaticImageData;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | StaticImageData;
  date: string;
  author: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}
