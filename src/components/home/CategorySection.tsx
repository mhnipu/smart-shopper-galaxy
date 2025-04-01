
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Explore our handpicked collections of premium products designed for every aspect of modern living
          </p>
          <div className="w-16 h-1.5 bg-primary/80 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group animate-fade-in flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white dark:bg-gray-800/60 border border-border/20 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative pt-[100%] bg-muted/10 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 text-center flex flex-col items-center justify-between bg-gradient-to-t from-muted/20 to-transparent dark:from-gray-800/60 dark:to-transparent">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="mt-3 flex items-center justify-center text-primary text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <span className="mr-1">Explore Collection</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <Link to="/products">
            <Button variant="outline" size="lg" className="group border-primary/30 hover:bg-primary/5 shadow-sm">
              Explore All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
