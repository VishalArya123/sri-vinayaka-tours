import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, CheckCircle, XCircle, ChevronLeft, ChevronRight, Phone, Bookmark, BookmarkCheck } from 'lucide-react'

// Mock data (replace with API calls)
const tourData = {
  id: 1,
  title: "Mysore & Coorg Adventure",
  location: "Karnataka",
  duration: "3 Days & 2 Nights",
  description: "Experience the royal heritage of Mysore and the serene beauty of Coorg in this unforgettable 3-day tour package. Explore the magnificent Mysore Palace, the breathtaking Coorg hills, and more.",
  rating: 4.8,
  reviews: 124,
  adultPrice: {
    discounted: 5999,
    actual: 7999
  },
  childPrice: {
    discounted: 3999,
    actual: 5499
  },
  inclusions: [
    "Bus transportation for pickup, drop-off, and sightseeing",
    "Professional tour guide",
    "Accommodation in 3-star hotels (2 nights)",
    "Breakfast (Day 2 & 3)",
    "All taxes and service charges"
  ],
  exclusions: [
    "Entry tickets to attractions",
    "Lunch and dinner",
    "Personal expenses",
    "Any activities not mentioned in the itinerary"
  ],
  itinerary: [
    {
      day: "Day 1",
      title: "Mysore Palace & Zoo",
      places: [
        { name: "Mysore Palace", type: "visit", entryFee: { adult: 200, child: 100 } },
        { name: "Mysore Zoo", type: "visit", entryFee: { adult: 150, child: 75 } },
        { name: "Chamundi Hills", type: "drive" }
      ]
    },
    {
      day: "Day 2",
      title: "Coorg Exploration",
      places: [
        { name: "Abbey Falls", type: "visit", entryFee: { adult: 100, child: 50 } },
        { name: "Raja's Seat", type: "visit", entryFee: { adult: 50, child: 20 } },
        { name: "Coffee Plantation", type: "visit", entryFee: { adult: 0, child: 0 } }
      ]
    },
    {
      day: "Day 3",
      title: "Return Journey with Stops",
      places: [
        { name: "Golden Temple", type: "visit", entryFee: { adult: 50, child: 20 } },
        { name: "Nisargadhama", type: "drive" }
      ]
    }
  ],
  images: [
    "https://images.unsplash.com/photo-1587922546307-776227941871",
    "https://images.unsplash.com/photo-1580877854178-95a9bca2dd2e",
    "https://images.unsplash.com/photo-1588416499018-d8c621e1d2dc",
    "https://images.unsplash.com/photo-1592125159416-5088662ee5e1"
  ],
  contactNumber: "+91 9876543210"
}

const TourDetails = () => {
  const { id } = useParams()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTour(tourData)
      setLoading(false)
    }, 500)
  }, [id])
  
  const handleSaveTour = () => {
    setIsSaved(!isSaved)
    // Here you would typically implement the actual saving logic
    // e.g., saving to localStorage or making an API call
    if (!isSaved) {
      // Show a success message or notification
      console.log(`Tour ${id} saved to favorites`)
    } else {
      console.log(`Tour ${id} removed from favorites`)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (!tour) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Tour package not found</h2>
        <Link to="/tour-packages" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
          Browse other packages
        </Link>
      </div>
    )
  }
  
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % tour.images.length)
  }
  
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + tour.images.length) % tour.images.length)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/tour-packages" className="hover:text-blue-600">Tour Packages</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{tour.title}</span>
        </nav>
      </div>
      
      <div className="lg:flex gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Image Carousel */}
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-6">
            {tour.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${tour.title} - Image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-gray-800"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 text-gray-800"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Tour Info */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{tour.title}</h1>
              <button 
                onClick={handleSaveTour}
                className="flex items-center gap-1 p-2 text-blue-600 hover:text-blue-800 transition-colors"
                aria-label={isSaved ? "Remove from saved tours" : "Save this tour"}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-6 w-6 fill-blue-600 text-blue-600" />
                ) : (
                  <Bookmark className="h-6 w-6" />
                )}
                <span className="text-sm font-medium">{isSaved ? "Saved" : "Save Tour"}</span>
              </button>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-1 text-blue-600" />
              <span className="mr-4">{tour.location}</span>
              <Clock className="h-5 w-5 mr-1 text-blue-600" />
              <span>{tour.duration}</span>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold mr-2">Rating:</span>
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{tour.rating}/5</span>
                <span className="ml-2 text-gray-600">({tour.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'itinerary'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`py-4 px-6 font-medium text-sm ${
                    activeTab === 'inclusions'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Inclusions & Exclusions
                </button>
              </nav>
            </div>
            
            <div className="py-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {tour.description}
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Tour Highlights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Visit the magnificent Mysore Palace, a historical royal residence</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Explore the lush coffee plantations of Coorg</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Enjoy the scenic beauty of Abbey Falls</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Experience the diverse wildlife at Mysore Zoo</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Comfortable stay at 3-star hotels</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <div>
                  <div className="space-y-8">
                    {tour.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-800">{day.day} - {day.title}</h3>
                        </div>
                        <ul className="space-y-4 mt-4">
                          {day.places.map((place, placeIndex) => (
                            <li key={placeIndex} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between">
                                <div className="flex items-start">
                                  <span className="font-medium">{place.name}</span>
                                  {place.type === 'drive' && (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded">
                                      Drive Through Only
                                    </span>
                                  )}
                                </div>
                                {place.type === 'visit' && (
                                  <div className="text-right text-sm">
                                    <div>Entry Fee (Adult): ₹{place.entryFee.adult}</div>
                                    <div>Entry Fee (Child): ₹{place.entryFee.child}</div>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Inclusions & Exclusions Tab */}
              {activeTab === 'inclusions' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Booking Info */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Plans & Pricing</h3>
            
            {/* Adult Plan */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Adult Plan</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold text-blue-600">₹{tour.adultPrice.discounted}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">₹{tour.adultPrice.actual}</span>
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {Math.round(((tour.adultPrice.actual - tour.adultPrice.discounted) / tour.adultPrice.actual) * 100)}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-600">Per person (12+ years)</p>
            </div>
            
            {/* Child Plan */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-800 mb-2">Child Plan</h4>
              <div className="flex items-baseline mb-2">
                <span className="text-2xl font-bold text-blue-600">₹{tour.childPrice.discounted}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">₹{tour.childPrice.actual}</span>
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {Math.round(((tour.childPrice.actual - tour.childPrice.discounted) / tour.childPrice.actual) * 100)}% OFF
                </span>
              </div>
              <p className="text-sm text-gray-600">Per child (5-11 years)</p>
            </div>
            
            {/* Contact & Booking */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Book This Tour</h4>
              
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-blue-600 mr-2" />
                <a href={`tel:${tour.contactNumber}`} className="text-blue-600 font-medium hover:text-blue-800">
                  {tour.contactNumber}
                </a>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/form"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium text-center inline-block hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </Link>
                <Link
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium text-center inline-block hover:bg-blue-700 transition-colors"
                >
                  Share Tour
                </Link>
                <button
                  onClick={handleSaveTour}
                  className={`w-full py-3 px-4 rounded-md font-medium text-center inline-block border transition-colors flex items-center justify-center ${
                    isSaved 
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-50' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5 mr-2 fill-blue-600 text-blue-600" />
                      Saved to Favorites
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5 mr-2" />
                      Save this Tour
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetails