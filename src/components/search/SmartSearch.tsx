
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImageSearch } from './ImageSearch';
import { Mic, MicOff, Search, Loader2 } from 'lucide-react';
import { products, categories } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'product' | 'category' | 'suggested';
  name: string;
  image?: string;
}

export function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSearches] = useState<string[]>([
    'wireless headphones',
    'gaming laptops',
    'smartphone accessories',
    'smart home devices',
    'fitness trackers',
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Handle clicks outside of search to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Search logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API delay
    const timeoutId = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      
      // Search products
      const matchedProducts = products
        .filter(product => 
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          type: 'product' as const,
          name: product.name,
          image: product.images[0],
        }));
      
      // Search categories
      const matchedCategories = categories
        .filter(category => 
          category.name.toLowerCase().includes(lowerQuery)
        )
        .map(category => ({
          id: category.id,
          type: 'category' as const,
          name: category.name,
        }));
      
      // Suggested searches based on query
      const matchedSuggestions = suggestedSearches
        .filter(suggestion => 
          suggestion.toLowerCase().includes(lowerQuery)
        )
        .map(suggestion => ({
          id: `suggestion-${suggestion}`,
          type: 'suggested' as const,
          name: suggestion,
        }));
      
      setResults([
        ...matchedProducts,
        ...matchedCategories,
        ...matchedSuggestions,
      ]);
      
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query, suggestedSearches]);
  
  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    
    if (result.type === 'product') {
      navigate(`/product/${result.id}`);
    } else if (result.type === 'category') {
      navigate(`/category/${result.id}`);
    } else if (result.type === 'suggested') {
      navigate(`/products?search=${encodeURIComponent(result.name)}`);
    }
  };
  
  const handleSearch = () => {
    if (!query) return;
    
    setOpen(false);
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };
  
  const toggleVoiceRecognition = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const fakeSpeechRecognition = "smart watches";
      setQuery(fakeSpeechRecognition);
      setIsListening(false);
      setOpen(true);
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-9 pr-10"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (e.target.value.length > 0) {
                        setOpen(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  {query && (
                    <Button
                      variant="ghost"
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setQuery('')}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Clear</span>
                    </Button>
                  )}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-[var(--radix-popover-trigger-width)]"
              align="start"
            >
              <Command>
                <CommandList>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      {query && (
                        <CommandEmpty>No results found.</CommandEmpty>
                      )}
                      {results.length > 0 && (
                        <>
                          {results.some(r => r.type === 'product') && (
                            <CommandGroup heading="Products">
                              {results
                                .filter(r => r.type === 'product')
                                .map((result) => (
                                  <CommandItem
                                    key={result.id}
                                    onSelect={() => handleSelect(result)}
                                    className="flex items-center gap-2 py-2"
                                  >
                                    {result.image && (
                                      <div className="h-8 w-8 overflow-hidden rounded-md border">
                                        <img
                                          src={result.image}
                                          alt={result.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                    )}
                                    <span>{result.name}</span>
                                  </CommandItem>
                                ))
                              }
                            </CommandGroup>
                          )}
                          
                          {results.some(r => r.type === 'category') && (
                            <CommandGroup heading="Categories">
                              {results
                                .filter(r => r.type === 'category')
                                .map((result) => (
                                  <CommandItem
                                    key={result.id}
                                    onSelect={() => handleSelect(result)}
                                  >
                                    <span>{result.name}</span>
                                  </CommandItem>
                                ))
                              }
                            </CommandGroup>
                          )}
                          
                          {results.some(r => r.type === 'suggested') && (
                            <CommandGroup heading="Suggested Searches">
                              {results
                                .filter(r => r.type === 'suggested')
                                .map((result) => (
                                  <CommandItem
                                    key={result.id}
                                    onSelect={() => handleSelect(result)}
                                  >
                                    <span>{result.name}</span>
                                  </CommandItem>
                                ))
                              }
                            </CommandGroup>
                          )}
                        </>
                      )}
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleVoiceRecognition}
          className={isListening ? "border-primary text-primary" : ""}
        >
          {isListening ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        
        <ImageSearch />
      </div>
    </div>
  );
}
