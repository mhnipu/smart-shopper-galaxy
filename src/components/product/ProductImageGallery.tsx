
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border bg-white dark:bg-gray-800 group">
        <AspectRatio ratio={1}>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">Zoom</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
              <img
                src={images[selectedImage]}
                alt={`${productName} - enlarged view`}
                className="w-full h-full object-contain"
              />
            </DialogContent>
          </Dialog>
          
          <img
            src={images[selectedImage]}
            alt={productName}
            className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-105"
          />
          
          {images.length > 1 && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous image</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next image</span>
              </Button>
            </>
          )}
        </AspectRatio>
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 aspect-square w-20 overflow-hidden rounded-md border ${
                selectedImage === index 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'hover:ring-1 hover:ring-primary hover:border-primary'
              } transition-all duration-200 bg-white dark:bg-gray-800`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
      
      <div className="text-center text-xs text-muted-foreground">
        Click image to zoom • {selectedImage + 1} of {images.length}
      </div>
    </div>
  );
}
