
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSpecifications } from '@/components/product/ProductSpecifications';
import { ProductReviews } from '@/components/product/ProductReviews';
import { Product } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ProductTabsProps {
  product: Product;
  reviews: Array<{
    id: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

export function ProductTabs({ product, reviews }: ProductTabsProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 md:p-6">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="pt-2">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-bold mb-4">Product Description</h3>
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">Experience exceptional quality and performance with the {product.name}. Designed with the modern consumer in mind, this product combines cutting-edge technology with elegant design to deliver an unparalleled user experience.</p>
            
            <h4 className="text-lg font-semibold mt-6 mb-3">Why Choose This Product?</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Premium build quality ensures durability and longevity</li>
              <li>Innovative features that simplify your daily routine</li>
              <li>Energy-efficient design saves money and reduces environmental impact</li>
              <li>Award-winning customer support for peace of mind</li>
              <li>Compatible with a wide range of accessories and systems</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications">
          <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
          <ProductSpecifications details={product.details} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ProductReviews 
            productId={product.id} 
            productName={product.name}
            initialReviews={reviews}
          />
        </TabsContent>
        
        <TabsContent value="faq">
          <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long is the warranty period?</AccordionTrigger>
              <AccordionContent>
                All our products come with a standard 1-year manufacturer warranty that covers defects in materials and workmanship. Extended warranty options are available at checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy for all unused products in their original packaging. Please contact our customer support team to initiate a return.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. Shipping costs and delivery times vary based on location. You can view the specific details at checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order ships, you'll receive a tracking number via email. You can also view your order status in your account dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Are spare parts available for this product?</AccordionTrigger>
              <AccordionContent>
                Yes, spare parts and accessories are available through our online store or authorized retailers. Please refer to the product manual for compatible part numbers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
