
-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  href TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  images TEXT[] NOT NULL,
  category TEXT NOT NULL REFERENCES public.categories(id),
  featured BOOLEAN NOT NULL DEFAULT false,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product details table for flexible product specifications
CREATE TABLE public.product_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample categories
INSERT INTO public.categories (id, name, image, href) VALUES
('audio', 'Audio', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop', '/category/audio'),
('photography', 'Photography', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2638&auto=format&fit=crop', '/category/photography'),
('smart-home', 'Smart Home', 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop', '/category/smart-home'),
('phones', 'Phones', 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2669&auto=format&fit=crop', '/category/phones'),
('wearables', 'Wearables', 'https://images.unsplash.com/photo-1617043786394-ae759c3fa5f3?q=80&w=2670&auto=format&fit=crop', '/category/wearables'),
('computers', 'Computers', 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop', '/category/computers'),
('gaming', 'Gaming', 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2532&auto=format&fit=crop', '/category/gaming'),
('accessories', 'Accessories', 'https://images.unsplash.com/photo-1491947153227-33d59da6c448?q=80&w=2148&auto=format&fit=crop', '/category/accessories');

-- Insert sample products
INSERT INTO public.products (id, name, description, price, images, category, featured, reviews) VALUES
('1', 'Ultra-Slim Wireless Earbuds', 'Experience premium sound quality with our most advanced noise-cancelling technology.', 199.99, 
 ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2532&auto=format&fit=crop', 'https://images.unsplash.com/photo-1606127195782-58758e8d281a?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=2532&auto=format&fit=crop', 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2670&auto=format&fit=crop'], 
 'audio', true, 128),
('2', 'Professional Photography Drone', 'Capture stunning aerial footage with 8K video and 48MP photos.', 1299.99, 
 ARRAY['https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=2580&auto=format&fit=crop', 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2659&auto=format&fit=crop'], 
 'photography', true, 89),
('3', 'Smart Home Security System', 'Complete home protection with AI-powered recognition and 24/7 monitoring.', 399.99, 
 ARRAY['https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1626903254829-3d3ad732e79b?q=80&w=2671&auto=format&fit=crop', 'https://images.unsplash.com/photo-1620641622320-a12e75405631?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1589401806207-2381455bdd20?q=80&w=2670&auto=format&fit=crop'], 
 'smart-home', true, 156),
('4', 'Ultra-Thin Smartphone', 'The most powerful smartphone we have ever created in our thinnest design.', 999.99, 
 ARRAY['https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2669&auto=format&fit=crop', 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2329&auto=format&fit=crop', 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=2662&auto=format&fit=crop', 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2670&auto=format&fit=crop'], 
 'phones', true, 203),
('5', 'Fitness Smart Watch', 'Advanced health monitoring and workout tracking in an elegant design.', 349.99, 
 ARRAY['https://images.unsplash.com/photo-1617043786394-ae759c3fa5f3?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop', 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2670&auto=format&fit=crop'], 
 'wearables', false, 94),
('6', 'Premium Noise-Cancelling Headphones', 'Studio-quality sound with industry-leading noise cancellation.', 349.99, 
 ARRAY['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=2563&auto=format&fit=crop', 'https://images.unsplash.com/photo-1606141508832-8487d8208c9a?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=2670&auto=format&fit=crop'], 
 'audio', false, 167),
('7', 'Gaming Laptop', 'Desktop-class performance in a portable design for immersive gaming experiences.', 1899.99, 
 ARRAY['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop', 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?q=80&w=2532&auto=format&fit=crop', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2664&auto=format&fit=crop'], 
 'computers', false, 78),
('8', 'Professional Digital Camera', 'Capture every detail with this professional-grade digital SLR camera.', 2499.99, 
 ARRAY['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2638&auto=format&fit=crop', 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1613098054305-9457d0a0e3b1?q=80&w=2574&auto=format&fit=crop'], 
 'photography', false, 132),
('9', 'High-Performance Gaming Console', 'Next-generation gaming with ray tracing and 4K gaming at 120 frames per second.', 499.99, 
 ARRAY['https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2532&auto=format&fit=crop', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2627&auto=format&fit=crop', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2670&auto=format&fit=crop'], 
 'gaming', true, 245),
('10', 'Ultrawide Curved Gaming Monitor', 'Immersive 34-inch ultrawide curved monitor with lightning-fast refresh rate.', 849.99, 
 ARRAY['https://images.unsplash.com/photo-1527219525722-f9767a7f2884?q=80&w=2673&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555375771-14b2a63968a9?q=80&w=2215&auto=format&fit=crop', 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2532&auto=format&fit=crop'], 
 'gaming', false, 87),
('11', 'Smart Home Hub', 'Central hub for controlling all your smart home devices with voice commands.', 129.99, 
 ARRAY['https://images.unsplash.com/photo-1588688592350-4544f274070d?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1565970125716-9a7393361adb?q=80&w=2556&auto=format&fit=crop', 'https://images.unsplash.com/photo-1591370788571-6a4755a2bc65?q=80&w=2564&auto=format&fit=crop'], 
 'smart-home', false, 94),
('12', 'Portable Bluetooth Speaker', 'Powerful, waterproof speaker with 360° sound and 24-hour battery life.', 129.99, 
 ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2670&auto=format&fit=crop', 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=2574&auto=format&fit=crop', 'https://images.unsplash.com/photo-1596332994642-a9deb82a75fd?q=80&w=2574&auto=format&fit=crop'], 
 'audio', true, 187);

-- Insert sample product details
INSERT INTO public.product_details (product_id, key, value) VALUES
('1', 'color', 'Space Gray'),
('1', 'color', 'Silver'),
('1', 'color', 'Midnight Blue'),
('1', 'connectivity', 'Bluetooth 5.2'),
('1', 'batteryLife', 'Up to 36 hours with charging case'),
('1', 'features', 'Active Noise Cancellation'),
('1', 'features', 'Transparency Mode'),
('1', 'features', 'Wireless Charging'),
('2', 'flightTime', '34 minutes'),
('2', 'camera', '8K Video, 48MP Photo'),
('2', 'range', '15km transmission range'),
('2', 'features', 'Obstacle Avoidance'),
('2', 'features', 'Automated Flight Paths'),
('2', 'features', 'Follow Mode'),
('3', 'components', 'Base Station'),
('3', 'components', '4 Door/Window Sensors'),
('3', 'components', '2 Motion Detectors'),
('3', 'components', 'Keypad'),
('3', 'connectivity', 'Wi-Fi, Cellular Backup'),
('3', 'poweredBy', 'AI facial recognition technology'),
('3', 'features', '24/7 Professional Monitoring'),
('3', 'features', 'Mobile Alerts'),
('3', 'features', 'No Long-Term Contracts'),
('4', 'display', '6.7-inch Super Retina XDR'),
('4', 'processor', 'A15 Bionic chip'),
('4', 'camera', 'Pro camera system (48MP, 12MP, 12MP)'),
('4', 'storage', '128GB'),
('4', 'storage', '256GB'),
('4', 'storage', '512GB'),
('4', 'storage', '1TB'),
('4', 'color', 'Graphite'),
('4', 'color', 'Silver'),
('4', 'color', 'Gold'),
('4', 'color', 'Sierra Blue');

-- Enable Row Level Security (make tables publicly readable for now)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_details ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on product_details" ON public.product_details FOR SELECT USING (true);
