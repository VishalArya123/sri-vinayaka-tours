import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import TourCardDetailed from '../components/TourCardDetailed';

const TourPackages = () => {
  // Mock tour packages data
  const initialTours = [
    {
      id: 1,
      title: 'Kerala Backwaters Explorer',
      image: 'https://images.unsplash.com/photo-1602424770373-55fff487add4',
      description: 'Experience the serene backwaters, lush landscapes, and vibrant culture of God\'s Own Country.',
      duration: '5 Days / 4 Nights',
      location: 'Kerala',
      price: 15000,
      rating: 4.8,
      startDate: 'Multiple dates',
      category: 'nature'
    },
    {
      id: 2,
      title: 'Golden Triangle Tour',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
      description: 'Discover the rich history and architectural marvels of Delhi, Agra, and Jaipur.',
      duration: '6 Days / 5 Nights',
      location: 'Delhi-Agra-Jaipur',
      price: 18500,
      rating: 4.7,
      startDate: 'Every Saturday',
      category: 'cultural'
    },
    {
      id: 3,
      title: 'Ladakh Adventure',
      image: 'https://images.unsplash.com/photo-1589813967859-2c386651b38d',
      description: 'Journey through the breathtaking landscapes of Ladakh with its monasteries and mountain passes.',
      duration: '7 Days / 6 Nights',
      location: 'Ladakh',
      price: 22000,
      rating: 4.9,
      startDate: 'Jun - Sep',
      category: 'adventure'
    },
    {
      id: 4,
      title: 'Goa Beach Getaway',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
      description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa.',
      duration: '4 Days / 3 Nights',
      location: 'Goa',
      price: 12000,
      rating: 4.6,
      startDate: 'All year',
      category: 'beach'
    },
    {
      id: 5,
      title: 'Rajasthan Royal Heritage',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
      description: 'Explore the majestic forts, palaces, and vibrant culture of the royal state of Rajasthan.',
      duration: '8 Days / 7 Nights',
      location: 'Rajasthan',
      price: 25000,
      rating: 4.8,
      startDate: 'Oct - Mar',
      category: 'cultural'
    },
    {
      id: 6,
      title: 'Andaman Island Paradise',
      image: 'https://images.unsplash.com/photo-1589179447785-0a079762304b',
      description: 'Discover the pristine beaches, coral reefs, and lush forests of the Andaman Islands.',
      duration: '6 Days / 5 Nights',
      location: 'Andaman & Nicobar',
      price: 28000,
      rating: 4.9,
      startDate: 'Nov - May',
      category: 'beach'
    }
  ];

  const [tours, setTours] = useState(initialTours);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    filterTours();
  };

  const filterTours = () => {
    let filteredTours = initialTours;
    
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
    { id: 'beach', name: 'Beach' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'nature', name: 'Nature & Wildlife' }
  ];

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Explore Our Tour Packages</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">Discover the perfect getaway from our carefully curated collection of tour packages across India.</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search destinations, tours, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </section>
        
        {/* Filter and Tour Packages */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row mb-8">
              {/* Filter */}
              <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Filter size={18} className="mr-2" />
                    Filter Tours
                  </h3>
                  
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
                            className="mr-2"
                          />
                          <label htmlFor={category.id} className="text-gray-600">
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Popular Destinations</h4>
                    <div className="space-y-2">
                      {['Kerala', 'Rajasthan', 'Goa', 'Ladakh', 'Andaman'].map(destination => (
                        <div key={destination} className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"
                          onClick={() => {
                            setSearchTerm(destination);
                            setTimeout(filterTours, 0);
                          }}
                        >
                          <MapPin size={14} className="mr-2" />
                          <span>{destination}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tour Listings */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Tour Packages</h2>
                
                {tours.length > 0 ? (
                  <div className="space-y-6">
                    {tours.map(tour => (
                      <TourCardDetailed key={tour.id} tour={tour} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No tours found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters to find more results.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setTours(initialTours);
                      }}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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