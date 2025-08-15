import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ArrowRight, Heart, Sparkles, Calendar, Award } from 'lucide-react';
import { storage } from '../utils/storage';

const TourCard = ({ tour, index = 0 }) => {
  const discount = tour.originalPrice 
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0;

  const handleSaveTour = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlistItem = {
      id: tour.id,
      type: "tour",
      name: tour.title,
      location: tour.location,
      price: tour.price,
      image: tour.images[0],
      savedOn: new Date().toLocaleDateString(),
    };
    
    const success = storage.addToWishlist(wishlistItem);
    if (success) {
      alert('Tour added to wishlist!');
    } else {
      alert('Tour is already in your wishlist!');
    }
  };

  return (
    <div 
      className="group bg-white rounded-3xl shadow-warm hover:shadow-float transition-all duration-500 overflow-hidden border border-primary-100 transform hover:-translate-y-2 animate-fade-in-up"
      style={{animationDelay: `${index * 0.1}s`}}
    >
      <Link to={`/tour/${tour.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={tour.images[0] || "/placeholder.svg"}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 animate-pulse-gentle opacity-80">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
          </div>
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-coral text-white px-3 py-1 rounded-full text-sm font-semibold font-poppins animate-bounce-gentle">
              {discount}% OFF
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleSaveTour}
            className="absolute top-4 right-12 w-10 h-10 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 bg-elegant-gradient text-white px-3 py-1 rounded-full text-xs font-medium font-poppins">
            {tour.category || 'Tour'}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
            {tour.title}
          </h3>

          {/* Details Grid */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-secondary-600">
              <MapPin className="w-4 h-4 text-primary-500 mr-2" />
              <span className="font-poppins text-sm">{tour.location}</span>
            </div>
            
            <div className="flex items-center text-secondary-600">
              <Clock className="w-4 h-4 text-primary-500 mr-2" />
              <span className="font-poppins text-sm">{tour.duration}</span>
            </div>
            
            <div className="flex items-center text-secondary-600">
              <Users className="w-4 h-4 text-primary-500 mr-2" />
              <span className="font-poppins text-sm">{tour.groupSize}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-accent-yellow/20 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-accent-yellow fill-current mr-1" />
              <span className="font-poppins text-sm font-semibold text-secondary-800">{tour.rating}</span>
            </div>
            <span className="font-poppins text-xs text-secondary-500 ml-2">({tour.reviewCount} reviews)</span>
          </div>

          {/* Highlights Preview */}
          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-secondary-500 mb-2 font-poppins">Top Highlights:</div>
              <div className="flex flex-wrap gap-1">
                {tour.highlights.slice(0, 2).map((highlight, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full font-poppins line-clamp-1"
                  >
                    {highlight.length > 30 ? `${highlight.substring(0, 30)}...` : highlight}
                  </span>
                ))}
                {tour.highlights.length > 2 && (
                  <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-full font-poppins">
                    +{tour.highlights.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-primary-200">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-playfair text-2xl font-bold text-primary-600">
                  ₹{tour.price.toLocaleString()}
                </span>
                {tour.originalPrice && (
                  <span className="font-poppins text-sm text-secondary-400 line-through">
                    ₹{tour.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="font-poppins text-xs text-secondary-500">starting from</span>
            </div>
            
            <div className="group/btn inline-flex items-center px-4 py-2 bg-elegant-gradient text-white font-semibold rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
              <span className="font-poppins mr-2">Explore</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-elegant-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Link>
    </div>
  );
};

export default TourCard;
