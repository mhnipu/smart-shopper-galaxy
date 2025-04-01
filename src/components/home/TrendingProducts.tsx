
import React from 'react';
import { Product } from '@/lib/data';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { FormatPrice } from '@/components/util/FormatPrice';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface TrendingProductsProps {
  products: Product[];
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  // Filter for trending products (using popularity and newest items)
  const trendingProducts = products
    .slice(0, 8)
    .sort((a, b) => b.price - a.price); // Sort by price as a proxy for trending

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
    toast.success(`${product.name} added to wishlist`);
  };

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-[#f8f9fb] dark:bg-gray-900/90">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Most Popular
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trending Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Discover our most sought-after products selected for their exceptional quality and contemporary design
          </p>
          <div className="w-16 h-1.5 bg-primary/80 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group animate-fade-in bg-white dark:bg-gray-800/60 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-border/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-[280px] overflow-hidden bg-muted/20">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.images.length > 1 && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} - alternate view`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`rounded-full shadow-md ${isInWishlist(product.id) ? "text-red-500 bg-white" : "bg-white text-gray-700"}`}
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
                  </Button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Button 
                    variant="default" 
                    className="w-full gap-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between mb-2">
                  <Link to={`/category/${product.category}`}>
                    <span className="text-xs uppercase tracking-wider text-primary font-medium hover:underline">
                      {product.category.replace('-', ' ')}
                    </span>
                  </Link>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {(4 + Math.random()).toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description?.substring(0, 80) || "Premium quality product designed for maximum performance and style."}
                </p>
                
                <div className="flex justify-between items-center">
                  <FormatPrice 
                    price={product.price} 
                    className="font-bold text-lg" 
                  />
                  
                  <Link to={`/product/${product.id}`} className="text-primary flex items-center text-sm font-medium group/link">
                    Details
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/products">
            <Button variant="outline" size="lg" className="group border-primary/30 hover:bg-primary/5">
              Explore All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
