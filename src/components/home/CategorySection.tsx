
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col items-center border border-gray-200 dark:border-gray-700 rounded-md p-4 transition-all hover:shadow-md"
            >
              <div className="mb-3 h-24 w-24 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-center group-hover:text-primary">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
