
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/20 dark:from-gray-900 dark:to-gray-900/80">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Browse Categories
          </h2>
          <Link 
            to="/products" 
            className="text-primary flex items-center hover:underline group"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col items-center rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800 border border-transparent hover:border-primary/20"
            >
              <div className="relative w-full pt-[90%] bg-muted/20 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 text-center w-full">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {category.description?.substring(0, 50) || `Explore our ${category.name} collection`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
