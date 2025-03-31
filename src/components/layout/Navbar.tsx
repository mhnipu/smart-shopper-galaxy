import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, Search, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { NavbarTopBar } from './NavbarTopBar';
import { NavbarCategories } from './NavbarCategories';
import { NavbarMobileMenu } from './NavbarMobileMenu';
import { NavbarSearchForm } from './NavbarSearchForm';
import { SmartSearch } from '@/components/search/SmartSearch';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSmartSearchOpen, setIsSmartSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    openCart,
    totalItems
  } = useCart();
  const {
    totalItems: wishlistItems
  } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  
  const categories = [{
    name: 'All Products',
    icon: <Laptop className="h-4 w-4 mr-2" />,
    href: '/products'
  }, {
    name: 'Audio',
    icon: <Headphones className="h-4 w-4 mr-2" />,
    href: '/category/audio'
  }, {
    name: 'Wearables',
    icon: <Watch className="h-4 w-4 mr-2" />,
    href: '/category/wearables'
  }, {
    name: 'Phones',
    icon: <Smartphone className="h-4 w-4 mr-2" />,
    href: '/category/phones'
  }, {
    name: 'Cameras',
    icon: <Camera className="h-4 w-4 mr-2" />,
    href: '/category/cameras'
  }, {
    name: 'Gaming',
    icon: <Gamepad2 className="h-4 w-4 mr-2" />,
    href: '/category/gaming'
  }, {
    name: 'Smart Home',
    icon: <Monitor className="h-4 w-4 mr-2" />,
    href: '/category/smart-home'
  }];

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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>, searchTerm: string) => {
    e.preventDefault();
    if (searchTerm?.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleAdvancedSearch = () => {
    setIsSearchOpen(false);
    setIsSmartSearchOpen(true);
  };

  const shouldShowCategories = () => {
    const excludedPaths = ['/checkout', '/order-confirmation'];
    return !excludedPaths.includes(location.pathname);
  };

  return (
    <header className={`fixed top-0 z-40 w-full ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-background'} transition-all duration-200`}>
      <NavbarTopBar />
      
      <div className="bg-white dark:bg-gray-900 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold flex items-center mr-6">
              <span className="text-primary mr-1">Tech</span>Mart
            </Link>
            
            {!isSearchOpen && (
              <div className="hidden lg:block relative w-full max-w-md">
                <NavbarSearchForm onSubmit={handleSearchSubmit} />
              </div>
            )}
          </div>

          <div className="flex items-center">
            {shouldShowCategories() && <NavbarCategories />}
            
            <div className="flex items-center space-x-3 ml-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`${isSearchOpen ? 'bg-primary/10 text-primary' : ''}`}
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      aria-label={isSearchOpen ? 'Close search' : 'Search'}
                    >
                      {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    {isSearchOpen ? 'Close search' : 'Search products'}
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild className="relative">
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
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    Wishlist
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={openCart} className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Open cart</span>
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    Shopping cart
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to="/account">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    My account
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="py-4 px-4 bg-background border-t border-b">
          <div className="container mx-auto">
            <div className="flex flex-col space-y-3">
              <NavbarSearchForm 
                isFullWidth={true} 
                autoFocus={true} 
                onSubmit={handleSearchSubmit} 
              />
              <div className="flex justify-end">
                <Button variant="link" size="sm" onClick={handleAdvancedSearch}>
                  Advanced Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <NavbarMobileMenu isOpen={isMenuOpen} categories={categories} />
      
      <SmartSearch open={isSmartSearchOpen} onOpenChange={setIsSmartSearchOpen} />
    </header>
  );
}
