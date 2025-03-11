
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import {
  CreditCard,
  Landmark,
  Wallet,
  CoinsIcon,
  Calendar,
} from 'lucide-react';

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export function PaymentMethodSelector({ selectedMethod, onSelect }: PaymentMethodSelectorProps) {
  const paymentOptions: PaymentOption[] = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with Visa, Mastercard, American Express',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Fast, secure payment with PayPal',
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: <Landmark className="h-5 w-5" />,
      description: 'Direct bank transfer (processing may take 1-2 days)',
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: <CoinsIcon className="h-5 w-5" />,
      description: 'Pay with Bitcoin, Ethereum, or other cryptocurrencies',
    },
    {
      id: 'bnpl',
      name: 'Buy Now, Pay Later',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Split your payment in 4 interest-free installments',
    },
  ];

  return (
    <RadioGroup value={selectedMethod} className="space-y-3">
      {paymentOptions.map((option) => (
        <div key={option.id} className="flex">
          <Button
            variant={selectedMethod === option.id ? "default" : "outline"}
            className={`w-full justify-start text-left h-auto py-3 px-4 ${
              selectedMethod === option.id ? "border-primary" : ""
            }`}
            onClick={() => onSelect(option.id)}
          >
            <div className="flex gap-3 items-center">
              <div className={`rounded-full p-1.5 ${selectedMethod === option.id ? "bg-primary-foreground text-primary" : "bg-muted"}`}>
                {option.icon}
              </div>
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {option.description}
                </div>
              </div>
            </div>
          </Button>
        </div>
      ))}
    </RadioGroup>
  );
}
