
import React from 'react';
import { Star } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: "The smartphone I purchased from TechMart exceeded all my expectations. The shipping was incredibly fast, and the customer service was top-notch!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: "As a developer, I'm very particular about my tech gear. TechMart has been my go-to store for quality products at reasonable prices.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: "I've been buying my camera equipment exclusively from TechMart for the past two years. Their selection is unmatched and prices competitive.",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Gaming Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    content: "The gaming laptop I bought here was a fantastic deal. The site made it easy to compare specs and find exactly what I needed.",
    rating: 5
  }
];

export function CustomerTestimonials() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied customers!
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="py-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="border border-border/40 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground flex-grow">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative static mr-2 left-0 translate-y-0" />
            <CarouselNext className="relative static ml-2 right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
