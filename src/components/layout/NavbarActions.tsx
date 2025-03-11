
import React from 'react';
import { UserMenu } from './UserMenu';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function NavbarActions() {
  return (
    <div className="flex items-center gap-2">
      <CurrencySelector />
      <ThemeToggle />
      <UserMenu />
    </div>
  );
}
