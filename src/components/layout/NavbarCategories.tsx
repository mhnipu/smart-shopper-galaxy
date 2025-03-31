
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Laptop, 
  Headphones, 
  Watch, 
  Smartphone, 
  Camera, 
  Gamepad, 
  Monitor, 
  ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavbarCategories() {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const categories = [
    {
      id: 'all',
      name: 'All Products',
      icon: <Laptop className="h-5 w-5" />,
      href: '/products'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: <Headphones className="h-5 w-5" />,
      href: '/category/audio'
    },
    {
      id: 'wearables',
      name: 'Wearables',
      icon: <Watch className="h-5 w-5" />,
      href: '/category/wearables'
    },
    {
      id: 'phones',
      name: 'Phones',
      icon: <Smartphone className="h-5 w-5" />,
      href: '/category/phones'
    },
    {
      id: 'cameras',
      name: 'Cameras',
      icon: <Camera className="h-5 w-5" />,
      href: '/category/cameras'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad className="h-5 w-5" />,
      href: '/category/gaming'
    },
    {
      id: 'smart-home',
      name: 'Smart Home',
      icon: <Monitor className="h-5 w-5" />,
      href: '/category/smart-home'
    }
  ];
  
  return (
    <div className="flex items-center gap-1">
      {/* All Products link always visible */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            <Laptop className="h-5 w-5" />
            <span className="font-medium">Browse</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-2">
          {categories.map((category) => (
            <DropdownMenuItem 
              key={category.id}
              className="flex items-center gap-3 py-2.5 cursor-pointer"
              onClick={() => navigate(category.href)}
            >
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                "bg-primary/10 text-primary"
              )}>
                {category.icon}
              </div>
              <span className="font-medium">{category.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Individual category buttons - visible on larger screens */}
      <div className="hidden xl:flex gap-1 ml-2">
        {categories.slice(1, 5).map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full",
              "transition-colors hover:bg-muted",
              hoveredCategory === category.id ? "bg-muted" : ""
            )}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <span className="font-medium">{category.name}</span>
          </Link>
        ))}
        
        {/* More categories dropdown for remaining categories */}
        {categories.length > 5 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-muted">
                <span className="font-medium">More</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2">
              {categories.slice(5).map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  className="flex items-center gap-2 py-2 cursor-pointer"
                  onClick={() => navigate(category.href)}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
