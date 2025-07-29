// src/pages/TourPackages.jsx
import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import TourCardDetailed from '../components/TourCardDetailed';
import { tourPackages } from '../data/mockData';

const TourPackages = () => {
  const [tours, setTours] = useState(tourPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    filterTours();
  };

  const filterTours = () => {
    let filteredTours = tourPackages;
    
    // Filter by search term
    if (searchTerm) {
      filteredTours = filteredTours.filter(
        tour => 
          tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tour.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filteredTours = filteredTours.filter(tour => tour.category === selectedCategory);
    }
    
    setTours(filteredTours);
  };

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'temple', name: 'Temple Tours' },
    { id: 'dams', name: 'Dams' }
  ];

  // Get unique locations for quick filter
  const uniqueLocations = [...new Set(tourPackages.map(tour => tour.location))];

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Explore Our Tour Packages</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Discover the perfect getaway from our carefully curated collection of tour packages across India.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search destinations, tours, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </section>
        
        {/* Filter and Tour Packages */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <Filter size={18} className="mr-2 text-blue-600" />
                    Filter Tours
                  </h3>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            id={category.id}
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() => {
                              setSelectedCategory(category.id);
                              setTimeout(filterTours, 0);
                            }}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={category.id} className="text-gray-600 hover:text-gray-800 cursor-pointer">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Location Filter */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Popular Destinations</h4>
                    <div className="space-y-2">
                      {uniqueLocations.map(location => (
                        <div 
                          key={location} 
                          className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors"
                          onClick={() => {
                            setSearchTerm(location);
                            setTimeout(filterTours, 0);
                          }}
                        >
                          <MapPin size={14} className="mr-2" />
                          <span className="text-sm">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setTours(tourPackages);
                    }}
                    className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
              
              {/* Tour Listings */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Tour Packages
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      ({tours.length} found)
                    </span>
                  </h2>
                </div>
                
                {tours.length > 0 ? (
                  <div className="space-y-6">
                    {tours.map(tour => (
                      <div key={tour.id} className="transform transition-transform hover:scale-[1.02]">
                        <TourCardDetailed tour={tour} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No tours found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters to find more results.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setTours(tourPackages);
                      }}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      View All Tours
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TourPackages;
