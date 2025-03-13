
import React from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound, PhoneCall, MapPin } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function NavbarTopBar() {
  return (
    <div className="text-white py-1 text-xs bg-gray-950">
      <div className="container mx-auto flex justify-between items-center px-[16px] rounded-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <PhoneCall className="h-3 w-3 mr-1" />
            <span>Hotline: 1800-123-456</span>
          </div>
          <div className="hidden md:flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            <span>Find a Store</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/account" className="hover:underline flex items-center">
            <CircleUserRound className="h-3 w-3 mr-1" />
            <span>My Account</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
