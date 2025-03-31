
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Laptop, Headphones, Watch, Smartphone, Camera, Gamepad2, Monitor, ChevronDown } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

export function NavbarCategories() {
  const navigate = useNavigate();
  
  const categories = [{
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
  
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              to="/products"
              className={navigationMenuTriggerStyle()}
              onClick={(e) => handleCategoryClick(e, '/products')}
            >
              <Laptop className="h-4 w-4 mr-2" />
              All Products
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <span className="flex items-center">
                Categories
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    onClick={(e) => handleCategoryClick(e, category.href)}
                    className="flex items-center p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 mr-2">
                      {category.icon}
                    </div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
