
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/data';

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold transition-transform hover:scale-105">
              NEXUS
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </button>
              <div className="absolute -left-48 top-6 w-[500px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 pt-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 grid grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="flex flex-col items-center group hover:bg-secondary rounded-lg p-2 transition-all"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden mb-2">
                        <img 
                          src={category.image} 
                          alt={category.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              All Products
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex relative">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            
            <Button 
              onClick={openCart}
              variant="ghost" 
              size="icon" 
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
            
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5"
              >
                <span 
                  className={`block h-0.5 w-6 bg-foreground transform transition-transform ${
                    menuOpen ? 'rotate-45 translate-y-2' : ''
                  }`} 
                />
                <span 
                  className={`block h-0.5 w-6 bg-foreground transition-opacity ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`} 
                />
                <span 
                  className={`block h-0.5 w-6 bg-foreground transform transition-transform ${
                    menuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`} 
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`lg:hidden ${
          menuOpen 
            ? 'max-h-[400px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        } transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900`}
      >
        <div className="px-4 py-4 space-y-3">
          <Link 
            to="/" 
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="block py-2 text-base font-medium hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            All Products
          </Link>
          <div className="py-2">
            <h3 className="text-base font-medium mb-2">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="text-sm py-1 hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
