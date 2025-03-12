
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
  Heart,
  Home,
  Laptop,
  Headphones,
  Watch,
  Smartphone,
  Camera,
  Gamepad2,
  Monitor,
  CircleUserRound,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const location = useLocation();

  const categories = [
    { name: 'All Products', icon: <Laptop className="h-4 w-4 mr-2" />, href: '/products' },
    { name: 'Audio', icon: <Headphones className="h-4 w-4 mr-2" />, href: '/category/audio' },
    { name: 'Wearables', icon: <Watch className="h-4 w-4 mr-2" />, href: '/category/wearables' },
    { name: 'Phones', icon: <Smartphone className="h-4 w-4 mr-2" />, href: '/category/phones' },
    { name: 'Cameras', icon: <Camera className="h-4 w-4 mr-2" />, href: '/category/cameras' },
    { name: 'Gaming', icon: <Gamepad2 className="h-4 w-4 mr-2" />, href: '/category/gaming' },
    { name: 'Smart Home', icon: <Monitor className="h-4 w-4 mr-2" />, href: '/category/smart-home' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the search input value
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('searchQuery') as string;
    
    if (searchTerm?.trim()) {
      // Navigate to products page with search query
      window.location.href = `/products?search=${encodeURIComponent(searchTerm.trim())}`;
    }
    
    setIsSearchOpen(false);
  };

  return (
    <header className={`fixed top-0 z-40 w-full ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-background'} transition-all duration-200`}>
      {/* Top Bar */}
      <div className="bg-primary text-white py-1 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <PhoneCall className="h-3 w-3 mr-1" />
              <span>Hotline: 1800-123-456</span>
            </div>
            <div className="hidden md:flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Find a Store</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/account" className="hover:underline flex items-center">
              <CircleUserRound className="h-3 w-3 mr-1" />
              <span>My Account</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="bg-white dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold flex items-center mr-6"
            >
              <span className="text-primary mr-1">Tech</span>Mart
            </Link>
            
            <div className="hidden lg:block relative w-full max-w-md">
              <form onSubmit={handleSearchSubmit} className="flex">
                <Input
                  type="search"
                  name="searchQuery"
                  placeholder="Search for products..."
                  className="w-full pr-10"
                />
                <Button type="submit" variant="default" className="absolute right-0 h-full rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="relative"
            >
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={openCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Open cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-secondary hidden md:block border-t border-b border-border py-1">
        <div className="container mx-auto">
          <nav className="flex">
            {categories.map((category, index) => (
              <Link 
                key={category.name}
                to={category.href}
                className="py-3 px-4 text-sm hover:bg-primary hover:text-white transition-colors flex items-center"
              >
                {category.icon}
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className={`border-t py-3 px-4 ${isSearchOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="searchQuery"
              placeholder="Search for products..."
              className="w-full pl-10"
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`border-t md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto py-4 px-4">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/products">
                <Laptop className="h-4 w-4 mr-2" />
                All Products
              </Link>
            </Button>
            <div className="pt-2 mt-2 border-t">
              <h3 className="font-medium mb-2 px-3">Categories</h3>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to={category.href}>
                    {category.icon}
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
            <div className="pt-2 mt-2 border-t">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  <User className="h-4 w-4 mr-2" />
                  My Account
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/wishlist">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
