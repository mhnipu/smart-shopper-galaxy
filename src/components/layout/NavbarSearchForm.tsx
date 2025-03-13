
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface NavbarSearchFormProps {
  isFullWidth?: boolean;
  autoFocus?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function NavbarSearchForm({ 
  isFullWidth = false, 
  autoFocus = false,
  onSubmit 
}: NavbarSearchFormProps) {
  return (
    <form 
      onSubmit={onSubmit} 
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
      />
      <Button 
        type="submit" 
        variant="default" 
        size={isFullWidth ? "default" : "icon"}
        className={`${isFullWidth ? 'absolute right-0 rounded-l-none h-11' : 'absolute right-0 rounded-l-none h-10'}`}
      >
        {isFullWidth ? 'Search' : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
}
