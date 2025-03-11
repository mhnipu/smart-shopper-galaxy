
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, ShieldCheck, Loader2, LockIcon, 
  CheckSquare2, CreditCard as CreditCardIcon, Wallet
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveInfo: true,
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const shippingCost = 10.00;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, saveInfo: checked }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/order-confirmation');
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase.",
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Checkout</h1>
              <p className="text-muted-foreground">
                Complete your purchase by providing your information below
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Information */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="United States"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <Checkbox 
                        id="saveInfo" 
                        checked={formData.saveInfo}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="saveInfo" className="text-sm font-normal">
                        Save this information for next time
                      </Label>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCardIcon className="h-5 w-5" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                          <Wallet className="h-5 w-5" />
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                            <div className="absolute right-3 top-2.5">
                              <CreditCard className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                              <Input
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                              />
                              <div className="absolute right-3 top-2.5">
                                <LockIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex items-center gap-2 p-4 bg-muted/40 rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Right Column: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    {items.length > 0 ? (
                      items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">Your cart is empty</p>
                        <Link to="/products">
                          <Button variant="link" className="mt-2">
                            Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isProcessing || items.length === 0}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </Button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <LockIcon className="h-3 w-3" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
