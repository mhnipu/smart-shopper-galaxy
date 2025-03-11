
import React from 'react';
import { Category } from '@/lib/data';
import { Link } from 'react-router-dom';

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 shadow-md transition-all hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700"
                />
              </div>
              <h3 className="text-base font-medium text-center group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
