
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, BadgePercent, ArrowRight, Bell } from 'lucide-react';

export function FeaturedPromotion() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary/80 text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4 backdrop-blur-sm">
            <BadgePercent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-xl md:text-2xl">Premium Tech Collection</h3>
            <p className="text-sm md:text-base text-white/90">Up to 40% off on selected premium items</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3">
            <Clock className="h-5 w-5 mr-3 text-white/80" />
            <div className="font-medium text-lg">
              <span className="countdown-item font-mono">
                <span className="font-bold text-xl">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm ml-1">d</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item font-mono">
                <span className="font-bold text-xl">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm ml-1">h</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item font-mono">
                <span className="font-bold text-xl">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm ml-1">m</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item font-mono">
                <span className="font-bold text-xl">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm ml-1">s</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/products?sale=true">
              <Button variant="secondary" size="lg" className="text-primary font-medium group shadow-md">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="bg-white/10 hover:bg-white/20 text-white rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
