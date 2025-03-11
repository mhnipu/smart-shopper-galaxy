
import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';

interface FormatPriceProps {
  price: number;
  className?: string;
}

export function FormatPrice({ price, className }: FormatPriceProps) {
  const { formatPrice } = useCurrency();
  
  return (
    <span className={className}>{formatPrice(price)}</span>
  );
}
