
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  
  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-muted w-20 h-20 flex items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Items added to your wishlist will appear here. Start exploring our products to find items you like!
              </p>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden group animate-fade-in">
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-medium hover:text-primary truncate">{item.name}</h3>
                    </Link>
                    <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
