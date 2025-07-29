// src/pages/TourDetails.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Clock, CheckCircle, XCircle, Calendar, Bookmark, BookmarkCheck, Share2 } from 'lucide-react'
import PlanSelector from '../components/PlanSelector'
import { tourPackages } from '../data/mockData'
import { storage } from '../utils/storage'

const TourDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    // Find tour by ID
    const foundTour = tourPackages.find(t => t.id === parseInt(id))
    setTour(foundTour)
    setLoading(false)
    
    // Check if tour is saved
    if (foundTour) {
      const wishlist = storage.getWishlist()
      const isInWishlist = wishlist.some(item => item.id === foundTour.id && item.type === 'tour')
      setIsSaved(isInWishlist)
    }
  }, [id])
  
  const handleSaveTour = () => {
    if (!tour) return
    
    const wishlistItem = {
      id: tour.id,
      type: 'tour',
      name: tour.title,
      location: tour.location,
      price: selectedPlan?.price || tour.price,
      image: tour.images[0],
      savedOn: new Date().toLocaleDateString()
    }
    
    if (isSaved) {
      storage.removeFromWishlist(tour.id, 'tour')
      setIsSaved(false)
    } else {
      const success = storage.addToWishlist(wishlistItem)
      if (success) {
        setIsSaved(true)
      }
    }
  }
  
  const handleBookNow = () => {
    if (!selectedPlan) {
      alert('Please select a plan first')
      return
    }
    
    const bookingData = {
      type: 'tour',
      tour,
      selectedPlan,
      timestamp: new Date().toISOString()
    }
    
    storage.saveBookingData(bookingData)
    navigate('/booking-form', { state: bookingData })
  }
  
  const handleShareTour = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: tour.description,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Tour link copied to clipboard!')
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
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/tour-packages" className="hover:text-blue-600">Tour Packages</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{tour.title}</span>
          </nav>
        </div>
      </div>

      {/* Full-width Image Carousel */}
      <div className="relative w-full h-[50vh]">
        {tour.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image} 
              alt={`${tour.title} - Image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
        ))}
        
        {tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 text-gray-800 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 text-gray-800 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Overlay Content */}
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center space-x-4 text-lg">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{tour.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{tour.duration}</span>
            </div>
            <div className="bg-blue-600 px-3 py-1 rounded-full">
              ⭐ {tour.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:flex gap-8">
          {/* Left Column - Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Tour Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Experience free,serene spiritual views from a beautiful hilltop temple.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Explore the lavish history of the Nizams at Chowmahalla Palace and the Nizam Museum.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Discover the ancient grandeur of Golconda Fort and the world-class Salarjung Museum.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Enjoy leisure and historical immersion at NTR Gardens and the 3D Hyderabad history show.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Itinerary */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detailed Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">{day.day} - {day.title}</h3>
                    </div>
                    <div className="grid gap-3">
                      {day.places.map((place, placeIndex) => (
                        <div key={placeIndex} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <span className="font-medium text-gray-800">{place.name}</span>
                              {place.type === 'drive' && (
                                <span className="ml-3 text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full">
                                  Drive Through Only
                                </span>
                              )}
                            </div>
                            {place.entryFee && (
                              <div className="text-right text-sm text-gray-600">
                                <div>Adult: ₹{place.entryFee.adult}</div>
                                <div>Child: ₹{place.entryFee.child}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Included & Excluded</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    Inclusions
                  </h3>
                  <ul className="space-y-3">
                    {tour.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <XCircle className="h-6 w-6 text-red-500 mr-2" />
                    Exclusions
                  </h3>
                  <ul className="space-y-3">
                    {tour.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
          
          {/* Right Column - Booking */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Book This Tour</h3>
              
              {/* Plan Selection */}
              <PlanSelector 
                plans={tour.plans}
                selectedPlan={selectedPlan}
                onPlanSelect={setSelectedPlan}
              />
              
              {/* Price Display */}
              {selectedPlan && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Selected Plan:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Price:</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">₹{selectedPlan.price}</span>
                      {tour.originalPrice && selectedPlan.price < tour.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">₹{tour.originalPrice}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              {selectedPlan && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Book Now
                  </button>
                  
                  <button
                    onClick={handleShareTour}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Tour
                  </button>
                  
                  <button
                    onClick={handleSaveTour}
                    className={`w-full py-3 px-4 rounded-lg font-medium border transition-colors flex items-center justify-center ${
                      isSaved 
                        ? 'border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="h-5 w-5 mr-2" />
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
              )}
              
              {!selectedPlan && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">Select a plan to continue booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourDetails
