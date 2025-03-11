
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Browse By Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of products organized by category to find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md transition-all hover:shadow-lg animate-fade-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700"
                />
              </div>
              <h3 className="text-lg font-medium text-center group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <span className="mt-2 inline-block text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                View Products
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
