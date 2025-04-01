
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/20 dark:from-gray-900 dark:to-gray-900/80">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 text-center flex flex-col items-center">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <div className="mt-2 flex items-center justify-center text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="mr-1">Explore</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
