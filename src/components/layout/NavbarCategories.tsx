
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Headphones, Watch, Smartphone, Camera, Gamepad2, Monitor } from 'lucide-react';

export function NavbarCategories() {
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

  return (
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
  );
}
