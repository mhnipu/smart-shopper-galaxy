
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Hero() {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: 'Next-Gen Technology',
      subtitle: 'Discover the latest innovations in tech at unbeatable prices',
      buttonText: 'Shop Latest Tech',
      buttonLink: '/products'
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: 'Premium Audio',
      subtitle: 'Experience sound like never before with our high-quality headphones',
      buttonText: 'Shop Audio',
      buttonLink: '/category/audio'
    },
    {
      image: 'https://images.unsplash.com/photo-1515940625090-e199db0469de?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: 'Smart Home',
      subtitle: 'Transform your living space with intelligent home solutions',
      buttonText: 'Explore Smart Home',
      buttonLink: '/category/smart-home'
    },
    {
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: 'Gaming Excellence',
      subtitle: 'Level up your gaming experience with cutting-edge laptops and accessories',
      buttonText: 'Explore Gaming',
      buttonLink: '/category/gaming'
    },
    {
      image: 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3',
      title: 'Smartphone Innovation',
      subtitle: 'Stay connected with the latest smartphone technology and accessories',
      buttonText: 'Shop Smartphones',
      buttonLink: '/category/phones'
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
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden mt-[180px] md:mt-[190px]"
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-start text-left px-8 md:px-16">
            <div className="max-w-lg animate-fade-in" style={{ animationDuration: '1s' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-white/90 mb-8 max-w-md drop-shadow-md">
                {slide.subtitle}
              </p>
              <Link to={slide.buttonLink}>
                <Button size="lg" variant="default" className="shadow-lg">
                  {slide.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
