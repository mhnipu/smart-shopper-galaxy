import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, Share, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from '@/hooks/use-toast';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  showAddToCart?: boolean;
  quantity?: number;
}

export function ProductActions({ product, showAddToCart = true, quantity = 1 }: ProductActionsProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Simulate API call
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }, quantity);
      
      setIsAdding(false);
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity} ${quantity === 1 ? 'item' : 'items'})`,
      });
    }, 500);
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
      toast({
        title: "Removed from wishlist",
        description: product.name,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      toast({
        title: "Added to wishlist",
        description: product.name,
      });
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      }).catch((error) => {
        console.log('Error sharing', error);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
    }
  };
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <>
      {showAddToCart && (
        <Button 
          className="flex-1 gap-2" 
          size="lg"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ShoppingCart className="h-5 w-5" />
          )}
          Add to Cart
        </Button>
      )}
      
      <Button 
        variant={isWishlisted ? "default" : "outline"} 
        size="lg" 
        className={`flex-1 gap-2 ${isWishlisted ? "" : ""}`}
        onClick={handleWishlistToggle}
      >
        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
        {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
      </Button>
      
      <Button variant="outline" size="icon" className="hidden sm:flex h-12 w-12" onClick={handleShare}>
        <Share className="h-5 w-5" />
        <span className="sr-only">Share</span>
      </Button>
    </>
  );
}
