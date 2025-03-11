
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  HeartIcon, LogIn, LogOut, Package, Settings, 
  ShoppingBag, User as UserIcon 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems: wishlistCount } = useWishlist();
  const { totalItems: cartCount, openCart } = useCart();
  
  return (
    <div className="flex items-center gap-2">
      {/* Wishlist Button */}
      <Link to="/wishlist">
        <Button variant="ghost" size="icon" className="relative">
          <HeartIcon className="h-5 w-5" />
          {wishlistCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {wishlistCount}
            </Badge>
          )}
        </Button>
      </Link>
      
      {/* Cart Button */}
      <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {cartCount}
          </Badge>
        )}
      </Button>
      
      {/* User Menu */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/account">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/account?tab=orders">
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/wishlist">
              <DropdownMenuItem>
                <HeartIcon className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/account?tab=settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
