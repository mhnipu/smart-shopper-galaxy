
import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductOption, QuantitySelector } from '@/components/product/ProductOptions';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  
  // We'll create these values as fallbacks since they may not exist in the Product type
  const discount = product.price > 100 ? 10 : 0; // Example fallback discount logic
  const oldPrice = discount > 0 
    ? product.price + (product.price * discount / 100) 
    : null;
  
  // Stock status with fallback values
  const stockValue = typeof product.quantity !== 'undefined' ? product.quantity : 15;
  const inStock = stockValue > 0;
  const stockLevel = stockValue > 10 ? 'high' : stockValue > 5 ? 'medium' : 'low';
  
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">4.0 ({product.reviews ? product.reviews.length : 24} reviews)</span>
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">
          {125} sold
        </span>
      </div>
      
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {oldPrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-sm text-muted-foreground">
          Includes all taxes
        </span>
      </div>
      
      <Separator />
      
      <div className="text-base leading-relaxed">{product.description}</div>
      
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          stockLevel === 'high' ? 'bg-green-500' : 
          stockLevel === 'medium' ? 'bg-yellow-500' : 
          'bg-red-500'
        }`}></div>
        <span className="font-medium">
          {inStock ? 
            (stockLevel === 'low' ? 'Low Stock' : 'In Stock') : 
            'Out of Stock'}
        </span>
        {inStock && stockValue <= 10 && (
          <span className="text-sm text-muted-foreground">
            ({stockValue} left)
          </span>
        )}
      </div>
      
      {inStock && stockLevel === 'low' && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Selling fast! {stockValue} left</span>
            <span>{stockValue}/20</span>
          </div>
          <Progress value={stockValue * 5} className="h-2" />
        </div>
      )}
      
      <div className="space-y-6 pt-4">
        {/* Features Highlights */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Key Features</h3>
          <ul className="space-y-1">
            {(['Premium Build Quality', 'Advanced Technology', 'Energy Efficient']).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Color Options (if available) */}
        {product.details && product.details.color && Array.isArray(product.details.color) && (
          <ProductOption 
            label="Color" 
            options={product.details.color}
            selectedIndex={selectedColorIndex}
            onChange={setSelectedColorIndex}
          />
        )}
        
        {/* Storage Options (if available) */}
        {product.details && product.details.storage && Array.isArray(product.details.storage) && (
          <ProductOption 
            label="Storage" 
            options={product.details.storage}
            selectedIndex={selectedStorageIndex}
            onChange={setSelectedStorageIndex}
          />
        )}
        
        {/* Quantity */}
        <QuantitySelector 
          quantity={quantity} 
          onChange={setQuantity} 
        />
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <ProductActions 
            product={{
              id: product.id,
              name: product.name,
              price: product.price,
              images: product.images
            }}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
}
