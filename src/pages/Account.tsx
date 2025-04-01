
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Package, Heart, CreditCard, LogOut, 
  Edit2, Save, Loader2, Mail, Lock, MapPin,
  Shield, Bell, BarChart3, FileText, UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: authUser, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Parse URL params to get active tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/account');
    }
  }, [isAuthenticated, navigate]);

  // Mock user data
  const [userData, setUserData] = useState({
    name: authUser?.name || 'John Doe',
    email: authUser?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  });

  // User preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    darkMode: false,
    newsletterSubscribed: true,
    activityAlerts: true
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

  // Track loyalty points
  const [loyaltyPoints, setLoyaltyPoints] = useState(250);
  const nextRewardAt = 500;
  const progressPercentage = (loyaltyPoints / nextRewardAt) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string) => {
    setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
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
      // Give loyalty points for profile update
      setLoyaltyPoints(prev => prev + 10);
    }, 1000);
  };

  const handleLogout = () => {
    // Simulate logout
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 pt-20"> {/* Fixed the top spacing */}
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
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-64 space-y-1 flex-shrink-0">
                  {/* Loyalty Card */}
                  <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-medium text-primary mb-2">Loyalty Program</h3>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{loyaltyPoints} points</span>
                        <span>{nextRewardAt} points</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {nextRewardAt - loyaltyPoints} more points until your next reward!
                    </p>
                  </div>
                  
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
                    <TabsTrigger value="security" className="w-full justify-start px-3 h-10">
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="w-full justify-start px-3 h-10">
                      <Bell className="h-4 w-4 mr-2" />
                      Preferences
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="w-full justify-start px-3 h-10">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Activity
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
                  
                  {/* Security Tab - New */}
                  <TabsContent value="security" className="space-y-6 mt-0">
                    <h2 className="text-2xl font-semibold">Security Settings</h2>
                    <div className="space-y-6 border rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-muted-foreground text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          checked={preferences.twoFactorAuth}
                          onCheckedChange={() => handleToggleChange('twoFactorAuth')}
                        />
                      </div>
                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Password</h3>
                            <p className="text-muted-foreground text-sm">Last changed 3 months ago</p>
                          </div>
                          <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                      </div>
                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Login Sessions</h3>
                            <p className="text-muted-foreground text-sm">Manage devices that are logged in</p>
                          </div>
                          <Button variant="outline" size="sm">View Sessions</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Preferences Tab - New */}
                  <TabsContent value="preferences" className="space-y-6 mt-0">
                    <h2 className="text-2xl font-semibold">Notification Preferences</h2>
                    <div className="space-y-4 border rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-muted-foreground text-sm">Receive order updates via email</p>
                        </div>
                        <Switch 
                          checked={preferences.emailNotifications}
                          onCheckedChange={() => handleToggleChange('emailNotifications')}
                        />
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">SMS Notifications</h3>
                            <p className="text-muted-foreground text-sm">Receive order updates via text message</p>
                          </div>
                          <Switch 
                            checked={preferences.smsNotifications}
                            onCheckedChange={() => handleToggleChange('smsNotifications')}
                          />
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Newsletter Subscription</h3>
                            <p className="text-muted-foreground text-sm">Receive our weekly newsletter</p>
                          </div>
                          <Switch 
                            checked={preferences.newsletterSubscribed}
                            onCheckedChange={() => handleToggleChange('newsletterSubscribed')}
                          />
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Activity Alerts</h3>
                            <p className="text-muted-foreground text-sm">Get notified about account activity</p>
                          </div>
                          <Switch 
                            checked={preferences.activityAlerts}
                            onCheckedChange={() => handleToggleChange('activityAlerts')}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Activity Tab - New */}
                  <TabsContent value="activity" className="space-y-6 mt-0">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-semibold">Recent Activity</h2>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                    <div className="border rounded-lg divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Account Login</p>
                            <p className="text-sm text-muted-foreground">Successful login from Chrome on Windows</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">5 minutes ago</span>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Item Added to Wishlist</p>
                            <p className="text-sm text-muted-foreground">You added "Smart Watch Pro" to your wishlist</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Order Status Update</p>
                            <p className="text-sm text-muted-foreground">Order #ORD-5678 is now processing</p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
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
