
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Laptop, Headphones, Watch, Smartphone, Camera, Gamepad2, Monitor } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function NavbarCategories() {
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
  
  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="bg-secondary hidden md:block border-t border-b border-border py-1">
      <div className="container mx-auto">
        <nav className="flex overflow-x-auto">
          <TooltipProvider>
            {categories.map((category) => (
              <Tooltip key={category.name}>
                <TooltipTrigger asChild>
                  <Link 
                    to={category.href} 
                    onClick={(e) => handleCategoryClick(e, category.href)}
                    className={`py-3 px-4 text-sm transition-colors flex items-center whitespace-nowrap ${
                      location.pathname === category.href || 
                      (category.href.includes('/category/') && location.pathname.includes(category.href)) 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {category.icon}
                    {category.name}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                  Browse {category.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );
}
