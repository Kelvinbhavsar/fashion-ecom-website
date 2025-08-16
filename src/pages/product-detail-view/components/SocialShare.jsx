import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ 
  productName = "Divine Krishna Bag Collection",
  productUrl = window.location?.href,
  productImage = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const shareText = `Check out this beautiful ${productName} from Krishna Bagha Store! Perfect for devotees. 🙏`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(productUrl);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      mobile: true
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      mobile: false
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'text-sky-500',
      bgColor: 'bg-sky-50 dark:bg-sky-900/20',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      mobile: false
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      mobile: true
    },
    {
      name: 'Email',
      icon: 'Mail',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      url: `mailto:?subject=${encodeURIComponent(productName)}&body=${encodedText}%20${encodedUrl}`,
      mobile: false
    }
  ];

  const handleShare = async (option) => {
    if (navigator.share && option?.mobile) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: productUrl
        });
        setShowShareMenu(false);
        return;
      } catch (error) {
        // Fallback to URL opening
      }
    }

    window.open(option?.url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(productUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body?.appendChild(textArea);
      textArea?.select();
      document.execCommand('copy');
      document.body?.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: shareText,
          url: productUrl
        });
      } catch (error) {
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <Button
        variant="outline"
        size="default"
        onClick={handleNativeShare}
        iconName="Share2"
        iconPosition="left"
        className="w-full sm:w-auto"
      >
        Share Product
      </Button>
      {/* Share Menu */}
      {showShareMenu && (
        <div className="fixed inset-0 z-1100 flex items-center justify-center p-4 sm:absolute sm:inset-auto sm:top-full sm:left-0 sm:mt-2">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-glass sm:hidden"
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu Content */}
          <div className="relative bg-popover border border-border rounded-lg shadow-modal p-4 w-full max-w-sm sm:max-w-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-popover-foreground">Share Product</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareMenu(false)}
                className="w-6 h-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>

            {/* Share Options Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {shareOptions?.map((option) => (
                <button
                  key={option?.name}
                  onClick={() => handleShare(option)}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-smooth hover:scale-105 ${option?.bgColor}`}
                >
                  <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center ${option?.color}`}>
                    <Icon name={option?.icon} size={16} />
                  </div>
                  <span className="text-xs font-medium text-popover-foreground">
                    {option?.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={productUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-xs text-muted-foreground"
                />
                <Button
                  variant={copySuccess ? "success" : "outline"}
                  size="sm"
                  onClick={handleCopyLink}
                  iconName={copySuccess ? "Check" : "Copy"}
                  className="flex-shrink-0"
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Share Buttons - Desktop Only */}
      <div className="hidden lg:flex items-center space-x-2 mt-3">
        <span className="text-xs text-muted-foreground">Quick share:</span>
        {shareOptions?.slice(0, 3)?.map((option) => (
          <button
            key={option?.name}
            onClick={() => handleShare(option)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth hover:scale-110 ${option?.bgColor} ${option?.color}`}
            title={`Share on ${option?.name}`}
          >
            <Icon name={option?.icon} size={14} />
          </button>
        ))}
      </div>
      {/* Copy Success Toast */}
      {copySuccess && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-1200 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-modal flex items-center space-x-2">
          <Icon name="Check" size={16} />
          <span className="text-sm font-medium">Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default SocialShare;