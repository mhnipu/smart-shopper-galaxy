
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight, Star, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  // Mock order data
  const orderData = {
    orderId: 'ORD-' + Math.floor(Math.random() * 10000),
    date: new Date().toLocaleDateString(),
    total: 329.97,
    paymentMethod: 'Credit Card',
    email: 'john.doe@example.com',
    shippingAddress: '123 Main St, New York, NY 10001',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-4 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been received.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-8 text-left">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Order #{orderData.orderId}</h2>
                  <p className="text-muted-foreground text-sm">Placed on {orderData.date}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Receipt className="h-4 w-4" />
                  View Receipt
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground">{orderData.shippingAddress}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                  <p className="text-muted-foreground">{orderData.paymentMethod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Email</h3>
                  <p className="text-muted-foreground">{orderData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Order Total</h3>
                  <p className="text-muted-foreground">${orderData.total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-muted/40">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 mt-0.5 text-primary" />
                  <div>
                    <h3 className="font-medium">Estimated Delivery</h3>
                    <p className="text-muted-foreground">{orderData.estimatedDelivery}</p>
                    <p className="text-sm mt-1">
                      You'll receive shipping confirmation and tracking info by email
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full gap-2 group">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/account" className="block">
                <Button className="w-full gap-2">
                  <Star className="h-4 w-4" />
                  Review Your Purchase
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about your order, please contact our customer support.
              </p>
              <Button variant="link" className="text-primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
