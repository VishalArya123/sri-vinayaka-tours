import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import { Search, Filter, MapPin, Calendar, Users, Star, ChevronDown, X, Sparkles, SlidersHorizontal } from 'lucide-react';
import { tourPackages } from "../data/mockData";

const TourPackages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    duration: '',
    rating: '',
    category: ''
  });

  // Filter options
  const filterOptions = {
    locations: ['Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Kashmir', 'Tamil Nadu', 'Karnataka', 'Uttarakhand'],
    priceRanges: [
      { label: 'Under ₹10,000', value: '0-10000' },
      { label: '₹10,000 - ₹25,000', value: '10000-25000' },
      { label: '₹25,000 - ₹50,000', value: '25000-50000' },
      { label: 'Above ₹50,000', value: '50000-999999' }
    ],
    durations: ['1-3 days', '4-7 days', '8-14 days', '15+ days'],
    ratings: ['4.5+', '4.0+', '3.5+', '3.0+'],
    categories: ['Adventure', 'Heritage', 'Beach', 'Hill Station', 'Spiritual', 'Wildlife']
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTours(tourPackages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tours, searchQuery, filters]);

  const applyFilters = () => {
    let filtered = [...tours];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.highlights?.some(highlight => 
          highlight.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(tour =>
        tour.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(tour =>
        tour.price >= min && tour.price <= max
      );
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(tour => {
        const tourDays = parseInt(tour.duration.split(' ')[0]);
        switch (filters.duration) {
          case '1-3 days':
            return tourDays >= 1 && tourDays <= 3;
          case '4-7 days':
            return tourDays >= 4 && tourDays <= 7;
          case '8-14 days':
            return tourDays >= 8 && tourDays <= 14;
          case '15+ days':
            return tourDays >= 15;
          default:
            return true;
        }
      });
    }

    // Rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter(tour => tour.rating >= minRating);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(tour =>
        tour.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    setFilteredTours(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: '',
      duration: '',
      rating: '',
      category: ''
    });
    setSearchQuery('');
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-800 text-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 animate-float">
            <Sparkles className="w-16 h-16 text-accent-yellow" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce-gentle" style={{animationDelay: '1s'}}>
            <MapPin className="w-12 h-12 text-accent-peach" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float" style={{animationDelay: '2s'}}>
            <Star className="w-14 h-14 text-accent-yellow" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-glass-gradient backdrop-blur-sm border border-white/20 rounded-full text-white/90 font-medium mb-6 animate-fade-in">
              <MapPin className="w-4 h-4 mr-2" />
              Explore Destinations
            </div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
              Discover Amazing
              <span className="text-accent-yellow"> Tour Packages</span>
            </h1>
            
            <p className="font-poppins text-lg sm:text-xl text-white/90 leading-relaxed mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              From serene backwaters to majestic mountains, explore India's incredible diversity with our carefully curated tour packages
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, tours, or experiences..."
                  className="w-full px-6 py-4 pr-16 bg-glass-gradient backdrop-blur-lg border border-white/30 text-white placeholder-white/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent font-poppins text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-yellow hover:bg-accent-yellow/90 text-secondary-800 p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Filters and Results Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-warm p-6 mb-8 animate-fade-in-up">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Filter Button - Mobile */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden inline-flex items-center px-4 py-2 bg-elegant-gradient text-white rounded-xl font-medium transition-all duration-300 hover:shadow-elegant"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Desktop Filters */}
              <div className="hidden md:flex flex-wrap items-center gap-4 flex-1">
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="px-4 py-2 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                >
                  <option value="">All Locations</option>
                  {filterOptions.locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="px-4 py-2 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                >
                  <option value="">Price Range</option>
                  {filterOptions.priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>

                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="px-4 py-2 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                >
                  <option value="">Duration</option>
                  {filterOptions.durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>

                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="px-4 py-2 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                >
                  <option value="">Rating</option>
                  {filterOptions.ratings.map(rating => (
                    <option key={rating} value={rating}>{rating} Stars</option>
                  ))}
                </select>
              </div>

              {/* Results Count and Clear */}
              <div className="flex items-center gap-4">
                <span className="font-poppins text-secondary-600">
                  {loading ? 'Loading...' : `${filteredTours.length} ${filteredTours.length === 1 ? 'package' : 'packages'} found`}
                </span>
                
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-secondary-600 hover:text-primary-600 border border-secondary-200 hover:border-primary-300 rounded-xl transition-all duration-300 font-poppins"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </button>
              </div>
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="md:hidden mt-6 pt-6 border-t border-primary-200 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                  >
                    <option value="">All Locations</option>
                    {filterOptions.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>

                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                  >
                    <option value="">Price Range</option>
                    {filterOptions.priceRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>

                  <select
                    value={filters.duration}
                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                    className="px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                  >
                    <option value="">Duration</option>
                    {filterOptions.durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>

                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="px-4 py-3 border border-primary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 font-poppins bg-white"
                  >
                    <option value="">Rating</option>
                    {filterOptions.ratings.map(rating => (
                      <option key={rating} value={rating}>{rating} Stars</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 rounded-3xl h-80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tours Grid */}
          {!loading && (
            <>
              {filteredTours.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours.map((tour, index) => (
                    <div 
                      key={tour.id} 
                      className="animate-fade-in-up"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 mb-6">
                    <Search className="w-12 h-12 text-primary-600" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-secondary-800 mb-4">
                    No Tours Found
                  </h3>
                  <p className="font-poppins text-secondary-600 mb-8 max-w-md mx-auto">
                    We couldn't find any tours matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-6 py-3 bg-elegant-gradient text-white font-semibold rounded-xl hover:shadow-elegant transition-all duration-300 transform hover:scale-105"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TourPackages;
