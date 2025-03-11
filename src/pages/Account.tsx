
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Package, Heart, CreditCard, LogOut, 
  Edit2, Save, Loader2, AlertCircle, Mail, Lock, MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  });

  // Mock order data
  const orders = [
    { id: 'ORD-1234', date: '2023-10-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-5678', date: '2023-09-28', status: 'Processing', total: 79.50 },
    { id: 'ORD-9012', date: '2023-08-12', status: 'Delivered', total: 249.99 }
  ];

  // Mock wishlist items
  const wishlistItems = [
    { id: 'p1', name: 'Wireless Headphones', price: 99.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 'p2', name: 'Smart Watch Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    }, 1000);
  };

  const handleLogout = () => {
    // Simulate logout
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pt-16">
        {/* Account Header */}
        <div className="bg-muted py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Account</h1>
            <p className="text-muted-foreground">
              Manage your profile, orders, and wishlist
            </p>
          </div>
        </div>
        
        {/* Account Content */}
        <div className="py-12 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <Tabs defaultValue="profile" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 space-y-1 flex-shrink-0">
                  <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                    <TabsTrigger value="profile" className="w-full justify-start px-3 h-10">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="w-full justify-start px-3 h-10">
                      <Package className="h-4 w-4 mr-2" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger value="wishlist" className="w-full justify-start px-3 h-10">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="w-full justify-start px-3 h-10">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Methods
                    </TabsTrigger>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start px-3 h-10 text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </TabsList>
                </div>
                
                <div className="flex-1 space-y-6">
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6 mt-0">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">Personal Information</h2>
                        {!isEditing ? (
                          <Button variant="outline" onClick={() => setIsEditing(true)}>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit Profile
                          </Button>
                        ) : (
                          <Button variant="default" onClick={handleSaveProfile} disabled={isSaving}>
                            {isSaving ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Save className="h-4 w-4 mr-2" />
                            )}
                            Save Changes
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              Full Name
                            </label>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={userData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </label>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Your email"
                                value={userData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">
                              Phone Number
                            </label>
                            <div className="flex items-center gap-2">
                              <Lock className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                name="phone"
                                placeholder="Your phone number"
                                value={userData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-semibold pt-4">Shipping Address</h2>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="address" className="text-sm font-medium">
                              Street Address
                            </label>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="address"
                                name="address"
                                placeholder="Street address"
                                value={userData.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="city" className="text-sm font-medium">
                              City
                            </label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="City"
                              value={userData.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="state" className="text-sm font-medium">
                              State/Province
                            </label>
                            <Input
                              id="state"
                              name="state"
                              placeholder="State/Province"
                              value={userData.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="zip" className="text-sm font-medium">
                              ZIP/Postal Code
                            </label>
                            <Input
                              id="zip"
                              name="zip"
                              placeholder="ZIP/Postal Code"
                              value={userData.zip}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="country" className="text-sm font-medium">
                              Country
                            </label>
                            <Input
                              id="country"
                              name="country"
                              placeholder="Country"
                              value={userData.country}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Orders Tab */}
                  <TabsContent value="orders" className="space-y-6 mt-0">
                    <h2 className="text-2xl font-semibold">Order History</h2>
                    {orders.length > 0 ? (
                      <div className="rounded-lg border overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted">
                                <th className="py-3 px-4 text-left font-medium">Order ID</th>
                                <th className="py-3 px-4 text-left font-medium">Date</th>
                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                <th className="py-3 px-4 text-left font-medium">Total</th>
                                <th className="py-3 px-4 text-left font-medium">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order) => (
                                <tr key={order.id} className="border-t">
                                  <td className="py-4 px-4">{order.id}</td>
                                  <td className="py-4 px-4">{order.date}</td>
                                  <td className="py-4 px-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      order.status === 'Delivered'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                    }`}>
                                      {order.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4">${order.total.toFixed(2)}</td>
                                  <td className="py-4 px-4">
                                    <Button variant="outline" size="sm">
                                      View Details
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 border rounded-lg bg-muted/20">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          You haven't placed any orders yet. Start shopping to see your orders here.
                        </p>
                        <Button>Browse Products</Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Wishlist Tab */}
                  <TabsContent value="wishlist" className="space-y-6 mt-0">
                    <h2 className="text-2xl font-semibold">My Wishlist</h2>
                    {wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="flex flex-col border rounded-lg overflow-hidden">
                            <div className="aspect-square overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover transition-transform hover:scale-105"
                              />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                              <div className="mt-4 flex gap-2 mt-auto">
                                <Button className="flex-1">Add to Cart</Button>
                                <Button variant="outline" size="icon">
                                  <Heart className="h-4 w-4 fill-current" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border rounded-lg bg-muted/20">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Your Wishlist is Empty</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          Save your favorite items to keep track of products you're interested in.
                        </p>
                        <Button>Browse Products</Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Payment Methods Tab */}
                  <TabsContent value="payment" className="space-y-6 mt-0">
                    <h2 className="text-2xl font-semibold">Saved Payment Methods</h2>
                    <div className="text-center py-12 border rounded-lg bg-muted/20">
                      <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Payment Methods</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-6">
                        You don't have any saved payment methods yet. Add one for faster checkout.
                      </p>
                      <Button>Add Payment Method</Button>
                    </div>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
