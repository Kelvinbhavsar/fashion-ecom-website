import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ productId = "divine-bag-001" }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const reviews = [
    {
      id: 1,
      customerName: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2025-01-10",
      verified: true,
      title: "Beautiful and Divine Quality",
      content: `This bag exceeded my expectations! The Krishna motifs are beautifully crafted and the quality is outstanding. I use it daily for my temple visits and it holds all my prayer items perfectly.\n\nThe material feels premium and the stitching is very strong. Highly recommended for all Krishna devotees!`,
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&sat=-30"
      ]
    },
    {
      id: 2,
      customerName: "Rajesh Kumar",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4,
      date: "2025-01-08",
      verified: true,
      title: "Good Quality, Fast Delivery",
      content: `Nice bag with good build quality. The size is perfect for daily use. Only minor issue is that the color was slightly different from what I expected, but overall satisfied with the purchase.`,
      helpful: 18,
      images: []
    },
    {
      id: 3,
      customerName: "Meera Devi",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      date: "2025-01-05",
      verified: false,
      title: "Perfect for Temple Visits",
      content: `Absolutely love this bag! The spiritual energy it carries is amazing. I've received so many compliments from fellow devotees. The compartments are well-designed for organizing prayer items.`,
      helpful: 31,
      images: []
    },
    {
      id: 4,
      customerName: "Amit Patel",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 3,
      date: "2025-01-02",
      verified: true,
      title: "Average Quality",
      content: `The bag is okay but not exceptional. Expected better quality for the price. The design is nice but the material could be improved.`,
      helpful: 7,
      images: []
    }
  ];

  const ratingDistribution = {
    5: 89,
    4: 45,
    3: 12,
    2: 6,
    1: 4
  };

  const totalReviews = Object.values(ratingDistribution)?.reduce((sum, count) => sum + count, 0);
  const averageRating = (Object.entries(ratingDistribution)?.reduce((sum, [rating, count]) => 
    sum + (parseInt(rating) * count), 0
  ) / totalReviews)?.toFixed(1);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 16) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={size}
        className={i < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const getFilteredReviews = () => {
    let filtered = [...reviews];
    
    if (filterRating !== 'all') {
      filtered = filtered?.filter(review => review?.rating === parseInt(filterRating));
    }
    
    switch (sortBy) {
      case 'newest':
        return filtered?.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return filtered?.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'highest':
        return filtered?.sort((a, b) => b?.rating - a?.rating);
      case 'lowest':
        return filtered?.sort((a, b) => a?.rating - b?.rating);
      case 'helpful':
        return filtered?.sort((a, b) => b?.helpful - a?.helpful);
      default:
        return filtered;
    }
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-surface rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{averageRating}</span>
              <div className="flex">
                {renderStars(Math.round(parseFloat(averageRating)), 20)}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-foreground w-3">{rating}</span>
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ 
                      width: `${(ratingDistribution?.[rating] / totalReviews) * 100}%` 
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowReviewForm(!showReviewForm)}
          iconName="Plus"
          iconPosition="left"
        >
          Write Review
        </Button>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {getFilteredReviews()?.map((review) => (
          <div key={review?.id} className="bg-surface rounded-lg p-6 border border-border">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={review?.avatar}
                  alt={review?.customerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{review?.customerName}</h4>
                    {review?.verified && (
                      <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-0.5 rounded-full">
                        <Icon name="CheckCircle" size={12} />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(review?.date)}</p>
                </div>
              </div>
              
              <div className="flex">
                {renderStars(review?.rating)}
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h5 className="font-medium text-foreground mb-2">{review?.title}</h5>
              <div className="text-muted-foreground text-sm space-y-2">
                {review?.content?.split('\n')?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Review Images */}
            {review?.images?.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review?.images?.map((image, index) => (
                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName="ThumbsUp"
                iconPosition="left"
                className="text-muted-foreground hover:text-foreground"
              >
                Helpful ({review?.helpful})
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Flag"
                className="text-muted-foreground hover:text-foreground"
              >
                Report
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-glass" onClick={() => setShowReviewForm(false)} />
          <div className="relative bg-popover border border-border rounded-lg p-6 w-full max-w-md shadow-modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-popover-foreground">Write a Review</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReviewForm(false)}
              >
                <Icon name="X" size={18} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-popover-foreground mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5]?.map((rating) => (
                    <button key={rating} className="p-1">
                      <Icon name="Star" size={24} className="text-muted-foreground hover:text-warning transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-popover-foreground mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-popover-foreground mb-2">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts about this product"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="flex-1"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;