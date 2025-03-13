
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
    <form onSubmit={onSubmit} className={`relative ${isFullWidth ? 'w-full' : ''}`}>
      {isFullWidth && (
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <Input 
        type="search" 
        name="searchQuery" 
        placeholder="Search for products..." 
        className={`${isFullWidth ? 'w-full pl-10 pr-10' : 'w-full pr-10'}`}
        autoFocus={autoFocus}
      />
      <Button 
        type="submit" 
        variant="default" 
        className="absolute right-0 top-0 h-full rounded-l-none"
      >
        {isFullWidth ? 'Search' : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
}
