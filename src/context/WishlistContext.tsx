
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);
  
  const totalItems = items.length;

  const addItem = (product: WishlistItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevItems;
      } else {
        toast.success(`${product.name} added to wishlist`);
        return [...prevItems, product];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === id);
      if (removedItem) {
        toast.info(`${removedItem.name} removed from wishlist`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const clearWishlist = () => {
    setItems([]);
    toast.info("Wishlist cleared");
  };
  
  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearWishlist,
      isInWishlist,
      totalItems
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
