
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Camera, ImageIcon, Loader2, Search, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImageSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose?: () => void;
}

export function ImageSearch({ open, onOpenChange, onClose }: ImageSearchProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSearch = () => {
    if (!imageUrl) return;
    
    setIsSearching(true);
    
    // Simulate image search with a delay
    setTimeout(() => {
      setIsSearching(false);
      if (onClose) onClose();
      else onOpenChange(false);
      
      // Redirect to products with a search query
      navigate('/products?imageSearch=true');
    }, 2000);
  };
  
  const handleCaptureImage = () => {
    // This would use the device camera in a real implementation
    // For demo purposes, we'll just use a placeholder image
    setImageUrl('/placeholder.svg');
  };
  
  const clearImage = () => {
    setImageUrl(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search by Image</DialogTitle>
          <DialogDescription>
            Upload an image to find similar products in our catalog.
          </DialogDescription>
        </DialogHeader>
        
        {imageUrl ? (
          <div className="relative aspect-square max-h-72 overflow-hidden rounded-md border">
            <img 
              src={imageUrl} 
              alt="Uploaded" 
              className="h-full w-full object-cover" 
            />
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2" 
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center ${
              dragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Drag & drop an image here</p>
                <p className="text-xs text-muted-foreground">
                  or click to browse your files
                </p>
              </div>
              <Input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                id="image-upload" 
                onChange={handleImageUpload}
              />
              <div className="flex gap-2 mt-2">
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Browse
                    </span>
                  </Button>
                </label>
                <Button variant="outline" size="sm" onClick={handleCaptureImage}>
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="sm:justify-end">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={!imageUrl || isSearching}
            onClick={handleSearch}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Products
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
