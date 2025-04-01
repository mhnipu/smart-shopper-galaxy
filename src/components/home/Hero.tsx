
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';

export function Hero() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: "Elevate Your Experience",
      subtitle: "Premium Technology for Modern Living",
      description: "Discover curated collections of premium devices designed to enhance your lifestyle and productivity. Engineered for performance and crafted for elegance.",
      buttonText: "Explore Collection",
      buttonLink: "/products",
      secondaryButton: {
        text: "New Arrivals",
        link: "/category/new-arrivals"
      }
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: "Sound Perfected",
      subtitle: "Immersive Audio Experiences",
      description: "Premium sound engineering meets elegant design. Experience music and media with unprecedented clarity and depth that transforms every listening session.",
      buttonText: "Shop Audio",
      buttonLink: "/category/audio",
      secondaryButton: {
        text: "Best Sellers",
        link: "/category/audio?bestsellers=true"
      }
    },
    {
      image: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: "Work & Create",
      subtitle: "Professional-Grade Technology",
      description: "Tools designed for creators and professionals who demand performance without compromise. Elevate your work with devices that match your ambition.",
      buttonText: "Professional Series",
      buttonLink: "/category/professional",
      secondaryButton: {
        text: "View Workspace",
        link: "/category/workspace"
      }
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const slideInterval = 6000; // 6 seconds per slide

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, slideInterval);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgressWidth(prev => {
        const newWidth = prev + (100 / (slideInterval / 100));
        return newWidth > 100 ? 0 : newWidth;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    setProgressWidth(0);
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    
    if (difference > 50) {
      nextSlide();
    } else if (difference < -50) {
      prevSlide();
    }
  };

  return (
    <section 
      className="relative h-[600px] md:h-[650px] lg:h-[700px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-start text-left px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl animate-fade-in" style={{ animationDuration: '1s' }}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium mb-5 backdrop-blur-sm">
                Premium Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4 font-light max-w-md leading-relaxed">
                {slide.subtitle}
              </p>
              <p className="text-sm md:text-base text-white/80 mb-8 max-w-lg leading-relaxed hidden md:block">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={slide.buttonLink}>
                  <Button size="lg" variant="default" className="shadow-lg group text-base px-8">
                    {slide.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to={slide.secondaryButton.link}>
                  <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-base">
                    {slide.secondaryButton.text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center space-x-3 px-6 md:px-16">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white scale-125 w-8' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 transition-all backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 transition-all backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Quick shop buttons */}
      <div className="absolute bottom-20 right-6 md:right-16 z-20 hidden md:flex flex-col gap-3">
        <Link to="/products">
          <Button variant="secondary" size="sm" className="rounded-full shadow-lg flex gap-2 px-4">
            <ShoppingCart className="h-4 w-4" />
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
