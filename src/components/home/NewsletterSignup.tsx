
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MailCheck, Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Thanks for subscribing to our newsletter!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary/5 dark:bg-gray-800/30">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm border border-border/40">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive updates on new products, special offers, and tech news.
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/20 focus-visible:ring-primary/30"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"></span>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          
          <div className="hidden md:block md:w-1/2">
            <div className="space-y-4">
              <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg">
                <MailCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Exclusive Deals</h4>
                  <p className="text-sm text-muted-foreground">
                    Be the first to know about our flash sales and special offers
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg">
                <MailCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">New Arrivals</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified when the latest tech hits our store
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg">
                <MailCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Tech Tips & Guides</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive helpful content to make the most of your devices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
