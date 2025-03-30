
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { ProductBreadcrumbs } from '@/components/product/ProductBreadcrumbs';
import { ProductReviews } from '@/components/product/ProductReviews';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [loading, setLoading] = useState(true);
  
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
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setProduct(products.find(p => p.id === id));
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center pt-32">
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
      
      <main className="flex-1 pt-32">
        {/* Breadcrumbs */}
        <ProductBreadcrumbs productName={product.name} category={product.category} />

        {/* Product Details Content */}
        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 px-4 md:px-6">
            {/* Product Images */}
            <ProductImageGallery images={product.images} productName={product.name} />
            
            {/* Product Details */}
            <ProductInfo product={product} />
          </div>
          
          {/* Product Specifications */}
          <ProductSpecifications details={product.details} />
          
          {/* Product Reviews */}
          <ProductReviews 
            productId={product.id} 
            productName={product.name}
            initialReviews={sampleReviews}
          />
            
          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
