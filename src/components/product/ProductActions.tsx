
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  showAddToCart?: boolean;
}

export function ProductActions({ product, showAddToCart = true }: ProductActionsProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="flex gap-2">
      {showAddToCart && (
        <Button 
          className="flex-1" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      )}
      
      <Button
        variant={isWishlisted ? "default" : "outline"}
        size="icon"
        onClick={handleWishlistToggle}
        className={isWishlisted ? "text-white" : ""}
      >
        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        <span className="sr-only">
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </span>
      </Button>
    </div>
  );
}
