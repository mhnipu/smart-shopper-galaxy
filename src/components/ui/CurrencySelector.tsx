
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CurrencyCode, useCurrency } from '@/context/CurrencyContext';
import { CreditCard } from 'lucide-react';

export function CurrencySelector() {
  const { currency, setCurrencyCode, availableCurrencies } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <CreditCard className="h-4 w-4" />
          <span>{currency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableCurrencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrencyCode(curr.code as CurrencyCode)}
            className={currency.code === curr.code ? 'bg-muted' : ''}
          >
            <span className="w-8">{curr.symbol}</span>
            <span>{curr.name}</span>
            <span className="ml-auto opacity-60">{curr.code}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
