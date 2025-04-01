
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Camera, Mic, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

interface NavbarSearchFormProps {
  isFullWidth?: boolean;
  autoFocus?: boolean;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, searchQuery: string) => void;
  onAdvancedSearch?: () => void;
}

export function NavbarSearchForm({ 
  isFullWidth = false, 
  autoFocus = false,
  onSubmit,
  onAdvancedSearch
}: NavbarSearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (onSubmit) {
      onSubmit(e, searchQuery);
      return;
    }
    
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const handleSearchClick = (value: string, type: 'product' | 'category') => {
    if (type === 'product') {
      navigate(`/product/${value}`);
    } else {
      navigate(`/category/${value}`);
    }
    setSearchQuery('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const productResults = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const categoryResults = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 3);

  return (
    <Popover open={isOpen && searchQuery.trim().length > 0} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <form 
          onSubmit={handleSubmit} 
          className={`relative flex items-center ${isFullWidth ? 'w-full' : 'w-full'}`}
        >
          {isFullWidth && (
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input 
            type="search" 
            name="searchQuery" 
            placeholder="Search for products..." 
            className={`${isFullWidth ? 'pl-10 pr-24 h-11' : 'pr-10'} border-primary/20 focus-visible:ring-primary/30`}
            autoFocus={autoFocus}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={inputRef}
          />
          {searchQuery.length > 0 && (
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="absolute right-[60px] rounded-full p-0 h-8 w-8"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          <Button 
            type="submit" 
            variant="default" 
            size={isFullWidth ? "default" : "icon"}
            className={`${isFullWidth ? 'absolute right-0 rounded-l-none h-11' : 'absolute right-0 rounded-l-none h-10'}`}
          >
            {isFullWidth ? 'Search' : <Search className="h-4 w-4" />}
          </Button>
        </form>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0 w-[var(--radix-popover-trigger-width)] max-w-[450px] max-h-[70vh] overflow-y-auto"
        align="start"
        sideOffset={5}
      >
        <Command>
          <CommandList>
            <CommandEmpty>
              <div className="py-6 text-center">
                <p>No results found.</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => {
                    if (onAdvancedSearch) {
                      onAdvancedSearch();
                      setIsOpen(false);
                    }
                  }}
                >
                  Try Advanced Search
                </Button>
              </div>
            </CommandEmpty>
            
            {productResults.length > 0 && (
              <CommandGroup heading="Products">
                {productResults.map((product) => (
                  <CommandItem 
                    key={product.id} 
                    onSelect={() => handleSearchClick(product.id, 'product')}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded overflow-hidden mr-2">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {categoryResults.length > 0 && (
              <CommandGroup heading="Categories">
                {categoryResults.map((category) => (
                  <CommandItem 
                    key={category.id} 
                    onSelect={() => handleSearchClick(category.id, 'category')}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          
          <div className="border-t p-2 flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs cursor-pointer" onClick={() => navigate('/products')}>
                All Products
              </Badge>
              {['Audio', 'Phones', 'Gaming'].map((cat) => (
                <Badge 
                  key={cat} 
                  variant="outline" 
                  className="text-xs cursor-pointer"
                  onClick={() => navigate(`/category/${cat.toLowerCase()}`)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                if (onAdvancedSearch) {
                  onAdvancedSearch();
                  setIsOpen(false);
                }
              }}
            >
              Advanced
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
