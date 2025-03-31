
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/30 dark:from-gray-900 dark:to-gray-900/80">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Browse Categories
          </h2>
          <Link 
            to="/products" 
            className="text-primary flex items-center hover:underline"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col items-center rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white dark:bg-gray-800"
            >
              <div className="relative w-full pt-[75%] bg-muted/30 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center w-full">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
