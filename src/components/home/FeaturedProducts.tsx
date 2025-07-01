
import React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return (
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <p className="text-red-500">Error loading featured products</p>
        </div>
      </section>
    );
  }

  const featuredProducts = products?.filter(product => product.featured) || [];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our handpicked selection of premium tech products designed to elevate your lifestyle.
            </p>
          </div>
          <Link 
            to="/products"
            className="flex items-center text-primary font-medium mt-4 md:mt-0 group"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-fade-in">
                <Skeleton className="aspect-square rounded-xl mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))
          ) : (
            featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
