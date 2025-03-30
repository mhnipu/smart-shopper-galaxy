
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, Minus, Plus, Share, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/data';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
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
      });
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
      
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-muted-foreground">4.0 ({product.reviews || 24} reviews)</span>
      </div>
      
      <div>
        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        <span className="ml-2 text-sm text-muted-foreground">
          Includes all taxes
        </span>
      </div>
      
      <p className="text-base">{product.description}</p>
      
      <div className="space-y-6 pt-4">
        {/* Color Options (if available) */}
        {product.details.color && Array.isArray(product.details.color) && (
          <div>
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.details.color.map((color, index) => (
                <Button
                  key={color}
                  variant="outline"
                  className={`rounded-md border ${index === 0 ? 'ring-2 ring-primary' : ''}`}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Storage Options (if available) */}
        {product.details.storage && Array.isArray(product.details.storage) && (
          <div>
            <h3 className="text-sm font-medium mb-3">Storage</h3>
            <div className="flex flex-wrap gap-2">
              {product.details.storage.map((storage, index) => (
                <Button
                  key={storage}
                  variant="outline"
                  className={`rounded-md border ${index === 0 ? 'ring-2 ring-primary' : ''}`}
                >
                  {storage}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Quantity */}
        <div>
          <h3 className="text-sm font-medium mb-3">Quantity</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-10 w-10"
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10"
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
          <Button variant="outline" size="lg" className="flex-1 gap-2">
            <Heart className="h-5 w-5" />
            Add to Wishlist
          </Button>
          <Button variant="outline" size="icon" className="hidden sm:flex h-12 w-12">
            <Share className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
