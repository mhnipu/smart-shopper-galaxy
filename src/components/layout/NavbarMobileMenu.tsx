
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Heart, ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  categories: {
    name: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

export function NavbarMobileMenu({ isOpen, categories }: NavbarMobileMenuProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="border-t md:hidden">
      <div className="container mx-auto py-4 px-4">
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
          
          <div className="border-t mt-2 pt-2">
            <Button 
              variant="ghost" 
              className="w-full justify-between" 
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span className="flex items-center">
                {categories[0].icon}
                Categories
              </span>
              {categoriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {categoriesOpen && (
              <div className="pl-6 space-y-1 mt-1">
                {categories.map(category => (
                  <Button key={category.name} variant="ghost" className="w-full justify-start" asChild>
                    <Link to={category.href}>
                      {category.icon}
                      {category.name}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
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
  );
}
