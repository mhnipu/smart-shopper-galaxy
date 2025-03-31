
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Clock, Loader2, ShieldCheck, Truck } from 'lucide-react';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductTabs } from '@/components/product/ProductTabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { SmartSearch } from '@/components/search/SmartSearch';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [loading, setLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  // Get related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  // Sample reviews data
  const sampleReviews = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      rating: 5,
      comment: 'This product exceeded my expectations. The quality is outstanding and it works perfectly!',
      date: '2023-10-15'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      rating: 4,
      comment: 'Great product overall. The only minor issue is that the battery life is a bit shorter than advertised.',
      date: '2023-09-28'
    },
    {
      id: '3',
      name: 'Robert Miller',
      email: 'robert@example.com',
      rating: 5,
      comment: 'Excellent build quality and performs exactly as described. Would definitely recommend!',
      date: '2023-11-05'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProduct(products.find(p => p.id === id));
      setLoading(false);
      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center pt-32">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center pt-32 px-4">
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
      <SmartSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      
      <main className="flex-1 pt-32 mt-4">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs productName={product.name} category={product.category} />

        {/* Product Details Content */}
        <div className="container mx-auto mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 px-4 md:px-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            {/* Product Images */}
            <ProductImageGallery images={product.images} productName={product.name} />
            
            {/* Product Details */}
            <div>
              {product.featured && (
                <Badge className="mb-3 bg-green-500 hover:bg-green-600">New Arrival</Badge>
              )}
              {product.price > 100 && (
                <Badge className="ml-2 mb-3 bg-red-500 hover:bg-red-600">Sale {10}% Off</Badge>
              )}
              
              <ProductInfo product={product} />
              
              {/* Product Benefits */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Warranty</h4>
                      <p className="text-sm text-muted-foreground">1 Year Coverage</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-muted-foreground">Orders over $50</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-sm text-muted-foreground">Within 30 Days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Tabs for additional information */}
          <div className="mt-10">
            <ProductTabs 
              product={product} 
              reviews={sampleReviews}
            />
          </div>
          
          <Separator className="my-10" />
          
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
