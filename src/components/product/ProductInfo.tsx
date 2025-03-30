
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductOption, QuantitySelector } from '@/components/product/ProductOptions';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  
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
          <ProductOption 
            label="Color" 
            options={product.details.color}
            selectedIndex={selectedColorIndex}
            onChange={setSelectedColorIndex}
          />
        )}
        
        {/* Storage Options (if available) */}
        {product.details.storage && Array.isArray(product.details.storage) && (
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
