
import React, { useEffect } from 'react';
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
import { ArrowRight, Check, Globe, ShieldCheck, Truck, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Product view tracking simulation
    const trackProductView = () => {
      console.log('Tracking product view');
    };
    
    trackProductView();
    
    // Simulating personalized recommendations loading
    setTimeout(() => {
      console.log('Personalized recommendations loaded');
    }, 1500);
  }, []);

  // New functionality: Quick product finder
  const handleQuickSearch = (category: string) => {
    toast.success(`Navigating to ${category} category`);
    // This would typically navigate or filter products
    // Navigation is handled by the Link component in the UI
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <FeaturedPromotion />
        <Hero />
        
        {/* Quick Category Navigation */}
        <section className="py-8 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 border-b border-border/10">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.slice(0, 6).map((category) => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  onClick={() => handleQuickSearch(category.name)}
                  className="px-4 py-2 rounded-full border border-border/30 text-sm font-medium hover:bg-primary/5 hover:border-primary/30 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/products"
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        </section>
        
        {/* Benefits Section - Updated with more mature design */}
        <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#f8f9fb] dark:bg-gray-900/90">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-white hover:shadow-md dark:hover:bg-gray-800/60 animate-fade-in border border-border/10 hover:border-border/30">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Delivery</h3>
                <p className="text-muted-foreground">Free express shipping on orders over $99</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-white hover:shadow-md dark:hover:bg-gray-800/60 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.1s' }}>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Security Guarantee</h3>
                <p className="text-muted-foreground">End-to-end encryption for secure transactions</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-white hover:shadow-md dark:hover:bg-gray-800/60 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.2s' }}>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Satisfaction Promise</h3>
                <p className="text-muted-foreground">30-day money-back guarantee on all purchases</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-xl transition-all hover:bg-white hover:shadow-md dark:hover:bg-gray-800/60 animate-fade-in border border-border/10 hover:border-border/30" style={{ animationDelay: '0.3s' }}>
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Support</h3>
                <p className="text-muted-foreground">24/7 dedicated customer service in multiple languages</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts products={products} />
        
        {/* New Feature: Product Spotlight */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-pattern-grid"></div>
          </div>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-5">
                  Product Spotlight
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  The Next Generation of Smart Home Technology
                </h2>
                <p className="text-white/80 mb-6 text-lg">
                  Experience intelligent living with our latest collection of connected devices that seamlessly integrate into your lifestyle.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <p className="text-white/90">Voice-controlled ecosystem integration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <p className="text-white/90">Energy-efficient design with smart power management</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <p className="text-white/90">Advanced security protocols and privacy controls</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/category/smart-home">
                    <Button size="lg" className="group">
                      Explore Smart Home
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="flex -space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-gray-800 flex items-center justify-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-gray-800 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                    <span className="text-sm">Over 500+ 5-star reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1558002038-1055e2e28ed1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                    alt="Smart Home Hub" 
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-white">Smart Home Hub</h3>
                      <p className="text-white/80 text-sm">Central control for all your devices</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white font-medium text-sm">
                      New Release
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-primary/30 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        <TrendingProducts products={products} />
        
        <CategorySection categories={categories} />
        
        <CustomerTestimonials />
        
        <NewsletterSignup />
        
        {/* CTA Section - Made more mature and elegant */}
        <section className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-primary/5 to-background dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent)]"></div>
          </div>
          <div className="container mx-auto text-center max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-5">
              Limited Time Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Elevate Your Digital Experience with Premium Technology
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Discover our curated selection of high-performance devices designed for professionals and enthusiasts who demand excellence.
              <span className="block mt-2 text-foreground font-medium">Use code <span className="font-bold">PREMIUM25</span> for 25% off your first purchase.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="px-8 group">
                  Explore Premium Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/category/new-arrivals">
                <Button size="lg" variant="outline" className="px-8 border-primary/30 hover:bg-primary/5">
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
