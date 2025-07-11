
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Camera, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ImageSearch } from './ImageSearch';
import { products, categories } from '@/lib/data';

interface SmartSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ open, onOpenChange }) => {
  const [value, setValue] = useState("");
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setValue("");
    }
  }, [open]);

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    onOpenChange(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
    onOpenChange(false);
  };

  const handleSearch = () => {
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
      onOpenChange(false);
    }
  };

  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(value.toLowerCase()) ||
    product.description.toLowerCase().includes(value.toLowerCase())
  );

  const categoryResults = categories.filter(category =>
    category.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle>Smart Search</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput 
            ref={inputRef} 
            placeholder="Type something..." 
            value={value} 
            onValueChange={setValue} 
            className="px-6"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-6 text-center">
                <p>No results found.</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={handleSearch}
                >
                  Search for "{value}"
                </Button>
              </div>
            </CommandEmpty>
            {searchResults.length > 0 && (
              <CommandGroup heading="Products">
                {searchResults.slice(0, 5).map((product) => (
                  <CommandItem key={product.id} onSelect={() => handleProductSelect(product.id)}>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded overflow-hidden mr-2">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {product.name}
                    </div>
                  </CommandItem>
                ))}
                {searchResults.length > 5 && (
                  <CommandItem onSelect={() => {
                    navigate(`/products?search=${value}`);
                    onOpenChange(false);
                  }} className="justify-center">
                    <Badge variant="secondary">See all {searchResults.length} products</Badge>
                  </CommandItem>
                )}
              </CommandGroup>
            )}
            {categoryResults.length > 0 && (
              <CommandGroup heading="Categories">
                {categoryResults.map((category) => (
                  <CommandItem key={category.id} onSelect={() => handleCategorySelect(category.id)}>
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        <div className="py-4 px-6 flex items-center justify-between border-t">
          <Button variant="outline" size="sm" onClick={() => setIsImageSearchOpen(true)}>
            <Camera className="h-4 w-4 mr-2" />
            Search with Image
          </Button>
          <Button variant="secondary" size="sm">
            <Mic className="h-4 w-4 mr-2" />
            Voice Search
          </Button>
        </div>
      </DialogContent>
      <ImageSearch 
        open={isImageSearchOpen} 
        onOpenChange={setIsImageSearchOpen} 
        onClose={() => onOpenChange(false)} 
      />
    </Dialog>
  );
};
