
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
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 dark:from-gray-900 dark:to-gray-900/80">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-14">
          <div>
            <div className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary mb-3">
              Collections
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our handpicked collections of premium products designed for every aspect of modern living.
            </p>
          </div>
          <Link 
            to="/products" 
            className="text-primary flex items-center hover:underline group"
          >
            <span className="font-medium">View All Categories</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group animate-fade-in flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800 border border-border/30 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative pt-[80%] bg-muted/10 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 text-center flex flex-col items-center justify-between">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="mt-3 flex items-center justify-center text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="mr-1">Explore</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="group">
            Explore All Categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
