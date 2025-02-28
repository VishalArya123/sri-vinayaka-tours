import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import TourCardDetailed from '../components/TourCardDetailed';

const TourPackages = () => {
  // Mock tour packages data
  const initialTours = [
    {
      id: 1,
      title: 'Hyderabad City Tour',
      image: 'https://srivinayakatours.com/thumbnail/hyderabad_tour.webp',
      description: 'A Hyderabad city tour offers a blend of historical monuments like Charminar and Golconda Fort, cultural experiences, and modern attractions.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 350,
      rating: 4.8,
      startDate: 'All year',
      category: 'nature'
    },
    {
      id: 2,
      title: 'Ramoji Film City',
      image: 'https://srivinayakatours.com/thumbnail/ramoji_film_city.webp',
      description: 'Ramoji Film City is the world\'s largest film studio complex and a popular tourist destination in Hyderabad, India. It offers a blend of film sets, theme parks, and entertainment options.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 350,
      rating: 4.7,
      startDate: 'All year',
      category: 'cultural'
    },
    {
      id: 3,
      title: 'Wonderla',
      image: 'https://srivinayakatours.com/thumbnail/wonderla.jpg',
      description: 'Wonderla Amusement Park in Hyderabad offers a mix of water rides, roller coasters, and attractions for kids.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 875,
      rating: 4.9,
      startDate: 'All year',
      category: 'adventure'
    },
    {
      id: 4,
      title: 'Ramanuja Chari Statue Tour',
      image: 'https://srivinayakatours.com/thumbnail/statue_of_equality_tour.webp',
      description: 'The Ramanuja Chari Statue Tour features the Statue of Equality, a vast golden monument dedicated to the medieval guru Sri Ramanuja, with a meditation hall at its base.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 1125,
      rating: 4.6,
      startDate: 'All year',
      category: 'beach'
    },
    {
      id: 5,
      title: 'Anathagiri Hills',
      image: 'https://srivinayakatours.com/thumbnail/ananthagiri_hills_tour.webp',
      description: 'Anantha Giri Hills is a scenic, forested peak in Telangana with nature trails, a historic temple, old caves, and lodging and dining options.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 1125,
      rating: 4.8,
      startDate: 'All year',
      category: 'cultural'
    },
    {
      id: 6,
      title: 'Yadagirigutta Temple',
      image: 'https://srivinayakatours.com/thumbnail/yadadri_tour.webp',
      description: 'Yadagirigutta Sri Lakshmi Narasimha Swamy Devasthanam is a Dravidian-style Hindu temple atop a hill, featuring an ornate, towering gopuram entry gate.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 1125,
      rating: 4.9,
      startDate: 'All year',
      category: 'beach'
    }
    ,
    {
      id: 7,
      title: 'Srisailam',
      image: 'https://srivinayakatours.com/thumbnail/srisailam_tour_cover.webp',
      description: 'Srisailam is a pilgrimage town in Andhra Pradesh, India, known for its ancient Sri Mallikarjuna Jyotirlinga temple and scenic surroundings.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 2250,
      rating: 4.8,
      startDate: 'All year',
      category: 'cultural'
    },
    {
      id: 8,
      title: 'Nagarjuna Sagar',
      image: 'https://srivinayakatours.com/thumbnail/sagar_tour.webp',
      description: 'Nagarjuna Sagar is known for its massive irrigation and power-generating dam, which is especially popular to visit during the monsoon season.',
      duration: '1 Day & 0 Night',
      location: 'Telangana',
      price: 1125,
      rating: 4.9,
      startDate: 'All year',
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