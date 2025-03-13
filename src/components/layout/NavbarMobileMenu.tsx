
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Laptop, User, Heart } from 'lucide-react';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  categories: {
    name: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

export function NavbarMobileMenu({ isOpen, categories }: NavbarMobileMenuProps) {
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
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/products">
              <Laptop className="h-4 w-4 mr-2" />
              All Products
            </Link>
          </Button>
          <div className="pt-2 mt-2 border-t">
            <h3 className="font-medium mb-2 px-3">Categories</h3>
            {categories.map(category => (
              <Button key={category.name} variant="ghost" className="w-full justify-start" asChild>
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
  );
}
