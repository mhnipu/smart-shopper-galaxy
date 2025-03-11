
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && isCartOpen) {
        closeCart();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="font-medium">Your Cart</h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={closeCart}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4">
              <div className="rounded-full bg-muted p-6">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="mt-1 text-muted-foreground">
                  Looks like you haven't added anything to your cart yet.
                </p>
              </div>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4">
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 animate-fade-in">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center rounded-md border">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t p-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
