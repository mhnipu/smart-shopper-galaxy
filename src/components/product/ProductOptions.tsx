
import React from 'react';
import { Button } from '@/components/ui/button';

interface OptionProps {
  label: string;
  options: string[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export function ProductOption({ label, options, selectedIndex = 0, onChange }: OptionProps) {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <Button
            key={option}
            variant="outline"
            className={`rounded-md border ${index === selectedIndex ? 'ring-2 ring-primary' : ''}`}
            onClick={() => onChange?.(index)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  const handleDecrease = () => onChange(Math.max(1, quantity - 1));
  const handleIncrease = () => onChange(quantity + 1);
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Quantity</h3>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="h-10 w-10"
        >
          <span className="sr-only">Decrease quantity</span>
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z" fill="currentColor" />
          </svg>
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrease}
          className="h-10 w-10"
        >
          <span className="sr-only">Increase quantity</span>
          <svg 
            width="15" 
            height="15" 
            viewBox="0 0 15 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" />
            <path d="M2.5 7C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H2.5Z" fill="currentColor" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
