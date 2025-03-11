
import React, { useState } from 'react';
import { Product } from '@/lib/data';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <span className="absolute top-2 right-2 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
              inWishlist && "text-destructive"
            )}
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4 transition-colors", inWishlist ? "fill-current" : "")} />
            <span className="sr-only">
              {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </Button>
        </span>
        
        {/* Product Label - show if it's featured */}
        {product.featured && (
          <span className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
        
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick View Button */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="secondary" 
            size="sm" 
            className="gap-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/product/${product.id}`;
            }}
          >
            <Eye className="h-4 w-4" />
            Quick View
          </Button>
        </div>
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
