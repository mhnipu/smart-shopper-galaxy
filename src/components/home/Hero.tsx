
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2670&auto=format&fit=crop",
    title: "Future-Ready Technology",
    subtitle: "Discover our latest collection of premium devices",
    cta: "Shop Now"
  },
  {
    image: "https://images.unsplash.com/photo-1606161290889-77950be9b57b?q=80&w=2670&auto=format&fit=crop",
    title: "Premium Audio Experience",
    subtitle: "Immersive sound quality that transforms your listening",
    cta: "Explore Audio"
  },
  {
    image: "https://images.unsplash.com/photo-1544117519-cc4b5513f229?q=80&w=2500&auto=format&fit=crop",
    title: "Professional Photography Gear",
    subtitle: "Capture every moment with exceptional clarity",
    cta: "View Cameras"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 mix-blend-multiply" />
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4 md:px-6 pt-20">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ease-in-out transform ${
                index === currentSlide 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10 absolute'
              }`}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
                {slide.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-gray-200 md:text-2xl mb-8">
                {slide.subtitle}
              </p>
              <Link to="/products">
                <Button className="px-8 py-6 text-lg group" size="lg">
                  {slide.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
