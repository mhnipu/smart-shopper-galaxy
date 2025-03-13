
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, Minus, Plus, Share, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductActions } from '@/components/product/ProductActions';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProduct(products.find(p => p.id === id));
      setLoading(false);
      setSelectedImage(0);
      setQuantity(1);
    }, 500);
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center pt-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center pt-16 px-4">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button>Return to Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="bg-muted py-2 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/products" className="hover:text-foreground transition-colors">
                Products
              </Link>
              <span>/</span>
              <Link 
                to={`/category/${product.category}`} 
                className="hover:text-foreground transition-colors capitalize"
              >
                {product.category.replace('-', ' ')}
              </Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details Content */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 px-4 md:px-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border bg-white">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square w-20 overflow-hidden rounded-md border bg-white ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary' 
                        : 'hover:ring-1 hover:ring-primary'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      className="h-full w-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
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
          </div>
          
          {/* Product Specifications */}
          <div className="border-t py-8 px-4 md:px-6">
            <div className="container mx-auto">
              <h3 className="text-lg font-medium mb-6">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">
                      {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
            
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t py-8 px-4 md:px-6">
              <div className="container mx-auto">
                <h2 className="text-xl font-bold mb-6">You might also like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="animate-fade-in" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
