
import React from 'react';
import { Product } from '@/lib/data';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <span className="absolute top-2 right-2 z-10">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <Heart className="h-4 w-4 transition-colors group-hover:text-destructive" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </span>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
