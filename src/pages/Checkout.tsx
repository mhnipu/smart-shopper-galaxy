
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCart } from '@/context/CartContext';
import { FormatPrice } from '@/components/util/FormatPrice';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state/province" }),
  zipCode: z.string().min(3, { message: "Please enter a valid postal code" }),
  country: z.string().min(2, { message: "Please select your country" }),
  phoneNumber: z.string().min(5, { message: "Please enter a valid phone number" }),
  orderNotes: z.string().optional(),
});

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const { cartItems, calculateSubtotal, calculateTax, clearCart } = useCart();
  const navigate = useNavigate();
  
  const subtotal = calculateSubtotal();
  const tax = calculateTax();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      phoneNumber: "",
      orderNotes: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, we would process the payment and create the order here
    
    toast({
      title: "Order Placed Successfully",
      description: "Your order has been placed and is being processed.",
    });
    
    // Clear the cart and redirect to order confirmation
    clearCart();
    navigate("/order-confirmation");
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <div className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Add some products to your cart to proceed with checkout.
                </p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checkout Form */}
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, Apt 4B" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="US">United States</SelectItem>
                                    <SelectItem value="CA">Canada</SelectItem>
                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                    <SelectItem value="AU">Australia</SelectItem>
                                    <SelectItem value="DE">Germany</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (123) 456-7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="orderNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Order Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Special instructions for delivery or order details" 
                                  className="resize-none" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Separator className="my-8" />
                        
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        
                        <PaymentMethodSelector
                          selectedMethod={paymentMethod}
                          onSelect={setPaymentMethod}
                        />
                        
                        <div className="pt-6">
                          <Button type="submit" className="w-full">
                            Place Order
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex items-center">
                            <div className="h-14 w-14 rounded-md border overflow-hidden flex-shrink-0 mr-3">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{item.product.name}</h3>
                              <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <FormatPrice price={item.product.price * item.quantity} />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <FormatPrice price={subtotal} />
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        {shipping === 0 ? (
                          <span className="text-green-600 dark:text-green-400">Free</span>
                        ) : (
                          <FormatPrice price={shipping} />
                        )}
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <FormatPrice price={tax} />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <FormatPrice price={total} className="text-primary" />
                    </div>
                    
                    <div className="mt-6 bg-muted/40 p-4 rounded-md text-sm text-muted-foreground">
                      <p>
                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                        Your payment information is processed securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
