
import React, { useState } from 'react';
import { SmartSearch } from '@/components/search/SmartSearch';

export function NavbarSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <div className="flex-1 max-w-xl mx-auto">
      <SmartSearch 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
      />
    </div>
  );
}
