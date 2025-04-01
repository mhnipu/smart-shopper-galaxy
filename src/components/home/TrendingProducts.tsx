
import React from 'react';
import { Product } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { FormatPrice } from '@/components/util/FormatPrice';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface TrendingProductsProps {
  products: Product[];
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  // Filter trending products (those with high ratings and popularity)
  const trendingProducts = products
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/10 dark:from-gray-900 dark:to-gray-900/90">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trending Now
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trendingProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="relative group animate-fade-in bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-border/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.discount > 0 && (
                <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600">
                  {product.discount}% OFF
                </Badge>
              )}
              
              <Link to={`/product/${product.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.images.length > 1 && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} - alternate view`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <Link to={`/category/${product.category}`}>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors">
                      {product.category.replace('-', ' ')}
                    </span>
                  </Link>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-sm font-medium mr-1">
                      {product.rating.toFixed(1)}
                    </span>
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors truncate">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-baseline gap-2">
                    <FormatPrice 
                      price={product.price} 
                      className="font-bold text-lg" 
                    />
                    {product.discount > 0 && (
                      <FormatPrice 
                        price={product.price * (1 + product.discount/100)} 
                        className="text-sm line-through text-muted-foreground" 
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className={isInWishlist(product.id) ? "text-red-500" : ""}
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
