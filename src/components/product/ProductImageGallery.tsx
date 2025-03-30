
import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg border bg-white">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="h-full w-full object-contain p-4"
        />
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`aspect-square w-20 overflow-hidden rounded-md border bg-white ${
              selectedImage === index 
                ? 'ring-2 ring-primary' 
                : 'hover:ring-1 hover:ring-primary'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image}
              alt={`${productName} - View ${index + 1}`}
              className="h-full w-full object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
