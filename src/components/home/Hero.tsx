
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-auto h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                {slide.subtitle}
              </p>
              <Link to={slide.buttonLink}>
                <Button 
                  size="lg" 
                  className="group animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  {slide.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
