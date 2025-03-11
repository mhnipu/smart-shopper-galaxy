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
  Monitor
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

  return (
    <header className={`fixed top-0 z-40 w-full ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-background'} transition-all duration-200`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold flex items-center"
        >
          <span className="text-primary mr-1">Tech</span>Mart
        </Link>

        <nav className="hidden md:flex space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/" className="text-sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/products" className="text-sm">
              <Laptop className="h-4 w-4 mr-2" />
              Shop
            </Link>
          </Button>
        </nav>

        <div className="flex items-center space-x-1">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:flex"
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

      <div className={`border-t py-3 px-4 ${isSearchOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="w-full pl-10"
              autoFocus
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      </div>

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
