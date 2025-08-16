import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerHeader from '../../components/ui/CustomerHeader';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const KrishnaHome = () => {
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]')?.forEach((el) => {
      observer?.observe(el);
    });

    return () => observer?.disconnect();
  }, []);

  const handleNavigateToBags = () => {
    navigate('/customer-product-catalog?category=bags');
  };

  const handleShopNow = () => {
    navigate('/customer-product-catalog');
  };

  const featuredCategories = [
    {
      id: 'bags',
      title: 'Divine Bags',
      subtitle: 'Fashionable bags blessed with Krishna\'s grace',
      description: 'Discover our exquisite collection of tote bags, purses, and clutches adorned with sacred motifs and divine designs.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop',
      items: ['Tote Bags', 'Purses', 'Clutches', 'Jhola Bags'],
      count: 45,
      action: handleNavigateToBags
    },
    {
      id: 'clothes',
      title: 'Sacred Attire',
      subtitle: 'Traditional clothing for devotees',
      description: 'Embrace spirituality with our beautiful collection of kurtas, sarees, and traditional wear.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=400&fit=crop',
      items: ['Kurtas', 'Sarees', 'Dhotis', 'Lehengas'],
      count: 78,
      action: () => navigate('/customer-product-catalog?category=clothes')
    },
    {
      id: 'jewelry',
      title: 'Spiritual Jewelry',
      subtitle: 'Adorned with Krishna\'s blessings',
      description: 'Handcrafted jewelry pieces inspired by Krishna\'s divine beauty and spiritual significance.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
      items: ['Necklaces', 'Earrings', 'Bracelets', 'Rings'],
      count: 24,
      action: () => navigate('/customer-product-catalog?category=jewelry')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <CustomerHeader />
      {/* Hero Section */}
      <section id="section-hero" className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Krishna Symbol */}
            <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full shadow-2xl transition-all duration-1000 ${isVisible?.['section-hero'] ? 'scale-100 rotate-0' : 'scale-50 rotate-45'}`}>
              <Icon name="Crown" size={40} color="white" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 to-blue-700 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${isVisible?.['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Krishna Bagha
              </h1>
              <p className={`text-xl md:text-2xl text-muted-foreground font-medium transition-all duration-1000 delay-500 ${isVisible?.['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Divine Collection of Sacred Accessories
              </p>
            </div>

            {/* Description */}
            <div className={`max-w-3xl mx-auto space-y-4 transition-all duration-1000 delay-700 ${isVisible?.['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Embrace the divine essence of Lord Krishna through our carefully curated collection of 
                spiritual accessories, traditional attire, and sacred items. Each piece is crafted with 
                devotion and designed to bring Krishna's blessings into your daily life.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>Blessed by Tradition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>Handcrafted Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>Spiritual Significance</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-1000 ${isVisible?.['section-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button
                size="lg"
                onClick={handleShopNow}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Explore Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleNavigateToBags}
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Icon name="Heart" size={20} className="mr-2" />
                View Divine Bags
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-300/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000" />
      </section>
      {/* Featured Categories */}
      <section id="section-categories" className="py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible?.['section-categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sacred Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our divine categories, each blessed with Krishna's grace and crafted for devotees
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories?.map((category, index) => (
              <div
                key={category?.id}
                className={`group cursor-pointer transition-all duration-1000 delay-${index * 200} ${isVisible?.['section-categories'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                onClick={category?.action}
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft hover:shadow-modal transition-all duration-500 overflow-hidden group-hover:scale-105">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category?.image}
                      alt={category?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-semibold text-foreground">{category?.count}+ items</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category?.title}
                      </h3>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-3">
                        {category?.subtitle}
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {category?.description}
                      </p>
                    </div>

                    {/* Items List */}
                    <div className="flex flex-wrap gap-2">
                      {category?.items?.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      >
                        <span>Explore Collection</span>
                        <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* About Krishna Section */}
      <section id="section-about" className="py-20 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 ${isVisible?.['section-about'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Embracing Krishna's Divine Grace
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our collection celebrates the timeless beauty and spiritual significance of Lord Krishna. 
                  Each accessory carries the essence of devotion, tradition, and divine blessings.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: 'Heart',
                    title: 'Made with Devotion',
                    description: 'Every piece is crafted with love and spiritual dedication'
                  },
                  {
                    icon: 'Star',
                    title: 'Blessed Designs',
                    description: 'Traditional motifs and sacred symbols in every creation'
                  },
                  {
                    icon: 'Shield',
                    title: 'Quality Assured',
                    description: 'Premium materials ensuring lasting beauty and comfort'
                  }
                ]?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={feature?.icon} size={18} color="white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature?.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature?.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={handleShopNow}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                <Icon name="ArrowRight" size={18} className="mr-2" />
                Start Your Journey
              </Button>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible?.['section-about'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                  alt="Krishna Devotion"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                
                {/* Floating Stats */}
                <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">1000+</div>
                    <div className="text-xs text-muted-foreground">Happy Devotees</div>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">200+</div>
                    <div className="text-xs text-muted-foreground">Sacred Items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Section */}
      <section id="section-newsletter" className="py-16 bg-gradient-to-r from-orange-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible?.['section-newsletter'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stay Connected with Divine Blessings
            </h2>
            <p className="text-xl text-white/90">
              Receive updates about new collections, spiritual guidance, and exclusive offers
            </p>
            
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-slate-900 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Crown" size={20} color="white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-700 bg-clip-text text-transparent">
                Krishna Bagha
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Bringing Krishna's divine grace into your life through sacred accessories and spiritual items.
            </p>
            <div className="flex justify-center space-x-6 text-muted-foreground">
              <button className="hover:text-orange-600 transition-colors">
                <Icon name="Facebook" size={20} />
              </button>
              <button className="hover:text-orange-600 transition-colors">
                <Icon name="Instagram" size={20} />
              </button>
              <button className="hover:text-orange-600 transition-colors">
                <Icon name="Twitter" size={20} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Krishna Bagha. All rights reserved. Made with devotion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KrishnaHome;