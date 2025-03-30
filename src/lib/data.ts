
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured: boolean;
  reviews?: number; // Add optional reviews property
  details: {
    [key: string]: string | string[];
  };
}

export interface Category {
  id: string;
  name: string;
  image: string;
  href?: string; // Add optional href property
}

export const products: Product[] = [
  {
    id: "1",
    name: "Ultra-Slim Wireless Earbuds",
    description: "Experience premium sound quality with our most advanced noise-cancelling technology.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2532&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606127195782-58758e8d281a?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=2532&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "audio",
    featured: true,
    details: {
      color: ["Space Gray", "Silver", "Midnight Blue"],
      connectivity: "Bluetooth 5.2",
      batteryLife: "Up to 36 hours with charging case",
      features: ["Active Noise Cancellation", "Transparency Mode", "Wireless Charging"]
    }
  },
  {
    id: "2",
    name: "Professional Photography Drone",
    description: "Capture stunning aerial footage with 8K video and 48MP photos.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=2580&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=2659&auto=format&fit=crop"
    ],
    category: "photography",
    featured: true,
    details: {
      flightTime: "34 minutes",
      camera: "8K Video, 48MP Photo",
      range: "15km transmission range",
      features: ["Obstacle Avoidance", "Automated Flight Paths", "Follow Mode"]
    }
  },
  {
    id: "3",
    name: "Smart Home Security System",
    description: "Complete home protection with AI-powered recognition and 24/7 monitoring.",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626903254829-3d3ad732e79b?q=80&w=2671&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620641622320-a12e75405631?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589401806207-2381455bdd20?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "smart-home",
    featured: true,
    details: {
      components: ["Base Station", "4 Door/Window Sensors", "2 Motion Detectors", "Keypad"],
      connectivity: "Wi-Fi, Cellular Backup",
      poweredBy: "AI facial recognition technology",
      features: ["24/7 Professional Monitoring", "Mobile Alerts", "No Long-Term Contracts"]
    }
  },
  {
    id: "4",
    name: "Ultra-Thin Smartphone",
    description: "The most powerful smartphone we've ever created in our thinnest design.",
    price: 999.99,
    images: [
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2669&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=2329&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=2662&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "phones",
    featured: true,
    details: {
      display: "6.7-inch Super Retina XDR",
      processor: "A15 Bionic chip",
      camera: "Pro camera system (48MP, 12MP, 12MP)",
      storage: ["128GB", "256GB", "512GB", "1TB"],
      color: ["Graphite", "Silver", "Gold", "Sierra Blue"]
    }
  },
  {
    id: "5",
    name: "Fitness Smart Watch",
    description: "Advanced health monitoring and workout tracking in an elegant design.",
    price: 349.99,
    images: [
      "https://images.unsplash.com/photo-1617043786394-ae759c3fa5f3?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "wearables",
    featured: false,
    details: {
      display: "Always-On Retina LTPO OLED",
      sensors: ["Heart Rate", "ECG", "Blood Oxygen", "Altimeter"],
      battery: "Up to 18 hours",
      waterResistance: "50 meters",
      connectivity: "GPS + Cellular"
    }
  },
  {
    id: "6",
    name: "Premium Noise-Cancelling Headphones",
    description: "Studio-quality sound with industry-leading noise cancellation.",
    price: 349.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520170350707-b2da59970118?q=80&w=2563&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606141508832-8487d8208c9a?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "audio",
    featured: false,
    details: {
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.0, 3.5mm audio cable",
      features: ["Active Noise Cancellation", "Transparency Mode", "Touch Controls", "Voice Assistant Support"],
      color: ["Black", "Silver", "Midnight Blue", "Rose Gold"]
    }
  },
  {
    id: "7",
    name: "Gaming Laptop",
    description: "Desktop-class performance in a portable design for immersive gaming experiences.",
    price: 1899.99,
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?q=80&w=2532&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2664&auto=format&fit=crop"
    ],
    category: "computers",
    featured: false,
    details: {
      processor: "12th Gen Intel Core i9",
      graphics: "NVIDIA GeForce RTX 3080",
      memory: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "17.3-inch 240Hz QHD"
    }
  },
  {
    id: "8",
    name: "Professional Digital Camera",
    description: "Capture every detail with this professional-grade digital SLR camera.",
    price: 2499.99,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2638&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613098054305-9457d0a0e3b1?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "photography",
    featured: false,
    details: {
      sensor: "45.7 Megapixel Full-Frame CMOS",
      processor: "EXPEED 7 Image Processor",
      videoRecording: "8K Ultra HD",
      storage: "Dual SD UHS-II Card Slots",
      features: ["In-Body Image Stabilization", "Advanced Autofocus", "Weather Sealing"]
    }
  },
  {
    id: "9",
    name: "High-Performance Gaming Console",
    description: "Next-generation gaming with ray tracing and 4K gaming at 120 frames per second.",
    price: 499.99,
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2532&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2627&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2670&auto=format&fit=crop"
    ],
    category: "gaming",
    featured: true,
    details: {
      resolution: "4K/8K",
      storage: "1TB SSD",
      processor: "Custom AMD Zen 2",
      features: ["Ray Tracing", "120fps Gaming", "HDR", "VRR"]
    }
  },
  {
    id: "10",
    name: "Ultrawide Curved Gaming Monitor",
    description: "Immersive 34-inch ultrawide curved monitor with lightning-fast refresh rate.",
    price: 849.99,
    images: [
      "https://images.unsplash.com/photo-1527219525722-f9767a7f2884?q=80&w=2673&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555375771-14b2a63968a9?q=80&w=2215&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=2532&auto=format&fit=crop"
    ],
    category: "gaming",
    featured: false,
    details: {
      display: "34-inch Ultrawide Curved",
      resolution: "3440 x 1440 WQHD",
      refreshRate: "175Hz",
      responseTime: "1ms",
      features: ["G-Sync/FreeSync", "HDR", "RGB Lighting"]
    }
  },
  {
    id: "11",
    name: "Smart Home Hub",
    description: "Central hub for controlling all your smart home devices with voice commands.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1588688592350-4544f274070d?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565970125716-9a7393361adb?q=80&w=2556&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591370788571-6a4755a2bc65?q=80&w=2564&auto=format&fit=crop"
    ],
    category: "smart-home",
    featured: false,
    details: {
      connectivity: "Wi-Fi, Bluetooth, Zigbee, Z-Wave",
      compatibleWith: ["Alexa", "Google Assistant", "HomeKit"],
      features: ["Voice Control", "Automation Routines", "Screen Display"]
    }
  },
  {
    id: "12",
    name: "Portable Bluetooth Speaker",
    description: "Powerful, waterproof speaker with 360° sound and 24-hour battery life.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=2574&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596332994642-a9deb82a75fd?q=80&w=2574&auto=format&fit=crop"
    ],
    category: "audio",
    featured: true,
    details: {
      batteryLife: "24 hours",
      waterproofRating: "IPX7",
      connectivity: "Bluetooth 5.1",
      features: ["Party Mode", "Voice Assistant Compatible", "USB-C Charging"]
    }
  }
];

export const categories: Category[] = [
  {
    id: "audio",
    name: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
    href: "/category/audio"
  },
  {
    id: "photography",
    name: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2638&auto=format&fit=crop",
    href: "/category/photography"
  },
  {
    id: "smart-home",
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2670&auto=format&fit=crop",
    href: "/category/smart-home"
  },
  {
    id: "phones",
    name: "Phones",
    image: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2669&auto=format&fit=crop",
    href: "/category/phones"
  },
  {
    id: "wearables",
    name: "Wearables",
    image: "https://images.unsplash.com/photo-1617043786394-ae759c3fa5f3?q=80&w=2670&auto=format&fit=crop",
    href: "/category/wearables"
  },
  {
    id: "computers",
    name: "Computers",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop",
    href: "/category/computers"
  },
  {
    id: "gaming",
    name: "Gaming",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2532&auto=format&fit=crop",
    href: "/category/gaming"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1491947153227-33d59da6c448?q=80&w=2148&auto=format&fit=crop",
    href: "/category/accessories"
  }
];
