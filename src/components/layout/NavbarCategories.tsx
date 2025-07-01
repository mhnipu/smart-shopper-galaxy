
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
import { useCategories } from '@/hooks/useCategories';

export function NavbarCategories() {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { data: categories } = useCategories();
  
  const categoryIcons: { [key: string]: JSX.Element } = {
    'audio': <Headphones className="h-5 w-5" />,
    'wearables': <Watch className="h-5 w-5" />,
    'phones': <Smartphone className="h-5 w-5" />,
    'photography': <Camera className="h-5 w-5" />,
    'gaming': <Gamepad className="h-5 w-5" />,
    'smart-home': <Monitor className="h-5 w-5" />,
    'computers': <Laptop className="h-5 w-5" />,
    'accessories': <Monitor className="h-5 w-5" />
  };
  
  const allCategories = [
    {
      id: 'all',
      name: 'All Products',
      icon: <Laptop className="h-5 w-5" />,
      href: '/products'
    },
    ...(categories || []).map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: categoryIcons[cat.id] || <Monitor className="h-5 w-5" />,
      href: `/category/${cat.id}`
    }))
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
          {allCategories.map((category) => (
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
        {allCategories.slice(1, 5).map((category) => (
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
        {allCategories.length > 5 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-muted">
                <span className="font-medium">More</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2">
              {allCategories.slice(5).map((category) => (
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
