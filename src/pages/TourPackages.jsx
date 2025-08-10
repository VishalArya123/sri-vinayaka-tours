import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import TourCardDetailed from "../components/TourCardDetailed";
import { tourPackages } from "../data/mockData";

const TourPackages = () => {
  const [tours, setTours] = useState(tourPackages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isLoading, setIsLoading] = useState(false);

  // Categories for filter
  const categories = [
    { id: "all", name: "All Packages", count: tourPackages.length },
    {
      id: "adventure",
      name: "Adventure",
      count: tourPackages.filter((t) => t.category === "adventure").length,
    },
    {
      id: "cultural",
      name: "Cultural",
      count: tourPackages.filter((t) => t.category === "cultural").length,
    },
    {
      id: "entertainment",
      name: "Entertainment",
      count: tourPackages.filter((t) => t.category === "entertainment").length,
    },
    {
      id: "temple",
      name: "Temple Tours",
      count: tourPackages.filter((t) => t.category === "temple").length,
    },
    {
      id: "dams",
      name: "Dams",
      count: tourPackages.filter((t) => t.category === "dams").length,
    },
  ];

  // Get unique locations
  const uniqueLocations = [
    ...new Set(tourPackages.map((tour) => tour.location)),
  ];

  // Filter and sort tours
  const filterTours = () => {
    setIsLoading(true);

    setTimeout(() => {
      let filteredTours = tourPackages;

      // Filter by search term
      if (searchTerm) {
        filteredTours = filteredTours.filter(
          (tour) =>
            tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (selectedCategory !== "all") {
        filteredTours = filteredTours.filter(
          (tour) => tour.category === selectedCategory
        );
      }

      // Filter by price range
      filteredTours = filteredTours.filter(
        (tour) => tour.price >= priceRange[0] && tour.price <= priceRange[1]
      );

      // Sort tours
      switch (sortBy) {
        case "price-low":
          filteredTours.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filteredTours.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredTours.sort((a, b) => b.rating - a.rating);
          break;
        case "duration":
          filteredTours.sort((a, b) => a.duration.localeCompare(b.duration));
          break;
        default:
          // Keep original order for 'featured'
          break;
      }

      setTours(filteredTours);
      setIsLoading(false);
    }, 300);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    filterTours();
    setSearchTerm("");
    
  };

  // Effect to filter tours when filters change
  useEffect(() => {
    filterTours();
  }, [selectedCategory, sortBy, priceRange]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("featured");
    setPriceRange([0, 5000]);
    setTours(tourPackages);
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 "></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Explore Our
              <span className="block text-yellow-300">Tour Packages</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 opacity-90 leading-relaxed">
              Discover the perfect getaway from our carefully curated collection
              of tour packages across India.
            </p>

            {/* Enhanced Search Bar */}
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations, tours, experiences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 sm:p-5 pr-14 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl text-base sm:text-lg placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-xl transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Filter and Tour Packages Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Tour Packages
                <span className="text-base font-normal text-gray-600 ml-2">
                  ({tours.length} found)
                </span>
              </h2>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 bg-white border-2 border-gray-200 hover:border-blue-500 px-4 py-2 rounded-xl transition-colors duration-300 shadow-sm"
              >
                <span className="font-medium text-gray-700">Filters</span>
                {isFilterOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Enhanced Filter Sidebar */}
            <div
              className={`lg:w-80 flex-shrink-0 ${
                isFilterOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    Filter Tours
                  </h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Categories
                  </h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-blue-600 transition-colors flex-1">
                          {category.name}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <button
                        onClick={() => setPriceRange([0, 1000])}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        Under ₹1K
                      </button>
                      <button
                        onClick={() => setPriceRange([1000, 2500])}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        ₹1K - ₹2.5K
                      </button>
                      <button
                        onClick={() => setPriceRange([2500, 5000])}
                        className="p-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        Above ₹2.5K
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Location Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Popular Destinations
                  </h4>
                  <div className="space-y-2">
                    {uniqueLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSearchTerm(location);
                          setTimeout(filterTours, 0);
                        }}
                        className="flex items-center w-full text-left p-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                      >
                        <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                        <span className="text-sm">{location}</span>
                        <span className="ml-auto text-xs text-gray-400">
                          {
                            tourPackages.filter((t) => t.location === location)
                              .length
                          }
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Tour Listings */}
            <div className="flex-1">
              {/* Desktop Header */}
              <div className="hidden lg:flex justify-between items-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Available Tour Packages
                  <span className="text-lg font-normal text-gray-600 ml-3">
                    ({tours.length} found)
                  </span>
                </h2>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                    >
                      <div className="h-48 sm:h-56 md:h-64 bg-gray-300"></div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-300 rounded mb-3"></div>
                        <div className="h-4 bg-gray-300 rounded mb-4"></div>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="h-4 bg-gray-300 rounded"></div>
                          <div className="h-4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-12 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : tours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <div
                      key={tour.id}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                    >
                      <TourCardDetailed tour={tour} />
                    </div>
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    No tours found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any tours matching your criteria. Try
                    adjusting your search or filters to discover more amazing
                    destinations.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg"
                  >
                    View All Tours
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Filter Tours
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Mobile filter content - same as desktop but optimized for mobile */}
              <div className="space-y-6">
                {/* Sort By */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Categories
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <button
                        onClick={() => setPriceRange([0, 1000])}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
                      >
                        Under ₹1K
                      </button>
                      <button
                        onClick={() => setPriceRange([1000, 2500])}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
                      >
                        ₹1K - ₹2.5K
                      </button>
                      <button
                        onClick={() => setPriceRange([2500, 5000])}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
                      >
                        Above ₹2.5K
                      </button>
                    </div>
                  </div>
                </div>

                {/* Popular Destinations */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Popular Destinations
                  </h4>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                    {uniqueLocations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSearchTerm(location);
                          setTimeout(filterTours, 0);
                          setIsFilterOpen(false);
                        }}
                        className="flex items-center justify-between w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                      >
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {location}
                          </span>
                        </div>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {
                            tourPackages.filter((t) => t.location === location)
                              .length
                          }
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourPackages;
