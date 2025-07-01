
// This file now serves as type definitions and will be gradually phased out
// Data is now fetched from Supabase using custom hooks

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  reviews?: number;
  details?: {
    [key: string]: string | string[];
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  href?: string;
}

// Legacy exports for backwards compatibility - these will be empty
export const products: Product[] = [];
export const categories: Category[] = [];
