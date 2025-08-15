import { useState } from "react"
import { X, ChevronLeft, ChevronRight, CheckCircle, XCircle, User, Award, Phone, Sparkles, Calendar, MapPin, Mail,Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { storage } from "../utils/storage"

const VehicleModal = ({ vehicle, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const navigate = useNavigate()

  if (!isOpen || !vehicle) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const handleBookNow = () => {
    if (!selectedPlan) {
      alert("Please select a plan first")
      return
    }
    if (vehicle.type === "bus" && vehicle.drivers && !selectedDriver) {
      alert("Please select a driver first")
      return
    }
    const bookingData = {
      type: "vehicle",
      vehicle,
      selectedPlan,
      selectedDriver: vehicle.type === "bus" ? selectedDriver : null,
      timestamp: new Date().toISOString(),
    }
    const success = storage.saveBookingData(bookingData)
    if (success) {
      onClose()
      navigate("/booking-form")
    } else {
      alert("Error saving booking data. Please try again.")
    }
  }

  const handleSaveVehicle = () => {
    const wishlistItem = {
      id: vehicle.id,
      type: vehicle.type, // CHANGED: Save the specific vehicle type ('car' or 'bus')
      name: vehicle.name,
      image: vehicle.images[0],
      price: selectedPlan?.price || vehicle.plans[0]?.price,
      capacity: vehicle.capacity,
      savedOn: new Date().toLocaleDateString(),
    }
    const success = storage.addToWishlist(wishlistItem)
    if (success) {
      alert("Vehicle saved to wishlist!")
    } else {
      alert("Vehicle is already in your wishlist!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-float max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        
        {/* Modal Header */}
        <div className="relative">
          <div className="flex items-center justify-between p-6 border-b border-primary-200">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-secondary-800">
                {vehicle.name}
              </h2>
              <div className="flex items-center mt-2">
                <span className="font-poppins text-secondary-600">
                  {vehicle.type === 'car' ? 'Car' : 'Bus'} • Capacity: {vehicle.capacity}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-secondary-100 hover:bg-secondary-200 rounded-xl flex items-center justify-center transition-colors group"
            >
              <X className="w-5 h-5 text-secondary-600 group-hover:text-secondary-800" />
            </button>
          </div>

          {/* Floating Sparkle */}
          <div className="absolute top-4 right-16 animate-pulse-gentle opacity-60">
            <Sparkles className="w-5 h-5 text-accent-yellow" />
          </div>
        </div>

        <div className="p-6">
          {/* Image Carousel */}
          <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-warm">
            <img
              src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {vehicle.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-glass-gradient backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-glass-gradient backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-full p-3 transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white shadow-elegant" : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Info */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6">
                <h3 className="font-playfair text-lg font-bold text-secondary-800 mb-4">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-primary-500 mr-3" />
                    <div>
                      <span className="font-poppins text-secondary-500 block">Capacity</span>
                      <span className="font-poppins font-medium text-secondary-700">{vehicle.capacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 text-primary-500 mr-3 text-sm">🚗</span>
                    <div>
                      <span className="font-poppins text-secondary-500 block">Type</span>
                      <span className="font-poppins font-medium text-secondary-700 capitalize">{vehicle.type}</span>
                    </div>
                  </div>
                  {vehicle.fuel && (
                    <div className="flex items-center">
                      <span className="w-4 h-4 text-primary-500 mr-3 text-sm">⛽</span>
                      <div>
                        <span className="font-poppins text-secondary-500 block">Fuel Type</span>
                        <span className="font-poppins font-medium text-secondary-700">{vehicle.fuel}</span>
                      </div>
                    </div>
                  )}
                  {vehicle.transmission && (
                    <div className="flex items-center">
                      <span className="w-4 h-4 text-primary-500 mr-3 text-sm">⚙️</span>
                      <div>
                        <span className="font-poppins text-secondary-500 block">Transmission</span>
                        <span className="font-poppins font-medium text-secondary-700">{vehicle.transmission}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Plans */}
              <div>
                <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-4">Select Plan</h3>
                <div className="grid gap-3">
                  {vehicle.plans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedPlan?.id === plan.id
                          ? "border-primary-400 bg-primary-50 shadow-elegant"
                          : "border-primary-200 hover:border-primary-300 hover:bg-primary-25"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-playfair font-semibold text-secondary-800">{plan.name}</h4>
                          <p className="font-poppins text-sm text-secondary-600 mt-1">{plan.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-playfair text-xl font-bold text-primary-600">₹{plan.price.toLocaleString()}</span>
                          <span className="font-poppins text-sm text-secondary-500 block">per day</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Selection for Buses */}
              {vehicle.type === "bus" && vehicle.drivers && (
                <div>
                  <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-4">Select Driver</h3>
                  <div className="grid gap-3">
                    {vehicle.drivers.map((driver) => (
                      <div
                        key={driver.id}
                        onClick={() => setSelectedDriver(driver)}
                        className={`p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${
                          selectedDriver?.id === driver.id
                            ? "border-primary-400 bg-primary-50 shadow-elegant"
                            : "border-primary-200 hover:border-primary-300 hover:bg-primary-25"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="bg-elegant-gradient w-10 h-10 rounded-xl flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-playfair font-semibold text-secondary-800">{driver.name}</h4>
                              <p className="font-poppins text-sm text-secondary-600">Experience: {driver.experience}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Award className="w-4 h-4 text-accent-yellow mr-1" />
                              <span className="font-poppins text-sm font-medium">{driver.rating}</span>
                            </div>
                            <p className="font-poppins text-xs text-secondary-500">License: {driver.license}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="font-playfair font-bold text-secondary-800 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Inclusions
                  </h4>
                  <ul className="space-y-2">
                    {vehicle.inclusions.map((item, index) => (
                      <li key={index} className="font-poppins text-sm text-secondary-700 flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 rounded-2xl p-6">
                  <h4 className="font-playfair font-bold text-secondary-800 mb-4 flex items-center">
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    Exclusions
                  </h4>
                  <ul className="space-y-2">
                    {vehicle.exclusions.map((item, index) => (
                      <li key={index} className="font-poppins text-sm text-secondary-700 flex items-start">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notes */}
              {vehicle.notes && (
                <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-2xl p-6">
                  <h4 className="font-playfair font-bold text-secondary-800 mb-3">Important Notes</h4>
                  <p className="font-poppins text-sm text-secondary-700">{vehicle.notes}</p>
                </div>
              )}
            </div>

            {/* Right Column - Action Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 sticky top-6">
                <div className="bg-white rounded-2xl p-6 shadow-warm">
                  <div className="text-center mb-6">
                    <h3 className="font-playfair text-xl font-bold text-secondary-800 mb-2">
                      Book This Vehicle
                    </h3>
                    {selectedPlan && (
                      <div className="inline-flex items-center px-3 py-1 bg-elegant-gradient rounded-full text-white text-sm font-medium">
                        ₹{selectedPlan.price.toLocaleString()} / day
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <button
                      onClick={handleBookNow}
                      className="w-full bg-elegant-gradient hover:shadow-elegant text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 font-poppins"
                    >
                      Book Now
                    </button>

                    <button
                      onClick={handleSaveVehicle}
                      className="w-full bg-white border-2 border-primary-300 text-primary-600 font-semibold py-4 px-6 rounded-xl hover:bg-primary-50 transition-all duration-300 font-poppins"
                    >
                      Save to Wishlist
                    </button>
                  </div>

                  <div className="border-t border-primary-200 pt-6">
                    <div className="flex items-center justify-center space-x-6">
                      <a
                        href="tel:+919876543210"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="font-poppins text-sm">Call Now</span>
                      </a>
                      <a
                        href="mailto:info@vinayakatravels.com"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="font-poppins text-sm">Email Us</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehicleModal
