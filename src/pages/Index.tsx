
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategorySection } from '@/components/home/CategorySection';
import { TrendingProducts } from '@/components/home/TrendingProducts';
import { CustomerTestimonials } from '@/components/home/CustomerTestimonials';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';
import { FeaturedPromotion } from '@/components/home/FeaturedPromotion';
import { products, categories } from '@/lib/data';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ArrowRight, Check, Globe, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <FeaturedPromotion />
        <Hero />
        
        {/* Benefits Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-muted/10 dark:from-gray-900 dark:to-gray-900/70">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50 animate-fade-in border border-border/10 hover:border-border/30">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">Free shipping on all orders over $99</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.1s' }}>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <ShieldCheck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                <p className="text-muted-foreground">100% secure payment processing</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.2s' }}>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Check className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">If you're not satisfied, we aren't either</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-muted/50 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.3s' }}>
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Support</h3>
                <p className="text-muted-foreground">24/7 customer support for all your needs</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts products={products} />
        
        <TrendingProducts products={products} />
        
        <CategorySection categories={categories} />
        
        <CustomerTestimonials />
        
        <NewsletterSignup />
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          </div>
          <div className="container mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary mb-4">
              Limited Time Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 max-w-2xl mx-auto">
              Ready to experience the future of technology?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse our complete collection of premium tech products and find the perfect fit for your lifestyle.
              Use code <span className="font-semibold text-foreground">TECH25</span> for 25% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="px-8 group">
                  Shop All Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/category/new-arrivals">
                <Button size="lg" variant="outline" className="px-8">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
