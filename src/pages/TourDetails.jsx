import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Share2,
  Star,
  Users,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
  Heart,
  Camera,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Shield,
  Award,
  Map,
  Ticket,
  Car,
  ArrowUp,
} from "lucide-react";
import { tourPackages } from "../data/mockData";
import PlanSelector from "../components/PlanSelector";
import { storage } from "../utils/storage";

// Image Gallery Modal Component (unchanged)
const ImageGalleryModal = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onThumbnailClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="relative w-full h-[70vh] sm:h-[80vh] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          aria-label="Close gallery"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() => onNavigate("prev")}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => onNavigate("next")}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain touch-pinch-zoom"
        />

        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="w-full max-w-3xl overflow-x-auto mt-2 sm:mt-4">
          <div className="flex space-x-2 p-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => onThumbnailClick(index)}
                className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-md overflow-hidden border-2 ${
                  index === currentIndex ? "border-blue-500" : "border-transparent"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main TourDetails Component
const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    itinerary: true,
    inclusions: true,
    highlights: true,
  });
  const [expandedPlaces, setExpandedPlaces] = useState({});

  useEffect(() => {
    // Find tour by ID
    const foundTour = tourPackages.find((t) => t.id === Number.parseInt(id));
    setTour(foundTour);
    setLoading(false);

    // Auto-select first plan
    if (foundTour && foundTour.plans.length > 0) {
      setSelectedPlan(foundTour.plans[0]);
    }

    // Check if tour is saved
    if (foundTour) {
      const wishlist = storage.getWishlist();
      const isInWishlist = wishlist.some(
        (item) => item.id === foundTour.id && item.type === "tour"
      );
      setIsSaved(isInWishlist);
    }
  }, [id]);

  const handleSaveTour = () => {
    if (!tour) return;

    const wishlistItem = {
      id: tour.id,
      type: "tour",
      name: tour.title,
      location: tour.location,
      price: selectedPlan?.price || tour.price,
      image: tour.images[0],
      savedOn: new Date().toLocaleDateString(),
    };

    if (isSaved) {
      storage.removeFromWishlist(tour.id, "tour");
      setIsSaved(false);
    } else {
      const success = storage.addToWishlist(wishlistItem);
      if (success) {
        setIsSaved(true);
      }
    }
  };

  // FIXED: Updated handleBookNow function
  const handleBookNow = () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }
    
    const bookingData = {
      type: 'tour',
      tour,
      selectedPlan,
      timestamp: new Date().toISOString()
    };
    
    // Save booking data to localStorage
    const success = storage.saveBookingData(bookingData);
    if (success) {
      navigate('/booking-form');
    } else {
      alert('Error saving booking data. Please try again.');
    }
  };

  const handleShareTour = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Tour link copied to clipboard!");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const togglePlace = (dayIndex, placeIndex) => {
    setExpandedPlaces((prev) => ({
      ...prev,
      [`${dayIndex}-${placeIndex}`]: !prev[`${dayIndex}-${placeIndex}`],
    }));
  };

  const handleGalleryNavigate = (direction) => {
    if (direction === "next") {
      nextImage();
    } else {
      prevImage();
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateDayDuration = (places) => {
    return places.reduce((total, place) => {
      const duration = place.duration
        ? parseFloat(place.duration.match(/[\d.]+/)[0]) *
          (place.duration.includes("hour") ? 60 : 1)
        : 0;
      return total + duration;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Loading tour details...
          </p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Tour Not Found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            The tour package you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/tour-packages")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors"
          >
            Browse Other Packages
          </button>
        </div>
      </div>
    );
  }

  const discount = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Back Button */}
      <div className="lg:hidden bg-white shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveTour}
              className={`p-2 rounded-full transition-colors ${
                isSaved
                  ? "text-red-500 bg-red-50"
                  : "text-gray-400 hover:text-red-500"
              }`}
              aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isSaved ? "fill-current" : ""}`}
              />
            </button>
            <button
              onClick={handleShareTour}
              className="p-2 rounded-full text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Share tour"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] touch-pan-x">
        {tour.images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${tour.title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        ))}

        {/* Navigation Controls */}
        {tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 sm:p-3 text-white transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Gallery Button */}
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl transition-all flex items-center space-x-2 text-sm"
          aria-label="Open image gallery"
        >
          <Camera className="w-4 h-4" />
          <span className="hidden sm:inline">View Gallery</span>
          <span>({tour.images.length})</span>
        </button>

        {/* Overlay Content */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                  {tour.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center bg-yellow-500 px-2 sm:px-3 py-1 rounded-full text-black font-semibold">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" />
                    <span>{tour.rating}</span>
                    <span className="ml-1 text-xs">
                      ({tour.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Badge */}
              <div className="bg-white/95 backdrop-blur-sm text-gray-900 p-3 sm:p-4 rounded-2xl">
                <div className="flex items-center justify-between space-x-2">
                  <span className="text-lg sm:text-2xl font-bold text-blue-600">
                    ₹{tour.price.toLocaleString()}
                  </span>
                  {discount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                {tour.originalPrice && (
                  <div className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{tour.originalPrice.toLocaleString()}
                  </div>
                )}
                <div className="text-xs text-gray-600 mt-1">
                  Starting price per group
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="lg:flex gap-6 lg:gap-8">
          {/* Left Column - Content */}
          <div className="lg:w-2/3 space-y-6 sm:space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Group Size</div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                      {tour.groupSize}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Best Time</div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                      {tour.bestTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Difficulty</div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                      {tour.difficulty}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Languages</div>
                    <div className="font-semibold text-gray-800 text-sm sm:text-base">
                      {tour.languages.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                {tour.description}
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-blue-100">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Important Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-700">{tour.cancellationPolicy}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-700">Duration: {tour.duration}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tour Highlights */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Tour Highlights
                </h2>
                <button
                  onClick={() => toggleSection("highlights")}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={expandedSections.highlights ? "Collapse highlights" : "Expand highlights"}
                >
                  {expandedSections.highlights ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div
                className={`transition-all duration-300 ${
                  expandedSections.highlights ? "block" : "hidden lg:block"
                }`}
              >
                <div className="grid gap-3 sm:gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 sm:p-4 bg-green-50 rounded-xl border border-green-100"
                    >
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 sm:mr-4 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Itinerary */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Detailed Itinerary
                </h2>
                <button
                  onClick={() => toggleSection("itinerary")}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={expandedSections.itinerary ? "Collapse itinerary" : "Expand itinerary"}
                >
                  {expandedSections.itinerary ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div
                className={`transition-all duration-300 ${
                  expandedSections.itinerary ? "block" : "hidden lg:block"
                } space-y-6 sm:space-y-8`}
              >
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <div className="w-6 sm:w-8 flex-shrink-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                          {index + 1}
                        </div>
                        {index < tour.itinerary.length - 1 && (
                          <div className="absolute left-3 sm:left-4 top-8 sm:top-10 w-0.5 h-full bg-blue-200"></div>
                        )}
                      </div>
                      <div className="flex-1 ml-4 sm:ml-6">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                            Day {index + 1}: {day.title}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-600 mb-3 sm:mb-4">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Total Duration: ~{Math.ceil(calculateDayDuration(day.places) / 60)} hours
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          {day.places.map((place, placeIndex) => (
                            <div
                              key={placeIndex}
                              className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  {place.type === "drive" ? (
                                    <Car className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                                  ) : (
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                  )}
                                  <span className="text-xs text-gray-800 sm:text-base">
                                    {place.name}
                                  </span>
                                  {place.type === "drive" && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-1 sm:px-3 rounded-full font-medium">
                                      Drive
                                    </span>
                                  )}
                                  {place.duration && (
                                    <span className="text-xs bg-blue-100 text-blue-800 py-1 px-1 sm:px-3 rounded-full">
                                      {place.duration}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => togglePlace(index, placeIndex)}
                                  className="lg:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  aria-label={expandedPlaces[`${index}-${placeIndex}`] ? `Collapse ${place.name} details` : `Expand ${place.name} details`}
                                >
                                  {expandedPlaces[`${index}-${placeIndex}`] ? (
                                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                                  )}
                                </button>
                              </div>
                              <div
                                className={`mt-3 sm:mt-4 lg:block ${
                                  expandedPlaces[`${index}-${placeIndex}`] ? "block" : "hidden lg:block"
                                } transition-all duration-300`}
                              >
                                {place.entryFee && (
                                  <div className="flex items-center text-sm text-gray-700">
                                    <Ticket className="w-4 h-4 mr-2 text-green-500" />
                                    <span>
                                      Entry Fee: Adult ₹{place.entryFee.adult} | Child ₹{place.entryFee.child}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  What's Included & Excluded
                </h2>
                <button
                  onClick={() => toggleSection("inclusions")}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label={expandedSections.inclusions ? "Collapse inclusions" : "Expand inclusions"}
                >
                  {expandedSections.inclusions ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div
                className={`transition-all duration-300 ${
                  expandedSections.inclusions ? "block" : "hidden lg:block"
                } grid lg:grid-cols-2 gap-6 sm:gap-8`}
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <div className=" p-2 rounded-lg mr-2 sm:mr-3">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    Inclusions
                  </h3>
                  <div className="space-y-3">
                    {tour.inclusions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3  rounded-lg border border-green-100"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <div className=" p-2 rounded-lg mr-2 sm:mr-3">
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    Exclusions
                  </h3>
                  <div className="space-y-3">
                    {tour.exclusions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3  rounded-lg border border-red-100"
                      >
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:w-1/3 mt-6 sm:mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 sticky top-6">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Book This Tour
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Secure your spot with instant confirmation
                </p>
              </div>

              {/* Plan Selection */}
              <PlanSelector
                plans={tour.plans}
                selectedPlan={selectedPlan}
                onPlanSelect={setSelectedPlan}
              />

              {/* Price Summary */}
              {selectedPlan && (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                    Booking Summary
                  </h4>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Selected Plan:</span>
                      <span className="font-semibold text-gray-800">
                        {selectedPlan.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Group Size:</span>
                      <span className="font-semibold text-gray-800">
                        Up to {selectedPlan.maxPersons} people
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-semibold text-gray-800">
                          Total Price:
                        </span>
                        <div className="text-right">
                          <div className="text-lg sm:text-2xl font-bold text-blue-600">
                            ₹{selectedPlan.price.toLocaleString()}
                          </div>
                          {tour.originalPrice &&
                            selectedPlan.price < tour.originalPrice && (
                              <div className="text-xs sm:text-sm text-gray-500 line-through">
                                ₹{tour.originalPrice.toLocaleString()}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 space-y-3">
                <button
                  onClick={handleBookNow}
                  disabled={!selectedPlan}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-lg transition-colors shadow-lg hover:shadow-xl"
                  aria-label="Book tour"
                >
                  {selectedPlan ? "Book Now" : "Select a Plan to Continue"}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleShareTour}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-sm transition-colors"
                    aria-label="Share tour"
                  >
                    <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                    Share
                  </button>
                  <button
                    onClick={handleSaveTour}
                    className={`flex items-center justify-center py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold border-2 text-sm transition-colors ${
                      isSaved
                        ? "border-red-500 text-red-600 bg-red-50 hover:bg-red-100"
                        : "border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-600 hover:bg-red-50"
                    }`}
                    aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 mr-1 sm:mr-2 ${isSaved ? "fill-current" : ""}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-4 sm:mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">
                  Need Help?
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+91 12345 67890</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>support@tours.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    <span>Live Chat Available</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 sm:mt-6 text-center">
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-green-500" />
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-blue-500" />
                    <span>Best Price</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        images={tour.images}
        currentIndex={currentImageIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onNavigate={handleGalleryNavigate}
        onThumbnailClick={handleThumbnailClick}
      />
    </div>
  );
};

export default TourDetails;