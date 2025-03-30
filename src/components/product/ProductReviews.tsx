
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
  initialReviews?: Review[];
}

export function ProductReviews({ productId, productName, initialReviews = [] }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [open, setOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new review
    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toLocaleDateString()
    };
    
    // Add to reviews
    setReviews(prev => [review, ...prev]);
    
    // Reset form
    setNewReview({
      name: '',
      email: '',
      rating: 5,
      comment: ''
    });
    
    // Close dialog
    setOpen(false);
    
    // Show success toast
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="border-t py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Customer Reviews</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Review {productName}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newReview.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={newReview.email} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleRatingChange(star)}
                      >
                        <Star 
                          className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea 
                    id="comment" 
                    name="comment" 
                    rows={4} 
                    value={newReview.comment} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Submit Review</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {reviews.length === 0 ? (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
