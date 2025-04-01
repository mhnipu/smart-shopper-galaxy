
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, BadgePercent, ArrowRight } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
            <BadgePercent className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg md:text-xl">Summer Tech Sale</h3>
            <p className="text-xs md:text-sm text-white/80">Up to 40% off on selected items</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
            <Clock className="h-4 w-4 mr-2 text-white/80" />
            <div className="font-medium">
              <span className="countdown-item">
                <span className="font-mono font-bold text-lg">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm">d</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold text-lg">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm">h</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold text-lg">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm">m</span>
              </span>
              <span className="mx-1 text-white/50">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold text-lg">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-white/80 text-sm">s</span>
              </span>
            </div>
          </div>
          <Link to="/products?sale=true">
            <Button variant="secondary" size="sm" className="text-primary font-medium group">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
