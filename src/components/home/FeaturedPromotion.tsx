
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, BadgePercent } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-primary/90 to-primary/70 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <BadgePercent className="h-6 w-6 mr-2" />
          <h3 className="font-bold text-lg">Summer Tech Sale</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <div className="text-sm">
              <span className="countdown-item">
                <span className="font-mono font-bold">{String(timeLeft.days).padStart(2, '0')}</span>d
              </span>
              <span className="mx-1">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>h
              </span>
              <span className="mx-1">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>m
              </span>
              <span className="mx-1">:</span>
              <span className="countdown-item">
                <span className="font-mono font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>s
              </span>
            </div>
          </div>
          <Link to="/products?sale=true">
            <Button variant="secondary" size="sm" className="text-primary font-medium">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
