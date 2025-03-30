
import React from 'react';

interface ProductSpecificationsProps {
  details: {
    [key: string]: string | string[];
  };
}

export function ProductSpecifications({ details }: ProductSpecificationsProps) {
  return (
    <div className="border-t py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <h3 className="text-lg font-medium mb-6">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-medium">
                {Array.isArray(value) ? value.join(', ') : value.toString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
