
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Wallet, 
  CoinsIcon, 
  Banknote, 
  CreditCardIcon,
  Phone
} from 'lucide-react';

export function PaymentMethodSelector({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <RadioGroupItem value="credit_card" id="credit_card" className="peer sr-only" />
        <Label
          htmlFor="credit_card"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <CreditCard className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>Credit Card</p>
            <p className="text-xs text-muted-foreground">Pay with Visa, Mastercard</p>
          </div>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
        <Label
          htmlFor="paypal"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Wallet className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>PayPal</p>
            <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
          </div>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="cryptocurrency" id="cryptocurrency" className="peer sr-only" />
        <Label
          htmlFor="cryptocurrency"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <CoinsIcon className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>Cryptocurrency</p>
            <p className="text-xs text-muted-foreground">Pay with Bitcoin, Ethereum</p>
          </div>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" className="peer sr-only" />
        <Label
          htmlFor="cash_on_delivery"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Banknote className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>Cash on Delivery</p>
            <p className="text-xs text-muted-foreground">Pay when you receive</p>
          </div>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="bkash" id="bkash" className="peer sr-only" />
        <Label
          htmlFor="bkash"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Phone className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>bKash</p>
            <p className="text-xs text-muted-foreground">Pay with mobile banking</p>
          </div>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="nagad" id="nagad" className="peer sr-only" />
        <Label
          htmlFor="nagad"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Phone className="mb-3 h-6 w-6" />
          <div className="text-center">
            <p>Nagad</p>
            <p className="text-xs text-muted-foreground">Pay with mobile banking</p>
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
}
