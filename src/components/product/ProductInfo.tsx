
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Heart,
  Share2, 
  Check, 
  Star 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/lib/data';
import { FormatPrice } from '@/components/util/FormatPrice';
import { toast } from '@/components/ui/use-toast';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} × ${quantity} has been added to your cart.`,
    });
  };
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
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
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {product.category && (
          <Badge variant="secondary" className="mb-2">
            {product.category}
          </Badge>
        )}
        <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(product.featured ? 4 : 3) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.featured ? 42 : 24} reviews)
          </span>
        </div>
      </div>
      
      <div className="flex items-baseline gap-4">
        <FormatPrice 
          price={product.price} 
          className="text-2xl font-bold" 
        />
        {product.price > 100 && (
          <FormatPrice 
            price={product.price * 1.2} 
            className="text-muted-foreground line-through" 
          />
        )}
        {product.price > 100 && (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Save {Math.round(((product.price * 1.2 - product.price) / (product.price * 1.2)) * 100)}%
          </Badge>
        )}
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <p>{product.description}</p>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <Check className="h-4 w-4 mr-2 text-green-500" />
        <span className="mr-4">In Stock</span>
        {product.featured && (
          <>
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <span>Free Shipping</span>
          </>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="rounded-r-none h-11"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <div className="h-11 w-12 flex items-center justify-center border-y">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-l-none h-11"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          <Button 
            className="h-11 gap-2" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant={isInWishlist(product.id) ? "default" : "outline"} 
              size="icon" 
              className="h-11 flex-1" 
              onClick={toggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              <span className="sr-only">
                {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              </span>
            </Button>
            
            <Button 
              variant="outline"
              size="icon" 
              className="h-11 flex-1" 
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4 space-y-3">
        <h3 className="font-medium">Product Features</h3>
        <ul className="space-y-1 text-sm">
          {product.details && product.details.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 mt-0.5 text-primary" />
              <span>{feature.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
