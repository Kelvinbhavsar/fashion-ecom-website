import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        {/* Category and Rating */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
          <div className="h-3 bg-muted rounded w-8 animate-pulse" />
        </div>
        
        {/* Product Name */}
        <div className="space-y-1">
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-muted rounded w-20 animate-pulse" />
          <div className="h-4 bg-muted rounded w-16 animate-pulse" />
        </div>
        
        {/* Description */}
        <div className="space-y-1">
          <div className="h-3 bg-muted rounded w-full animate-pulse" />
          <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
        </div>
        
        {/* Stock Status */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-muted rounded-full animate-pulse" />
            <div className="h-3 bg-muted rounded w-12 animate-pulse" />
          </div>
          <div className="h-3 bg-muted rounded w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;