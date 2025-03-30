
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductBreadcrumbsProps {
  productName: string;
  category: string;
}

export function ProductBreadcrumbs({ productName, category }: ProductBreadcrumbsProps) {
  return (
    <div className="bg-muted py-2 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground transition-colors">
            Products
          </Link>
          <span>/</span>
          <Link 
            to={`/category/${category}`} 
            className="hover:text-foreground transition-colors capitalize"
          >
            {category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[150px]">{productName}</span>
        </div>
      </div>
    </div>
  );
}
