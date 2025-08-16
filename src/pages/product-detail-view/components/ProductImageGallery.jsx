import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = "Divine Product" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const defaultImages = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&sat=-50",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&brightness=10",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&contrast=20"
  ];

  const displayImages = images?.length > 0 ? images : defaultImages;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages?.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed || !imageRef?.current) return;
    
    const rect = imageRef?.current?.getBoundingClientRect();
    const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
    const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef?.current) {
      const scrollAmount = 120;
      thumbnailsRef?.current?.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.key === 'ArrowLeft') handlePrevious();
      if (e?.key === 'ArrowRight') handleNext();
      if (e?.key === 'Escape') setIsZoomed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative bg-surface rounded-lg overflow-hidden group">
        <div className="aspect-square relative">
          <Image
            ref={imageRef}
            src={displayImages?.[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%`
            } : {}}
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed(!isZoomed)}
          />
          
          {/* Navigation Arrows */}
          {displayImages?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-glass opacity-0 group-hover:opacity-100 transition-opacity shadow-soft"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-glass opacity-0 group-hover:opacity-100 transition-opacity shadow-soft"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Zoom Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-glass opacity-0 group-hover:opacity-100 transition-opacity shadow-soft"
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={18} />
          </Button>

          {/* Image Counter */}
          {displayImages?.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-glass px-2 py-1 rounded-full text-xs font-mono text-foreground">
              {currentImageIndex + 1} / {displayImages?.length}
            </div>
          )}
        </div>
      </div>
      {/* Thumbnails */}
      {displayImages?.length > 1 && (
        <div className="relative">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollThumbnails('left')}
              className="flex-shrink-0 w-8 h-8"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <div 
              ref={thumbnailsRef}
              className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? 'border-primary shadow-soft'
                      : 'border-border hover:border-muted-foreground/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollThumbnails('right')}
              className="flex-shrink-0 w-8 h-8"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Zoom Instructions */}
      {isZoomed && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Move mouse to explore • Click to zoom out • Press ESC to exit
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;